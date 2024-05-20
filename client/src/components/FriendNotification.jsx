import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getUsers,
  acceptFriendRequest,
  rejectFriendRequest,
} from "../actions/authActions";

import styles from "../css/FriendNotification.module.css";
import Dowelle from "../assets/Dowelle.jpg";

function FriendNotification({ id }) {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");

  const users = useSelector((state) => state.auth.users);
  const dispatch = useDispatch();

  const handleAcceptClick = () => {
    dispatch(acceptFriendRequest(id));
  };
  const handleDeclineClick = () => {
    dispatch(rejectFriendRequest(id));
  };

  useEffect(() => {
    console.log(users);
    if (users.length > 0) {
      const filteredUsers = users.filter((user) => user._id === id);

      console.log(filteredUsers);

      setName(filteredUsers[0].username);
      setImg(filteredUsers[0].profilePicture);
    }
  }, [users]);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div className={styles.friend_request}>
      <img src={img} />
      <div className={styles.friend_right}>
        <div className={styles.sent_request}>
          <div className={styles.sent_inner}>
            <span>{name}</span>
            <span>Sent you a friend request</span>
          </div>
        </div>
        <div className={styles.friend_button}>
          <button onClick={handleAcceptClick}>Accept</button>
          <button onClick={handleDeclineClick}>Decline</button>
        </div>
      </div>
    </div>
  );
}
export default FriendNotification;
