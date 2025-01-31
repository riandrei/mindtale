import React from "react";
import styles from "../css/Achievements.module.css";

const Achievements = ({ achievements }) => {
  console.log("achievements", achievements);
  return (
    <div className={styles.Achievements}>
      <h1 style={{ width: "100%", textAlign: "center", marginTop: "2rem" }}>
        Achievements:
      </h1>
      <div className={styles.achievementGrid}>
        {achievements.length > 0 ? (
          achievements.map((achievement, index) => (
            <div key={index} className={styles.achievementBox}>
              <img
                style={{ width: "250px", height: "250px" }}
                src={achievement.image || "/default-badge.png"}
                alt={`${achievement.name} Badge`}
                className={styles.achievementImage}
              />
              <h3 className={styles.achievementTitle}>{achievement.name}</h3>
              <p className={styles.achievementSubtitle}>
                {achievement.subtitle}
              </p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No achievements unlocked yet!</p>
        )}
      </div>
    </div>
  );
};

export default Achievements;
