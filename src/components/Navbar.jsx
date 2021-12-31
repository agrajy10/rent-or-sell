import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuthStatus from '../hooks/useAuthStatus';
import { auth } from '../firebase.config';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { loggedIn } = useAuthStatus();

  const logOut = async () => {
    await auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="ml-auto">
      <ul className="flex items-center justify-end">
        {loggedIn && (
          <>
            <li>
              <Link
                to="/profile"
                className={`btn btn-link mr-4 ml-auto px-7 hover:no-underline hover:opacity-60 ${
                  location.pathname === '/' ? 'text-white' : 'text-gray-900'
                }`}>
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logOut}
                type="button"
                className={`btn btn-link mr-4 ml-auto px-7 hover:no-underline hover:opacity-60 ${
                  location.pathname === '/' ? 'text-white' : 'text-gray-900'
                }`}>
                Logout
              </button>
            </li>
          </>
        )}
        {!loggedIn && (
          <>
            <li>
              <Link
                to="/login"
                className={`btn btn-link mr-4 ml-auto px-7 hover:no-underline hover:opacity-60 ${
                  location.pathname === '/' ? 'text-white' : 'text-gray-900'
                }`}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="btn btn-primary px-7">
                Signup
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
