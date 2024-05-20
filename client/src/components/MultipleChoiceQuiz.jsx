import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { submitAssesmentScore } from "../actions/sessionActions";

function MultipleChoiceQuiz({ questions, correctAnswers }) {
  const assesmentScore = useSelector(
    (state) => state.session.assesment.assesmentScore
  );
  const dispatch = useDispatch();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(
    new Array(questions.length).fill(null)
  );

  const [score, setScore] = useState(null);
  const [showScore, setShowScore] = useState(false);

  const { storyId } = useParams();

  const handleOptionChange = (index, option) => {
    setSelectedAnswers([
      ...selectedAnswers.slice(0, index),
      option,
      ...selectedAnswers.slice(index + 1),
    ]);
  };

  const handleSubmit = () => {
    const userAnswers = selectedAnswers.map((answer) => {
      switch (answer) {
        case 0:
          return "A";
        case 1:
          return "B";
        case 2:
          return "C";
        case 3:
          return "D";
        default:
          return null;
      }
    });

    console.log(userAnswers);
    console.log(correctAnswers);

    const tally = userAnswers.map(
      (userAnswer, index) => userAnswer === correctAnswers[index]
    );

    setScore(tally.reduce((val, curr) => (curr ? val + 1 : val), 0));
    setShowScore(true);
  };

  useEffect(() => {
    console.log(score);
    if (score) {
      dispatch(submitAssesmentScore(storyId, score));
    }
  }, [score]);

  useEffect(() => {
    setScore(assesmentScore);
  }, [assesmentScore]);

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    if (!question) return null;

    return (
      <div>
        <h2>{question.question}</h2>
        <ul>
          {question.answers.map((answer, index) => (
            <li key={index} style={{ listStyle: "none" }}>
              <input
                type="radio"
                id={`option-${index}`}
                name="answer"
                value={index}
                checked={selectedAnswers[currentQuestion] === index}
                onChange={() => handleOptionChange(currentQuestion, index)}
              />
              <label htmlFor={`option-${index}`}>{answer}</label>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const hasPreviousQuestion = currentQuestion > 0;
  const hasNextQuestion = currentQuestion < questions.length - 1;

  return (
    <>
      {showScore || assesmentScore ? (
        <p>{`Score is: ${score}`}</p>
      ) : (
        <div style={{ display: "flex", gap: "1rem" }}>
          {renderQuestion()}
          {hasNextQuestion && (
            <button
              onClick={handleNextQuestion}
              style={{
                padding: "0.5rem",
                backgroundColor: "#EEEEEE",
                color: "black",
              }}
            >
              Next Question
            </button>
          )}
          {hasPreviousQuestion && (
            <button
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              style={{
                padding: "0.5rem",
                backgroundColor: "#EEEEEE",
                color: "black",
              }}
            >
              Previous Question
            </button>
          )}
          <button
            disabled={hasNextQuestion}
            onClick={handleSubmit}
            style={{
              padding: "0.5rem",
              backgroundColor: "#2395a5",
              color: "black",
            }}
          >
            Submit Answers
          </button>
        </div>
      )}
    </>
  );
}

export default MultipleChoiceQuiz;
