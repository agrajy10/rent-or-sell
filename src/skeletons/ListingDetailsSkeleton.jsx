import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { v4 as uuidv4 } from 'uuid';

function ListingDetailsSkeleton() {
  return (
    <main>
      <Skeleton width={`100%`} height={640} />
      <article className="min-h-screen max-w-7xl px-3 mx-auto lg:py-24 md:py-20 py-14">
        <section className="lg:grid lg:grid-cols-[1fr_448px] lg:gap-9 lg:items-start">
          <div className="bg-white card card-bordered border-gray-300 max-w-md mb-8 lg:mb-0 -mt-40 md:-mt-48 lg:order-2 relative z-10">
            <div className="card-body relative">
              <p className="pb-6 mb-6 border-b border-b-gray-300 no-underline">
                <Skeleton width={`100%`} height={85} />
              </p>
              <ul className="space-y-6">
                {Array(4)
                  .fill()
                  .map((item) => (
                    <li key={uuidv4()} className="listing-info-list-item">
                      <Skeleton width={`100%`} height={35} />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="lg:order-1">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton count={4} />
            <Skeleton count={20} />
          </div>
        </section>
        <section className="lg:pt-24 md:pt-20 pt-14">
          <h2 className="text-gray-900 font-extrabold text-3xl mb-4">Gallery</h2>
          <Skeleton width={`100%`} height={640} />
        </section>
        <section className="lg:pt-24 md:pt-20 pt-14">
          <h2 className="text-gray-900 font-extrabold text-3xl mb-4">Location</h2>
          <div className="w-full h-[40rem]">
            <Skeleton width={`100%`} height={640} />
          </div>
        </section>
      </article>
    </main>
  );
}

export default ListingDetailsSkeleton;
