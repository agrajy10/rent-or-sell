import { formatPrice } from '../../utils/utils';

function ListingPrice({ discountPrice, onOffer, regularPrice, type }) {
  return (
    <>
      {onOffer && (
        <span className=" bg-rose-500 px-4 py-1 text-white text-sm font-semibold absolute top-4 right-4 rounded-md">
          On Offer
        </span>
      )}
      {onOffer ? (
        <p className="font-bold text-gray-900 text-[2.5rem] pb-6 mb-6 border-b border-b-gray-300 no-underline">
          <del className="block text-2xl text-gray-400 font-semibold">
            {formatPrice(regularPrice)}
            {type === 'rent' ? '/month' : null}
          </del>
          <ins className="no-underline">
            {formatPrice(discountPrice)}
            {type === 'rent' ? '/month' : null}
          </ins>
        </p>
      ) : (
        <p className="font-bold text-gray-900 text-[2.5rem] pb-6 mb-6 border-b border-b-gray-300">
          {formatPrice(regularPrice)}
          {type === 'rent' ? '/month' : null}
        </p>
      )}
    </>
  );
}

export default ListingPrice;
