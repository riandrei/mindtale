import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";

import styles from "../css/SearchPeople.module.css";

import Back from "../assets/back.png";

import People from "../components/People";

import { getUsers } from "../actions/authActions";

function SearchPeople({ getUsers }) {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const users = useSelector((state) => state.auth.users);

  const [username, setUsername] = useState("");
  const [tag, setTag] = useState("");

  const handleUsernameValueChange = (e) => {
    setUsername(e.target.value);
  };
  const handleTagValueChange = (e) => {
    setTag(e.target.value);
  };

  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleSearchClick = () => {
    if (username === "" && tag === "") return setFilteredUsers([]);

    const newFilteredUsers = users.filter((user) => {
      return (
        user.username.toLowerCase().includes(username.toLowerCase()) &&
        user.tag.toLowerCase().includes(tag.toLowerCase())
      );
    });

    setFilteredUsers(newFilteredUsers);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className={styles.SearchPeople}>
      <div className={styles.Top}>
        <img src={Back} onClick={goBack} />
        <input
          type="text"
          placeholder="Search bookworms..."
          value={username}
          onChange={handleUsernameValueChange}
        />
        <input
          type="text"
          placeholder="Enter tagline"
          value={tag}
          onChange={handleTagValueChange}
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>
      <div className={styles.People}>
        {filteredUsers?.length > 0 ? (
          filteredUsers.map((filteredUser) => (
            <People
              username={filteredUser.username}
              tag={filteredUser.tag}
              profilePicture={filteredUser.profilePicture}
              id={filteredUser._id}
            />
          ))
        ) : (
          <h1>No users found</h1>
        )}
      </div>
    </div>
  );
}

const mapDispatchToProps = { getUsers };

export default connect(null, mapDispatchToProps)(SearchPeople);
