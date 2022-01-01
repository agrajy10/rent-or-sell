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

  const navLinkClass = `nav-link ${location.pathname === '/' ? 'text-white' : 'text-gray-900'}`;

  return (
    <nav className="ml-auto">
      <ul className="flex items-center justify-end space-x-2">
        {loggedIn && (
          <>
            <li>
              <Link to="/profile" className={navLinkClass}>
                Profile
              </Link>
            </li>
            <li>
              <Link to="/create-listing" className={navLinkClass}>
                Create listing
              </Link>
            </li>
            <li>
              <button onClick={logOut} type="button" className={navLinkClass}>
                Logout
              </button>
            </li>
          </>
        )}
        {!loggedIn && (
          <>
            <li>
              <Link to="/login" className={navLinkClass}>
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
