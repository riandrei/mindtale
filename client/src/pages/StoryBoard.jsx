import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { readStory } from "../actions/sessionActions";

import Footer from "../components/Footer";
import { Choices } from "../components/Choices";
import ChaptersNav from "../components/ChaptersNav";
import Story from "../components/Story";

import Back from "../assets/back.png";
import Theme from "../assets/themes.png";
import Dark from "../assets/dark.png";
import Sample1 from "../assets/sample1.png";

import styles from "../css/StoryBoard.module.css";

function StoryBoard({ readStory }) {
  const { storyId } = useParams();

  useEffect(() => {
    readStory({ storyId });
  }, []);

  return (
    <div className={styles.StoryBoard}>
      <Story />
      {/* <ChaptersNav /> */}
    </div>
  );
}

const mapDispatchToProps = {
  readStory,
};

export default connect(null, mapDispatchToProps)(StoryBoard);
