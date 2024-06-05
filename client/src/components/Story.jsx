import { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styles from "../css/Story.module.css";

import Choices from "../components/Choices";
import Recommend from "../components/Recommend";

import Sample1 from "../assets/photocard1.png";
import Art from "../assets/artwork11.jpg";
import Back from "../assets/back.png";
import Menu from "../assets/menuu.png";
import { getAssesment } from "../actions/sessionActions";
import MultipleChoiceQuiz from "./MultipleChoiceQuiz";
import Quiz from "../pages/Quiz";

export function Story({ getAssesment, openNav, handleNavClick, isLight }) {
  const { storyId } = useParams();
  const currentNarrative = useSelector(
    (state) => state.session.currentNarrative
  );
  const currentChoices = useSelector((state) => state.session.currentChoices);
  const scenarioHistory = useSelector((state) => state.session.scenarioHistory);
  const isEnd = useSelector((state) => state.session.isEnd);
  const assesment = useSelector((state) => state.session.assesment);

  useEffect(() => {
    console.log(currentNarrative, currentChoices, scenarioHistory);
    console.log(assesment);
  }, [currentNarrative, currentChoices, scenarioHistory, assesment]);

  useEffect(() => {
    if (
      isEnd &&
      Object.keys(assesment).length > 0 &&
      Object.keys(assesment.questions).length < 1
    ) {
      console.log("bruh");
      getAssesment(storyId);
    }
  }, [isEnd]);

  return (
    <div className={styles.Story}>
      {assesment?.questions?.length > 0 ? (
        <Quiz
          questions={assesment.questions}
          correctAnswers={assesment?.correctAnswers}
        />
      ) : scenarioHistory && scenarioHistory.length > 0 ? (
        <>
          <img
            src={scenarioHistory[scenarioHistory.length - 1]}
            className="story-image"
          />
          <div className={styles.Story_inner}>
            <p className={isLight ? styles.Text2 : styles.Text}>
              {currentNarrative || "Loading..."}
            </p>
            <Choices choices={currentChoices} />
          </div>
        </>
      ) : null}

      {console.log(currentChoices)}
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

const mapDispatchToProps = { getAssesment };
export default connect(null, mapDispatchToProps)(Story);
