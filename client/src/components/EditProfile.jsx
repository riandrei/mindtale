import React, { useState, useRef, useEffect } from "react";
import { useSelector, connect } from "react-redux";

import { getUser, updateUser } from "../actions/authActions";

import styles from "../css/SettingComponents.module.css";

import User from "../assets/Dowelle.jpg";
import Photocard1 from "../assets/photocard1.png";
import Photocard2 from "../assets/photocard2.png";
import Photocard3 from "../assets/photocard3.png";
import Photocard4 from "../assets/photocard4.png";

export function EditProfile({ getUser, updateUser }) {
  const user = useSelector((state) => state.auth.user);

  const [name, setName] = useState(user.username);
  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
  };

  const [tag, setTag] = useState(`#${user.tag}`);
  const handleTagChange = (e) => {
    const newTag = e.target.value;
    setTag("#" + newTag.substring(1, 5));
  };

  const [bio, setBio] = useState(user.bio);
  const handleBioChange = (e) => {
    const newBio = e.target.value;
    setBio(newBio);
  };

  const [profilePic, setProfilePic] = useState(user.profilePic);

  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (index) => {
    setSelectedCard(index);
  };

  const handleSaveClick = (e) => {
    // if (name.length !== 0 && tag.length !== 0 && bio.length !== 0) {
    //   updateUser(name, tag.slice(1, tag.length), bio);
    // }

    e.preventDefault();

    const formData = new FormData();

    formData.append("username", e.target.elements[1].value);
    formData.append(
      "tag",
      e.target.elements[2].value.slice(1, e.target.elements[2].value.length)
    );
    formData.append("bio", e.target.elements[3].value);
    formData.append("image", e.target.elements.image.files[0]);

    e.target.reset();
    // setProfilePic(null);

    updateUser(formData);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0] && e.target.files[0].type.startsWith("image/")) {
      const url = URL.createObjectURL(e.target.files[0]);
      setProfilePic(url);
      return;
    }
    const url = null;
    setProfilePic(url);
  };

  useEffect(() => {
    if (user.id) {
      setName(user.username);
      setTag(`#${user.tag}`);
      setBio(user.bio);
      setProfilePic(user.profilePicture);
    }
  }, [user]);

  useEffect(() => {
    if (!user.id) {
      if (localStorage.getItem("token")) {
        getUser();
      }
    }
  }, []);
  return (
    <form className={styles.Main_container} onSubmit={handleSaveClick}>
      <div className={styles.Change_profile}>
        <img className={styles.User} src={profilePic || "Loading..."} />
        <input
          type="file"
          name="image"
          accept="image/*"
          style={{ display: "none" }}
          id="fileInput"
          onChange={handleFileChange}
        />
        <label htmlFor="fileInput">Change Profile Picture</label>
      </div>

      <div className={styles.Change_name}>
        <div className={styles.User_name}>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            maxLength={15}
            value={name}
            onChange={handleNameChange}
            style={{ borderColor: name?.length === 15 ? "#ff4f4f50" : "" }}
          />
          <span
            className={name?.length === 15 ? styles.Length2 : styles.Length}
          >
            {name?.length}/15
          </span>
        </div>
        <div className={styles.User_tag}>
          <label for="tag" htmlFor="Name:">
            Tag:
          </label>
          <input
            maxLength={5}
            id="tag"
            type="text"
            value={tag}
            onChange={handleTagChange}
            style={{ borderColor: tag.length === 5 ? "#ff4f4f50" : "" }}
          />
          <span className={tag.length === 5 ? styles.Length2 : styles.Length}>
            {tag.length - 1}/4
          </span>
        </div>
      </div>

      <div className={styles.Change_bio}>
        <label for="Bio" htmlFor="">
          Bio:
        </label>
        <textarea
          className={bio?.length === 150 ? styles.textarea : ""}
          maxLength={150}
          value={bio}
          onChange={handleBioChange}
          id="Bio"
          cols="10"
          rows="5"
        ></textarea>
        <span className={bio?.length === 150 ? styles.Length2 : styles.Length}>
          {bio?.length}/150
        </span>
      </div>
      {/* <div className={styles.Change_cover}>
                <h2>Choose your MindTale photocard:</h2>
                <div className={styles.Photocard_container}>
                    <img
                    src={Photocard1}
                    className={`${styles.Photocard} ${selectedCard === 1 ? styles.Selected_photocard : ''}`}
                    onClick={() => handleCardClick(1)}
                    />
                    <img
                        src={Photocard2}
                        className={`${styles.Photocard} ${selectedCard === 2 ? styles.Selected_photocard : ''}`}
                        onClick={() => handleCardClick(2)}
                    />
                    <img
                        src={Photocard3}
                        className={`${styles.Photocard} ${selectedCard === 3 ? styles.Selected_photocard : ''}`}
                        onClick={() => handleCardClick(3)}
                    />
                    <img
                        src={Photocard4}
                        className={`${styles.Photocard} ${selectedCard === 4 ? styles.Selected_photocard : ''}`}
                        onClick={() => handleCardClick(4)}
                    />
                    <img
                        src={Photocard1}
                        className={`${styles.Photocard} ${selectedCard === 5 ? styles.Selected_photocard : ''}`}
                        onClick={() => handleCardClick(5)}
                    />
                </div>
            </div> */}
      <div className={styles.Button_con}>
        <button type="submit">Save</button>
        <button>Cancel</button>
      </div>
    </form>
  );
}

const mapDispatchToProps = { getUser, updateUser };

export default connect(null, mapDispatchToProps)(EditProfile);
