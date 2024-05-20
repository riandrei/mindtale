import React, { useState } from "react";
import { useSelector } from "react-redux";

import styles from "../css/Notification.module.css";
import Notif from "../assets/notification.png";
import Close from "../assets/close.png";
import FriendNotifcation from "../components/FriendNotification";
import AdminNotification from "../components/AdminNotification";
import Reading from "../assets/reading.png";

function Notification() {
  const [isHaveNotif, setIsHaveNotif] = useState(true);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const handleNotificationClick = () => {
    console.log("Hello");
    setIsNotifOpen(!isNotifOpen);
  };

  const user = useSelector((state) => state.auth.user);

  return (
    <div className={styles.Notification}>
      <img src={Notif} onClick={handleNotificationClick} />
      <span className={styles.badge}>9</span>

      <div
        className={
          isNotifOpen ? styles.notification_open : styles.notification_close
        }
      >
        <div className={styles.notification_title}>
          <h1>Notification</h1>
          <button onClick={handleNotificationClick}>
            {" "}
            <img className={styles.close} src={Close} />{" "}
          </button>
        </div>
        <div className={styles.friend_request}>
          {user?.friendRequest?.length < 1 ? (
            <div className={styles.no_notif}>
              <img style={{ width: "90%", height: "auto" }} src={Reading} />
              <h1>Looks like you have no notification</h1>
            </div>
          ) : (
            user?.friendRequests?.map((friend) => (
              <FriendNotifcation id={friend} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Notification;
