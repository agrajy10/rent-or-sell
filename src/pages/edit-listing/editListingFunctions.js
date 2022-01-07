import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { db, auth, storage } from '../../firebase.config';

export const getCoordinates = async (address) => {
  try {
    const { data } = await axios({
      method: 'get',
      url: 'https://us1.locationiq.com/v1/search.php',
      params: {
        key: import.meta.env.VITE_GEOCODING_API_KEY,
        q: address,
        format: 'json'
      }
    });

    return [data, null];
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return [null, 'Invalid address'];
    } else if (error.response) {
      return [null, error.response.data.error];
    } else {
      return [null, error.message];
    }
  }
};

export const storeImage = async (image) => {
  return new Promise((resolve, reject) => {
    const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
    const storageRef = ref(storage, 'images/' + fileName);

    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};

export const updateListing = async (values, listingId) => {
  try {
    const formData = { ...values };

    if (!formData.customGeolocationEnabled) {
      const [data, error] = await getCoordinates(formData.address);
      if (error) {
        throw new Error(error);
      }
      formData.geolocation = {
        latitude: data[0].lat,
        longitude: data[0].lon
      };
    }

    let newImgUrls = [...formData.imgUrls];

    if (formData.images) {
      const imgUrls = await Promise.all(
        [...formData.images].map((image) => storeImage(image))
      ).catch((error) => {
        toast.error(error.message);
        return;
      });

      newImgUrls = [...newImgUrls, ...imgUrls];
    }

    delete formData.images;
    delete formData.imgUrls;

    const listingDocRef = doc(db, 'listings', listingId);
    await updateDoc(listingDocRef, { ...formData, imgUrls: newImgUrls });
    toast.success('Listing updated successfully');

    return listingDocRef.id;
  } catch (error) {
    toast.error(error.message);
  }
};

export const deleteUploadedImage = (setFieldValue, url, imgUrls) => {
  setFieldValue(
    'imgUrls',
    imgUrls.filter((imgUrl) => imgUrl !== url)
  );
};

export const deleteSelectedImage = (imageThumbs, path, setFieldValue, setImageThumbs) => {
  const newImageThumbs = imageThumbs.filter((image) => image.path !== path);
  setImageThumbs(newImageThumbs);
  setFieldValue('images', newImageThumbs);
};
