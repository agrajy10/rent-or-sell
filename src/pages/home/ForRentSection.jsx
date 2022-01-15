import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { Link } from 'react-router-dom';

import ListingsCarousel from '../../components/ListingsCarousel';

import useAbortableEffect from '../../hooks/useAbortableEffect';

import { db } from '../../firebase.config';

function ForRentSection() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [listings, setListings] = useState([]);

  useAbortableEffect((status) => {
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
        if (!status.aborted) {
          setListings(data);
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

    getListingsForRent();
  }, []);

  const listingsCarouselConfig = {
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      768: {
        slidesPerView: 2
      },
      992: {
        slidesPerView: 3
      },
      1280: {
        slidesPerView: 2
      }
    }
  };

  return (
    <div className="xl:grid xl:grid-cols-12 xl:gap-4 xl:items-center">
      <div className="col-span-4 xl:pl-16 text-center xl:text-left xl:order-2">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">For Rent</h2>
        <p className="text-gray-600 leading-loose xl:mb-12 mb-6">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi officia expedita et non
          vero quos.
        </p>
        <Link to="/category/rent" className="btn btn-primary w-40 mb-8 xl:mb-0">
          View all
        </Link>
      </div>
      <div className="col-span-8">
        {loading && (
          <ListingsCarousel
            loading={loading}
            listings={Array(4).fill()}
            {...listingsCarouselConfig}
          />
        )}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <ListingsCarousel loading={loading} listings={listings} {...listingsCarouselConfig} />
        )}
      </div>
    </div>
  );
}

export default ForRentSection;
