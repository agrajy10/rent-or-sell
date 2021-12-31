import { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { auth } from '../firebase.config';
import { sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import TextInput from '../components/TextInput';

function ForgotPassword() {
  useEffect(() => {
    document.title = 'Forgot Password | Rent or sell';
  }, []);

  const onSubmit = async ({ email }) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Reset link sent successfully.');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <main className="min-h-screen max-w-7xl mx-auto lg:py-24 md:py-20 py-14 px-3 flex items-center justify-center">
      <div className="card card-bordered border-gray-200 shadow-lg w-full max-w-md">
        <div className="card-body">
          <h1 className="text-3xl md:text-4xl  text-gray-900 text-center font-bold md:mb-8 mb-4">
            Reset password
          </h1>
          <Formik
            initialValues={{
              email: ''
            }}
            validationSchema={Yup.object({
              email: Yup.string().email('Invalid email address').required('Required')
            })}
            onSubmit={onSubmit}>
            {({ isSubmitting }) => {
              return (
                <Form>
                  <div className="mb-4">
                    <TextInput label="Email" id="email" name="email" type="email" />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mx-0"
                    disabled={isSubmitting}>
                    Send reset link
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </main>
  );
}

export default ForgotPassword;
