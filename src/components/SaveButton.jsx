import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

import { ReactComponent as HeartOutLineIcon } from '../assets/svg/heart-outline.svg';
import { ReactComponent as HeartFilledIcon } from '../assets/svg/heart-filled.svg';

import { db, auth } from '../firebase.config';
import { toast } from 'react-toastify';

function SaveButton({ docID }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const onClick = async () => {
    if (!auth.currentUser) {
      navigate('/login');
      return;
    }
    setIsSubmitting(true);
    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        favorites: arrayUnion(docID)
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className="btn btn-info btn-block mx-0"
      aria-label="Save this listing"
      disabled={isSubmitting}>
      <HeartOutLineIcon className="w-6 h-6 text-white" />
    </button>
  );
}

export default SaveButton;
