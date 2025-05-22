import React, { useState } from "react";
import "../styles/contactUs.css";
import axios from "axios";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [statusMsg, setStatusMsg] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/contact", formData);
      if (response.status === 200) {
        setStatusMsg("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setStatusMsg("Failed to send message. Please try again.");
      }
    } catch (error) {
      setStatusMsg("An error occurred. Please try again later.");
    }

    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 8000); // auto close popup after 8 seconds
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
  <div
    style={{
      position: "fixed",
      top: 0,
      width: "100%",
      zIndex: 9999,
      backgroundColor: statusMsg.includes("successfully") ? "#d4edda" : "#f8d7da",
      color: statusMsg.includes("successfully") ? "#155724" : "#721c24",
      padding: "15px",
      textAlign: "center",
      borderBottom: "2px solid",
      borderColor: statusMsg.includes("successfully") ? "#c3e6cb" : "#f5c6cb",
    }}
  >
    {statusMsg}
    <button
      onClick={closePopup}
      style={{
        marginLeft: "20px",
        background: "transparent",
        border: "none",
        fontWeight: "bold",
        cursor: "pointer",
        color: "inherit",
      }}
    >
      &times;
    </button>
  </div>
)}


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
          <br />
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
        </div>

        <div className="contact-right">
          
          
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Your Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="name">Your Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="phone">Phone Number *</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <label htmlFor="subject">Subject *</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
            ></textarea>

            <button type="submit" className="contact-submit-btn">Send</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
