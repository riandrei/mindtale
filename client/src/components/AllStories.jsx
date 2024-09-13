import { useEffect } from "react";
import { useSelector, connect } from "react-redux";

import styles from "../css/AllStories.module.css";
import SpecificStory from "../components/SpecificStory";
import { getStories } from "../actions/storyActions";

import Story1 from "../assets/artwork8.jpg";
import Line from "../assets/line3.png";

function AllStories({ getStories }) {
  const stories = useSelector((state) => state.story.stories);

  useEffect(() => {
    getStories();
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
            />
          ))}

        {/* <SpecificStory image={Story1} title="Sample title" />
        <SpecificStory image={Story1} title="Sample title" />
        <SpecificStory image={Story1} title="Sample title" />
        <SpecificStory image={Story1} title="Sample title" />
        <SpecificStory image={Story1} title="Sample title" /> */}
      </div>
    </div>
  );
}
const mapDispatchToProps = { getStories };
export default connect(null, mapDispatchToProps)(AllStories);
