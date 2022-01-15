import { Link } from 'react-router-dom';

import Navbar from './Navbar';

import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../firebase.config';

import { ReactComponent as Logo } from '../assets/svg/logo.svg';

function Header() {
  const [user, loading] = useAuthState(auth);

  return (
    <header className="px-3">
      <div className="w-full max-w-7xl mx-auto flex items-center py-5">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl text-gray-900 hover:opacity-90">
          <Logo className="w-10 h-10 sm:w-7 sm:h-7 text-primary" />
          <span className="hidden sm:block">Rent or Sell</span>
        </Link>
        {!loading && <Navbar loggedIn={!!user} />}
      </div>
    </header>
  );
}

export default Header;
