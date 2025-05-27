import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/hallDetail.css"; // ✅ add this line

const HallDetail = () => {
  const { id } = useParams();
  const [hall, setHall] = useState(null);
  const [date, setDate] = useState("");
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    startTime: "",
    endTime: "",
    message: ""
  });

  useEffect(() => {
    const fetchHall = async () => {
      const res = await axios.get(`http://localhost:8000/api/halls/${id}`);
      setHall(res.data);
    };
    fetchHall();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBook = async () => {
    try {
      console.log("📤 Sending booking:", { ...formData, date });
      await axios.post(`http://localhost:8000/api/halls/${id}/book`, {
        ...formData,
        date,
      });
      alert("Booking successful!");
    } catch (err) {
      console.error("❌ Booking error:", err.response?.data || err.message);
      alert(err.response?.data?.msg || "Booking failed.");
    }
  };
  

  if (!hall) return <div>Loading...</div>;

  return (
    <div className="event-details-container">
      <h1>{hall.name}</h1>
      <p>{hall.description}</p>
      {hall.image && (
        <img
          src={`http://localhost:8000${hall.image}`}
          alt={hall.name}
        />
      )}
      <p><strong>Open:</strong> {hall.openingTime} – {hall.closingTime}</p>
      <p><strong>Price:</strong> ${hall.price} per hour</p>
      <h3>Book This Hall</h3>
      <div className="form-group">
        <input type="text" name="userName" placeholder="Your Name" onChange={handleChange} />
        <input type="email" name="userEmail" placeholder="Your Email" onChange={handleChange} />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="time" name="startTime" placeholder="Start Time" onChange={handleChange} />
        <input type="time" name="endTime" placeholder="End Time" onChange={handleChange} />
        <textarea name="message" placeholder="Message (optional)" onChange={handleChange} />
        <button onClick={handleBook} className="join-button">Book</button>
      </div>
    </div>
  );
};

export default HallDetail;
