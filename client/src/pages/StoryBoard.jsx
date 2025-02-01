import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";

import {
  readStory,
  translateText,
  translateWord,
} from "../actions/sessionActions";
import { submitWordInteraction } from "../actions/authActions";

import Footer from "../components/Footer";
import { Choices } from "../components/Choices";
import ChaptersNav from "../components/ChaptersNav";
import Story from "../components/Story";
import StoryNav from "../components/StoryNav";
import WordPopup from "../components/WordPopup";

import Back from "../assets/back.png";
import Theme from "../assets/themes.png";
import Dark from "../assets/dark.png";
import Sample1 from "../assets/sample1.png";

import styles from "../css/StoryBoard.module.css";
import StoryHistory from "../components/StoryHistory";
import LoadingScreen from "../pages/LoadingScreen";

function StoryBoard({ readStory }) {
  const { storyId } = useParams();
  const dispatch = useDispatch();

  const [showPopup, setShowPopup] = useState(false);
  const [selectedWord, setSelectedWord] = useState("");

  const [openNav, setOpenNav] = useState(true);
  const handleNavClick = () => {
    setOpenNav(!openNav);
  };

  const [isLight, setIsLight] = useState(false);
  const handleThemeClick = () => {
    setIsLight(!isLight);
  };

  const [filteredHistory, setFilteredHistory] = useState([]);
  const history = useSelector((state) => state.session.history);
  const scenarioHistory = useSelector((state) => state.session.scenarioHistory);

  const [indexClicked, setIndexClicked] = useState(-1);
  const handlePageClick = (index) => {
    setIndexClicked(index);
  };
  useEffect(() => {
    if (history.length > 0) {
      const filtered = history.filter((item) => item.role === "model");
      setFilteredHistory(filtered);
    }
  }, [history]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStory = async () => {
      setLoading(true); // Show the loading GIF
      await readStory({ storyId });
      setLoading(false); // Hide the loading GIF once the story is loaded
    };

    loadStory();
  }, []);

  const [fontSize, setFontSize] = useState(2);

  const handleIncreaseFontSize = () => {
    setFontSize((prevFontSize) => prevFontSize + 1);
  };

  const handleDecreaseFontSize = () => {
    setFontSize((prevFontSize) => Math.max(prevFontSize - 1, 1));
  };

  if (fontSize === 4 || fontSize <= 0) {
    setFontSize(1);
  }

  const handleWordClick = (word) => {
    setSelectedWord(word);
    setShowPopup(true);
  };

  useEffect(() => {
    dispatch(translateText(selectedWord, "tl"));
    dispatch(translateWord(selectedWord, "tl"));
    fetchDefinition();
    dispatch(
      submitWordInteraction(selectedWord.replace(/^[^\w]+|[^\w]+$/g, ""))
    );
  }, [selectedWord]);

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const fetchDefinition = async () => {
    const word = selectedWord.replace(/^[^\w]+|[^\w]+$/g, "");

    if (!word.trim()) {
      setError("Please enter a word to search.");
      return;
    }

    try {
      setError("");

      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );

      if (!response.ok) {
        setResult(null);
        setError("Word not found");
        return;
      }

      const data = await response.json();
      setResult(data[0]);
      setError("");
    } catch {
      setResult(null);
      setError("Something went wrong");
    }
  };

  const handleCloseClick = () => {
    setShowPopup(false);
  };

  return loading ? (
    <LoadingScreen />
  ) : (
    <div className={isLight ? styles.StoryBoard2 : styles.StoryBoard}>
      {indexClicked === -1 || indexClicked === filteredHistory.length - 1 ? (
        <div className={styles.StoryBoard_inner}>
          <StoryNav
            openNav={openNav}
            handleNavClick={handleNavClick}
            isLight={isLight}
            handleThemeClick={handleThemeClick}
            handleIncreaseFontSize={handleIncreaseFontSize}
            handleDecreaseFontSize={handleDecreaseFontSize}
          />
          <Story
            isLight={isLight}
            openNav={openNav}
            handleNavClick={handleNavClick}
            fontSize={fontSize}
            handleWordClick={handleWordClick}
          />
        </div>
      ) : (
        <StoryHistory
          openNav={openNav}
          handleNavClick={handleNavClick}
          narrative={filteredHistory[indexClicked]}
          narrativeImage={scenarioHistory[indexClicked - 1]}
        />
      )}
      {showPopup ? (
        <WordPopup
          selectedWord={selectedWord}
          result={result}
          error={error}
          handleCloseClick={handleCloseClick}
        />
      ) : null}
      {openNav ? null : (
        <ChaptersNav
          openNav={openNav}
          handleNavClick={handleNavClick}
          filteredHistory={filteredHistory}
          handlePageClick={handlePageClick}
        />
      )}
    </div>
  );
}

const mapDispatchToProps = {
  readStory,
};

export default connect(null, mapDispatchToProps)(StoryBoard);
