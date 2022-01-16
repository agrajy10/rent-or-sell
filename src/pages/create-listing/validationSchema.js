import * as Yup from 'yup';

const validationSchema = Yup.object({
  type: Yup.string().required('Required'),
  title: Yup.string().required('Required'),
  description: Yup.string(),
  address: Yup.string().required('Required'),
  bedrooms: Yup.number().min(1, 'Cannot be less than one').required('Required'),
  customGeolocationEnabled: Yup.boolean(),
  geolocation: Yup.object().when('customGeolocationEnabled', {
    is: true,
    then: Yup.object({
      latitude: Yup.number().required('Required'),
      longtiude: Yup.number().required('Required')
    })
  }),
  bathrooms: Yup.number().min(1, 'Cannot be less than one').required('Required'),
  carspace: Yup.number().min(0, 'Cannot be less than zero').required('Required'),
  listingSize: Yup.number().positive('Invalid value').required('Required'),
  regularPrice: Yup.number().positive('Enter a valid price').required('Required'),
  images: Yup.mixed().required('You must upload atleast one image')
});

export default validationSchema;
