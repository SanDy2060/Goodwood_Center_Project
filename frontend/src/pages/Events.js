import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../styles/events.css"; 

// Helper function to translate text
const translateText = async (text, targetLang = "en") => {
  try {
    const res = await axios.post("https://libretranslate.de/translate", {
      q: text,
      source: "en",
      target: targetLang,
      format: "text",
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    return text; // fallback to original
  }
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/events");
        setEvents(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserRole(decoded.role);
    }

    fetchEvents();
  }, []);

  const joinEvent = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must log in first!");
      return;
    }

    try {
      await axios.post(`http://localhost:8000/api/events/${id}/join`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Joined event!");
    } catch (err) {
      console.error("Join error:", err);
    }
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="events-container">
      {userRole === "admin" && (
        <div className="text-center mb-4">
          <Link
            to="/admin/events"
            className="add-event-button"
          >
            Add or Remove Events
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

      {/* Display Events */}
      <div className="events-list">
        {events.map((event) => (
          <EventCard key={event._id} event={event} language={language} joinEvent={joinEvent} />
        ))}
      </div>
    </div>
  );
};

// Component to handle translated description and render image
const EventCard = ({ event, language, joinEvent }) => {
  const [translatedDesc, setTranslatedDesc] = useState(event.description);

  useEffect(() => {
    const fetchTranslation = async () => {
      if (language === "en") {
        setTranslatedDesc(event.description);
      } else {
        const translated = await translateText(event.description, language);
        setTranslatedDesc(translated);
      }
    };

    fetchTranslation();
  }, [event.description, language]);

  return (
    <div className="event-card">
      <div className="event-image">
        <img src={`http://localhost:8000${event.image}`} alt={event.title} />
      </div>
      <div className="event-info">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-description">{translatedDesc}</p>
        <p className="event-time">Duration: {event.duration} hr</p>
        <p className="event-cost">Cost: ${event.cost}</p>
        {/* Wrap the button with Link to navigate to the event details page */}
      <Link to={`/event/${event._id}`} className="join-button">
        View Event Details
      </Link>
      </div>
    </div>
  );
};

export default Events;
