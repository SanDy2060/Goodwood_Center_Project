import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';  
import { Link } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;
  const userRole = decoded?.role;

  useEffect(() => {
    axios.get("http://localhost:8000/api/events")
      .then(res => setEvents(res.data))
      .catch(err => console.log(err));
  }, []);

  const joinEvent = async (id) => {
    await axios.post(`http://localhost:8000/api/events/${id}/join`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert("Joined event!");
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
