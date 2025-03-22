import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
    return (
      <nav className="navbar">
        <h1 className="logo">Goodwood Community</h1>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/AboutUs"> About Us </Link></li>
          <li><Link to="/WhatWeDo">What We Do</Link></li>
          <li><Link to="/Events">Events</Link></li>
          <li><Link to="/Gallery">Gallery</Link></li>
          <li><Link to="/CommunityEngagement">Community Engagement</Link></li>
          <li><Link to="/ContactUs">Contact Us</Link></li>
          <li><Link to="/MembershipDonation">Membership & Donation</Link></li>
        </ul>
      </nav>
    );
};

export default Header;