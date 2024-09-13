import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import styles from "../css/Admin.module.css";

import Nav from "../components/Nav";
import AllStories from "../components/AllStories";

import { generateStoryCover, addStory } from "../actions/storyActions";

import Back from "../assets/back.png";
import Lucy from "../assets/Luvy.jpg";
import Prev from "../assets/prev.png";
import Next from "../assets/next.png";
import Lock from "../assets/padlock.png";
import Line from "../assets/line3.png";
import NoImage from "../assets/noimgjpg.jpg";

function Admin({ generateStoryCover, addStory }) {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const [selectedButton, setSelectedButton] = useState("free");

  const handleButtonClick = (buttonType) => {
    setSelectedButton(buttonType);
  };

  const [popUp, setPopUp] = useState(false);
  const handlePopupClick = () => {
    setPopUp(!popUp);
  };

  const [generatedImage, setGeneratedImage] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("Fantasy");

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", e.target.elements[1].value);
    formData.append("synopsis", e.target.elements[2].value);
    formData.append("genre", selectedGenre);
    formData.append("storyType", selectedButton);
    formData.append("image", generatedImage);

    console.log(formData);
    addStory(formData);

    e.target.reset();
  };

  const [titleValue, setTitleValue] = useState("");

  const handleTitleValueChange = (e) => {
    setTitleValue(e.target.value);
  };

  const handleGenerateButtonClick = () => {
    generateStoryCover(titleValue, selectedGenre);
    console.log(titleValue, selectedGenre);
  };

  const generatedImageURL = useSelector(
    (state) => state.story.generatedCoverURL
  );

  useEffect(() => {
    if (generatedImageURL) {
      setGeneratedImage(generatedImageURL);
    }
  }, [generatedImageURL]);
  return (
    <div className={styles.Admin}>
      {/* <Nav /> */}
      {/* <img onClick={goBack} className={styles.Back} src={Back} /> */}
      <form className={styles.Middle} onSubmit={handleSubmitClick}>
        <div className={styles.Middle_left}>
          <img className={styles.Cover} src={generatedImage || NoImage} />
          <div className={styles.Middle_left_down}>
            <button
              disabled={titleValue.trim() === ""}
              onClick={handleGenerateButtonClick}
              type="button"
            >
              Generate
            </button>
          </div>
        </div>

        <div className={styles.Middle_right}>
          <div className={styles.Book_title}>
            <label>Book Title:</label>
            <input
              type="text"
              value={titleValue}
              onChange={handleTitleValueChange}
            />
          </div>
          <div className={styles.Book_title}>
            <label>Book Synopsis:</label>
            <textarea></textarea>
          </div>

          <div className={styles.Genre}>
            <span>Genre</span>
            <div className={styles.Genre_choices}>
              <div className={styles.Choice}>
                <input
                  type="radio"
                  name="genre"
                  id="fantasy"
                  checked={selectedGenre === "Fantasy"}
                  onChange={() => handleGenreChange("Fantasy")}
                />
                <label htmlFor="fantasy">Fantasy</label>
              </div>
              <div className={styles.Choice}>
                <input
                  type="radio"
                  name="genre"
                  id="adventure"
                  checked={selectedGenre === "Adventure"}
                  onChange={() => handleGenreChange("Adventure")}
                />
                <label htmlFor="adventure">Adventure</label>
              </div>
              <div className={styles.Choice}>
                <input
                  type="radio"
                  name="genre"
                  id="sci-fi"
                  checked={selectedGenre === "Sci-Fi"}
                  onChange={() => handleGenreChange("Sci-Fi")}
                />
                <label htmlFor="sci-fi">Sci-Fi</label>
              </div>
              <div className={styles.Choice}>
                <input
                  type="radio"
                  name="genre"
                  id="mystery"
                  checked={selectedGenre === "Mystery"}
                  onChange={() => handleGenreChange("Mystery")}
                />
                <label htmlFor="mystery">Mystery</label>
              </div>
              <div className={styles.Choice}>
                <input
                  type="radio"
                  name="genre"
                  id="comedy"
                  checked={selectedGenre === "Comedy"}
                  onChange={() => handleGenreChange("Comedy")}
                />
                <label htmlFor="comedy">Comedy</label>
              </div>
            </div>
          </div>
          <div className={styles.Story_type}>
            <input
              type="radio"
              name="storyType"
              id="free"
              checked={selectedButton === "free"}
              onChange={() => handleButtonClick("free")}
              style={{ display: "none" }}
            />
            <input
              type="radio"
              name="storyType"
              id="premium"
              checked={selectedButton === "premium"}
              onChange={() => handleButtonClick("premium")}
              style={{ display: "none" }}
            />
            <label
              className={`${styles.button} ${
                selectedButton === "free" ? styles.select : ""
              }`}
              htmlFor="free"
            >
              Free access
            </label>
            <label
              className={`${styles.button} ${
                selectedButton === "premium" ? styles.select : ""
              }`}
              htmlFor="premium"
            >
              <img src={Lock} alt="Lock icon" />
              <span>Premium access</span>
            </label>
          </div>
          <button type="submit" className={styles.Create}>
            Create Story
          </button>
        </div>
      </form>
      <div className={styles.Line_con}>
        <img className={styles.Line} src={Line} />
      </div>
      <div className={styles.All_stories}>
        <AllStories />
      </div>
      {popUp && (
        <div className={styles.Popup}>
          <h1>Are you sure you want to publish this story?</h1>
          <div className={styles.Sure_con}>
            <button>Publish</button>
            <button onClick={handlePopupClick}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

const mapDispatchToProps = { generateStoryCover, addStory };
export default connect(null, mapDispatchToProps)(Admin);
