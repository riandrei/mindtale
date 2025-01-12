import { useEffect, useState } from "react";
import { useSelector, connect } from "react-redux";

import styles from "../css/AllStories.module.css";
import SpecificStory from "../components/SpecificStory";
import StoryModal from "../components/StoryModal";
import { getAllStories } from "../actions/storyActions";

import Story1 from "../assets/artwork8.jpg";
import Line from "../assets/line3.png";

function AllStories({ getAllStories }) {
  const stories = useSelector((state) => state.story.stories);

  const [showStoryModal, setShowStoryModal] = useState(false);
  const [activeStory, setActiveStory] = useState(null);

  const toggleStoryModal = (id) => {
    const story = stories.find((story) => story._id === id);

    setActiveStory(story);
    setShowStoryModal(!showStoryModal);
  };

  useEffect(() => {
    getAllStories();
  }, []);

  return (
    <div className={styles.AllStories}>
      <div className={styles.Stories_top}>
        <span>Stories</span>
        <select>
          <option value="Newest">Newest</option>
          <option value="Newest">Oldest</option>
        </select>
        <input type="text" placeholder="Search story..." />
      </div>
      <div className={styles.Stories_con}>
        {stories.length > 0 &&
          stories.map((story) => (
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
        <StoryModal
          toggleStoryModal={toggleStoryModal}
          activeStory={activeStory}
        />
      )}
    </div>
  );
}
const mapDispatchToProps = { getAllStories };
export default connect(null, mapDispatchToProps)(AllStories);
