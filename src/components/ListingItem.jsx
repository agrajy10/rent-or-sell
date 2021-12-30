import listingFeaturedImage from '../assets/images/hero-section-bg.jpg';
import { ReactComponent as BedroomIcon } from '../assets/svg/bed.svg';
import { ReactComponent as BathroomIcon } from '../assets/svg/bathtub.svg';
import { ReactComponent as CarIcon } from '../assets/svg/car.svg';
import { ReactComponent as RulerIcon } from '../assets/svg/ruler.svg';

function ListingItem() {
  return (
    <>
      <div className="card shadow-2xl relative">
        <span className="bg-primary px-4 py-1 text-white text-md font-semibold absolute top-6 right-6 rounded-md">
          $4,000
        </span>
        <figure className="h-72 w-full">
          <img
            src={listingFeaturedImage}
            alt="Listing title"
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="card-body text-center p-4 md:p-8">
          <p className="text-sm mb-3">19 Crescent drive, Rohtesay</p>
          <h2 className="card-title text-gray-900">Modern house</h2>
          <div className="flex items-center justify-center flex-wrap gap-x-6 gap-y-2 font-bold text-[0.75rem] text-gray-900">
            <span className="relative pl-8 min-h-[2.5rem] leading-[2.5rem]">
              <BedroomIcon
                width="26px"
                height="26px"
                className="absolute top-1/2 left-0 -translate-y-1/2"
              />
              2
            </span>
            <span className="relative pl-8 min-h-[2.5rem] leading-[2.5rem]">
              <BathroomIcon
                width="26px"
                height="26px"
                className="absolute top-1/2 left-0 -translate-y-1/2"
              />
              2
            </span>
            <span className="relative pl-8 min-h-[2.5rem] leading-[2.5rem]">
              <CarIcon
                width="26px"
                height="26px"
                className="absolute top-1/2 left-0 -translate-y-1/2"
              />
              2
            </span>
            <span className="relative pl-8 min-h-[2.5rem] leading-[2.5rem]">
              <RulerIcon
                width="26px"
                height="26px"
                className="absolute top-1/2 left-0 -translate-y-1/2"
              />
              2,400 SQFT
            </span>
          </div>
          <div className="card-actions">
            <button className="btn btn-primary btn-block mx-0">More info</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListingItem;
