import React, { useEffect, useState } from "react";
import axios from "axios";
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
    image: null,
    type: "regular",
    hallSlots: [],
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/services");
      setServices(res.data);
    } catch (err) {
      console.error("Failed to load services:", err);
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

    try {
      const data = new FormData();
      for (let key in formData) {
        if (formData[key]) data.append(key, formData[key]);
      }

      await axios.post("http://localhost:8000/api/services", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setFormData({
        name: "",
        description: "",
        dayOfWeek: "",
        startTime: "",
        endTime: "",
        maxSpots: "",
        image: null,
      });

      fetchServices();
    } catch (err) {
      console.error("Failed to add service:", err);
    }
  };

  const deleteService = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/services/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchServices();
    } catch (err) {
      console.error("Failed to delete service:", err);
    }
  };

  return (
    <div className="admin-page">
      <h2>Add New Service</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <input type="text" name="name" placeholder="Service Name" value={formData.name} onChange={handleInputChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} />
        <input type="text" name="dayOfWeek" placeholder="Day (e.g., Monday)" value={formData.dayOfWeek} onChange={handleInputChange} required />
        <input type="time" name="startTime" value={formData.startTime} onChange={handleInputChange} required />
        <input type="time" name="endTime" value={formData.endTime} onChange={handleInputChange} required />
        <input type="number" name="maxSpots" placeholder="Max Spots (optional)" value={formData.maxSpots} onChange={handleInputChange} />
        <input type="file" name="image" accept="image/*" onChange={handleInputChange} />
        <button type="submit">Add Service</button>
      </form>

      <h2>Current Services</h2>
      <div className="admin-list">
        {services.map((service) => (
          <div key={service._id} className="admin-item">
            {service.image && <img src={`http://localhost:8000${service.image}`} alt={service.name} />}
            <div>
              <h3>{service.name}</h3>
              <p>{service.dayOfWeek}, {service.startTime} - {service.endTime}</p>
              <p>{service.description}</p>
              {service.maxSpots && <p>Spots: {service.maxSpots}</p>}
              <button onClick={() => deleteService(service._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminServices;
