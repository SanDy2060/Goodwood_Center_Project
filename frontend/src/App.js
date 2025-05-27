import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import WhatWeDo from './pages/WhatWeDo';
import Events from './pages/Events';
import CommunityEngagement from './pages/CommunityEngagement';
import ContactUs from './pages/ContactUs';
import MembershipDonation from './pages/MembershipDonation';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import AdminEvents from "./pages/AdminEvents";
import Footer from './components/Footer';
import EventDetails from './pages/EventDetail';
import AdminServices from './pages/AdminServices';
import ServiceDetail from './pages/ServiceDetail';
import AdminHalls from './pages/AdminHalls';
import HallList from './pages/HallList';
import HallDetail from './pages/HallDetail';
import Chatbot from './components/Chatbot';
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Router>
      <div id='root'>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/WhatWeDO" element={<WhatWeDo />} />
        <Route path="/service/:id" element={<ServiceDetail />} />
        <Route path="/admin/services" element={<PrivateRoute><AdminServices /></PrivateRoute>} />
        <Route path="/Events" element={<Events />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/CommunityEngagement" element={<CommunityEngagement />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/MembershipDonation" element={<MembershipDonation />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
        <Route path="/admin/events" element={<AdminEvents />} />
        <Route path="/halls" element={<HallList />} />
        <Route path="/halls/:id" element={<HallDetail />} />
        <Route path="/admin/halls" element={<PrivateRoute><AdminHalls /></PrivateRoute>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
      <Chatbot />
      <Footer />
      </div>
    </Router>
    
  );
}

export default App;
