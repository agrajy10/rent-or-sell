import { useState } from 'react';
import axios from 'axios';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import TextInput from '../components/TextInput';
import TextAreaInput from '../components/TextAreaInput';
import ToggleInput from '../components/ToggleInput';
import RadioInput from '../components/RadioInput';
import FileInput from '../components/FileInput';
import { auth, db, storage } from '../firebase.config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';

const initialValues = {
  type: 'sale',
  title: '',
  description: '',
  address: '',
  geolocationEnabled: false,
  latitude: 0,
  longitude: 0,
  bedrooms: 1,
  bathrooms: 1,
  carspace: 1,
  listingSize: 0,
  regularPrice: 0,
  discountPrice: 0,
  onOffer: false,
  images: null
};

const validationSchema = Yup.object({
  type: Yup.string().required('Required'),
  title: Yup.string().required('Required'),
  description: Yup.string(),
  address: Yup.string().required('Required'),
  bedrooms: Yup.number().min(1, 'Cannot be less than one').required('Required'),
  geolocationEnabled: Yup.boolean(),
  latitude: Yup.number().when('geolocationEnabled', {
    is: true,
    then: Yup.number().integer('Invalid value').required('Required')
  }),
  longitude: Yup.number().when('geolocationEnabled', {
    is: true,
    then: Yup.number().integer('Invalid value').required('Required')
  }),
  bathrooms: Yup.number().min(1, 'Cannot be less than one').required('Required'),
  carspace: Yup.number().min(0, 'Cannot be less than zero').required('Required'),
  listingSize: Yup.number().positive('Invalid value').required('Required'),
  regularPrice: Yup.number().positive('Enter a valid price').required('Required'),
  onOffer: Yup.boolean(),
  discountPrice: Yup.number().when('onOffer', {
    is: true,
    then: Yup.number()
      .lessThan(Yup.ref('regularPrice'), 'Discount must be less than regular price')
      .positive('Enter a valid price')
      .required('Required')
  }),
  images: Yup.mixed().required('You must upload atleast one image')
});

function CreateListing() {
  const [imageThumbs, setImageThumbs] = useState([]);
  const getCoordinates = async (address) => {
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
      return [null, error.message];
    }
  };

  const storeImage = async (image) => {
    return new Promise((resolve, reject) => {
      const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
      const storageRef = ref(storage, 'images/' + fileName);

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
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

  const onSubmit = async (values) => {
    try {
      const formData = { ...values, userRef: auth.currentUser.uid, postedOn: serverTimestamp() };

      if (!formData.geolocationEnabled) {
        const [data, error] = await getCoordinates(formData.address);
        if (error) {
          throw new Error(error);
        }
        formData.geolocation = {
          latitude: data[0].lat,
          longitude: data[0].lon
        };
      } else {
        formData.geolocation = {
          latitude: formData.latitude,
          longitude: formData.longitude
        };
      }

      const imgUrls = await Promise.all(
        [...formData.images].map((image) => storeImage(image))
      ).catch((error) => {
        toast.error(error.message);
        return;
      });

      delete formData.latitude;
      delete formData.longitude;
      delete formData.geolocationEnabled;
      delete formData.images;

      await addDoc(collection(db, 'listings'), { ...formData, imgUrls });
      toast.success('Listing created successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <main className="min-h-screen max-w-7xl px-3 mx-auto">
      <section className="lg:py-24 md:py-20 py-14">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8">Create listing</h1>
        <div className="max-w-3xl mx-auto">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({ isSubmitting, values, resetForm, setFieldValue }) => {
              return (
                <Form className="space-y-4">
                  <div>
                    <span id="listing-type">Listing type</span>
                    <div
                      role="group"
                      aria-labelledby="listing-type"
                      className="grid grid-cols-2 gap-9 max-w-md">
                      <RadioInput
                        id="forSale"
                        label="For sale"
                        name="type"
                        value="sale"
                        checked={values.type === 'sale'}
                      />
                      <RadioInput
                        id="forRent"
                        label="For rent"
                        name="type"
                        value="rent"
                        checked={values.type === 'rent'}
                      />
                    </div>
                  </div>
                  <div>
                    <TextInput label="Title" id="title" name="title" type="text" />
                  </div>
                  <div>
                    <TextAreaInput label="Description" id="description" name="description" />
                  </div>
                  <div>
                    <TextAreaInput label="Address" id="address" name="address" />
                    <div className="inline-block mt-2">
                      <ToggleInput
                        label="Enter geolocation manually"
                        id="geolocationEnabled"
                        name="geolocationEnabled"
                      />
                    </div>
                  </div>
                  {values.geolocationEnabled && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <TextInput label="Latitude" id="latitude" name="latitude" type="text" />
                      </div>
                      <div>
                        <TextInput label="Longitude" id="longitude" name="longitude" type="text" />
                      </div>
                    </div>
                  )}
                  <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
                    <div>
                      <TextInput
                        label="No. of bedrooms"
                        id="bedrooms"
                        name="bedrooms"
                        type="number"
                        min="1"
                      />
                    </div>
                    <div>
                      <TextInput
                        label="No. of bathrooms"
                        id="bathrooms"
                        name="bathrooms"
                        type="number"
                        min="1"
                      />
                    </div>
                    <div>
                      <TextInput
                        label="Car space"
                        id="carspace"
                        name="carspace"
                        type="number"
                        min="0"
                      />
                    </div>
                    <div>
                      <TextInput
                        label="Area (in SQFT)"
                        id="listingSize"
                        name="listingSize"
                        type="number"
                        min="0"
                      />
                    </div>
                  </div>
                  <div>
                    <TextInput
                      label="Price (in USD)"
                      id="regularPrice"
                      name="regularPrice"
                      type="number"
                      min="0"
                    />
                    <div className="inline-block mt-2">
                      <ToggleInput label="On offer" id="onOffer" name="onOffer" />
                    </div>
                  </div>
                  {values.onOffer && (
                    <div>
                      <TextInput
                        label="Discount price (in USD)"
                        id="discountPrice"
                        name="discountPrice"
                        type="number"
                        min="0"
                      />
                    </div>
                  )}
                  <div>
                    <FileInput
                      maxFiles={7}
                      accept="image/jpg, image/png, image/jpeg"
                      onDrop={(acceptedFiles) => setFieldValue('images', acceptedFiles)}
                      dropZoneText="Select images (Maximum 7)"
                      id="images"
                      name="images"
                      label="Upload listing images (.jpg, .png)"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      className="btn btn-neutral btn-block mt-3 mx-0"
                      onClick={() => resetForm()}
                      disabled={isSubmitting}>
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary md:mt-3 btn-block mx-0"
                      disabled={isSubmitting}>
                      Submit
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </section>
    </main>
  );
}

export default CreateListing;
