import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

//same na lang sila css ng saved kasi same styling naman iba lang content
import styles from "../css/Saved.module.css";
import SpecificStory from "../components/SpecificStory";
import Story1 from "../assets/artwork4.jpg";
import Art1 from "../assets/goth.jpg";
import Art2 from "../assets/artwork10.jpg";
import Art3 from "../assets/artwork6.jpg";
import Art4 from "../assets/Pinned.jpeg";
import Art5 from "../assets/artwork8.jpg";
import Story from "../assets/artwork8.jpg";

export default function Completed(props) {
  const user = useSelector((state) => state.auth?.user);
  const stories = useSelector((state) => state.story.stories);
  const [completedStories, setCompletedStories] = useState([]);

  useEffect(() => {
    setCompletedStories(
      stories?.filter(
        (story) =>
          user?.completedStories?.find(
            (completedStory) => completedStory?.story === story?._id
          ) !== undefined
      )
    );
  }, [user, stories]);

  return (
    <div className={styles.User_saved}>
      {completedStories.length > 0 ? (
        completedStories?.map((story) => (
          <SpecificStory image={story.imageURL} title={story.title} />
        ))
      ) : (
        <h1>No completed stories</h1>
      )}
    </div>
  );
}
