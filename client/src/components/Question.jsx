import React, { useEffect } from "react";
import styles from "../css/Question.module.css";

export const Question = ({
  question,
  questionNumber,
  choices,
  handleQuestionCount,
  questionCount,
  isLight,
}) => {
  const returnLetter = (index) => {
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
  useEffect(() => {
    const timer = setTimeout(() => {
      handleQuestionCount("timeout");
    }, 20000);

    return () => clearTimeout(timer);
  }, [handleQuestionCount, questionCount]);

  return (
    <div className={styles.Question}>
      <div
        className={isLight ? styles.SpecificQuestion2 : styles.SpecificQuestion}
      >
        {question}
      </div>
      <div className={styles.Choices}>
        {choices.map((choice, index) => (
          <button onClick={() => handleQuestionCount(index, questionNumber)}>
            <span>{returnLetter(index)}</span>
            <span>{choice}</span>
          </button>
        ))}
      </div>
      <div className={styles.Time}></div>
    </div>
  );
};

export default Question;
