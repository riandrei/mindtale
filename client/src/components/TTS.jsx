import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { translateText } from "../actions/sessionActions";

import styles from "../css/TTS.module.css";

const TTS = ({ text, isLight }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [currentCaption, setCurrentCaption] = useState("");
  const [ccEnabled, setCCEnabled] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const synth = window.speechSynthesis;

    const fetchData = async () => {
      const translatedText = await dispatch(translateText(text, "tl"));

      const u = new SpeechSynthesisUtterance(text);

      // Split text into sentences or phrases for captions
      const sentences = translatedText?.split(/(?<=[.?!])\s+/);
      console.log(translatedText);

      let sentenceIndex = -1;

      u.onboundary = (event) => {
        // When a word boundary is hit, update the current caption
        console.log(event.name);
        if (event.name === "sentence") {
          sentenceIndex++;

          setCurrentCaption(sentences[sentenceIndex]);
        }
      };

      u.onend = () => {
        setCurrentCaption(""); // Clear the caption when the speech ends
      };

      setUtterance(u);
    };

    fetchData();

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    } else {
      synth.speak(utterance);
    }

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
    setCurrentCaption(""); // Clear captions when stopped
  };

  const handleCCClick = () => {
    setCCEnabled(!ccEnabled);
  };

  return (
    <div className={styles.TTSDiv}>
      <div>
        {ccEnabled && (
          <p className={isLight ? styles.CaptionsLight : styles.CaptionsNight}>
            {currentCaption}
          </p>
        )}{" "}
        {/* Display the current caption */}
      </div>
      <button
        className={
          isLight
            ? ccEnabled
              ? styles.ButtonLightMode // Filled style for light mode when cc is enabled
              : styles.ButtonNotFilledLightMode // Not filled style for light mode when cc is not enabled
            : ccEnabled
            ? styles.ButtonNightMode // Filled style for dark mode when cc is enabled
            : styles.ButtonNotFilledNightMode
        }
        onClick={handleCCClick}
      >
        CC
      </button>
      <button
        className={isLight ? styles.ButtonLightMode : styles.ButtonNightMode}
        onClick={handlePlay}
      >
        {isPaused ? "Resume" : "Play"}
      </button>
      <button
        className={isLight ? styles.ButtonLightMode : styles.ButtonNightMode}
        onClick={handlePause}
      >
        Pause
      </button>
      <button
        className={isLight ? styles.ButtonLightMode : styles.ButtonNightMode}
        onClick={handleStop}
      >
        Stop
      </button>
    </div>
  );
};

export default TTS;
