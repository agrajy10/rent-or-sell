import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import GoogleAuth from '../../components/GoogleAuth';
import FormContainer from '../../layout/FormContainer';
import FormHeading from '../../components/FormHeading';
import FormCard from '../../layout/FormCard';
import SignupForm from './SignupForm';

import { auth } from '../../firebase.config';

function Signup() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Signup | Rent or Sale';
    if (user) {
      navigate('/profile');
    }
  }, [user]);

  return (
    <FormContainer>
      <FormCard>
        <FormHeading>Get started</FormHeading>
        <GoogleAuth />
        <SignupForm />
        <p className="text-center text-sm font-medium text-gray-700">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </FormCard>
    </FormContainer>
  );
}

export default Signup;
