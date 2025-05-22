import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../styles/whatWeDo.css";

// Helper function to translate text
const translateText = async (text, targetLang = "en") => {
  try {
    const res = await axios.post("https://libretranslate.de/translate", {
      q: text,
      source: "en",
      target: targetLang,
      format: "text",
    }, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data.translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    return text;
  }
};

const WhatWeDo = () => {
  const [services, setServices] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/services");
        setServices(res.data);
      } catch (err) {
        console.error("Failed to load services:", err);
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserRole(decoded.role || (decoded.isAdmin ? "admin" : "user"));
    }

    fetchServices();
  }, []);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="what-we-do-page">
      <h1 className="section-title">What We Do</h1>

      {/* Admin-only Add button */}
      {userRole === "admin" && (
        <div className="text-center mb-4">
          <Link to="/admin/services" className="add-event-button">
            Add or Remove Services
          </Link>
        </div>
      )}

      {/* Language Selector */}
      <div className="language-selector">
        <label className="language-label">Translate to:</label>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="language-dropdown"
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="hi">Hindi</option>
          <option value="zh">Chinese</option>
        </select>
      </div>

      {/* Service List */}
      <div className="services-grid">
        {services.map((service) => (
          <ServiceCard
            key={service._id}
            service={service}
            language={language}
            userRole={userRole}
          />
        ))}
      </div>

          <div className="service-card">
      <div className="service-image">
        <img src="/hall_preview.jpg" alt="Hall Hire" />
      </div>
      <div className="service-info">
        <h3 className="service-title">Hire a Hall</h3>
        <p className="service-description">
          Need a venue for your event? Explore our bookable community halls — perfect for meetings, parties, and gatherings.
        </p>
        <Link to="/halls" className="join-button">View Available Halls</Link>
      </div>
    </div>
    </div>    
  );
};

// Component to render each service with translation
const ServiceCard = ({ service, language, userRole }) => {
  const [translatedDesc, setTranslatedDesc] = useState(service.description);

  useEffect(() => {
    const translate = async () => {
      if (language === "en") {
        setTranslatedDesc(service.description);
      } else {
        const translated = await translateText(service.description, language);
        setTranslatedDesc(translated);
      }
    };

    translate();
  }, [service.description, language]);

  return (
    <div className="service-card">
      {service.image && (
        <img
          src={`http://localhost:8000${service.image}`}
          alt={service.name}
          className="service-image"
        />
      )}
      <div className="service-info">
        <h3 className="service-title">{service.name}</h3>
        <p className="service-description">{translatedDesc}</p>
        <p className="service-day"><strong>Day:</strong> {service.dayOfWeek}</p>
        <p className="service-time"><strong>Time:</strong> {service.startTime} – {service.endTime}</p>
        {service.maxSpots && (
          <p className="service-spots"><strong>Limited Spots:</strong> {service.maxSpots}</p>
        )}
        {userRole === "admin" && (
          <p className="admin-label">(Admin View Only — delete handled in admin page)</p>
        )}
        <Link to={`/service/${service._id}`} className="join-button">
            View Details
            </Link>
      </div>
    </div>
  );


};

export default WhatWeDo;
