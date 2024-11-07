import React from "react";
import styles from "../css/SpecificStory.module.css";
import Star from "../assets/star.png";
import SampleStory from "../assets/DailyStory.avif";
import { useNavigate } from "react-router-dom";

export function SpecificStory({
  title,
  imgURL,
  tags,
  id = null,
  toggleStoryModal = null,
}) {
  const navigate = useNavigate();

  const handleStoryClick = () => {
    if (toggleStoryModal) {
      toggleStoryModal(id);
    } else {
      navigate(`/StoryDetails/${id}`);
    }
  };
  return (
    <div className={styles.SpecificStory} onClick={handleStoryClick}>
      <img className={styles.SampleStory} src={imgURL} />
      <p className={styles.Title}>{title}</p>
      <span>{tags?.join(" | ")}</span>
    </div>
  );
}
export default SpecificStory;
