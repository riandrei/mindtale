import { useSelector } from "react-redux";

import styles from "../css/Friends.module.css";
import User1 from "../assets/jem.jpg";

export default function Friends() {
  const user = useSelector((state) => state.auth?.user);

  return (
    <div className={styles.Friends}>
      {user?.friends?.length > 0 ? (
        <div className={styles.Specific_friend}>
          <img src={User1} />
          <div className={styles.Friends_inner}>
            <h3>Jem Andrei</h3>
            <span>19 mutual friends</span>
          </div>
        </div>
      ) : (
        <h1>Friends show up here.</h1>
      )}
    </div>
  );
}
