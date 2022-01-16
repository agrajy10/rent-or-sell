import ListingPrice from './ListingPrice';

import { ReactComponent as BedroomIcon } from '../../assets/svg/bed.svg';
import { ReactComponent as BathroomIcon } from '../../assets/svg/bathtub.svg';
import { ReactComponent as CarIcon } from '../../assets/svg/car.svg';
import { ReactComponent as RulerIcon } from '../../assets/svg/ruler.svg';

function ListingInfoCard({ bathrooms, bedrooms, carspace, listingSize, regularPrice, type }) {
  return (
    <>
      <ListingPrice type={type} regularPrice={regularPrice} />
      <ul className="space-y-6">
        <li className="listing-info-list-item">
          <RulerIcon width="50px" height="50px" className="icon" />
          <span className="num">{listingSize}</span>
          <span className="lbl">Square footage</span>
        </li>
        <li className="listing-info-list-item">
          <BedroomIcon width="50px" height="50px" className="icon" />
          <span className="num">{bedrooms}</span>
          <span className="lbl">Number of bedrooms</span>
        </li>
        <li className="listing-info-list-item">
          <BathroomIcon width="50px" height="50px" className="icon" />
          <span className="num">{bathrooms}</span>
          <span className="lbl">Number of bahtrooms</span>
        </li>
        <li className="listing-info-list-item">
          <CarIcon width="50px" height="50px" className="icon" />
          <span className="num">{carspace}</span>
          <span className="lbl">Garage space</span>
        </li>
      </ul>
    </>
  );
}

export default ListingInfoCard;
