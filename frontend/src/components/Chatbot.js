
import React, { useState } from 'react';
import '../styles/chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isFAQVisible, setIsFAQVisible] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);

  const faqs = [
    { question: 'What services do you offer?', answer: 'We offer events, weekly programs, hall bookings, hairstyle, and support.' },
    { question: 'Where are you located?', answer: 'Tasmania.' },
    { question: 'What are your opening hours?', answer: 'We’re open 9AM–5PM, Mon–Fri.' },
    { question: 'How can I contact you?', answer: 'You can contact us through the Contact Us page or call us at +1234567890.' },
  ];

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && !hasGreeted) {
      setMessages([{ sender: 'bot', text: "I'm here to help! Choose an FAQ or type your question." }]);
      setHasGreeted(true);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    const faqAnswer = faqs.find(faq => faq.question.toLowerCase() === input.toLowerCase());
    const botReply = faqAnswer 
      ? faqAnswer.answer 
      : "I'm not sure how to answer that. Please visit our Contact Us page or call us at +1234567890.";

    setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    setInput('');
    setIsFAQVisible(false);
  };

  const handleFAQSelection = (faq) => {
    const faqMessage = { sender: 'user', text: faq.question };
    const botAnswer = { sender: 'bot', text: faq.answer };
    setMessages(prev => [...prev, faqMessage, botAnswer]);
    setIsFAQVisible(false);
  };

  const toggleFAQ = () => setIsFAQVisible(!isFAQVisible);

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <div className="chatbot-button-wrapper">
          <svg width="120" height="120" viewBox="0 0 120 120" className="chatbot-curve-svg">
            <defs>
              <path id="curve" d="M 20,60 a 40,40 0 1,1 80,0" fill="transparent" />
            </defs>
            <text width="100%">
              <textPath xlinkHref="#curve" startOffset="50%" textAnchor="middle" className="curve-text">
                👋 Here we are!!
              </textPath>
            </text>
          </svg>
          <button onClick={toggleChat} className="chat-toggle-button">💬</button>
        </div>
      )}

      {isOpen && (
        <div className="chat-box">
          <div className="chat-header">
            Hi 👋 How can I assist you?
            <button onClick={toggleChat} className="chat-close-button">×</button>
          </div>

          <div className="faq-toggle-wrapper">
            <button onClick={toggleFAQ} className="faq-button">FAQ</button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={msg.sender === 'user' ? 'chat-msg user' : 'chat-msg bot'}>{msg.text}</div>
            ))}
          </div>

          {isFAQVisible && (
            <div className="faq-container">
              <div className="faq-header">Frequently Asked Questions:</div>
              {faqs.map((faq, i) => (
                <button key={i} onClick={() => handleFAQSelection(faq)} className="faq-option">{faq.question}</button>
              ))}
            </div>
          )}

          <div className="chat-input-row">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me something..."
              className="chat-input"
            />
            <button onClick={handleSend} className="chat-send-button">Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;