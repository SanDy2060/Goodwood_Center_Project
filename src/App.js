// import logo from './logo.svg';
// import './App.css';
import {useEffect, useState } from 'react';


function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/')
      .then(response => response.text())
      .then(data => setMessage(data));
  }, []);


  return 
  <h1>Hi Sandesh</h1>;
}

export default App;
