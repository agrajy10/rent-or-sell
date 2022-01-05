import axios from 'axios';
import { toast } from 'react-toastify';
import { doc, updateDoc } from 'firebase/firestore';

import { db } from '../../firebase.config';

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
    return [null, error.message];
  }
};

export const updateListing = async (values, listingId) => {
  try {
    const formData = { ...values };

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

    delete formData.latitude;
    delete formData.longitude;
    delete formData.geolocationEnabled;

    const listingDocRef = doc(db, 'listings', listingId);
    await updateDoc(listingDocRef, formData);
    toast.success('Listing updated successfully');

    return listingDocRef.id;
  } catch (error) {
    toast.error(error.message);
  }
};
