import { useEffect } from "react";
import { connect, useSelector } from "react-redux";

import { getUser } from "../actions/authActions";

import styles from "../css/Saved.module.css";

import Story from "../assets/artwork9.jpg";
import SpecificStory from "./SpecificStory";

function Saved({ getUser }) {
  const user = useSelector((state) => state.auth?.user);

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      getUser();
    }
  }, []);

  return (
    <div className={styles.User_saved}>
      {Object.keys(user).length > 0 &&
        user.savedStories?.map((story) => (
          <SpecificStory image={story.imageURL} />
        ))}
    </div>
  );
}

const mapDispatchToProps = {
  getUser,
};

export default connect(null, mapDispatchToProps)(Saved);
