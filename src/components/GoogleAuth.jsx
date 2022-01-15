import { useLocation, useNavigate } from 'react-router-dom';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { auth, db } from '../firebase.config';

import { ReactComponent as GoogleIcon } from '../assets/svg/google.svg';

function GoogleAuth() {
  const location = useLocation();
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          fullname: user.displayName,
          email: user.email,
          createdOn: serverTimestamp(),
          favorites: []
        });
      }
      navigate('/profile');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className="btn btn-ghost btn-block border border-gray-300 py-3 mb-8 h-auto text-gray-800 hover:border-gray-300 hover:bg-gray-100 hover:no-underline">
      <GoogleIcon width="24px" height="24px" className="mr-2" /> Sign{' '}
      {location.pathname === '/login' ? 'in' : 'up'} with google
    </button>
  );
}

export default GoogleAuth;
