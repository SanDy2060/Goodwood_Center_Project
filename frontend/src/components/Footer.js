import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo on the far left */}
        <div className="logo">
          <img src="/Logo.png" alt="Goodwood Community Centre" />
        </div>

        {/* Contact Info */}
        <div className="footer-left">
          <h2>Goodwood Community Centre</h2>
          <p>62722560</p>
          <p>manager@gwcc.org.au</p>
        </div>

        {/* Hours & Location */}
        <div className="footer-center">
          <p>Monday to Friday</p>
          <p>9:00 am to 5:00 pm</p>
          <p>20 Acton Crescent</p>
          <p>Goodwood 7010</p>
        </div>

        {/* Social Icons */}
        <div className="footer-right">
          <h3>Follow us</h3>
          <div className="social-buttons">
            <a href="https://www.facebook.com/GoodwoodCommunityCentreTas" target="_blank" rel="noopener noreferrer">
              <img src="/facebook.webp" alt="Facebook" className="social-icon" />
            </a>
            <a href="https://www.instagram.com/goodwoodcommunitycentre/" target="_blank" rel="noopener noreferrer">
              <img src="/insta.png" alt="Instagram" className="social-icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
