import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import TextInput from '../components/TextInput';
import GoogleAuth from '../components/GoogleAuth';
import { auth } from '../firebase.config';

function Login() {
  useEffect(() => {
    document.title = 'Login | Rent or Sale';
  }, []);

  const onSubmit = async ({ email, password }) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error) {
      console.log(error);
      toast.error('Invalid email or password');
    }
  };

  return (
    <main className="min-h-screen max-w-7xl mx-auto lg:py-24 py-20 px-3 flex items-center justify-center">
      <div className="card card-bordered border-gray-200 shadow-lg w-full max-w-md">
        <div className="card-body">
          <h1 className="text-3xl md:text-4xl  text-gray-900 text-center font-bold mb-8">
            Welcome back!
          </h1>
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
        </div>
      </div>
    </main>
  );
}

export default Login;
