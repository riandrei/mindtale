import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect, useSelector } from "react-redux";

import { readStory } from "../actions/sessionActions";

import Footer from "../components/Footer";
import { Choices } from "../components/Choices";
import ChaptersNav from "../components/ChaptersNav";
import Story from "../components/Story";

import Back from "../assets/back.png";
import Theme from "../assets/themes.png";
import Dark from "../assets/dark.png";
import Sample1 from "../assets/sample1.png";

import styles from "../css/StoryBoard.module.css";
import StoryHistory from "../components/StoryHistory";

function StoryBoard({ readStory }) {
  const { storyId } = useParams();

  const [openNav, setOpenNav] = useState(false);
  const handleNavClick = () => {
    console.log("Hello check");
    setOpenNav(!openNav);
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

  useEffect(() => {
    readStory({ storyId });
  }, []);

  return (
    <div className={styles.StoryBoard}>
      {console.log(indexClicked)}
      {indexClicked === -1 || indexClicked === filteredHistory.length - 1 ? (
        <Story openNav={openNav} handleNavClick={handleNavClick} />
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
