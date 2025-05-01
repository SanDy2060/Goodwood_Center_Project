import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h2>Goodwood Community Centre</h2>
          <p>04424242424</p>
          <p>goodwCC@gmail.com</p>
        </div>

        <div className="footer-center">
          <p>Monday to Friday</p>
          <p>9:00 am to 5:00 pm</p>
          <p>Hobart, Tasmania</p>
        </div>

        <div className="logo">
          <img src="/Logo.png" alt="Goodwood Community Centre" />
          </div>

        <div className="footer-right">
          <h3>Follow us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
