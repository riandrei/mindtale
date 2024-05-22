import { useState, useEffect } from "react";
import { useSelector, connect } from "react-redux";
import { useParams } from "react-router-dom";

import { getStories } from "../actions/storyActions";

import styles from "../css/ChaptersNav.module.css";

import Logo from "../assets/mindtale.png";
import Sample from "../assets/artwork9.jpg";
import Line from "../assets/line3.png";
import Back from "../assets/back.png";
import Close from "../assets/invisible.png";

import Chapters from "../components/Chapters";
// import { handleNavClick } from './Story'

const ChaptersNav = ({
  getStories,
  filteredHistory,
  handlePageClick,
  handleNavClick,
}) => {
  const { storyId } = useParams();
  const stories = useSelector((state) => state.story.stories);

  const [title, setTitle] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    console.log(stories);
    if (stories.length > 0) {
      const story = stories.find((story) => story._id === storyId);
      console.log(storyId);

      setImgURL(story.imgURL);
      setTitle(story.title);
      setTags(story.tags);
    }
  }, [stories]);

  useEffect(() => {
    getStories();
  }, []);

  return (
    <div className={styles.Chapters}>
      <div className={styles.Top}>
        <img src={Back} />
        <img onClick={handleNavClick} src={Close} />
      </div>
      <div className={styles.Cover}>
        <img className={styles.Sample} src={imgURL} />
        <h2>{title || "Loading..."}</h2>
        <img className={styles.Line} src={Line} />
        <span>{tags.join(" | ")}</span>
      </div>
      <div className={styles.Chapters_con}>
        {console.log(filteredHistory)}
        {filteredHistory?.map(
          (item, index) =>
            index !== 0 && (
              <Chapters
                title={`Page ${index}`}
                handlePageClick={handlePageClick}
                index={index}
              />
            )
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = { getStories };

export default connect(null, mapDispatchToProps)(ChaptersNav);
