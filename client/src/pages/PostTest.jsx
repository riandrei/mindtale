import React, { useState } from "react";
import WordReadingScore from "../components/WordReadingScore";
import ComprehensionScore from "../components/ComprehensionScore";
import CompleteScores from "../components/CompleteScores";
import {
  submitWordReadingScore,
  submitComprehensionScore,
} from "../actions/authActions";
import { useDispatch } from "react-redux";

const PostTest = () => {
  const [step, setStep] = useState(1);
  const [audioData, setAudioData] = useState(null);

  const passage = `Galileo was different even as a boy. He invented toys that moved.
  At young age, Galileo liked Science books written by Aristotle. In one     of his book Aristotle said, “Heavy objects fall faster than the lighter objects.”
  Galileo disproved Aristotle’s theory. He tested the theory, proved it was wrong and discovered that objects fell at the same rate of speed.
  During Galileo’s time, sun was believed to travel around the earth. To prove the belief, he invented a “spyglass” and called it “telescope”.`;
  const questions = [
    {
      text: "What did Galileo enjoy as a child?",
      answer: "read science books",
    },
    {
      text: "What Galileo's invention was mentioned?",
      answer: "telescope",
    },
    {
      text: "What theory of Aristotle did Galileo disprove?",
      answer: "The theory that heavy objects fall faster than lighter objects.",
    },
    {
      text: "What were Galileo's contributions to Science?",
      answer: "He disproved Aristotle's theory and invented the telescope.",
    },
    {
      text: "How would you describe Galileo?",
      answer: "Curious",
    },
    {
      text: "If you were Galileo, what would you invent? Why?",
      answer: "I'll invent a time machine to travel to the future",
    },
    {
      text: "If you were Galileo, how would you react if you proved that one theory was wrong, but people didn't believe you?",
      answer: "Show them the evidence and explain how I got at the conclusion.",
    },
  ];

  const handleContinue = (audio) => {
    setAudioData(audio);
    setStep(2);
  };

  const dispatch = useDispatch();

  const handleSubmit = async (answers) => {
    await dispatch(submitWordReadingScore(passage, audioData, "posttest"));
    await dispatch(submitComprehensionScore(questions, answers, "posttest"));

    setStep(3);
  };

  return (
    <div>
      {step === 1 ? (
        <WordReadingScore passage={passage} onContinue={handleContinue} />
      ) : step === 2 ? (
        <ComprehensionScore questions={questions} onSubmit={handleSubmit} />
      ) : step === 3 ? (
        <CompleteScores />
      ) : null}
    </div>
  );
};

export default PostTest;
