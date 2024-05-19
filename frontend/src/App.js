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
import Dashboard from './components/pages/Dashboard';
import Tour from "./components/pages/Tour";
import Footer from "./components/pages/Footer";
import PrivacyPolicy from "./components/layout/PrivacyPolicy";
import AdminRoute from "./components/common/AdminRoute";
import MyBookings from "./components/pages/MyBookings";
import NotFound from './components/pages/NotFound';
import DashboardHome from "./components/layout/DashboardHome";
import DashboardContacts from "./components/layout/DashboardContacts";
import DashboardBookings from "./components/layout/DashboardBookings";
import DashboardReviews from "./components/layout/DashboardReviews";
import DashboardTours from "./components/layout/DashboardTours";
import DashboardUsers from "./components/layout/DashboardUsers";

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

            <Route path="/dashboard/*" element={<Dashboard />}>
              <Route index element={<DashboardHome />} />
              <Route path="home" index element={<DashboardHome />} />
              <Route path="tours" element={<DashboardTours />} />
              <Route path="users" element={<DashboardUsers />} />
              <Route path="bookings" element={<DashboardBookings />} />
              <Route path="reviews" element={<DashboardReviews />} />
              <Route path="contacts" element={<DashboardContacts />} />
            </Route>
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
