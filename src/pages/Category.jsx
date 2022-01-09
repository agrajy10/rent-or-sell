import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';

import ListingItem from '../components/ListingItem';

import { db } from '../firebase.config';

function Category() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const { categoryName } = useParams();

  useEffect(() => {
    const getListings = async () => {
      try {
        const listingsRef = collection(db, 'listings');
        const q = query(listingsRef, where('type', '==', categoryName));
        const querySnapshot = await getDocs(q);
        const data = [];
        querySnapshot.forEach((doc) => {
          return data.push({
            docID: doc.id,
            data: doc.data()
          });
        });
        if (data.length) {
          setListings(data);
        } else {
          setError('No listings found');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (categoryName !== 'sale' || categoryName !== 'rent') {
      getListings();
    } else {
      setError('Invalid category');
    }
  }, [categoryName]);

  const pageTitle = categoryName === 'sale' ? 'For Sale' : 'For Rent';

  return (
    <main className="min-h-screen max-w-7xl px-3 mx-auto">
      <section className="lg:py-24 md:py-20 py-14">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8">{pageTitle}</h1>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {listings.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 sm:max-w-lg mx-auto md:max-w-none">
            {listings.map(({ docID, data }) => {
              return <ListingItem key={docID} {...data} />;
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default Category;
