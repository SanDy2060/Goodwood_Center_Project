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
  <h1>Hi my name is sandesh rai. I am doing cool stuff with Vs code.</h1>
}

export default App;
