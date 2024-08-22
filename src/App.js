import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import './App.css';

function App() {
  const [apod, setApod] = useState(null);

  useEffect(() => {
    axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
      .then(response => {
        setApod(response.data);
      })
      .catch(error => {
        console.error("Error fetching the APOD", error);
      });
  }, []);

  const handleDownload = () => {
    saveAs(apod.url, apod.title);
  };

  return (
    <div className="App">
      <div className="intro-section">
        <h1>As a kid I wanted to be an astronaut.</h1>
      </div>
      <div className="apod-section">
        {apod ? (
          <>
            <h2>{apod.title}</h2>
            {apod.copyright ? (
              <p>Today's content is copyrighted and cannot be displayed or downloaded.</p>
            ) : (
              apod.media_type === 'image' ? (
                <>
                  <img src={apod.url} alt={apod.title} />
                  <div className="download-buttons">
                    <button onClick={handleDownload} className="download-button">
                      Download Image
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <iframe
                    title="space-video"
                    src={apod.url}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <div className="download-buttons">
                    <button onClick={handleDownload} className="download-button">
                      Download Video
                    </button>
                  </div>
                </>
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
