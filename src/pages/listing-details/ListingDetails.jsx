import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { doc, getDoc } from 'firebase/firestore';
import { format } from 'date-fns';

import ListingInfoCard from './ListingInfoCard';
import ListingGallery from './ListingGallery';
import ListingLocation from './ListingLocation';

import { db } from '../../firebase.config';

function ListingDetails() {
  const [listing, setListing] = useState({});
  const [loading, setLoading] = useState(true);

  const { listingId } = useParams();

  useEffect(() => {
    const getListingData = async () => {
      try {
        const docRef = doc(db, 'listings', listingId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setListing(docSnap.data());
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getListingData();
  }, [listingId]);

  const { address, description, geolocation, imgUrls, onOffer, postedOn, title } = listing;

  if (loading) {
    return (
      <div className="min-h-screen max-w-7xl mx-auto px-3 lg:py-24 md:py-20 py-14">
        <p>Loading....</p>
      </div>
    );
  }

  return (
    <main>
      <div className="w-full h-[32rem] md:h-[35rem] lg:h-[40rem] bg-black">
        <img alt="" src={imgUrls[0]} className="w-full h-full object-cover opacity-70" />
      </div>
      <article className="min-h-screen max-w-7xl px-3 mx-auto lg:py-24 md:py-20 py-14">
        <section className="lg:grid lg:grid-cols-[1fr_448px] lg:gap-9">
          <div className="bg-white card card-bordered border-gray-300 max-w-md mb-8 lg:mb-0 -mt-40 md:-mt-48 lg:order-2">
            <div className={`card-body relative ${onOffer ? 'pt-14' : null}`}>
              <ListingInfoCard {...listing} />
            </div>
          </div>
          <div className="lg:order-1">
            <span className="block text-sm text-gray-500 mb-3">
              Posted on : {format(postedOn.toDate(), 'd LLLL, y')}
            </span>
            <address className="not-italic text-lg text-gray-900 mb-3">{address}</address>
            <h1 className="text-gray-900 font-extrabold text-5xl mb-8">{title}</h1>
            <p className="text-gray-600 leading-loose">{description}</p>
          </div>
        </section>
        <section className="lg:pt-24 md:pt-20 pt-14">
          <h2 className="text-gray-900 font-extrabold text-3xl mb-4">Gallery</h2>
          <ListingGallery imgUrls={imgUrls} title={title} />
        </section>
        <section className="lg:pt-24 md:pt-20 pt-14">
          <h2 className="text-gray-900 font-extrabold text-3xl mb-4">Location</h2>
          <div className="w-full h-96">
            <ListingLocation {...geolocation} />
          </div>
        </section>
      </article>
    </main>
  );
}

export default ListingDetails;
