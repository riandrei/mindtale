import React from "react";
import Nav from "../components/Nav";
import NameTag from "../components/NameTag";
import Notification from "../components/Notification";
import Gem from "../components/GemContainer";
import GemContainer from "../components/GemContainer";

import Search from "../assets/search.png";

import styles from "../css/TopBar.module.css";

export function TopBar(props) {
  return (
    <div className={styles.TopBar}>
      <div className={styles.TopBar_inner}>
        <NameTag />
        <Notification />
      </div>
      <div className={styles.TopInput}>
        <img src={Search} alt="" />
        <input maxLength={30} type="text" placeholder="Search story..." />
      </div>
    </div>
  );
}

export default TopBar;
