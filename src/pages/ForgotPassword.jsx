import { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { auth } from '../firebase.config';
import { sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import TextInput from '../components/TextInput';
import FormCard from '../layout/FormCard';
import FormContainer from '../layout/FormContainer';
import FormHeading from '../components/FormHeading';

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
    <FormContainer>
      <FormCard>
        <FormHeading heading="Reset password" />
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
      </FormCard>
    </FormContainer>
  );
}

export default ForgotPassword;
