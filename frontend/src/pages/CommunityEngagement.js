import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "../styles/communityEngagement.css";

const CommunityEngagement = () => {
  const [events, setEvents] = useState([]);
  const [expandedEventId, setExpandedEventId] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setCurrentUser(decoded);
    }
    fetchCompletedEvents();
  }, [token]);

  const fetchCompletedEvents = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/events/completed");
      console.log("✅ Events fetched:", res.data);
      setEvents(res.data);
    } catch (err) {
      console.error("Error loading events:", err);
    }
  };

  const toggleExpand = async (eventId) => {
    if (expandedEventId === eventId) {
      setExpandedEventId(null);
    } else {
      setExpandedEventId(eventId);
      try {
        const res = await axios.get(`http://localhost:8000/api/events/${eventId}/comments`);
        setComments((prev) => ({ ...prev, [eventId]: res.data }));
      } catch (err) {
        console.error("Error loading comments:", err);
      }
    }
  };

  const handleLike = async (eventId) => {
    try {
      await axios.post(
        `http://localhost:8000/api/events/${eventId}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchCompletedEvents();
    } catch (err) {
      console.error("Error liking event:", err);
    }
  };

  const submitComment = async (eventId) => {
    try {
      await axios.post(
        `http://localhost:8000/api/events/${eventId}/comments`,
        {
          text: newComment,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewComment("");
      toggleExpand(eventId); // Refresh comments
    } catch (err) {
      console.error("Error submitting comment:", err);
    }
  };

  const deleteComment = async (commentId, eventId) => {
    try {
      await axios.delete(`http://localhost:8000/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toggleExpand(eventId); // Refresh comments
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  return (
    <div className="community-page">
      <h1>Community Engagement</h1>
      {events.map((event) => (
        <div key={event._id} className="event-box">
          <h2 onClick={() => toggleExpand(event._id)}>{event.title}</h2>
          <p>{new Date(event.date).toLocaleString()}</p>
          <p>{event.location}</p>

          {event.image && (
            <img
              src={`http://localhost:8000${event.image}`}
              alt={event.title}
              className="event-image"
            />
          )}

          <p>{event.description}</p>
          <p>
            <strong>Likes:</strong> {event.likes || 0}
          </p>
          <button onClick={() => handleLike(event._id)}>Like</button>

          {expandedEventId === event._id && (
            <div className="comments-section">
              <h4>Comments</h4>
              <ul>
                {comments[event._id]?.map((cmt) => (
                  <li key={cmt._id}>
                    <strong>{cmt.user.name}:</strong> {cmt.text}
                    {currentUser && cmt.user._id === currentUser.id && (
                      <button
                        onClick={() => deleteComment(cmt._id, event._id)}
                        style={{ marginLeft: "10px", color: "red" }}
                      >
                        Delete
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
              />
              <button onClick={() => submitComment(event._id)}>Submit</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommunityEngagement;
