import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import WhatWeDo from './pages/CommunityEngagement';
import Events from './pages/ContactUs';
import Gallery from './pages/Events';
import CommunityEngagement from './pages/Gallery';
import ContactUs from './pages/MembershipDonation';
import MembershipDonation from './pages/WhatWeDo';
import Header from './components/Header';

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
        </Routes>
      </Router>
    );

};

export default App;
