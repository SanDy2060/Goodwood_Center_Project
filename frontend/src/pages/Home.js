import React from "react";
import "../styles/home.css"; // Make sure this file has all your styles

const Home = () => {
    return (
        <div className="container">

            {/* Welcome Section */}
            <section className="welcome">
                <div className="welcome-row">
                    <h1 className="welcome-title">Welcome to Goodwood Community Centre</h1>
                </div>

                <div className="image-container">
                    {/* Adjust the image path or import it */}
                    <img src="/WL.jpg" alt="Community Centre" />
                </div>

                <p className="description">
                    Discover a hub of activity and warmth at our community centre. Building a strong and united community 
                    through events, programs, and services. Join us in creating a vibrant and inclusive community space for all.
                </p>
            </section>

            </div>

            
    
    );
};

export default Home;
