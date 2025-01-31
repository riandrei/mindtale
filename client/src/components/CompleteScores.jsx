import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../css/Pretest.module.css";
import Student from "../assets/studentttt.png";
const CompleteScores = () => {
  const comprehensionScore = useSelector(
    (state) => state.auth?.philIRI.pretest.comprehensionScore
  );
  const wordReadingScore = useSelector(
    (state) => state.auth?.philIRI.pretest.wordReadingScore
  );

  console.log(comprehensionScore);
  console.log(wordReadingScore);

  return (
    <div className={styles.Pretest}>
      <div class={styles.Pretest_inner}>
        <h1>Comprehension Score: {comprehensionScore}</h1>
        <h1>Word Reading Score: {wordReadingScore}</h1>
      </div>
      <img src={Student} />
      <Link className={styles.Home} to="/Homepage">
        {" "}
        Back to home
      </Link>
    </div>
  );
};

export default CompleteScores;
