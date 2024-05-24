import { useState, useEffect } from "react";
import { useSelector, connect } from "react-redux";
import { useParams } from "react-router-dom";

import { getUser } from "../actions/authActions";

import styles from "../css/Quiz.module.css";
import Question from "../components/Question";
import StoryNav from "../components/StoryNav";
import Congrats from "../components/Congrats";

const Quiz = ({
  getUser,
  questions,
  correctAnswers,
  isLight,
  handleThemeClick,
}) => {
  const completedStories = useSelector(
    (state) => state.auth.user?.completedStories
  );
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(1);
  const handleQuestionCount = (chosenAnswer, questionNumber) => {
    if (
      translateIndexToLetter(chosenAnswer) === correctAnswers[questionNumber]
    ) {
      setScore((prevScore) => prevScore + 1);
    }

    setQuestionCount((prevCount) => {
      if (prevCount >= questions.length) {
        return 1;
      }
      return prevCount + 1;
    });
  };

  const translateIndexToLetter = (index) => {
    switch (index) {
      case 0:
        return "A";
      case 1:
        return "B";
      case 2:
        return "C";
      case 3:
        return "D";
      default:
        return "";
    }
  };

  const { storyId } = useParams();

  const isCompleted = () => {
    if (completedStories) {
      return completedStories.find(({ story }) => story === storyId);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className={isLight ? styles.Quiz2 : styles.Quiz}>
      {console.log(completedStories)}
      {!isCompleted ? (
        questions.map(
          (question, index) =>
            questionCount === index && (
              <Question
                key={question.id}
                question={question.question}
                questionNumber={index}
                choices={question.answers}
                handleQuestionCount={handleQuestionCount}
                questionCount={questionCount}
                isLight={isLight}
              />
            )
        )
      ) : (
        <Congrats isLight={isLight} score={null} questionsLength={null} />
      )}
      {/* {questionCount === 1 && (
        <Question
          Question="What is life?"
          handleQuestionCount={handleQuestionCount}
          questionCount={questionCount}
          isLight={isLight}
        />
      )}
      {questionCount === 2 && (
        <Question
          Question="What is love?"
          handleQuestionCount={handleQuestionCount}
          questionCount={questionCount}
          isLight={isLight}
        />
      )}
      {questionCount === 3 && (
        <Question
          Question="What is the meaning of happiness?"
          handleQuestionCount={handleQuestionCount}
          questionCount={questionCount}
          isLight={isLight}
        />
      )}
      {questionCount === 4 && (
        <Question
          Question="What is the purpose of education?"
          handleQuestionCount={handleQuestionCount}
          questionCount={questionCount}
          isLight={isLight}
        />
      )}
      {questionCount === 5 && (
        <Question
          Question="What is the essence of art?"
          handleQuestionCount={handleQuestionCount}
          questionCount={questionCount}
          isLight={isLight}
        />
      )}
      {questionCount === 6 && (
        <Question
          Question="What is the importance of technology?"
          handleQuestionCount={handleQuestionCount}
          questionCount={questionCount}
          isLight={isLight}
        />
      )}
      {questionCount === 7 && (
        <Question
          Question="What is freedom?"
          handleQuestionCount={handleQuestionCount}
          questionCount={questionCount}
          isLight={isLight}
        />
      )}
      {questionCount === 8 && (
        <Question
          Question="What is justice?"
          handleQuestionCount={handleQuestionCount}
          questionCount={questionCount}
          isLight={isLight}
        />
      )}
      {questionCount === 9 && (
        <Question
          Question="What is beauty?"
          handleQuestionCount={handleQuestionCount}
          questionCount={questionCount}
          isLight={isLight}
        />
      )}
      {questionCount === 10 && (
        <Question
          Question="What is friendship?"
          handleQuestionCount={handleQuestionCount}
          questionCount={questionCount}
          isLight={isLight}
        />
      )} */}
      {questionCount === questions.length && (
        <Congrats
          isLight={isLight}
          score={score}
          questionsLength={questions.length}
        />
      )}
    </div>
  );
};

const mapDispatchToProps = { getUser };

export default connect(null, mapDispatchToProps)(Quiz);
