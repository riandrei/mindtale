import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { submitUserData } from "../actions/authActions";
import styles from "../css/Start.module.css";

import kidIcon1 from "../assets/kidIcon1.avif";
import kidIcon2 from "../assets/kidIcon2.avif";
import kidIcon3 from "../assets/kidIcon3.jpg";
import kidIcon4 from "../assets/kidIcon4.avif";

const StudentDetails = ({ handleDotClick, isCount }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mainIcon, setMainIcon] = useState(kidIcon1);
  const [icons, setIcons] = useState([kidIcon1, kidIcon3, kidIcon4]);

  const handleIconClick = (index) => {
    const newIcons = [...icons];
    const clickedIcon = newIcons[index];
    setMainIcon(clickedIcon);
    setIcons(newIcons);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0] && e.target.files[0].type.startsWith("image/")) {
      const url = URL.createObjectURL(e.target.files[0]);
      setMainIcon(url);
      return;
    }
    return;
  };

  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [school, setSchool] = useState("Independent");
  const [sex, setSex] = useState("Male");
  const [gradeLevel, setGradeLevel] = useState("4");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleBirthdayChange = (e) => {
    setBirthday(e.target.value);
  };
  const handleSchoolChange = (e) => {
    setSchool(e.target.value);
  };
  const handleSexChange = (e) => {
    setSex(e.target.value);
  };
  const handleGradeLevelChange = (e) => {
    setGradeLevel(e.target.value);
  };
  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };
  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();

    const formData = new FormData();

    const { name, birthday, school, sex, gradeLevel, age, bio, fileUpload } =
      e.target.elements;

    formData.append("name", name.value);
    formData.append("birthday", birthday.value);
    formData.append("school", school.value);
    formData.append("sex", sex.value);
    formData.append("gradeLevel", gradeLevel.value);
    formData.append("age", age.value);
    formData.append("bio", bio.value);
    formData.append("image", fileUpload.files[0]);

    e.target.reset();

    dispatch(submitUserData(formData, navigate));
  };

  return (
    <form className={styles.StudentDetails} onSubmit={handleSubmitClick}>
      <h1>Help Us Personalize Your Learning Experience</h1>
      <section className={styles.PersonalDetails}>
        <div className={styles.PersonalDetails_left}>
          <div className={styles.Top}>
            <div className={styles.topInner1}>
              <label for="name">Full name:</label>
              <input
                name="name"
                id="name"
                type="text"
                maxLength={40}
                value={name}
                onChange={handleNameChange}
              />
            </div>

            <div className={styles.topInner2}>
              <label>Birthdate:</label>
              <input
                value={birthday}
                onChange={handleBirthdayChange}
                id="birthday"
                type="date"
              />
            </div>
          </div>

          <div className={styles.Mid}>
            <label>School:</label>
            <select
              name=""
              id="school"
              value={school}
              onChange={handleSchoolChange}
            >
              <option>Tapinac Elementary School</option>
              <option>Independent</option>
            </select>
          </div>

          <div className={styles.Bot}>
            <div>
              <label>Sex:</label>
              <select name="" id="sex" value={sex} onChange={handleSexChange}>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div>
              <label>Grade Level:</label>
              <select
                name=""
                id="gradeLevel"
                value={gradeLevel}
                onChange={handleGradeLevelChange}
              >
                <option>4</option>
                <option>5</option>
                <option>6</option>
              </select>
            </div>

            <div>
              <label>Age:</label>
              <input
                type="number"
                name=""
                id="age"
                value={age}
                onChange={handleAgeChange}
              />
            </div>
          </div>

          <div className={styles.Textarea}>
            <label>Tell us about yourself</label>
            <textarea
              name=""
              id="bio"
              value={bio}
              onChange={handleBioChange}
            ></textarea>
          </div>
          <button type="submit">SUBMIT</button>
        </div>

        <div className={styles.PersonalDetails_right}>
          <img
            className={styles.mainIcon}
            src={mainIcon}
            alt="Main Icon"
            width={220}
            height={220}
          />
          <label htmlFor="fileUpload">Upload custom profile</label>
          <input
            className={styles.File}
            type="file"
            id="fileUpload"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
          <div className={styles.iconContainer}>
            {icons.map((icon, index) => (
              <img
                key={index}
                src={icon}
                alt={`Icon ${index + 2}`}
                onClick={() => handleIconClick(index)}
                className={styles.icon}
              />
            ))}
          </div>
        </div>
      </section>
    </form>
  );
};

export default StudentDetails;
