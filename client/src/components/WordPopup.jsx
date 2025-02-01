import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../css/WordPopup.module.css";
import Sound from "../assets/Sound.png";
import Mini from "../assets/dictKid.png";

const WordPopup = ({ selectedWord, result, error, handleCloseClick }) => {
  const translatedWord = useSelector((state) => state.session.translatedWord);

  const getExampleSentence = () => {
    if (!result) return "No example available";

    for (const meaning of result.meanings) {
      for (const definition of meaning.definitions) {
        if (definition.example) {
          return definition.example;
        }
      }
    }
    return "No example available";
  };

  const playAudio = () => {
    if (result?.phonetics[0]?.audio) {
      const audio = new Audio(result.phonetics[0].audio);
      audio.play();
    } else {
      alert("Audio not available for this word");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchDefinition();
    }
  };

  return (
    <div className={styles.Terms}>
      <div className={styles.Terms_inner}>
        <div className={styles.Head}>
          <input
            type="text"
            placeholder="What word are you searching for?"
            value={selectedWord}
            onKeyDown={handleKeyDown}
          />
          <button>Search</button>
        </div>

        <div className={styles.Middle}>
          {result ? (
            <>
              <div className={styles.Middle_top}>
                <div className={styles.Middle_top_inner}>
                  <span>
                    {result.word.charAt(0).toUpperCase() + result.word.slice(1)}
                  </span>
                  {result.phonetics[0]?.audio && (
                    <img src={Sound} alt="Play sound" onClick={playAudio} />
                  )}
                </div>
                <span
                  style={{ color: "black" }}
                >{`Tagalog Translation: ${translatedWord}`}</span>
                <span className={styles.Speech}>
                  {result.meanings[0]?.partOfSpeech}
                </span>
              </div>

              <span className={styles.Middle_mid}>
                {result.meanings[0]?.definitions[0]?.definition}
              </span>

              <div className={styles.Middle_bot}>
                <div></div>
                <span>"{getExampleSentence()}"</span>
              </div>
            </>
          ) : (
            <div className={styles.Placeholder}>
              <img src={Mini} className={styles.Kid} />
              <span>{error || "Hello, MindTale reader!"}</span>
            </div>
          )}
        </div>

        <button className={styles.Close} onClick={handleCloseClick}>
          Close
        </button>
      </div>
    </div>
  );
};

export default WordPopup;
