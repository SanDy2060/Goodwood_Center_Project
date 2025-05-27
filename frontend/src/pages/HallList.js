import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../styles/hallList.css";

const HallList = () => {
  const [halls, setHalls] = useState([]);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchHalls = async () => {
      const res = await axios.get("http://localhost:8000/api/halls");
      setHalls(res.data);
    };

    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserRole(decoded.role || (decoded.isAdmin ? "admin" : "user"));
    }

    fetchHalls();
  }, []);

  return (
    <div className="hall-list-page">
      <h1>Available Halls</h1>

      {/* ✅ Admin-only Create Hall button */}
      {userRole === "admin" && (
        <div className="admin-hall-button-container">
          <Link to="/admin/halls">
            <button className="create-hall-button"> Manage Hall</button>
          </Link>
        </div>
      )}

      <div className="hall-grid">
        {halls.map(hall => (
          <div key={hall._id} className="hall-card">
            {hall.image && (
              <img
                src={`http://localhost:8000${hall.image}`}
                alt={hall.name}
                className="hall-image"
              />
            )}
            <h2>{hall.name}</h2>
            <p>{hall.location}</p>
            <Link to={`/halls/${hall._id}`} className="join-button">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HallList;
