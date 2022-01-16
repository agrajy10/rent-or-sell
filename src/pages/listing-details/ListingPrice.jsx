import { formatPrice } from '../../utils/utils';

function ListingPrice({ regularPrice, type }) {
  return (
    <p className="font-bold text-gray-900 text-[2.2rem] md:text-[2.5rem] pb-6 mb-6 border-b border-b-gray-300">
      {formatPrice(regularPrice)}
      {type === 'rent' ? '/month' : null}
    </p>
  );
}

export default ListingPrice;
