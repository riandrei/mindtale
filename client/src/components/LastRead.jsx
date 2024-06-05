import React, { useState, useEffect, useRef } from "react";
import { useSelector, connect } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { toggleBookmark } from "../actions/authActions";

import styles from "../css/LastRead.module.css";

import Art from "../assets/goth.jpg";
import Save from "../assets/save.png";
import Saved from "../assets/saved.png";

function LastRead({ toggleBookmark }) {
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

  const targetRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Disconnect the observer once triggered
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.3,
      }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  const [latestStory, setLatestStory] = useState({});

  const user = useSelector((state) => state.auth.user);
  const stories = useSelector((state) => state.story.stories);

  useEffect(() => {
    if (user?.id) {
      const historyDetails = user.history
        .map(({ story, ...rest }) => {
          const storyDetails = stories?.find(
            (storyElement) => storyElement._id === story
          );
          return {
            story,
            ...rest,
            imgURL: storyDetails?.imgURL,
            title: storyDetails?.title,
            tags: storyDetails?.tags,
            synopsis: storyDetails?.synopsis,
          };
        })
        .sort((a, b) => b.date.localeCompare(a.date));

      setLatestStory(historyDetails[0]);
    }
  }, [user, stories]);

  const handleBookmarkClick = () => {
    const token = localStorage.getItem("token");
    toggleBookmark(token, latestStory.story);
  };

  const navigate = useNavigate();

  const handleReadClick = (storyId) => {
    navigate(`/StoryBoard/${storyId}`);
  };
  return (
    <div
      ref={targetRef}
      className={`${styles.continue_reading} ${isVisible && styles.animation}`}
    >
      {latestStory && (
        <>
          <h1>Continue Reading</h1>
          <div className={styles.continue_inner}>
            <img
              className={styles.continue_main_pic}
              src={latestStory?.imgURL}
              alt=""
            />
            <div className={styles.continue_details}>
              <div className={styles.continue_title_container}>
                <div className={styles.continue_title}>
                  <h2>{latestStory?.title}</h2>
                  <p>{latestStory?.tags?.join(" | ")}</p>
                </div>
                <img
                  onClick={handleBookmarkClick}
                  className={styles.save}
                  src={
                    user?.savedStories?.findIndex(
                      (id) => id === latestStory?.story
                    ) !== -1
                      ? Saved
                      : Save
                  }
                  alt="bookmark"
                />
              </div>
              <div className={styles.story_description}>
                {latestStory?.synopsis?.substring(0, maxLength)}
                <span className={styles.dots}> ...</span>
                <div></div>
              </div>
              <div className={styles.explore}>
                <button
                  style={{ width: "100px" }}
                  onClick={() => handleReadClick(latestStory?.story)}
                >
                  &#9658; Read
                </button>
                <Link
                  // className={styles.title}
                  to={`/StoryDetails/${latestStory?.story}`}
                >
                  <button
                    style={{
                      background: "rgba(0, 0, 0, 0.2)",
                      border: "1px solid white",
                      width: "100px",
                    }}
                  >
                    &#9755; Explore
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const mapDispatchToProps = { toggleBookmark };

export default connect(null, mapDispatchToProps)(LastRead);
