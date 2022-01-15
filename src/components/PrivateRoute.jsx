import { Navigate, Outlet } from 'react-router-dom';

import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../firebase.config';

function PrivateRoute() {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return (
      <div className="min-h-screen max-w-7xl mx-auto px-3 lg:py-24 md:py-20 py-14">
        <p>Loading....</p>
      </div>
    );
  }
  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
