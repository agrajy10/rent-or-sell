import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';

import TextInput from '../../components/TextInput';

import { auth } from '../../firebase.config';

const initialValues = {
  email: '',
  password: ''
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required')
});

function LoginForm() {
  const navigate = useNavigate();

  const onSubmit = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/profile');
    } catch (error) {
      toast.error('Invalid email or password');
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting }) => {
        return (
          <Form>
            <div className="mb-4">
              <TextInput label="Email" id="email" name="email" type="email" />
            </div>
            <div className="mb-8">
              <TextInput label="Password" id="password" name="password" type="password" />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block mx-0 mb-8"
              disabled={isSubmitting}>
              Login
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default LoginForm;
