import { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import ListingItem from '../../components/ListingItem';
import ListingItemSkeleton from '../../skeletons/ListingItemSkeleton';

import { FavoritesContext } from '../../context/FavoritesContext';

import useAbortableEffect from '../../hooks/useAbortableEffect';

import { getListingsByCategory, getFilteredListings } from './filterFunctions';

function Category() {
  const initalRender = useRef(true);
  const [sortBy, setSortBy] = useState('');
  const [data, setData] = useState({
    listings: [],
    loading: true,
    error: ''
  });

  const { checkFavorite } = useContext(FavoritesContext);

  const { categoryName } = useParams();

  useAbortableEffect(
    (status) => {
      document.title =
        categoryName === 'sale' ? 'For Sale | Rent or Sell' : 'For Rent | Rent or Sell';
      const getListingsData = async () => {
        const [data, error] = await getListingsByCategory(categoryName);
        if (!status.aborted) {
          setData({ listings: data, error, loading: false });
        }
      };
      getListingsData();
    },
    [categoryName]
  );

  useEffect(() => {
    if (!initalRender.current) {
      if (sortBy) {
        setData({ listings: [], error: '', loading: true });
        const filteredListingsData = async () => {
          const [data, error] = await getFilteredListings(categoryName, sortBy);
          setData({ listings: data, error, loading: false });
        };
        filteredListingsData();
      } else {
        getListingsByCategory();
      }
    } else {
      initalRender.current = false;
    }
  }, [sortBy]);

  const pageTitle = categoryName === 'sale' ? 'For Sale' : 'For Rent';
  const { loading, listings, error } = data;

  return (
    <main className="min-h-screen max-w-7xl px-3 mx-auto">
      <section className="lg:py-24 md:py-20 py-14">
        <div className="sm:flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-center sm:mb-0 mb-5">
            {pageTitle}
          </h1>
          <div className="flex items-center justify-start gap-5 flex-1 max-w-sm sm:mx-0 mx-auto">
            <label htmlFor="sortby" className="label flex-shrink-0 text-sm">
              Sort by
            </label>
            <select
              name="sortby"
              id="sortby"
              className="select select-bordered flex-1 font-medium"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}>
              <option value="">Default</option>
              <option value="price-asc">Price : Low to High</option>
              <option value="price-desc">Price : High to Low</option>
              <option value="bedrooms">Bedrooms</option>
              <option value="bathrooms">Bathrooms</option>
              <option value="carspace">Car space</option>
              <option value="listingSize">Area</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {loading &&
            Array(9)
              .fill()
              .map((item) => <ListingItemSkeleton key={uuidv4()} />)}
          {error && <p className="xl:col-span-3 md:col-span-2">{error}</p>}
          {listings.length > 0 &&
            listings.map(({ docID, data }) => {
              return (
                <ListingItem
                  key={docID}
                  docID={docID}
                  isFavorite={checkFavorite(docID)}
                  {...data}
                />
              );
            })}
        </div>
      </section>
    </main>
  );
}

export default Category;
