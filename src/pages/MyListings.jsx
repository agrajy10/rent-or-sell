import { useState, useEffect, useRef } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, where, deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import ListingItem from '../components/ListingItem';
import ListingItemSkeleton from '../skeletons/ListingItemSkeleton';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

import { auth, db } from '../firebase.config';

function MyListings() {
  const initalRender = useRef(true);

  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [isConfirmationModalOpen, setisConfirmationModalOpen] = useState(false);
  const [listingTypeOption, setListingTypeOption] = useState('all');
  const [listingDocId, setListingDocId] = useState('');

  const [snapshot, loading, error] = useCollection(
    query(collection(db, 'listings'), where('userRef', '==', auth.currentUser.uid))
  );

  useEffect(() => {
    document.title = 'My Listings | Rent or Sell';
  }, []);

  useEffect(() => {
    if (snapshot) {
      const listingsData = [];
      snapshot.forEach((doc) => {
        return listingsData.push({
          docID: doc.id,
          data: doc.data()
        });
      });
      setListings(listingsData);
      setFilteredListings(listingsData);
    }
  }, [snapshot]);

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

  const deleteListing = async (docID) => {
    try {
      await deleteDoc(doc(db, 'listings', docID));
      const newFilteredListings = filteredListings.filter((listing) => listing.docID !== docID);
      setFilteredListings(newFilteredListings);
      const newListings = listings.filter((listing) => listing.docID !== docID);
      setListings(newListings);
      toast.success('Listing deleted successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const showConfirmationModal = (docID) => {
    setListingDocId(docID);
    setisConfirmationModalOpen(true);
  };

  const hideConfirmationModal = () => {
    setisConfirmationModalOpen(false);
  };

  const onConfirm = () => {
    deleteListing(listingDocId);
    hideConfirmationModal();
  };

  return (
    <>
      <main className="min-h-screen max-w-7xl px-3 mx-auto">
        <section className="lg:py-24 md:py-20 py-14">
          <div className="md:flex md:items-center md:justify-between">
            <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8">My Listings</h1>
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
                <ListingItem
                  key={docID}
                  docID={docID}
                  deleteListing={() => showConfirmationModal(docID)}
                  editListing={auth.currentUser.uid === data.userRef}
                  {...data}
                />
              ))}
          </div>
        </section>
      </main>
      <DeleteConfirmationModal
        message="Are you sure you want to delete this listing?"
        showModal={isConfirmationModalOpen}
        hideModal={hideConfirmationModal}
        onConfirm={onConfirm}
      />
    </>
  );
}

export default MyListings;
