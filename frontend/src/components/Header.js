import { NavLink } from "react-router-dom";
import React from "react";
import "../styles/header.css";

const Header = () => {
  return (
    <header className="navbar">
      <div className="navbar-content">
        <div className="logo">
          <img src="/Logo.png" alt="Goodwood Community Centre" />
          <div className="logo-text">Goodwood Community Centre</div>
        </div>

        {/* Language Selector on the same line */}
        <div className="language-selector">
          <select defaultValue="en">
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="fr">FR</option>
          </select>
        </div>
        
        {/* Search bar moved to the same row */}
        <div className="search-bar">
          <span className="material-symbols-outlined"></span>
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      {/* Navbar links */}
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
          Home
        </NavLink>
        <NavLink to="/aboutUs" className={({ isActive }) => isActive ? "active" : ""}>
          About Us
        </NavLink>
        <NavLink to="/whatWeDo" className={({ isActive }) => isActive ? "active" : ""}>
          What We Do
        </NavLink>
        <NavLink to="/events" className={({ isActive }) => isActive ? "active" : ""}>
          Events
        </NavLink>
        <NavLink to="/gallery" className={({ isActive }) => isActive ? "active" : ""}>
          Gallery
        </NavLink>
        <NavLink to="/communityEngagement" className={({ isActive }) => isActive ? "active" : ""}>
          Community Engagement
        </NavLink>
        <NavLink to="/contactUs" className={({ isActive }) => isActive ? "active" : ""}>
          Contact Us
        </NavLink>
        <NavLink to="/membershipDonation" className={({ isActive }) => isActive ? "active" : ""}>
          Membership & Donation
        </NavLink>
        <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>
          Log In
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
