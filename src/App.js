import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [apod, setApod] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  useEffect(() => {
    axios.get(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${date}`)
      .then(response => {
        setApod(response.data);
      })
      .catch(error => {
        console.error("Error fetching the APOD", error);
      });
  }, [date]);

  return (
    <div className="App">
      <div className="intro-section">
        <h1>As a kid I wanted to be an astronaut.</h1>
      </div>
      <div className="apod-section">
        <input 
          type="date" 
          value={date} 
          onChange={handleDateChange} 
          className="date-picker"
        />
        {apod ? (
          <>
            <h2>{apod.title}</h2>
            {apod.copyright ? (
              <p>Today's content is copyrighted and cannot be displayed or downloaded.</p>
            ) : (
              apod.media_type === 'image' ? (
                <img src={apod.url} alt={apod.title} />
              ) : (
                <iframe
                  title="space-video"
                  src={apod.url}
                  allow="fullscreen"
                  allowFullScreen
                ></iframe>
              )
            )}
            <p>{apod.explanation}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default App;
