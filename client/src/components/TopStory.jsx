import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { toggleBookmark } from "../actions/authActions";

import styles from "../css/TopStory.module.css";
import Artwork2 from "../assets/artwork2.webp";
import Save from "../assets/save.png";
import Saved from "../assets/saved.png";
import Confetti from "../assets/confetti.png";

function TopStory({ title, tags, synopsis, imgURL, storyID }) {
  const [maxLength, setMaxLength] = useState(
    window.innerWidth <= 431 ? 100 : 50
  );
  const fullText =
    "Black Torch unfolds the journey of Jiro, a reluctant wielder of enigmatic powers, navigating the blurred realm between humans and supernatural beings. Fueled by captivating discoveries and lurking dangers, Jiro's tale explores the delicate balance of coexistence. Faced with unforeseen challenges, he grapples with identity, friendship, and the intricate threads connecting his world to the mystical forces that shape his destiny."; // Your full text here

  useEffect(() => {
    const handleResize = () => {
      setMaxLength(window.innerWidth <= 1023 ? 100 : 450);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const truncatedText = fullText.substring(0, maxLength);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [isBookmark, setIsBookmark] = useState(false);
  const handleBookmarkClick = () => {
    setIsBookmark(!isBookmark);
    const token = localStorage.getItem("token");
    dispatch(toggleBookmark(token, storyID));
  };

  return (
    <div
      className={styles.TopStory}
      style={{ backgroundImage: `url(${imgURL})`, backgroundSize: "cover" }}
    >
      <div className={styles.story_left}>
        <h1>Top Stories</h1>
        <img src={imgURL} />
      </div>
      <div className={styles.story_right}>
        <div className={styles.book_title}>
          <div className={styles.book_inner}>
            <h2>{title}</h2>
            <p>{tags?.join(" | ")}</p>
          </div>
          <img
            onClick={handleBookmarkClick}
            src={
              user?.savedStories?.findIndex((id) => id === storyID) !== -1
                ? Saved
                : Save
            }
          />
          {isBookmark && (
            <div className={styles.SavedNotif}>
              <h3>Story successfully bookmarked!</h3>
              <img src={Confetti} alt="" />
            </div>
          )}
        </div>

        <div className={styles.description}>
          {synopsis.substring(0, maxLength)}
          <span className={styles.dots}> ...</span>
        </div>
        <Link to={`/StoryDetails/${storyID}`}>
          <button>Explore</button>
        </Link>
      </div>
    </div>
  );
}

export default TopStory;
