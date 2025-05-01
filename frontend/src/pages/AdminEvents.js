import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState({ title: "", description: "", date: "", location: "" });
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
    if (image) formData.append("image", image);

    try {
      const res = await axios.post("http://localhost:8000/api/events", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Event created!");
      setEvents([...events, res.data]);  // Include the event data including image
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

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!isAdmin) return null;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Add New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6" encType="multipart/form-data">
        <input type="text" placeholder="Title" required className="border p-2 w-full"
          onChange={e => setEvent({ ...event, title: e.target.value })} />
        <textarea placeholder="Description" className="border p-2 w-full"
          onChange={e => setEvent({ ...event, description: e.target.value })} />
        <input type="date" required className="border p-2 w-full"
          onChange={e => setEvent({ ...event, date: e.target.value })} />
        <input type="text" placeholder="Location" className="border p-2 w-full"
          onChange={e => setEvent({ ...event, location: e.target.value })} />

        {/* Image input */}
        <input type="file" accept="image/*" className="border p-2 w-full"
          onChange={(e) => setImage(e.target.files[0])} />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Event
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Existing Events</h2>
      {events.map(ev => (
        <div key={ev._id} className="border p-4 mb-3 rounded shadow-sm">
          <h3 className="font-bold">{ev.title}</h3>
          <p>{ev.description}</p>
          <p>Date: {new Date(ev.date).toLocaleDateString()}</p>
          <p>Location: {ev.location}</p>
          
          {/* Conditionally render the image using the correct field */}
          {ev.image && (
            <img 
              src={`http://localhost:8000${ev.image}`} 
              alt={ev.title} 
              className="w-64 mt-2 rounded" 
            />
          )}
          
          <button
            onClick={() => deleteEvent(ev._id)}
            className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminEvents;
