import { useState, useEffect } from "react";

import styles from "../css/TTS.module.css";

const TTS = ({ text, isLight }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);

  console.log(text);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    console.log("play");
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    }

    synth.speak(utterance);

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
  };

  return (
    <div className={styles.TTSDiv}>
      <button
        className={isLight ? styles.ButtonNightMode : styles.ButtonLightMode}
        onClick={handlePlay}
      >
        {isPaused ? "Resume" : "Play"}
      </button>
      <button
        className={isLight ? styles.ButtonNightMode : styles.ButtonLightMode}
        onClick={handlePause}
      >
        Pause
      </button>
      <button
        className={isLight ? styles.ButtonNightMode : styles.ButtonLightMode}
        onClick={handleStop}
      >
        Stop
      </button>
    </div>
  );
};

export default TTS;
