import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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
    <div className="p-6">
      {userRole === "admin" && (
        <div className="text-center mb-4">
          <Link
            to="/admin/events"
            className="inline-block bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
          >
            Add or Remove Events
          </Link>
        </div>
      )}

      {/* Language Selector */}
      <div className="mb-6">
        <label className="mr-2 font-medium">Translate to:</label>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="border p-2 rounded"
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
      {events.map((event) => (
        <EventCard key={event._id} event={event} language={language} joinEvent={joinEvent} />
      ))}
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
    <div className="mb-4 p-4 border rounded shadow-md bg-white">
      <h3 className="text-xl font-bold mb-1">{event.title}</h3>
      {/* Render image if available */}
      {event.image && (
        <img
          src={`http://localhost:8000${event.image}`}
          alt={event.title}
          className="w-full h-auto rounded mb-3"
        />
      )}
      <p className="mb-1">{translatedDesc}</p>
      <p className="text-sm text-gray-600 mb-1">{new Date(event.date).toLocaleDateString()}</p>
      <p className="text-sm text-gray-600 mb-2">Location: {event.location}</p>
      <button
        onClick={() => joinEvent(event._id)}
        className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
      >
        Join Event
      </button>
    </div>
  );
};

export default Events;
