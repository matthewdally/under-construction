import React, { useEffect, useState } from 'react'
import axios from 'axios';

import './App.css';

function App() {
  const defColor = '#c8c8c8';
  const defURL = 'https://www.pexels.com';
  const [avgColor, setAvgColor] = useState(defColor);
  const [photoURL, setPhotoURL] = useState(defURL);

  useEffect(() => {
    getBackground();
  }, [])

  const getBackground = () => {
    const pexelsApi = axios.create({
        baseURL: 'https://api.pexels.com/v1/',
        headers: {
          'Accept': "application/json",
          'Content-Type': "application/json",
          'Authorization': `${process.env.REACT_APP_PEXELS_API}`
        },
    });

    pexelsApi.get('search?query=nature&orientation=landscape&size=small').then(response => { 
      const { photos } = response.data;
      const randImg = Math.floor(Math.random() * 11);
      const selPhoto = photos[randImg];
      const bg = selPhoto?.src?.landscape ?? 'none';
      
      setAvgColor(selPhoto?.avg_color ?? defColor);
      setPhotoURL(selPhoto?.url ?? defURL);

      const body = document.getElementById('underconstruction');
      body.style.backgroundImage = 'url(' + bg + ')';
      body.style.backgroundSize = 'cover';
      body.style.backgroundColor = 'initial';
    });
  }

  return (
    <div className="App">
      <header className="App-header" id='underconstruction'>
        <div className="App-title" style={{ backgroundColor: avgColor }}>
          Under Construction
          <p style={{ fontSize: 'smaller'}}>
            This website is currently under construction and will be available soon.
          </p>
          <p style={{ fontSize: 'small'}}>
            <a href={photoURL} style={{ color: 'white', float: 'right' }} target="_blank" rel="noreferrer">Photos provided by Pexels</a>
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;
