import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { auth, db } from '../firebase.config';
import FormCard from '../layout/FormCard';
import TextInput from '../components/TextInput';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    document.title = 'Profile | Rent of Sell';
  }, []);

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
    <main className="min-h-screen max-w-7xl px-3 mx-auto">
      <section className="lg:py-24 md:py-20 py-14">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8">Profile</h1>
        <div className="flex items-start justify-center">
          <FormCard>
            {
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
                        {isEditing && (
                          <TextInput label="Name" name="fullname" id="fullname" type="text" />
                        )}
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
            }
          </FormCard>
        </div>
      </section>
    </main>
  );
}

export default Profile;
