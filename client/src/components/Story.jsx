import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../css/Story.module.css";

import Choices from "../components/Choices";
import Recommend from "../components/Recommend";

import Sample1 from "../assets/sample1.png";
import Art from "../assets/artwork11.jpg";
import { useEffect } from "react";

export function Story(props) {
  const currentNarrative = useSelector(
    (state) => state.session.currentNarrative
  );
  const currentChoices = useSelector((state) => state.session.currentChoices);

  useEffect(() => {
    console.log(currentNarrative, currentChoices);
  }, [currentNarrative, currentChoices]);

  return (
    <div className={styles.Story}>
      <h1 className={styles.Main_title}>Prologue: Where it All Started</h1>
      <img src={Sample1} />
      <p>{currentNarrative || "Loading..."}</p>
      <Choices choices={currentChoices} />

      {/* <div className={styles.Next}>
        <Link className={styles.Prev}>Previous</Link>
        <Link className={styles.Prev}>Next</Link>
      </div>
      <div className={styles.StoryBoard_recommend}>
        <Recommend photo={Art} genre="Mystery" title="Naruto Shipddpuden" />
        <Recommend photo={Art} genre="Mystery" title="Naruto Shipddpuden" />
        <Recommend photo={Art} genre="Mystery" title="Naruto Shipddpuden" />
        <Recommend photo={Art} genre="Mystery" title="Naruto Shipddpuden" />
        <Recommend photo={Art} genre="Mystery" title="Naruto Shipddpuden" />
        <Recommend photo={Art} genre="Mystery" title="Naruto Shipddpuden" />
      </div> */}
    </div>
  );
}

export default Story;
