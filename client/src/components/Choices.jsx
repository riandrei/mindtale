import { useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { submitUserChoice } from "../actions/sessionActions";

import styles from "../css/Choices.module.css";

export function Choices({ choices, submitUserChoice }) {
  //   const [selectedButton, setSelectedButton] = useState(null);

  // function handleClick(index) {
  //     setSelectedButton(index);
  // }

  const { storyId } = useParams();

  const handleChoiceClick = (choice) => {
    submitUserChoice({ userChoice: choice, storyId });
  };

  return (
    <div className={styles.Choices}>
      {choices?.length === 0 ? (
        <button onClick={() => handleChoiceClick("Next")}>Next</button>
      ) : (
        choices?.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleChoiceClick(choice)}
            // style={{ backgroundColor: selectedButton === index ? '#2395A5' : '' }}
          >
            {choice.text.slice(0, choice.text.indexOf(":"))}
          </button>
        ))
      )}
    </div>
  );
}

const mapDispatchToProps = {
  submitUserChoice,
};

export default connect(null, mapDispatchToProps)(Choices);
