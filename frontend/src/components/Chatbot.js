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
    { question: 'Where are you located?', answer: 'Hobart, Tasmania.' },
    { question: 'What are your opening hours?', answer: 'We’re open 9AM–5PM, Mon–Fri.' },
    { question: 'How can I contact you?', answer: 'You can contact us through email or phone. Check the contact section or bottom of the website.' },
  ];

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && !hasGreeted) {
      setMessages([{ sender: 'bot', text: "I'm here to help! Choose an option below or type your question." }]);
      setHasGreeted(true);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    const faqAnswer = faqs.find(faq => faq.question.toLowerCase() === input.toLowerCase());

    setMessages(prev => [
      ...prev,
      userMessage,
      {
        sender: 'bot',
        text: faqAnswer
          ? faqAnswer.answer
          : "I don't have an answer for this question. Please contact us at 04424242424 for more information."
      }
    ]);

    setInput('');
    setIsFAQVisible(false);
  };

  const handleFAQSelection = (faq) => {
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: faq.question },
      { sender: 'bot', text: faq.answer }
    ]);
    setIsFAQVisible(false);
  };

  const toggleFAQ = () => setIsFAQVisible(!isFAQVisible);

  return (
    <div className="chatbot-container">
      {/* Launcher Button */}
      {!isOpen && (
        <div className="chat-button-wrapper">
          <svg width="120" height="120" viewBox="0 0 120 120" className="chat-curved-svg">
            <defs>
              <path id="curve" d="M 20,60 a 40,40 0 1,1 80,0" fill="transparent" />
            </defs>
            <text width="100%">
              <textPath xlinkHref="#curve" startOffset="50%" textAnchor="middle" className="chat-curved-text">
                👋 Here we are!!
              </textPath>
            </text>
          </svg>
          <button onClick={toggleChat} className="chat-launch-button">💬</button>
        </div>
      )}

      {/* Chatbox */}
      {isOpen && (
        <div className="chatbox">
          <div className="chat-header">
            Hi 👋 How can I assist you?
            <button onClick={toggleChat} className="chat-close-btn">×</button>
          </div>

          <div className="faq-toggle-container">
            <button onClick={toggleFAQ} className="chat-faq-toggle">FAQ</button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={msg.sender === 'user' ? 'chat-user-msg' : 'chat-bot-msg'}>
                {msg.text}
              </div>
            ))}
          </div>

          {isFAQVisible && (
            <div className="chat-faq-container">
              <div className="chat-faq-header">Frequently Asked Questions:</div>
              {faqs.map((faq, i) => (
                <button key={i} onClick={() => handleFAQSelection(faq)} className="chat-faq-button">
                  {faq.question}
                </button>
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
            <button onClick={handleSend} className="chat-send-btn">Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
