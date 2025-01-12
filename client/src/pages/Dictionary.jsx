import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "../css/Dictionary.module.css";

import Back from "../assets/back.png";
import Search from "../assets/search.png";
import Kid from "../assets/dictKid.png";
import Sound from "../assets/Sound.png";

import Nav from "../components/Nav";
import { translateWord } from "../actions/sessionActions";

const Dictionary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wordsStats = useSelector((state) => state.auth?.wordsStats);
  const [word, setWord] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noSearch, setNoSearch] = useState(true);
  const [randomWords, setRandomWords] = useState([]);

  // Utility function to get random words with 5 letters or more
  const getRandomWords = (pool, count) => {
    const filteredWords = pool
      .map((entry) => entry.word)
      .filter((word) => word.length >= 5);
    const shuffled = [...filteredWords].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleRandomWordClick = async (selectedWord) => {
    console.log(selectedWord);
    await handleSearch(selectedWord); // Pass the selected word directly to the search function
  };

  useEffect(() => {
    // Generate 5 random words when the component mounts
    if (wordsStats.length > 0) {
      setRandomWords(getRandomWords(wordsStats, 5));
    }
  }, [wordsStats]);

  const handleBackClick = () => navigate(-1);

  const handleSearch = async (searchWord = word) => {
    if (!searchWord.trim()) return;

    try {
      dispatch(translateWord(searchWord, "tl"));

      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`
      );
      if (!response.ok) throw new Error("Word not found");

      const data = await response.json();
      setSearchResults((prevResults) => [
        { word, result: data[0] },
        ...prevResults,
      ]);
    } catch (error) {
      console.error("Error fetching word:", error);
      setSearchResults((prevResults) => [
        { word, result: null },
        ...prevResults,
      ]);
    } finally {
      setNoSearch(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <div className={styles.Dictionary}>
      <div className={styles.dictNav}>
        <img
          onClick={handleBackClick}
          src={Back}
          className={styles.Back}
          alt="Back"
        />
        <span>Dictionary</span>
        <input
          type="text"
          placeholder="Search..."
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <img
          src={Search}
          className={styles.Search}
          alt="Search"
          onClick={handleSearch}
        />
      </div>

      {noSearch ? (
        <div className={styles.noSearch}>
          <img src={Kid} className={styles.Kid} alt="Kid" />
          <span>Pick some words you want to explore and learn!</span>
          <div className={styles.RandomWords}>
            {randomWords.map((randomWord, index) => (
              <button
                key={index}
                onClick={() => handleRandomWordClick(randomWord)}
                className={styles.RandomWordButton}
              >
                {capitalize(randomWord)}
              </button>
            ))}
          </div>
        </div>
      ) : (
        searchResults.map((entry, index) => (
          <SearchResult key={index} entry={entry} capitalize={capitalize} />
        ))
      )}
    </div>
  );
};

const SearchResult = ({ entry, capitalize }) => {
  const { word, result } = entry;
  const translatedWord = useSelector((state) => state.session.translatedWord);

  const playAudio = (audioUrl) => {
    if (audioUrl) {
      console.log("test");
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  return (
    <div className={styles.Word}>
      <div className={styles.Word_inner}>
        {result ? (
          <>
            <div className={styles.Word_top}>
              <div className={styles.Word_top_inner}>
                <span>{capitalize(result.word)}</span>
                <img
                  src={Sound}
                  alt="Sound"
                  onClick={() => playAudio(result.phonetics[0]?.audio || "")}
                />
              </div>
              <span className={styles.Speech}>
                {result.meanings[0]?.partOfSpeech || "N/A"}
              </span>
            </div>

            <span className={styles.Sentence}>
              {result.meanings[0]?.definitions[0]?.definition ||
                "Definition not available"}
            </span>

            <span>{`Tagalog Translation: ${translatedWord}`}</span>

            <div className={styles.Word_bot}>
              <div className={styles.Block}></div>
              <span>
                "
                {result.meanings[0]?.definitions[0]?.example ||
                  "No example available"}
                "
              </span>
            </div>
          </>
        ) : (
          <span>Sorry, no definition found for "{capitalize(word)}".</span>
        )}
      </div>
    </div>
  );
};

export default Dictionary;
