import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import GoogleAuth from '../../components/GoogleAuth';
import FormHeading from '../../components/FormHeading';
import FormCard from '../../layout/FormCard';
import FormContainer from '../../layout/FormContainer';
import LoginForm from './LoginForm';

function Login() {
  useEffect(() => {
    document.title = 'Login | Rent or Sale';
  }, []);

  return (
    <FormContainer>
      <FormCard>
        <FormHeading heading="Welcome back!" />
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
