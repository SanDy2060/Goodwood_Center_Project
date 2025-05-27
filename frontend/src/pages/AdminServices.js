import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../styles/adminEvents.css";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dayOfWeek: "",
    startTime: "",
    endTime: "",
    maxSpots: "",
    price: "",
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
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
      fetchServices();
    } catch (err) {
      console.error("Token error:", err);
      navigate("/login");
    }
  }, [navigate, token]);

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/services");
      setServices(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load services:", err);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      if (formData[key]) data.append(key, formData[key]);
    }

    try {
      const res = await axios.post("http://localhost:8000/api/services", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Service added!");
      setFormData({
        name: "",
        description: "",
        dayOfWeek: "",
        startTime: "",
        endTime: "",
        maxSpots: "",
        price: "",
        image: null,
      });
      setServices([...services, res.data]);
    } catch (err) {
      console.error("Failed to add service:", err);
      alert("Failed to add service");
    }
  };

  const deleteService = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(services.filter(s => s._id !== id));
      alert("Service deleted");
    } catch (err) {
      console.error("Failed to delete service:", err);
      alert("Failed to delete service");
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (!isAdmin) return null;

  return (
    <div className="admin-events-container">
      <div className="admin-event-form-container">
        <h2 className="admin-heading">Add New Service</h2>
        <form onSubmit={handleSubmit} className="admin-event-form">
          <input type="text" name="name" placeholder="Service Name" value={formData.name} onChange={handleInputChange} className="input-field" required />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} className="input-field" />
          <input type="text" name="dayOfWeek" placeholder="Day (e.g., Monday)" value={formData.dayOfWeek} onChange={handleInputChange} className="input-field" required />
          <input type="time" name="startTime" value={formData.startTime} onChange={handleInputChange} className="input-field" required />
          <input type="time" name="endTime" value={formData.endTime} onChange={handleInputChange} className="input-field" required />
          <input type="number" name="maxSpots" placeholder="Max Spots (optional)" value={formData.maxSpots} onChange={handleInputChange} className="input-field" />
          <input type="number" name="price" placeholder="Price (optional)" value={formData.price} onChange={handleInputChange} className="input-field" />
          <input type="file" name="image" accept="image/*" onChange={handleInputChange} className="input-field" />
          <button type="submit" className="submit-button">Add Service</button>
        </form>
      </div>

      <h2 className="admin-heading">Current Services</h2>
      <div className="admin-events-list">
        {services.map((service) => (
          <div key={service._id} className="event-card">
            <div className="event-image">
              {service.image && (
                <img
                  src={`http://localhost:8000${service.image}`}
                  alt={service.name}
                  className="event-img"
                />
              )}
            </div>
            <div className="event-info">
              <h3 className="event-title">{service.name}</h3>
              <p className="event-description">{service.description}</p>
              <p className="event-date"><strong>Day:</strong> {service.dayOfWeek}</p>
              <p className="event-location"><strong>Time:</strong> {service.startTime} – {service.endTime}</p>
              {service.maxSpots && (
                <p className="event-price"><strong>Spots:</strong> {service.maxSpots}</p>
              )}
              {service.price && (
                <p className="event-price"><strong>Price: $</strong> ${service.price}</p>
              )}
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button onClick={() => deleteService(service._id)} className="delete-button">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminServices;
