import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function ListingGallery({ imgUrls, title }) {
  return (
    <Swiper
      autoHeight={true}
      slidesPerView={1}
      pagination={{ clickable: true }}
      className="listing-gallery-carousel">
      {imgUrls.map((imageURL, index) => (
        <SwiperSlide key={index}>
          <img src={imageURL} className="w-full" alt={`${title} image ${index + 1}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ListingGallery;
