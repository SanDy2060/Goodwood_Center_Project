import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
    return (
      <nav className="navbar">
        <h1 className="logo">Goodwood Community</h1>
        <ul className="nav-links">
          <li><Link to="/">home</Link></li>
          <li><Link to="/aboutUs"> aboutUs </Link></li>
          <li><Link to="/whatWeDo">whatWeDo</Link></li>
          <li><Link to="/events">events</Link></li>
          <li><Link to="/gallery">gallery</Link></li>
          <li><Link to="/communityEngagement">communityEngagement</Link></li>
          <li><Link to="/contactUs">contactUs</Link></li>
          <li><Link to="/membershipDonation">membershipDonation</Link></li>
        </ul>
      </nav>
    );
};

export default Header;