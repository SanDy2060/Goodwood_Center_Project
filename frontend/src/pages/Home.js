import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="container">
            <h1 className="title">Welcome to Goodwood Community Services</h1>
            <p className="description">Empowering the community through service and support.</p>

        <div className="mt-6 space-x-4">
        <Link to="/Login">
        <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition">
            Login
        </button>
        </Link>
        <Link to="/Register">
        <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-800 transition">
            Register
        </button>
        </Link>
        </div>
        </div>
    );
};

export default Home;
