import { Navigate, Outlet } from 'react-router-dom';

import useAuthStatus from '../hooks/useAuthStatus';

function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return (
      <div className="min-h-screen max-w-7xl mx-auto px-3 lg:py-24 md:py-20 py-14">
        <p>Loading....</p>
      </div>
    );
  }
  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
