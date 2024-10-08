import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [apod, setApod] = useState(null);
  const [rateLimit, setRateLimit] = useState(null);

  const [date, setDate] = useState(() => {
    const estDate = new Date().toLocaleDateString("en-US", { 
      timeZone: "America/New_York", 
      year: "numeric", 
      month: "2-digit", 
      day: "2-digit" 
    });
  
    const [month, day, year] = estDate.split("/");
    return `${year}-${month}-${day}`;
  });

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  useEffect(() => {
    axios.get(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${date}`)
      .then(response => {
        setApod(response.data);
        setRateLimit({
          limit: response.headers['x-ratelimit-limit'],
          remaining: response.headers['x-ratelimit-remaining']
        });
      })
      .catch(error => {
        console.error("Error fetching the APOD", error);
      });
  }, [date]);

  return (
    <div className="App">
      {rateLimit && (
        <div className="rate-limit-box">
          <h3>Rate Limit</h3>
          <div className="rate-limit-table">
            <p>Limit:</p>
            <p>{rateLimit.limit}</p>
            <p>Remaining:</p>
            <p>{rateLimit.remaining}</p>
          </div>
        </div>
      )}
      <div className="project-info">
        <h1>NASA APOD Viewer</h1>
        <p>NASA's Astronomy Picture of the Day (APOD) program showcases breathtaking images of the universe daily, often accompanied by a brief explanation from a professional astronomer. I've created a user interface that allows you to explore these images. Note that copyrighted images are not displayed in order to avoid wrongful use of copyrighted material. </p>
      </div>
      <div className="apod-section">
        {apod ? (
          <>
            <div className="header">
              <h2>{apod.title}</h2>
              <input 
                type="date" 
                value={date} 
                onChange={handleDateChange} 
                className="date-picker"
              />
            </div>
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
      <div className="quote-section">
        <h1>Exploration is wired into our brains. If we can see the horizon, we want to know what’s beyond.</h1>
        <cite>- Buzz Aldrin</cite>
      </div>
    </div>
  );
}

export default App;
