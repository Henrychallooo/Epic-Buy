import React from 'react';
import './ChatbotModal.css';
import Chatbot from './Chatbot';

function ChatbotModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="chatbot-header">
          <h1>Shopping Assistant</h1>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <Chatbot onClose={onClose} />
      </div>
    </div>
  );
}

export default ChatbotModal;
