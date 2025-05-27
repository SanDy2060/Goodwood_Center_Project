import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminHalls = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    openingTime: "",
    closingTime: "",
    image: null,
  });
  const [halls, setHalls] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchHalls();
  }, []);

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

  return (
    <div className="admin-halls">
      <h2>Create a Hall</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Hall Name" required />
        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
        <label>Opening Time</label>
        <input type="time" name="openingTime" value={formData.openingTime} onChange={handleChange} required />
        <label>Closing Time</label>
        <input type="time" name="closingTime" value={formData.closingTime} onChange={handleChange} required />
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        <button type="submit">Create Hall</button>
      </form>

      <h2>All Halls</h2>
      {halls.map(hall => (
        <div key={hall._id}>
          <h3>{hall.name}</h3>
          <p>{hall.location}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminHalls;
