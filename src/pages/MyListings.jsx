import { useState, useEffect, useRef } from 'react';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import ListingItem from '../components/ListingItem';

import useAbortableEffect from '../hooks/useAbortableEffect';

import { auth, db } from '../firebase.config';
import ListingItemSkeleton from '../skeletons/ListingItemSkeleton';

function MyListings() {
  const initalRender = useRef(true);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [listingTypeOption, setListingTypeOption] = useState('all');
  const [error, setError] = useState('');
  const [isConfirmationModalOpen, setisConfirmationModalOpen] = useState(false);
  const [listingDocId, setListingDocId] = useState('');

  useEffect(() => {
    document.title = 'My Listings | Rent or Sell';
  }, []);

  useAbortableEffect(
    (status) => {
      const getUserListings = async () => {
        try {
          const listingsRef = collection(db, 'listings');
          const q = query(listingsRef, where('userRef', '==', auth.currentUser.uid));
          const querySnapshot = await getDocs(q);
          const data = [];
          querySnapshot.forEach((doc) => {
            return data.push({
              docID: doc.id,
              data: doc.data()
            });
          });
          if (!status.aborted) {
            setListings(data);
            setFilteredListings(data);
          }
        } catch (error) {
          if (!status.aborted) {
            setError(error.message);
          }
        } finally {
          if (!status.aborted) {
            setLoading(false);
          }
        }
      };

      getUserListings();
    },
    [auth.currentUser.uid]
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

  if (loading) {
    return (
      <div className="min-h-screen max-w-7xl mx-auto px-3 lg:py-24 md:py-20 py-14">
        <div className="grid grid-cols-1 gap-4 xl:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array(9)
            .fill()
            .map((item) => (
              <ListingItemSkeleton key={uuidv4()} />
            ))}
        </div>
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
            {filteredListings.length ? (
              filteredListings.map(({ docID, data }) => (
                <ListingItem
                  {...data}
                  key={docID}
                  docID={docID}
                  deleteListing={() => showConfirmationModal(docID)}
                  editListing={auth.currentUser.uid === data.userRef}
                />
              ))
            ) : (
              <p className="text-center text-lg lg:col-span-3 sm:col-span-2">
                No listings to show.
              </p>
            )}
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
