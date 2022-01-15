import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './css/main.css';

import Footer from './components/Footer';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import ScrollToTop from './components/ScrollToTop';
import Loader from './components/Loader';
const Home = React.lazy(() => import('./pages/home/Home'));
const Login = React.lazy(() => import('./pages/login/Login'));
const Signup = React.lazy(() => import('./pages/sign-up/Signup'));
const ForgotPassword = React.lazy(() => import('./pages/forgot-password/ForgotPassword'));
const Profile = React.lazy(() => import('./pages/profile/Profile'));
const CreateListing = React.lazy(() => import('./pages/create-listing/CreateListing'));
const ListingDetails = React.lazy(() => import('./pages/listing-details/ListingDetails'));
const MyListings = React.lazy(() => import('./pages/MyListings'));
const EditListing = React.lazy(() => import('./pages/edit-listing/EditListing'));
const Category = React.lazy(() => import('./pages/category/Category'));
const SavedListings = React.lazy(() => import('./pages/SavedListings'));
const Messages = React.lazy(() => import('./pages/Messages'));

import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  return (
    <div className="App font-sans">
      <FavoritesProvider>
        <Router>
          <Suspense fallback={<Loader />}>
            <ScrollToTop>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/profile" element={<PrivateRoute />}>
                  <Route path="/profile" element={<Profile />} />
                </Route>
                <Route path="/create-listing" element={<PrivateRoute />}>
                  <Route path="/create-listing" element={<CreateListing />} />
                </Route>
                <Route path="/listing/:listingId" element={<ListingDetails />} />
                <Route path="/my-listings" element={<PrivateRoute />}>
                  <Route path="/my-listings" element={<MyListings />} />
                </Route>
                <Route path="/edit-listing/:listingId" element={<PrivateRoute />}>
                  <Route path="/edit-listing/:listingId" element={<EditListing />} />
                </Route>
                <Route path="/favorites" element={<PrivateRoute />}>
                  <Route path="/favorites" element={<SavedListings />} />
                </Route>
                <Route path="/messages" element={<PrivateRoute />}>
                  <Route path="/messages" element={<Messages />} />
                </Route>
                <Route path="/category/:categoryName" element={<Category />} />
              </Routes>
              <Footer />
            </ScrollToTop>
          </Suspense>
        </Router>
      </FavoritesProvider>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
