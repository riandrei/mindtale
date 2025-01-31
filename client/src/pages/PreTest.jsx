import React, { useState } from "react";
import WordReadingScore from "../components/WordReadingScore";
import ComprehensionScore from "../components/ComprehensionScore";
import CompleteScores from "../components/CompleteScores";
import {
  submitWordReadingScore,
  submitComprehensionScore,
} from "../actions/authActions";
import { useDispatch } from "react-redux";

const PreTest = () => {
  const [step, setStep] = useState(1);
  const [audioData, setAudioData] = useState(null);

  const passage = `Alexander Graham Bell accidentally invented the telephone.
  He was testing a new transmitter when it happened. He spilled a burning acid on it and produced sound waves. He shouted for help from Mr. Watson who was in the kitchen. Mr. Watson was surprised to hear Bell’s voice clearly. He went to Bell and uttered, “I heard every word you said.”
  This was how telephone was discovered.`;
  const questions = [
    {
      text: "What Alexander Graham Bell's invention was mentioned?",
      answer: "telephone",
    },
    {
      text: "What was he testing?",
      answer: "transmitter",
    },
    {
      text: "What happened to the burning acid?",
      answer: "spilled",
    },
    {
      text: "How did Mr. Watson receive Bell's message?",
      answer: "sound waves",
    },
    {
      text: "What do you think is the effect of the acid to the transmitter?",
      answer:
        "The burning acid acted upon the transmitter and produced sound waves.",
    },
    {
      text: "How important is the telephone to you?",
      answer:
        "The telephone is very important to me because it is a means of communication.",
    },
    {
      text: "If the telephone was not invented, do you think communication would be easy? Why?",
      answer:
        "If the telephone was not invented, communication would be difficult because we can't talk to people who are far from us.",
    },
  ];

  const handleContinue = (audio) => {
    setAudioData(audio);
    setStep(2);
  };

  const dispatch = useDispatch();

  const handleSubmit = async (answers) => {
    await dispatch(submitWordReadingScore(passage, audioData, "pretest"));
    await dispatch(submitComprehensionScore(questions, answers, "pretest"));

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

export default PreTest;
