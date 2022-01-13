import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './css/main.css';

import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/home/Home';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/login/Login';
import Signup from './pages/sign-up/Signup';
import ForgotPassword from './pages/forgot-password/ForgotPassword';
import Profile from './pages/profile/Profile';
import CreateListing from './pages/create-listing/CreateListing';
import ListingDetails from './pages/listing-details/ListingDetails';
import MyListings from './pages/MyListings';
import EditListing from './pages/edit-listing/EditListing';
import Category from './pages/category/Category';
import SavedListings from './pages/SavedListings';
import Messages from './pages/Messages';

import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  return (
    <div className="App font-sans">
      <FavoritesProvider>
        <Router>
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
        </Router>
      </FavoritesProvider>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
