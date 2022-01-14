import { useContext } from 'react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
import { v4 as uuidv4 } from 'uuid';

import ListingItem from './ListingItem';
import ListingItemSkeleton from '../skeletons/ListingItemSkeleton';

import { FavoritesContext } from '../context/FavoritesContext';

function ListingsCarousel({ listings, loading, ...rest }) {
  const { checkFavorite } = useContext(FavoritesContext);
  return (
    <Swiper {...rest}>
      {loading &&
        listings.map((item) => (
          <SwiperSlide key={uuidv4()} className="px-1 py-4">
            <ListingItemSkeleton />
          </SwiperSlide>
        ))}
      {!loading &&
        listings.map(({ docID, data }) => (
          <SwiperSlide key={docID} className="px-1 py-4">
            <ListingItem {...data} docID={docID} isFavorite={checkFavorite(docID)} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}

export default ListingsCarousel;
