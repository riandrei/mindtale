import { useSelector } from "react-redux";

import styles from "../css/NameTag.module.css";

import Dowelle from "../assets/Dowelle.jpg";

function NameTag() {
  const username = useSelector((state) => state.auth.user.username);
  return (
    <div className={styles.NameTag}>
      <img src={Dowelle} />
      <div className={styles.NameTag_names}>
        <p>{username || "Not Logged In"}</p>
        <p>Free</p>
      </div>
    </div>
  );
}

export default NameTag;
