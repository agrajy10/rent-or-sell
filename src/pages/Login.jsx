import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import TextInput from '../components/TextInput';
import GoogleAuth from '../components/GoogleAuth';
import { auth } from '../firebase.config';
import FormHeading from '../components/FormHeading';
import FormCard from '../layout/FormCard';
import FormContainer from '../layout/FormContainer';

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Login | Rent or Sale';
  }, []);

  const onSubmit = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/profile');
    } catch (error) {
      toast.error('Invalid email or password');
    }
  };

  return (
    <FormContainer>
      <FormCard>
        <FormHeading heading="Welcome back!" />
        <GoogleAuth />
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required')
          })}
          onSubmit={onSubmit}>
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
        <p className="text-center text-sm">
          <Link to="/forgot-password" className="text-primary hover:underline">
            Forgot password?
          </Link>
        </p>
      </FormCard>
    </FormContainer>
  );
}

export default Login;
