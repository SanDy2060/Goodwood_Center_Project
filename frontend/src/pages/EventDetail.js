// frontend/src/pages/EventDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const EventDetails = () => {
  const [event, setEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const { id } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error("Error fetching event:", err);
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setFormData(prev => ({
          ...prev,
          name: decoded.name || "",
          email: decoded.email || ""
        }));
      } catch (e) {
        console.error("Invalid token");
      }
    }

    fetchEvent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/event/register", {
        ...formData,
        eventTitle: event.title
      });
      setShowForm(false);
      setTimeout(() => {
        alert("Thanks! Your registration was successful.");
      }, 300);

    } catch (err) {
      console.error(err);
      alert("Failed to submit registration.");
    }
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className="event-details-container">
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Price:</strong> ${event.price}</p>
      {event.image && <img src={`http://localhost:8000${event.image}`} alt={event.title} />}
      <button onClick={() => setShowForm(true)} className="join-button">Join Event</button>

      {/* Join Form Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-form">
            <h2>Register for {event.title}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <textarea
                placeholder="Message (optional)"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default EventDetails;
