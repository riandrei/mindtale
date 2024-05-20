import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addFriend } from "../actions/authActions";

import styles from "../css/People.module.css";

import Dowelle from "../assets/Dowelle.jpg";
import Line from "../assets/People_line.png";

export const People = ({ username, tag, profilePicture, id }) => {
  const [Friend, sentFriend] = useState(false);
  const dispatch = useDispatch();
  const handleFriendClick = () => {
    sentFriend(!Friend);
    dispatch(addFriend(id));
  };
  return (
    <div className={styles.People}>
      <div className={styles.Name_con}>
        <img className={styles.User} src={profilePicture} />
        <img className={styles.Line} src={Line} />
        {Friend ? (
          <button onClick={handleFriendClick} className={styles.Sent}>
            Sent request
          </button>
        ) : (
          <button onClick={handleFriendClick}>Add friend</button>
        )}
      </div>
      <div className={styles.Bottom_con}>
        <span>{username}</span>
        <span>{`#${tag}`}</span>
      </div>
    </div>
  );
};

export default People;
