import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, connect } from "react-redux";

import { getUser } from "../actions/authActions";
import { getStories } from "../actions/storyActions";

import styles from "../css/Profile.module.css";
import Cover from "../assets/sample.jpg";
import Settings from "../assets/settings.png";
import Off from "../assets/turn-off.png";
import Dowelle from "../assets/Dowelle.jpg";
import Friend from "../assets/friends.png";
import Check from "../assets/completed.png";
import Saves from "../assets/saved.png";
import Invite from "../assets/invite.png";
import Info from "../assets/info.png";
import Story from "../assets/artwork9.jpg";
import Back from "../assets/back.png";
import Logo from "../assets/mindtale.png";
import Photocard from "../assets/photocard1.png";

import Footer from "../components/Footer";
import Saved from "../components/Saved";
import Completed from "../components/Completed";
import Friends from "../components/Friends";
import Achievements from "../components/Achievements";
import About from "../components/About";
import Nav from "../components/Nav";

function UserProfile({ getUser, getStories }) {
  const [activeIndex, setActiveIndex] = useState(0); // State to keep track of active index, initialized to 0

  const handleDivClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index); // Toggle active index
  };

  const redirect = () => {
    window.location.href = "/Login";
  };
  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    redirect();
  };

  const user = useSelector((state) => state.auth?.user);
  const stories = useSelector((state) => state.story.stories);

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      getUser();
    }
    if (stories.length === 0) {
      getStories();
    }
  }, []);
  return (
    <div className={styles.Profile}>
      <Nav />
      <div className={styles.Top}>
        <Link to={`/Homepage`}>
          <img src={Back} />
        </Link>
        <div className={styles.Top_inner}>
          <Link to={`/Settings`}>
            <img src={Settings} />
          </Link>
          <img src={Off} onClick={handleLogoutClick} />
        </div>
      </div>

      <div className={styles.Middle}>
        <div className={styles.Middle_top}>
          <div className={styles.Middle_line}></div> <img src={Logo} />
          <div className={styles.Middle_line}></div>
        </div>
        <img className={styles.Photocard} src={Photocard} />
        <span className={styles.Name}>{user?.username}</span>
        <div className={styles.Round}>
          <span>{`#${user?.tag}`}</span>
        </div>
      </div>

      <div className={styles.User_details}>
        <div className={styles.User_head}>
          <div
            className={
              activeIndex === 0 ? styles.UserHead_click2 : styles.UserHead_click
            }
            onClick={() => handleDivClick(0)}
          >
            <img src={Check} />
            <span>Completed</span>
          </div>
          <div
            className={
              activeIndex === 1 ? styles.UserHead_click2 : styles.UserHead_click
            }
            onClick={() => handleDivClick(1)}
          >
            <img src={Saves} />
            <span>Saved</span>
          </div>
          {/* <div
            className={
              activeIndex === 2 ? styles.UserHead_click2 : styles.UserHead_click
            }
            onClick={() => handleDivClick(2)}
          >
            <img src={Invite} />
            <span>Achievements</span>
          </div> */}
          <div
            className={
              activeIndex === 3 ? styles.UserHead_click2 : styles.UserHead_click
            }
            onClick={() => handleDivClick(3)}
          >
            <img src={Friend} />
            <span>Friends</span>
          </div>
          <div
            className={
              activeIndex === 4 ? styles.UserHead_click2 : styles.UserHead_click
            }
            onClick={() => handleDivClick(4)}
          >
            <img src={Info} />
            <span>About</span>
          </div>
        </div>
        {activeIndex === 0 ? (
          <Completed />
        ) : activeIndex === 1 ? (
          <Saved />
        ) : activeIndex === 2 ? (
          <Achievements />
        ) : activeIndex === 3 ? (
          <Friends />
        ) : activeIndex === 4 ? (
          <About />
        ) : null}
      </div>
      <Footer />
    </div>
  );
}

const mapDispatchToProps = {
  getUser,
  getStories,
};

export default connect(null, mapDispatchToProps)(UserProfile);
