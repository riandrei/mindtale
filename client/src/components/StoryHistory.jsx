import { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styles from "../css/Story.module.css";

import Choices from "../components/Choices";
import Recommend from "../components/Recommend";

import Sample1 from "../assets/sample1.png";
import Art from "../assets/artwork11.jpg";
import Back from "../assets/back.png";
import Menu from "../assets/menuu.png";
import { getAssesment } from "../actions/sessionActions";
import MultipleChoiceQuiz from "./MultipleChoiceQuiz";

export function Story({
  getAssesment,
  narrative,
  narrativeImage,
  openNav,
  handleNavClick,
}) {
  const { storyId } = useParams();

  const cleanedNarrative = JSON.parse(narrative.parts[0].text).narrator;

  return (
    <div className={styles.Story}>
      <div className={styles.Top}>
        <Link to={`/StoryDetails/${storyId}`}>
          <img src={Back} />
        </Link>
        {openNav && <img onClick={handleNavClick} src={Menu} />}
      </div>
      <>
        <img
          src={narrativeImage || Sample1}
          style={{ width: "512px", height: "512px", objectFit: "cover" }}
        />
        <p>{cleanedNarrative || "Loading..."}</p>
      </>
    </div>
  );
}

const mapDispatchToProps = { getAssesment };
export default connect(null, mapDispatchToProps)(Story);
