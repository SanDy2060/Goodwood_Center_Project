import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../styles/adminEvents.css"; // Ensure the CSS is updated

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState({ title: "", description: "", date: "", location: "", price: 0 });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== "admin") {
        navigate("/");
        return;
      }
      setIsAdmin(true);

      axios.get("http://localhost:8000/api/events")
        .then(res => {
          setEvents(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error loading events", err);
          setLoading(false);
        });
    } catch (err) {
      console.error("Token decode error:", err);
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("title", event.title);
    formData.append("description", event.description);
    formData.append("date", event.date);
    formData.append("location", event.location);
    formData.append("price", event.price);
    if (image) formData.append("image", image);

    try {
      const res = await axios.post("http://localhost:8000/api/events", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Event created!");
      setEvents([...events, res.data]);
    } catch (err) {
      console.error("Error creating event:", err);
      alert("Failed to create event");
    }
  };

  const deleteEvent = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:8000/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(events.filter(event => event._id !== id));
      alert("Event deleted!");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete event");
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (!isAdmin) return null;

  return (
    <div className="admin-events-container">
      <div className="admin-event-form-container">
        <h2 className="admin-heading">Add New Event</h2>
        <form onSubmit={handleSubmit} className="admin-event-form">
          <input type="text" placeholder="Title" required className="input-field"
            onChange={e => setEvent({ ...event, title: e.target.value })} />
          <textarea placeholder="Description" className="input-field"
            onChange={e => setEvent({ ...event, description: e.target.value })} />
          <input type="date" required className="input-field"
            onChange={e => setEvent({ ...event, date: e.target.value })} />
          <input type="text" placeholder="Location" className="input-field"
            onChange={e => setEvent({ ...event, location: e.target.value })} />
          <input type="number" placeholder="Price" className="input-field"
            min="0" onChange={e => setEvent({ ...event, price: e.target.value })} />
          <input type="file" accept="image/*" className="input-field"
            onChange={(e) => setImage(e.target.files[0])} />
          <button type="submit" className="submit-button">Create Event</button>
        </form>
      </div>

      <h2 className="admin-heading">Existing Events</h2>
      <div className="admin-events-list">
        {events.map(ev => (
          <div key={ev._id} className="event-card">
            <div className="event-image">
              {ev.image && (
                <img 
                  src={`http://localhost:8000${ev.image}`} 
                  alt={ev.title} 
                  className="event-img" 
                />
              )}
            </div>
            <div className="event-info">
              <h3 className="event-title">{ev.title}</h3>
              <p className="event-description">{ev.description}</p>
              <p className="event-date">Date: {new Date(ev.date).toLocaleDateString()}</p>
              <p className="event-location">Location: {ev.location}</p>
              <p className="event-price">Price: {ev.price === 0 ? "Free" : `$${ev.price}`}</p>
              <button className="join-button">Join Event</button> {/* Added Join Button */}
              <button onClick={() => deleteEvent(ev._id)} className="delete-button">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminEvents;
