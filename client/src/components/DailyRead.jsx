import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import styles from "../css/DailyRead.module.css";

import Save from "../assets/save.png";
import Daily from "../assets/DailyStory.avif";

export function DailyRead() {
  const stories = useSelector((state) => state.story.stories);

  const randomStory = stories[Math.floor(Math.random() * stories.length)];

  const navigate = useNavigate();

  const handleReadClick = (storyId) => {
    navigate(`/StoryBoard/${storyId}`);
  };
  return (
    <div className={styles.DailyRead}>
      <div className={styles.Daily_Top}>
        <h1>Random Story</h1>
        {/* <img src={Save} /> */}
      </div>
      <div
        className={styles.Daily_Content}
        style={{
          backgroundImage: `url('${randomStory?.imgURL}')`,
        }}
      >
        <img src={randomStory?.imgURL || "Loading..."} alt="" />
        <h2>{randomStory?.title || "Loading..."}</h2>
        <p>{randomStory?.tags?.join(" | ") || "Loading..."}</p>
        <div className={styles.Daily_button}>
          <button onClick={() => handleReadClick(randomStory._id)}>
            &#9658; Read
          </button>
          <Link
            // className={styles.title}
            to={`/StoryDetails/${randomStory?._id}`}
          >
            <button
              style={{
                background: "rgba(0, 0, 0, 0.2)",
                border: "1px solid white",
              }}
            >
              &#9755; Explore
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default DailyRead;
