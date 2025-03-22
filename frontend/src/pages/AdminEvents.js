import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Corrected import!

const Events = () => {
  const [events, setEvents] = useState([]);
  const [userRole, setUserRole] = useState(null); // State for storing user role clearly

  useEffect(() => {
    // Load events from backend
    axios.get("http://localhost:8000/api/events")
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));

    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);
      setUserRole(decoded.role);
    } else {
      setUserRole(null); // explicitly set role to null if no token
    }
  }, []);

  const joinEvent = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must log in first!");
      return;
    }

    await axios.post(`http://localhost:8000/api/events/${id}/join`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert("Joined event!");
  };

  return (
    <div className="p-6">
      {/* 👇 Clearly Conditional rendering only for admins */}
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

      {events.map(event => (
        <div key={event._id} className="mb-4 p-4 border rounded">
          <h3 className="font-bold">{event.title}</h3>
          <p>{event.description}</p>
          <p>{new Date(event.date).toLocaleDateString()}</p>
          <p>Location: {event.location}</p>
          <button className="bg-green-500 text-white px-3 py-1 rounded"
            onClick={() => joinEvent(event._id)}>Join Event</button>
        </div>
      ))}
    </div>
  );
};

export default Events;
