import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Home from "./components/pages/Home";
import Tour from "./components/pages/Tour";
import Footer from "./components/pages/Footer";
import Loader from './components/common/Loader';
import ErrorBoundary from './components/common/ErrorBoundary';

const SignUp = lazy(() => import("./components/pages/SignUp"));
const Profile = lazy(() => import("./components/pages/Profile"));
const PrivateRoute = lazy(() => import("./components/common/PrivateRoute"));
const ContactUs = lazy(() => import("./components/pages/ContactUs"));
const Tours = lazy(() => import("./components/pages/Tours"));
const AboutUs = lazy(() => import("./components/pages/AboutUs"));
const CreateTour = lazy(() => import("./components/layout/CreateTour"));
const EditTour = lazy(() => import("./components/layout/EditTour"));
const Dashboard = lazy(() => import('./components/pages/Dashboard'));
const PrivacyPolicy = lazy(() => import("./components/layout/PrivacyPolicy"));
const AdminRoute = lazy(() => import("./components/common/AdminRoute"));
const MyBookings = lazy(() => import("./components/pages/MyBookings"));
const NotFound = lazy(() => import('./components/pages/NotFound'));
const DashboardHome = lazy(() => import("./components/layout/DashboardHome"));
const DashboardContacts = lazy(() => import("./components/layout/DashboardContacts"));
const DashboardBookings = lazy(() => import("./components/layout/DashboardBookings"));
const DashboardReviews = lazy(() => import("./components/layout/DashboardReviews"));
const DashboardTours = lazy(() => import("./components/layout/DashboardTours"));
const DashboardUsers = lazy(() => import("./components/layout/DashboardUsers"));
const SignIn = lazy(() => import("./components/pages/SignIn"));
const ForgotPassword = lazy(() => import("./components/common/ForgotPassword"));
const ResetPassword = lazy(() => import("./components/common/ResetPassword"));
const EditUser = lazy(() => import("./components/layout/EditUser"));
const EditReview = lazy(() => import("./components/layout/EditReview"));
const ReplyContact = lazy(() => import("./components/common/ReplyContact"));



function App() {


  return (
    <BrowserRouter>
      <header >
        <Header />
      </header>
      <main className='min-h-[80vh]'>

        <ErrorBoundary>
          <Suspense fallback={<Loader />}>

            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/sign-in' element={<SignIn />} />
              <Route path='/sign-up' element={<SignUp />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/reset-password/:token' element={<ResetPassword />} />

              <Route path='/about-us' element={<AboutUs />} />
              <Route path='/contact-us' element={<ContactUs />} />
              <Route path='/privacy-policy' element={<PrivacyPolicy />} />
              <Route path='/tours' element={<Tours />} />
              <Route path='/tour-overview/:tourSlug' element={<Tour />} />

              <Route element={<PrivateRoute />}>
                <Route path='/profile' element={<Profile />} />
                <Route path='/my-bookings' element={<MyBookings />} />
              </Route>

              <Route element={<AdminRoute />}>
                <Route path="/dashboard/*" element={<Dashboard />}>
                  <Route index element={<DashboardHome />} />
                  <Route path="create-tour" element={<CreateTour />} />
                  <Route path="edit-tour/:tourId" element={<EditTour />} />
                  <Route path="edit-user/:userId" element={<EditUser />} />
                  <Route path="edit-review/:reviewId" element={<EditReview />} />
                  <Route path="reply-contact/:contactId" element={<ReplyContact />} />

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

          </Suspense>
        </ErrorBoundary>

      </main>
      <footer className="bg-white shadow dark:bg-gray-900">
        <Footer />
      </footer>
    </BrowserRouter >
  );
}

export default App;
