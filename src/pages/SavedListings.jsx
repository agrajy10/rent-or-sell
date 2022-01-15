import { useState, useEffect, useContext, useRef } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

import ListingItem from '../components/ListingItem';
import ListingItemSkeleton from '../skeletons/ListingItemSkeleton';

import useAbortableEffect from '../hooks/useAbortableEffect';

import { FavoritesContext } from '../context/FavoritesContext';

import { db } from '../firebase.config';

function SavedListings() {
  const initalRender = useRef(true);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [error, setError] = useState('');
  const [listingTypeOption, setListingTypeOption] = useState('all');

  const { favorites, checkFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    document.title = 'Saved Listings | Rent or Sell';
  }, []);

  useAbortableEffect(
    (status) => {
      const getSavedListings = async () => {
        const savedListingDocs = await Promise.all(
          favorites.map((docID) => getDoc(doc(db, 'listings', docID)))
        ).catch((error) => setError(error.message));
        const savedListings = savedListingDocs.map((doc) => ({ docID: doc.id, data: doc.data() }));
        if (!status.aborted) {
          setListings(savedListings);
          setFilteredListings(savedListings);
          setLoading(false);
        }
      };
      getSavedListings();
    },
    [favorites]
  );

  useEffect(() => {
    if (!initalRender.current) {
      if (listingTypeOption === 'all') {
        setFilteredListings(listings);
      } else {
        const filterResults = listings.filter((listing) => listing.data.type === listingTypeOption);
        setFilteredListings(filterResults);
      }
    } else {
      initalRender.current = false;
    }
  }, [listingTypeOption]);

  return (
    <main className="min-h-screen max-w-7xl px-3 mx-auto">
      <section className="lg:py-24 md:py-20 py-14">
        <div className="md:flex md:items-center md:justify-between">
          <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8">Saved Listings</h1>
          <select
            className="select select-bordered w-full max-w-xs mb-8 mx-auto md:mx-0 block"
            value={listingTypeOption}
            onChange={(e) => setListingTypeOption(e.target.value)}>
            <option value="all">All</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
        </div>
        <div className="grid grid-cols-1 gap-4 xl:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {loading &&
            Array(9)
              .fill()
              .map((item) => <ListingItemSkeleton key={uuidv4()} />)}
          {error && <p className="xl:col-span-3 md:col-span-2">{error}</p>}
          {filteredListings.length === 0 && !error ? (
            <p className="xl:col-span-3 md:col-span-2">No listings to show.</p>
          ) : null}
          {filteredListings.length > 0 &&
            filteredListings.map(({ docID, data }) => (
              <ListingItem key={docID} docID={docID} isFavorite={checkFavorite(docID)} {...data} />
            ))}
        </div>
      </section>
    </main>
  );
}

export default SavedListings;
