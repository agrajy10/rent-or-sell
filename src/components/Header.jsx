import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="border-b border-b-gray-200 py-5">
      <div className="max-w-7xl mx-auto px-3 flex items-center justify-start">
        <h1 className="font-extrabold text-3xl text-gray-800">
          <Link to="/">Rent or Sell</Link>
        </h1>
        <Link to="/login" className="btn btn-ghost mr-4 ml-auto px-7">
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
