import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="py-5 absolute top-0 left-0 w-full z-40 border-b border-gray-50 border-opacity-10">
      <div className="max-w-7xl mx-auto px-3 flex items-center justify-start">
        <h1 className="font-extrabold text-3xl text-white hover:opacity-90">
          <Link to="/">Rent or Sell</Link>
        </h1>
        <Link
          to="/login"
          className="btn btn-link text-white mr-4 ml-auto px-7 hover:no-underline hover:opacity-60">
          Login
        </Link>
        <Link to="/signup" className="btn btn-primary px-7">
          Signup
        </Link>
      </div>
    </header>
  );
}

export default Header;
