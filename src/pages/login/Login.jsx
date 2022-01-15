import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import GoogleAuth from '../../components/GoogleAuth';
import FormHeading from '../../components/FormHeading';
import FormCard from '../../layout/FormCard';
import FormContainer from '../../layout/FormContainer';
import LoginForm from './LoginForm';

import { auth } from '../../firebase.config';

function Login() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Login | Rent or Sale';
    if (user) {
      navigate('/profile');
    }
  }, [user]);

  return (
    <FormContainer>
      <FormCard>
        <FormHeading>Welcome back</FormHeading>
        <GoogleAuth />
        <LoginForm />
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
