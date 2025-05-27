import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/adminEvents.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AdminHalls = () => {
  const [halls, setHalls] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    openingTime: "",
    closingTime: "",
    image: null,
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return navigate("/login");
    try {
      const decoded = jwtDecode(token);
      if (decoded.role === "admin") {
        setIsAdmin(true);
        fetchHalls();
      } else {
        navigate("/");
      }
    } catch {
      navigate("/login");
    }
  }, [navigate, token]);

  const fetchHalls = async () => {
    const res = await axios.get("http://localhost:8000/api/halls");
    setHalls(res.data);
  };

  const handleChange = (e) => {
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

    await axios.post("http://localhost:8000/api/halls", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Hall created");
    setFormData({
      name: "",
      location: "",
      description: "",
      openingTime: "",
      closingTime: "",
      image: null,
    });

    fetchHalls();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this hall?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/halls/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchHalls();
      alert("Hall deleted");
    } catch (err) {
      alert("Failed to delete hall");
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="admin-events-container">
      <div className="admin-event-form-container">
        <h2 className="admin-heading">Add New Hall</h2>
        <form onSubmit={handleSubmit} className="admin-event-form">
          <input name="name" placeholder="Hall Name" onChange={handleChange} className="input-field" required />
          <input name="location" placeholder="Location" onChange={handleChange} className="input-field" required />
          <textarea name="description" placeholder="Description" onChange={handleChange} className="input-field" />
          <input name="openingTime" type="time" onChange={handleChange} className="input-field" required />
          <input name="closingTime" type="time" onChange={handleChange} className="input-field" required />
          <input type="number" name="price" placeholder="Price like" value={formData.price} onChange={handleChange} required />
          <input type="file" name="image" accept="image/*" onChange={handleChange} className="input-field" />
          <button type="submit" className="submit-button">Create Hall</button>
        </form>
      </div>

      <h2 className="admin-heading">Existing Halls</h2>
      <div className="admin-events-list">
        {halls.map((hall) => (
          <div key={hall._id} className="event-card">
            <div className="event-image">
              {hall.image && <img src={`http://localhost:8000${hall.image}`} alt={hall.name} className="event-img" />}
            </div>
            <div className="event-info">
              <h3 className="event-title">{hall.name}</h3>
              <p className="event-description">{hall.description}</p>
              <p className="event-date"><strong>Time:</strong> {hall.openingTime} – {hall.closingTime}</p>
              <p className="event-location"><strong>Location:</strong> {hall.location}</p>
              <button onClick={() => handleDelete(hall._id)} className="delete-button">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHalls;
