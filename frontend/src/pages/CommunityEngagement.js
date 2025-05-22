import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "../styles/communityEngagement.css";

const CommunityEngagement = () => {
  const [events, setEvents] = useState([]);
  const [expandedCommentBoxId, setExpandedCommentBoxId] = useState(null);
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
      setEvents(res.data);
    } catch (err) {
      console.error("Error loading events:", err);
    }
  };

  const toggleCommentBox = async (eventId) => {
    if (expandedCommentBoxId === eventId) {
      setExpandedCommentBoxId(null);
    } else {
      setExpandedCommentBoxId(eventId);
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
        { text: newComment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewComment("");
      toggleCommentBox(eventId); // refresh comments
    } catch (err) {
      console.error("Error submitting comment:", err);
    }
  };

  const deleteComment = async (commentId, eventId) => {
    try {
      await axios.delete(`http://localhost:8000/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toggleCommentBox(eventId); // refresh comments
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  return (
    <div className="community-page">
      <h1>Community Engagement</h1>
      {events.map((event) => (
        <div key={event._id} className="event-box">
          <h2>{event.title}</h2>
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
          <p><strong>Likes:</strong> {event.likes || 0}</p>

          <div className="action-buttons">
            <button onClick={() => handleLike(event._id)}>Like</button>
            <button onClick={() => toggleCommentBox(event._id)}>Comment</button>
          </div>

          {expandedCommentBoxId === event._id && (
            <div className="comments-section">
  <h4>Comments</h4>
  <ul className="comment-list">
    {comments[event._id]?.map((cmt) => (
      <li key={cmt._id} className="comment-item">
        <div className="comment-header">
          <span className="comment-author">{cmt.user.name}</span>
          {currentUser && (cmt.user._id === currentUser.id || cmt.user === currentUser.id) && (
            <button className="delete-btn" onClick={() => deleteComment(cmt._id, event._id)}>Delete</button>
          )}
        </div>
        <p className="comment-text">{cmt.text}</p>
      </li>
    ))}
  </ul>
  <div className="comment-input-section">
    <textarea
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
      placeholder="Write a comment..."
      className="comment-textarea"
    />
    <button onClick={() => submitComment(event._id)} className="submit-btn">Submit</button>
  </div>
</div>

          )}
        </div>
      ))}
    </div>
  );
};

export default CommunityEngagement;
