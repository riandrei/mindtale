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
import Loading from "../assets/tube-spinner.svg";

export function Story({
  getAssesment,
  openNav,
  handleNavClick,
  isLight,
  fontSize,
}) {
  const { storyId } = useParams();
  const currentNarrative = useSelector(
    (state) => state.session.currentNarrative
  );
  const currentChoices = useSelector((state) => state.session.currentChoices);
  const scenarioHistory = useSelector((state) => state.session.scenarioHistory);
  const isEnd = useSelector((state) => state.session.isEnd);
  const assesment = useSelector((state) => state.session.assesment);
  const [loading, setLoading] = useState(false);

  const onLoading = () => {
    console.log(loading);
    setLoading(true);
    console.log(loading);
  };
  const offLoading = () => {
    console.log(loading);
    setLoading(false);
    console.log(loading);
  };
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
          isLight={isLight}
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
            {loading ? (
              <svg
                version="1.1"
                id="L5"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 100 100"
                width={100}
                enable-background="new 0 0 0 0"
                xml:space="preserve"
              >
                <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
                  <animateTransform
                    attributeName="transform"
                    dur="1s"
                    type="translate"
                    values="0 15 ; 0 -15; 0 15"
                    repeatCount="indefinite"
                    begin="0.1"
                  />
                </circle>
                <circle fill="#fff" stroke="none" cx="30" cy="50" r="6">
                  <animateTransform
                    attributeName="transform"
                    dur="1s"
                    type="translate"
                    values="0 10 ; 0 -10; 0 10"
                    repeatCount="indefinite"
                    begin="0.2"
                  />
                </circle>
                <circle fill="#fff" stroke="none" cx="54" cy="50" r="6">
                  <animateTransform
                    attributeName="transform"
                    dur="1s"
                    type="translate"
                    values="0 5 ; 0 -5; 0 5"
                    repeatCount="indefinite"
                    begin="0.3"
                  />
                </circle>
              </svg>
            ) : (
              <>
                <p
                  className={`${isLight ? styles.Text2 : styles.Text} ${
                    fontSize === 1 ? styles.TextFont : ""
                  } ${fontSize === 2 ? styles.TextFont2 : ""} ${
                    fontSize == 3 ? styles.TextFont3 : ""
                  }`}
                >
                  {currentNarrative || "Loading..."}
                </p>
                <Choices
                  choices={currentChoices}
                  onLoading={onLoading}
                  offLoading={offLoading}
                />
              </>
            )}
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
