import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';

import ListingsCarousel from '../../components/ListingsCarousel';

import { db } from '../../firebase.config';

function ForRentSection() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const getListingsForRent = async () => {
      try {
        const listingsRef = collection(db, 'listings');
        const q = query(
          listingsRef,
          where('type', '==', 'rent'),
          orderBy('postedOn', 'desc'),
          limit(4)
        );
        const querySnapshot = await getDocs(q);
        const data = [];
        querySnapshot.forEach((doc) => {
          return data.push({
            docID: doc.id,
            data: doc.data()
          });
        });
        setListings(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getListingsForRent();
  }, []);

  return (
    <div className="xl:grid xl:grid-cols-12 xl:gap-4 xl:items-center">
      <div className="col-span-4 xl:pl-16 text-center xl:text-left xl:order-2">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">For Rent</h2>
        <p className="text-gray-600 leading-loose xl:mb-12 mb-6">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi officia expedita et non
          vero quos.
        </p>
        <button type="button" className="btn btn-primary w-40 mb-12 xl:mb-0">
          View all
        </button>
      </div>
      <div className="col-span-8 xl:order-1">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <ListingsCarousel
            listings={listings}
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              768: {
                slidesPerView: 2
              },
              992: {
                slidesPerView: 3
              },
              1280: {
                slidesPerView: 2
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

export default ForRentSection;
