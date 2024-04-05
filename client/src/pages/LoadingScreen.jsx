import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/LoadingScreen.module.css';
import Quotes from '../components/Quotes';

import Back from '../assets/back.png'
import Loading from '../assets/loading.png';
import Logo from '../assets/mindtale.png';

function LoadingScreen() {
  const getRandomQuote = () => Quotes[Math.floor(Math.random() * Quotes.length)];

  const [randomQuote, setRandomQuote] = useState(getRandomQuote);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRandomQuote(getRandomQuote);
    }, 6500); 

    return () => clearTimeout(timer);
  }, [randomQuote]);

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }

  return (
    <div className={styles.Loading}>
      <div className={styles.up}>
        <img title="Return" src={Back} alt="Return" onClick={goBack}/>
        <img title="Loading..." src={Loading} alt="Loading" />
      </div>
      <div></div>
      <img src={Logo} alt="Logo" />
      <div className={styles.quote}>
        <p>"{randomQuote.text}"</p>
        <p>{randomQuote.person}</p>
      </div>
    </div>
  );
}

export default LoadingScreen;
