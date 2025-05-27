import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import "../styles/serviceDetail.css"; 

const ServiceDetail = () => {
  const [service, setService] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const { id } = useParams();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/services/${id}`);
        setService(res.data);
      } catch (err) {
        console.error("Error fetching service:", err);
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

    fetchService();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8000/api/services/${id}/register`, {
        ...formData
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      setShowForm(false);
      setTimeout(() => {
        alert("Thanks! You have successfully registered for the service.");
      }, 300);

    } catch (err) {
      console.error("Failed to register for service:", err);
      alert(err.response?.data?.msg || "Failed to submit registration.");
    }
  };

  if (!service) return <div>Loading...</div>;

  const spotsLeft = service.maxSpots ? service.maxSpots - (service.registrations?.length || 0) : null;

  return (
    <div className="event-details-container">
      <h1>{service.name}</h1>
      <p>{service.description}</p>
      <p><strong>Day:</strong> {service.dayOfWeek}</p>
      <p><strong>Time:</strong> {service.startTime} – {service.endTime}</p>
      {service.price > 0 && (<p><strong>Price:</strong> ${service.price} per hour</p>)}
      {service.maxSpots && <p><strong>Max Spots:</strong> {service.maxSpots}</p>}
      {service.image && (
  <img
    src={`http://localhost:8000${service.image}`}
    alt={service.name}
  />
)}

      {/* Spots Available or Join Button */}
      {spotsLeft !== null && spotsLeft <= 0 ? (
        <p className="full-booked-msg">This service is fully booked.</p>
      ) : (
        <button onClick={() => setShowForm(true)} className="join-button">Join Service</button>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-form">
            <h2>Register for {service.name}</h2>
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

export default ServiceDetail;
