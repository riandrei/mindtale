import { useEffect, useState } from "react";
import { useSelector, connect, useDispatch } from "react-redux";

import styles from "../css/AllStories.module.css";
import SpecificStory from "./SpecificStory";
import SchoolStoryModal from "./SchoolStoryModal";
import { getAllStories } from "../actions/storyActions";
import { getAllowedStories } from "../actions/adminActions";

import Story1 from "../assets/artwork8.jpg";
import Line from "../assets/line3.png";

function PendingStories() {
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.story.stories);
  const allowedStories = useSelector((state) => state.story.allowedStories);
  const rejectedStories = useSelector((state) => state.story.rejectedStories);

  const [showStoryModal, setShowStoryModal] = useState(false);
  const [activeStory, setActiveStory] = useState(null);

  const toggleStoryModal = (id) => {
    const story = stories.find((story) => story._id === id);

    setActiveStory(story);
    setShowStoryModal(!showStoryModal);
  };

  useEffect(() => {
    dispatch(getAllStories());
    dispatch(getAllowedStories());
  }, []);

  return (
    <div className={styles.AllStories}>
      <div className={styles.Stories_top}>
        <span>Pending Stories</span>
      </div>
      <div className={styles.Stories_con}>
        {stories.length > 0 &&
          stories
            .filter(
              (story) =>
                !allowedStories?.includes(story._id) &&
                !rejectedStories?.includes(story._id)
            )
            .map((story) => (
              <SpecificStory
                key={story._id}
                title={story.title}
                imgURL={story.imgURL}
                id={story._id}
                toggleStoryModal={toggleStoryModal}
              />
            ))}
      </div>
      {showStoryModal && (
        <SchoolStoryModal
          toggleStoryModal={toggleStoryModal}
          activeStory={activeStory}
        />
      )}
    </div>
  );
}

export default PendingStories;
