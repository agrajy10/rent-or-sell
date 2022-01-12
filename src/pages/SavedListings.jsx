import { useState, useEffect, useContext } from 'react';
import { doc, getDoc } from 'firebase/firestore';

import ListingItem from '../components/ListingItem';

import { FavoritesContext } from '../context/FavoritesContext';

import { db } from '../firebase.config';

function SavedListings() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [error, setError] = useState('');

  const { favorites, checkFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    document.title = 'Saved Listings | Rent or Sell';
  }, []);

  useEffect(() => {
    const getSavedListings = async () => {
      const savedListingDocs = await Promise.all(
        favorites.map((docID) => getDoc(doc(db, 'listings', docID)))
      ).catch((error) => setError(error.message));
      const savedListings = savedListingDocs.map((doc) => ({ docID: doc.id, data: doc.data() }));
      setListings(savedListings);
      setLoading(false);
    };

    getSavedListings();
  }, [favorites]);

  if (loading) {
    return (
      <div className="min-h-screen max-w-7xl mx-auto px-3 lg:py-24 md:py-20 py-14">
        <p>Loading....</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen max-w-7xl mx-auto px-3 lg:py-24 md:py-20 py-14">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen max-w-7xl px-3 mx-auto">
      <section className="lg:py-24 md:py-20 py-14">
        <div className="md:flex md:items-center md:justify-between">
          <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8">Saved Listings</h1>
        </div>
        <div className="grid grid-cols-1 gap-4 xl:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {listings.length ? (
            listings.map(({ docID, data }) => (
              <ListingItem {...data} key={docID} docID={docID} isFavorite={checkFavorite(docID)} />
            ))
          ) : (
            <p className="text-center text-lg lg:col-span-3 sm:col-span-2">No listings to show.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default SavedListings;
