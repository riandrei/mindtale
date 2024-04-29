import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";

import styles from "../css/Saved.module.css";

import Story from "../assets/artwork9.jpg";
import SpecificStory from "./SpecificStory";

function Saved() {
  const user = useSelector((state) => state.auth?.user);
  const stories = useSelector((state) => state.story.stories);
  const [savedStories, setSavedStories] = useState([]);

  useEffect(() => {
    setSavedStories(
      stories.filter((story) => user.savedStories.includes(story._id))
    );
  }, [user, stories]);

  return (
    <div className={styles.User_saved}>
      {console.log(savedStories)}
      {savedStories.length > 0 ? (
        savedStories.map((story) => (
          <SpecificStory image={story.imageURL} title={story.title} />
        ))
      ) : (
        <h1>No saved stories</h1>
      )}
    </div>
  );
}

export default Saved;
