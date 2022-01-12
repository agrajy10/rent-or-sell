import { createContext, useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';

import { db, auth } from '../firebase.config';

export const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserFavorites();
      } else {
        setFavorites([]);
      }
    });

    return () => unsub();
  }, []);

  const getUserFavorites = async () => {
    if (!auth.currentUser) {
      return;
    }
    try {
      const docRef = doc(db, 'users', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      setFavorites(data.favorites);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addToFavorites = async (docID) => {
    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        favorites: arrayUnion(docID)
      });
      setFavorites((prevState) => [...prevState, docID]);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeFromFavorites = async (docID) => {
    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        favorites: arrayRemove(docID)
      });
      const newFavorites = favorites.filter((favorite) => favorite !== docID);
      setFavorites(newFavorites);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const checkFavorite = (docID) => favorites.includes(docID);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        setFavorites,
        getUserFavorites,
        checkFavorite,
        removeFromFavorites,
        addToFavorites
      }}>
      {children}
    </FavoritesContext.Provider>
  );
};
