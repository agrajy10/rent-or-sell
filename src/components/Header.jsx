import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  return (
    <header className={`py-5 w-full ${location.pathname === '/' && 'absolute top-0 left-0 z-40'}`}>
      <div className="max-w-7xl mx-auto px-3 flex items-center justify-start">
        <h1
          className={`font-semibold text-2xl hover:opacity-90 ${
            location.pathname === '/' ? 'text-white lg:text-gray-900' : 'text-gray-900'
          }`}>
          <Link to="/">Rent or Sell</Link>
        </h1>
        {
          <Link
            to="/login"
            className={`btn btn-link mr-4 ml-auto px-7 hover:no-underline hover:opacity-60 ${
              location.pathname === '/' ? 'text-white' : 'text-gray-900'
            }`}>
            Login
          </Link>
        }
        <Link to="/signup" className="btn btn-primary px-7">
          Signup
        </Link>
      </div>
    </header>
  );
}

export default Header;
