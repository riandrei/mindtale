import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect, useSelector } from "react-redux";

import { readStory } from "../actions/sessionActions";

import Footer from "../components/Footer";
import { Choices } from "../components/Choices";
import ChaptersNav from "../components/ChaptersNav";
import Story from "../components/Story";
import StoryNav from "../components/StoryNav";

import Back from "../assets/back.png";
import Theme from "../assets/themes.png";
import Dark from "../assets/dark.png";
import Sample1 from "../assets/sample1.png";

import styles from "../css/StoryBoard.module.css";
import StoryHistory from "../components/StoryHistory";
import LoadingScreen from "../pages/LoadingScreen";

function StoryBoard({ readStory }) {
  const { storyId } = useParams();

  const [openNav, setOpenNav] = useState(true);
  const handleNavClick = () => {
    setOpenNav(!openNav);
  };

  const [isLight, setIsLight] = useState(false);
  const handleThemeClick = () => {
    setIsLight(!isLight);
    console.log("light");
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
      console.log(loading);
      setLoading(true); // Show the loading GIF
      await readStory({ storyId });
      setLoading(false); // Hide the loading GIF once the story is loaded
    };

    loadStory();
  }, []);

  const [fontSize, setFontSize] = useState(2);

  const handleIncreaseFontSize = () => {
    setFontSize((prevFontSize) => prevFontSize + 1);
    console.log(fontSize);
  };

  const handleDecreaseFontSize = () => {
    setFontSize((prevFontSize) => Math.max(prevFontSize - 1, 1));
    console.log(fontSize);
  };

  if (fontSize === 4 || fontSize <= 0) {
    setFontSize(1);
  }

  return loading ? (
    <LoadingScreen />
  ) : (
    <div className={isLight ? styles.StoryBoard2 : styles.StoryBoard}>
      {console.log(indexClicked)}
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
      {/* <Story openNav={openNav} handleNavClick={handleNavClick} /> */}
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
