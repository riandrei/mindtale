import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import styles from "../css/NameTag.module.css";

import Dowelle from "../assets/Dowelle.jpg";

function NameTag() {
  const username = useSelector((state) => state.auth.user.username);
  return (
    <div className={styles.NameTag}>
      <Link to="/Profile">
        <img src={Dowelle} />
      </Link>
      <div className={styles.NameTag_names}>
        <p>{username || "Not Logged In"}</p>
        <p>Free</p>
      </div>
    </div>
  );
}

export default NameTag;
