import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

import { db } from '../../firebase.config';

export const getListingsByCategory = async (categoryName) => {
  if (categoryName !== 'sale' && categoryName !== 'rent') {
    return [[], 'Invalid category'];
  }
  try {
    const q = query(collection(db, 'listings'), where('type', '==', categoryName));
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
      return data.push({
        docID: doc.id,
        data: doc.data()
      });
    });
    return data.length ? [data, null] : [[], 'No listings found'];
  } catch (error) {
    return [[], error.message];
  }
};

export const getFilteredListings = async (categoryName, sortBy) => {
  if (categoryName !== 'sale' && categoryName !== 'rent') {
    return [[], 'Invalid category'];
  }
  try {
    const listingsRef = collection(db, 'listings');
    let q;
    if (sortBy === 'price-asc') {
      q = query(listingsRef, where('type', '==', categoryName), orderBy('regularPrice', 'asc'));
    } else if (sortBy === 'price-desc') {
      q = query(listingsRef, where('type', '==', categoryName), orderBy('regularPrice', 'desc'));
    } else {
      q = query(listingsRef, where('type', '==', categoryName), orderBy(sortBy, 'desc'));
    }
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
      return data.push({
        docID: doc.id,
        data: doc.data()
      });
    });
    return data.length ? [data, null] : [[], 'No listings found'];
  } catch (error) {
    return [[], error.message];
  }
};
