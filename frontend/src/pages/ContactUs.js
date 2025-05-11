// src/pages/ContactUs.js
import React from "react";
import "../styles/contactUs.css";

const ContactUs = () => {
  return (
    <>
      <div className="contact-header">
        <h1>Contact Us</h1>
      </div>

      <div className="contact-wrapper">
        <div className="contact-left">
          <h2>Get in Touch Today</h2>
          <p>
            We're here to answer your questions and provide more information
            about our services. Reach out to us through the contact details.
          </p>

          <br></br>
          {
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2926.0587754757594!2d147.29214985000002!3d-42.82937225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xaa6e74b1f91b1a95%3A0x35236fcd85f5d352!2s20%20Acton%20Cres%2C%20Goodwood%20TAS%207010!5e0!3m2!1sen!2sau!4v1744378644673!5m2!1sen!2sau"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              ></iframe>
            }
          </div>

        <div className="contact-right">
          <form>
            <label htmlFor="email">Your Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              required
            />

            <label htmlFor="name">Your Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              required
            />

            <label htmlFor="phone">Phone Number *</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              required
            />

            <label htmlFor="subject">Subject *</label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Subject"
              required
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Leave a message here"
              rows="4"
            ></textarea>

            <button type="submit" className="contact-submit-btn">Send</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
