import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", form);
      localStorage.setItem("token", res.data.token); // Store JWT
      navigate("/dashboard"); // Redirect after login
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center">Log In</h2>
        <p className="text-center text-gray-500 mt-2">
          New to this site? <Link to="/register" className="text-blue-600 hover:underline">Sign Up</Link>
        </p>

        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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

          <div className="text-right">
            <Link to="/forgot-password" className="text-blue-600 hover:underline">Forgot password?</Link>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
