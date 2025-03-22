import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import WhatWeDo from './pages/WhatWeDo';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import CommunityEngagement from './pages/CommunityEngagement';
import ContactUs from './pages/ContactUs';
import MembershipDonation from './pages/MembershipDonation';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import AdminEvents from "./pages/AdminEvents";


function App() {
    return (
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/AboutUs" element={<AboutUs/>}/>
          <Route path="/WhatWeDO" element={<WhatWeDo/>}/>
          <Route path="/Events" element={<Events/>}/>
          <Route path="/Gallery" element={<Gallery/>}/>
          <Route path="/CommunityEngagement" element={<CommunityEngagement/>}/>
          <Route path="/ContactUs" element={<ContactUs/>}/>
          <Route path="/MembershipDonation" element={<MembershipDonation/>}/>
          <Route path="/Login" element={<Login/>} />
          <Route path="/Register" element={<Register/>} />
          <Route path="/dashboard" element={
          <PrivateRoute> <Dashboard /> </PrivateRoute>} />
          <Route path="/Admin/Events" element={<AdminEvents />} />

        </Routes>
      </Router>
    );

};

export default App;
