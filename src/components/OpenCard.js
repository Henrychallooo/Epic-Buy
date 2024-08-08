import React, { useState } from 'react';
import './OpenCard.css';

const OpenCard = ({ isOpen, cardData, onClose }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [showComments, setShowComments] = useState(true);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim() !== '') {
      setComments([...comments, { username: 'User', content: comment }]);
      setComment('');
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className={`open-card-modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <div className="close-btn" onClick={onClose}>
          &times;
        </div>
        <div className="card-info">
          <img src={cardData.src} alt="Product Image" className="card-image" />
          <div className="card-details">
            <h2 className="card-title">{cardData.text}</h2>
            <p className="card-price">{cardData.price}</p>
            <p className="card-store">{cardData.store}</p>
            <div className="options">
              <select value={quantity} onChange={handleQuantityChange}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
              <select value={color} onChange={handleColorChange}>
                <option value="">Select Color</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
              </select>
              <select value={size} onChange={handleSizeChange}>
                <option value="">Select Size</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
              </select>
            </div>
            <div className="pay-button">
              <button className="add-to-pay-btn" onClick={() => alert('Added to Pay')}>
                Add to Pay
              </button>
            </div>
            <div className="contact-buttons">
              <button className="chat-icon">
                <i className="fas fa-comments"></i> Chat
              </button>
              <button className="call-icon">
                <i className="fas fa-phone"></i> Call
              </button>
            </div>
            <div className="description-comments">
              <h3 className="description-title">Description</h3>
              <p className="card-description">Description of the product goes here...</p>
              <div className="comments-title">
                <h3>Comments</h3>
                <button className="comments-toggle-btn" onClick={toggleComments}>
                  {showComments ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>}
                </button>
              </div>
              {showComments && (
                <ul className="comments-list">
                  {comments.map((comment, index) => (
                    <li key={index}>
                      <span className="comment-username">{comment.username}: </span>
                      <span className="comment-content">{comment.content}</span>
                    </li>
                  ))}
                </ul>
              )}
              <input
                type="text"
                placeholder="Add a comment..."
                value={comment}
                onChange={handleCommentChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenCard;
