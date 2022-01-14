import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import GoogleAuth from '../../components/GoogleAuth';
import FormContainer from '../../layout/FormContainer';
import FormHeading from '../../components/FormHeading';
import FormCard from '../../layout/FormCard';
import SignupForm from './SignupForm';

function Signup() {
  useEffect(() => {
    document.title = 'Signup | Rent or Sale';
  }, []);

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
