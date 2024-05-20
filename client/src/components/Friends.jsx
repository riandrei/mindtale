import { useSelector, useDispatch } from "react-redux";

import { getUsers } from "../actions/authActions";

import styles from "../css/Friends.module.css";
import User1 from "../assets/jem.jpg";
import { useEffect, useState } from "react";

export default function Friends() {
  const user = useSelector((state) => state.auth?.user);
  const users = useSelector((state) => state.auth.users);

  const dispatch = useDispatch();

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const filteredFriends = user.friends.map((friend) => {
        const filteredUsers = users.filter((user) => user._id === friend);

        return filteredUsers[0];
      });

      setFriends(filteredFriends);
    }
  }, [users]);

  return (
    <div className={styles.Friends}>
      {friends.length > 0 ? (
        friends.map((friend) => (
          <div className={styles.Specific_friend}>
            <img src={friend.profilePicture} />
            <div className={styles.Friends_inner}>
              <h3>{friend.username}</h3>
            </div>
          </div>
        ))
      ) : (
        <h1>Friends show up here.</h1>
      )}
    </div>
  );
}
