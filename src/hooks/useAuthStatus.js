import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState, useRef } from 'react';
import { auth } from '../firebase.config';

const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      }
      setCheckingStatus(false);
    });
  }, []);

  return { loggedIn, checkingStatus };
};

export default useAuthStatus;
