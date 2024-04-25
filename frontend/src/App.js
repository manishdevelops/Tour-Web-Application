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


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/tours' element={<Tours />} />
        <Route path='/tour-overview/:tourSlug' element={<Tour />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path="/create-tour" element={<CreateTour />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
