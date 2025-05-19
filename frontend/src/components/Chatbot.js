import React, { useState } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isFAQVisible, setIsFAQVisible] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);

  const faqs = [
    { question: 'What services do you offer?', answer: 'We offer events, weekly programs,  hall bookings, hairstyle, and support.' },
    { question: 'Where are you located?', answer: 'Hobart, Tasmania.' },
    { question: 'What are your opening hours?', answer: 'We’re open 9AM–5PM, Mon–Fri.' },
    { question: 'How can I contact you?', answer: 'You can contact us through email or phone. Check the contact section or bottom of  the website.' },
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
    setMessages(prev => [...prev, userMessage]);

    const faqAnswer = faqs.find(faq => faq.question.toLowerCase() === input.toLowerCase());

    if (faqAnswer) {
      setMessages(prev => [...prev, userMessage, { sender: 'bot', text: faqAnswer.answer }]);
    } else {
      setMessages(prev => [...prev, userMessage, { sender: 'bot', text: "I don't have an answer for this question. Please contact us at 04424242424 for more information." }]);
    }

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
    <div style={styles.container}>
      {/* Chat Button + Curved Text */}
      {!isOpen && (
        <div style={styles.buttonWrapper}>
          <svg width="120" height="120" viewBox="0 0 120 120" style={styles.curvedSvg}>
            <defs>
              <path id="curve" d="M 20,60 a 40,40 0 1,1 80,0" fill="transparent" />
            </defs>
            <text width="100%">
              <textPath
                xlinkHref="#curve"
                startOffset="50%"
                textAnchor="middle"
                style={{ fill: '#9370DB', fontSize: '15px', fontWeight: 'bold' }}
              >
                👋 Here we are!!
              </textPath>
            </text>
          </svg>
          <button onClick={toggleChat} style={styles.chatButton}>💬</button>
        </div>
      )}

      {/* Chatbox */}
      {isOpen && (
        <div style={styles.chatBox}>
          <div style={styles.header}>
            Hi 👋 How can I assist you?
            <button onClick={toggleChat} style={styles.closeBtn}>×</button>
          </div>

          {/* FAQ toggle button */}
          <div style={{ textAlign: 'right', padding: '10px 10px' }}>
            <button onClick={toggleFAQ} style={styles.faqToggle}>FAQ</button>
          </div>

          {/* Chat messages */}
          <div style={styles.messages}>
            {messages.map((msg, i) => (
              <div key={i} style={msg.sender === 'user' ? styles.userMsg : styles.botMsg}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* FAQ section (compact) */}
          {isFAQVisible && (
            <div style={styles.faqContainer}>
              <div style={styles.faqHeader}>Frequently Asked Questions:</div>
              {faqs.map((faq, i) => (
                <button key={i} onClick={() => handleFAQSelection(faq)} style={styles.faqButton}>
                  {faq.question}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={styles.inputRow}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me something..."
              style={styles.input}
            />
            <button onClick={handleSend} style={styles.sendBtn}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    bottom: 20,
    right: 20,
    fontFamily: 'Arial, sans-serif',
    
  },
  chatBox: {
    width: 300,
    height: 430,
    backgroundColor: '#fff',
    borderRadius: 15,
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    marginBottom: 10,
  },
  header: {
    backgroundColor: '#E6E6FA',
    padding: '10px 15px',
    fontWeight: 'bold',
    fontSize: 15,
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    right: 10,
    top: 5,
    background: 'transparent',
    border: 'none',
    fontSize: 20,
    cursor: 'pointer',
  },
  messages: {
    flex: 1,
    padding: 10,
    overflowY: 'auto',
    backgroundColor: '#fafafa',
  },
  userMsg: {
    textAlign: 'right',
    backgroundColor: '#D1E7DD',
    margin: '4px 0',
    padding: 8,
    borderRadius: 6,
  },
  botMsg: {
    textAlign: 'left',
    backgroundColor: '#F8D7DA',
    margin: '4px 0',
    padding: 8,
    borderRadius: 6,
  },
  faqToggle: {
    backgroundColor: '#9370DB',
    color: 'white',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  faqContainer: {
    padding: '10px',
    backgroundColor: '#f4f4f4',
    borderTop: '1px solid #ccc',
    maxHeight: '100px',
    overflowY: 'auto',
  },
  faqHeader: {
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  faqButton: {
    backgroundColor: '#E6E6FA',
    color: '#333',
    padding: '6px 10px',
    borderRadius: '6px',
    border: 'none',
    margin: '5px 0',
    width: '100%',
    cursor: 'pointer',
    textAlign: 'left',
  },
  inputRow: {
    display: 'flex',
    padding: 10,
    borderTop: '1px solid #eee',
  },
  input: {
    flex: 1,
    padding: 8,
    borderRadius: 6,
    border: '1px solid #ccc',
    marginRight: 8,
  },
  sendBtn: {
    backgroundColor: '#9370DB',
    color: '#fff',
    padding: '8px 12px',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  },
  buttonWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100, 
  },
  
  curvedSvg: {
    position: 'absolute',
    bottom: 15, 
    left: '50%',
    transform: 'translateX(-50%)',
    pointerEvents: 'none',
  },
  
  chatButton: {
    backgroundColor: '#9b30ff',
    color: '#fff',
    fontSize: 22,
    width: 55,
    height: 55,
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
    position: 'relative',
    zIndex: 10,
    marginTop: -10,
  },
};

export default Chatbot;
