import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../styles/header.css";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
    window.location.reload(); // Refresh to re-render the nav state
  };

  return (
    <header className="navbar">
      <div className="navbar-content" style={{ display: "flex", alignItems: "center" }}>
        <div className="logo">
          <img src="/Logo.png" alt="Goodwood Community Centre" />
          <div className="logo-text">Goodwood Community Centre</div>
        </div>

        <div
          className="language-and-login"
          style={{ display: "flex", flexDirection: "column", marginLeft: "auto", marginRight: "20px" }}
        >
          <div className="language-selector" style={{ marginBottom: "8px" }}>
            <select defaultValue="en">
              <option value="en">EN</option>
              <option value="es">ES</option>
              <option value="fr">FR</option>
            </select>
          </div>

          <div className="login-register-wrapper">
            {isLoggedIn ? (
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <div className="nav-dropdown">
                <button className="dropdown-label-button">Login ▾</button>
                <div className="dropdown-menu">
                  <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
                    Log In
                  </NavLink>
                  <NavLink to="/register" className={({ isActive }) => (isActive ? "active" : "")}>
                    Register
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="search-bar" style={{ marginLeft: "20px" }}>
          <span className="material-symbols-outlined"></span>
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
        <NavLink to="/aboutUs" className={({ isActive }) => (isActive ? "active" : "")}>About Us</NavLink>
        <NavLink to="/whatWeDo" className={({ isActive }) => (isActive ? "active" : "")}>What We Do</NavLink>
        <NavLink to="/events" className={({ isActive }) => (isActive ? "active" : "")}>Events</NavLink>
        <NavLink to="/gallery" className={({ isActive }) => (isActive ? "active" : "")}>Gallery</NavLink>
        <NavLink to="/communityEngagement" className={({ isActive }) => (isActive ? "active" : "")}>Community Engagement</NavLink>
        <NavLink to="/contactUs" className={({ isActive }) => (isActive ? "active" : "")}>Contact Us</NavLink>
        <NavLink to="/membershipDonation" className={({ isActive }) => (isActive ? "active" : "")}>Membership & Donation</NavLink>
      </div>
    </header>
  );
};

export default Header;
