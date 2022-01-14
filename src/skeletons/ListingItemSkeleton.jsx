import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function ListingItemSkeleton() {
  return (
    <article className="card shadow-md card-bordered border-gray-200 relative">
      <figure className="h-72 w-full bg-[#ebebeb]">
        <Skeleton width={`100%`} height={288} />
      </figure>
      <div className="card-body text-center p-4 md:p-8">
        <Skeleton count={7} />
      </div>
    </article>
  );
}

export default ListingItemSkeleton;
