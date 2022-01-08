import { useEffect } from 'react';

import FormCard from '../../layout/FormCard';
import EditProfileForm from './EditProfileForm';

function Profile() {
  useEffect(() => {
    document.title = 'Profile | Rent of Sell';
  }, []);

  return (
    <main className="min-h-screen max-w-7xl px-3 mx-auto">
      <section className="lg:py-24 md:py-20 py-14">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8">Profile</h1>
        <div className="flex items-start justify-center">
          <FormCard>
            <EditProfileForm />
          </FormCard>
        </div>
      </section>
    </main>
  );
}

export default Profile;
