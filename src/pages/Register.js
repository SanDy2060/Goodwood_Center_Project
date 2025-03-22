import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:8000/api/auth/register", form);
      alert("Registered successfully! Please log in.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center">Sign Up</h2>
        <p className="text-center text-gray-500 mt-2">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log In</Link>
        </p>

        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              required
              className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
              className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
              className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none p-2"
            />
          </div>

          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
