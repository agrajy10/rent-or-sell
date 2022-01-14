import { useEffect } from 'react';

import FormCard from '../../layout/FormCard';
import FormContainer from '../../layout/FormContainer';
import FormHeading from '../../components/FormHeading';
import ForgotPasswordForm from './ForgotPasswordForm';

function ForgotPassword() {
  useEffect(() => {
    document.title = 'Forgot Password | Rent or sell';
  }, []);

  return (
    <FormContainer>
      <FormCard>
        <FormHeading>Reset password</FormHeading>
        <ForgotPasswordForm />
      </FormCard>
    </FormContainer>
  );
}

export default ForgotPassword;
