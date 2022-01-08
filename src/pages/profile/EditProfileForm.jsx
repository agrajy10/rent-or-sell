import { useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import TextInput from '../../components/TextInput';

import { auth, db } from '../../firebase.config';

function EditProfileForm() {
  const [isEditing, setIsEditing] = useState(false);

  const saveDetails = async ({ fullname }) => {
    try {
      if (auth.currentUser.displayName !== fullname) {
        await updateProfile(auth.currentUser, {
          displayName: fullname
        });

        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, {
          fullname
        });
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <Formik
      initialValues={{
        fullname: auth.currentUser.displayName
      }}
      validationSchema={Yup.object({
        fullname: Yup.string().required('Required')
      })}
      onSubmit={saveDetails}>
      {({ isSubmitting, values }) => {
        return (
          <Form>
            <div className="mb-4">
              {isEditing && <TextInput label="Name" name="fullname" id="fullname" type="text" />}
              {!isEditing && (
                <>
                  <span className="form-label">Name</span>
                  <p className="text-lg font-medium">{values.fullname}</p>
                </>
              )}
            </div>
            <div className="mb-4">
              <span className="form-label">Email</span>
              <p className="text-lg font-medium">{auth.currentUser.email}</p>
            </div>
            {!isEditing && (
              <button
                type="submit"
                className="btn btn-primary btn-block mx-0"
                onClick={() => setIsEditing(true)}>
                Edit
              </button>
            )}
            {isEditing && (
              <button
                type="submit"
                className="btn btn-primary btn-block mx-0"
                disabled={isSubmitting}>
                Update
              </button>
            )}
          </Form>
        );
      }}
    </Formik>
  );
}

export default EditProfileForm;
