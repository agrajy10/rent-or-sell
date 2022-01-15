import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

import FormCard from '../../layout/FormCard';
import FormContainer from '../../layout/FormContainer';
import FormHeading from '../../components/FormHeading';
import ForgotPasswordForm from './ForgotPasswordForm';

import { auth } from '../../firebase.config';

function ForgotPassword() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Forgot Password | Rent or sell';
    if (user) {
      navigate('/profile');
    }
  }, [user]);

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
