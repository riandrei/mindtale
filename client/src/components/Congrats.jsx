import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";

import { submitCompletedStory } from "../actions/authActions";
import styles from "../css/Congrats.module.css";

const Congrats = ({
  submitCompletedStory,
  isLight,
  score,
  questionsLength,
}) => {
  const { storyId } = useParams();

  console.log(storyId);
  useEffect(() => {
    if (score && questionsLength) {
      submitCompletedStory(storyId, score);
    }
  }, []);
  return (
    <div className={styles.Congrats}>
      <h1 className={isLight ? styles.Count2 : styles.Count}>
        Congratulations! You've finished reading the book
      </h1>
      {score && questionsLength && (
        <span className={isLight ? styles.Count2 : styles.Count}>
          {score} / {questionsLength}
        </span>
      )}
      <Link
        to="/Homepage"
        className={`${styles.Return} ${isLight ? styles.Count2 : styles.Count}`}
      >
        Return to homepage
      </Link>
    </div>
  );
};

const mapDispatchToProps = { submitCompletedStory };

export default connect(null, mapDispatchToProps)(Congrats);
