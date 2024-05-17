import Header from "./components/layout/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Profile from "./components/pages/Profile";
import Home from "./components/pages/Home";
import PrivateRoute from "./components/common/PrivateRoute";
import ContactUs from "./components/pages/ContactUs";
import Tours from "./components/pages/Tours";
import AboutUs from "./components/pages/AboutUs";
import CreateTour from "./components/pages/CreateTour";
import Dashboard from './components/layout/Dashboard';
import Tour from "./components/pages/Tour";
import Footer from "./components/pages/Footer";
import PrivacyPolicy from "./components/layout/PrivacyPolicy";
import AdminRoute from "./components/common/AdminRoute";
import MyBookings from "./components/pages/MyBookings";
import NotFound from './components/pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <header >
        <Header />
      </header>
      <main className='min-h-[80vh]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/contact-us/*' element={<ContactUs />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/tours' element={<Tours />} />
          <Route path='/tour-overview/:tourSlug' element={<Tour />} />
          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/my-bookings' element={<MyBookings />} />
          </Route>
          <Route element={<AdminRoute />}>
            <Route path="/create-tour" element={<CreateTour />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="bg-white shadow dark:bg-gray-900">
        <Footer />
      </footer>
    </BrowserRouter>


  );
}

export default App;
