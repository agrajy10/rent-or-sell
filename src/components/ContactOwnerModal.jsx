import { createPortal } from 'react-dom';
import { toast } from 'react-toastify';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

import TextAreaInput from './TextAreaInput';

import { auth, db } from '../firebase.config';

function ContactOwnerModal({ showModal, hideModal, docID, userRef, listingTitle }) {
  const onSubmit = async ({ message }) => {
    try {
      const data = {
        sentBy: auth.currentUser.uid,
        sentTo: userRef,
        listingRef: docID,
        listingTitle,
        message,
        sentAt: serverTimestamp()
      };
      const messagesRef = collection(db, 'messages');
      await addDoc(messagesRef, data);
      toast.success('Message sent successfully');
      hideModal();
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!showModal) {
    return null;
  }

  return createPortal(
    <>
      <div className="fixed inset-0 z-[999] bg-black opacity-30"></div>
      <div className="card fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md z-[9999] bg-white w-full max-w-2xl">
        <div className="card-body">
          <h2 className="text-gray-900 font-extrabold text-3xl mb-4 text-center">Contact owner</h2>
          <Formik
            initialValues={{
              message: ''
            }}
            validationSchema={Yup.object({
              message: Yup.string().required('Required')
            })}
            onSubmit={onSubmit}>
            {({ isSubmitting }) => {
              return (
                <Form>
                  <TextAreaInput label="Your message" id="message" name="message" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <button type="button" className="btn btn-ghost" onClick={hideModal}>
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      disabled={isSubmitting}>
                      Send message
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}

export default ContactOwnerModal;
