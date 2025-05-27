import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  const [nextEvent, setNextEvent] = useState(null);
  const [upcomingServices, setUpcomingServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNextEvent();
    fetchServices();
  }, []);

  const fetchNextEvent = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/events/upcoming/next");
      setNextEvent(res.data);
    } catch (err) {
      console.error("Error fetching upcoming event:", err);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/services");
      const allServices = res.data;

      const dayMap = {
        sunday: 0,
        monday: 1,
        tuesday: 2,
        wednesday: 3,
        thursday: 4,
        friday: 5,
        saturday: 6,
      };

      const today = new Date().getDay();

      const upcoming = allServices
        .filter((service) => {
          const day = service.dayOfWeek?.toLowerCase();
          return dayMap[day] >= today;
        })
        .sort((a, b) => {
          return dayMap[a.dayOfWeek?.toLowerCase()] - dayMap[b.dayOfWeek?.toLowerCase()];
        })
        .slice(0, 2);

      setUpcomingServices(upcoming);
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="bg-blue-100 text-center py-10">
        <div className="container mx-auto px-4">
          <img
            src="/WL.jpg"
            alt="Welcome"
            className="mx-auto w-full max-w-4xl rounded shadow-lg mb-6"
          />
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome to Goodwood Community Centre
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Discover a hub of activity and warmth at our community centre. Engage in diverse
            programs and events that bring people together. Join us in creating a vibrant and
            inclusive space for all.
          </p>
        </div>
      </section>

      {/* Events & Programs Section */}
      <section className="bg-[#4975b9] text-white py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Events & Programs</h2>
          {nextEvent ? (
            <div className="event-grid">
              <div>
                <h3 className="text-2xl font-semibold">{nextEvent.title}</h3>
                <p className="text-sm text-white mt-2">
                  {new Date(nextEvent.date).toLocaleString()}
                </p>
                <p className="text-sm mt-1">{nextEvent.location}</p>
                <button
                  className="Join event button"
                  onClick={() => navigate(`/event/${nextEvent._id}`)}
                >
                  Join Event
                </button>
              </div>
              <div>
                <img
                  src={
                    nextEvent.image
                      ? `http://localhost:8000${nextEvent.image}`
                      : "/placeholder.jpg"
                  }
                  alt={nextEvent.title}
                  className="rounded shadow-lg"
                />
              </div>
            </div>
          ) : (
            <p>No upcoming events available.</p>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section className="services-news">
        <div className="services-content">
          <div className="services-text">
            <h2 className="section-title">Our Services</h2>
            <p className="services-description">
              Keep up with the latest events and activities happening at Goodwood Community Centre.
              Stay connected with us to be part of our community initiatives and projects.
            </p>
          </div>

          <div className="services-table-container">
            <table className="services-table">
              <thead>
                <tr>
                  <th>Program</th>
                  <th>Cost</th>
                  <th>Book Now</th>
                </tr>
              </thead>
              <tbody>
                {upcomingServices.map((service) => (
                  <tr key={service._id}>
                    <td>{service.name}</td>
                    <td>{service.price ? `$${service.price}` : "Free"}</td>
                    <td>
                      <button onClick={() => navigate(`/service/${service._id}`)}>
                        Book Now
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td>Hall Hire</td>
                  <td>$50/hr</td>
                  <td>
                    <button className="book-btn" onClick={() => navigate("/halls")}>
                      Book Now
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* News Section */}
        <div className="news-updates">
          <h2 className="news-title">News & Updates</h2>
          <p className="news-subtitle">Stay informed and engaged.</p>
          <div className="news-grid">
            <div className="news-item">
              <h3>Events</h3>
              <p className="news-heading">Upcoming Activities</p>
              <p>Join our latest community gatherings, celebrations, and local events happening at the center.</p>
            </div>
            <div className="news-item">
              <h3>Programs</h3>
              <p className="news-heading">Community Learning</p>
              <p>Explore a variety of educational and social programs designed to benefit all age groups.</p>
            </div>
            <div className="news-item">
              <h3>Workshops</h3>
              <p className="news-heading">Skill Development</p>
              <p>Participate in hands-on workshops covering different skills, crafts, and hobbies.</p>
            </div>
            <div className="news-item">
              <h3>Cultural Events</h3>
              <p className="news-heading">Celebrating Diversity</p>
              <p>Experience cultural performances, exhibitions, and activities representing diverse communities.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
