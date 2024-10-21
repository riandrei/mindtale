import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "../css/StoryNav.module.css";

import TTS from "./TTS";

import Back from "../assets/back.png";
import Book from "../assets/book-icon.png";
import Theme from "../assets/themes.png";
import Dark from "../assets/dark.png";
import Light from "../assets/book-icon-dark.png";

export const StoryNav = ({
  handleThemeClick,
  isLight,
  handleNavClick,
  openNav,
  handleIncreaseFontSize,
  handleDecreaseFontSize,
}) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const currentNarrative = useSelector(
    (state) => state.session.currentNarrative
  );

  return (
    <div className={styles.StoryNav}>
      <img onClick={goBack} className={styles.Back} src={Back} />
      <div className={styles.StoryNav_inner}>
        <TTS text={currentNarrative} isLight={isLight} />
        <span
          className={isLight ? styles.Light : styles.Dark}
          onClick={handleDecreaseFontSize}
        >
          A-
        </span>
        <span
          className={isLight ? styles.Light : styles.Dark}
          onClick={handleIncreaseFontSize}
        >
          A+
        </span>
        <img onClick={handleThemeClick} src={isLight ? Dark : Theme} />
        {openNav ? (
          <img onClick={handleNavClick} src={isLight ? Light : Book} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default StoryNav;
