import React from "react";
import styles from "../css/Rank.module.css";

import noPic from "../assets/account.png";

export const Rank = ({ ranking }) => {
  const sortedRanking = ranking?.toSorted(
    (a, b) => b.totalScore - a.totalScore
  );
  return (
    <div className={styles.Rank}>
      <div className={styles.SpecificRank}>
        <span>{sortedRanking[2]?.username || "Not Found"}</span>

        <img
          className={styles.Rank1}
          src={sortedRanking[2]?.profilePicture || noPic}
        />
        <div className={styles.Rank_details2}>
          <span style={{ fontWeight: "bolder" }}>
            {sortedRanking[2]?.totalScore || "0"} points
          </span>
          <span style={{ textAlign: "center" }}>
            {new Date(sortedRanking[2]?.lastUpdated).toLocaleDateString(
              "en-US",
              {
                month: "long",
                day: "numeric",
                year: "numeric",
              }
            )}
          </span>
          <span className={styles.Number}>3</span>
        </div>
      </div>

      <div className={styles.SpecificRank}>
        <span>{sortedRanking[0]?.username || "Not Found"}</span>
        <img
          className={styles.Rank1}
          style={{ aspectRatio: "1/1", objectFit: "cover" }}
          src={sortedRanking[0]?.profilePicture || noPic}
        />
        <div className={styles.Rank_details}>
          <span style={{ fontWeight: "bolder" }}>
            {sortedRanking[0]?.totalScore} points
          </span>
          <span style={{ textAlign: "center" }}>
            {new Date(sortedRanking[0]?.lastUpdated).toLocaleDateString(
              "en-US",
              {
                month: "long",
                day: "numeric",
                year: "numeric",
              }
            )}
          </span>
          <span className={styles.Number}>1</span>
        </div>
      </div>

      <div className={styles.SpecificRank}>
        <span className={styles.Runner}>
          {sortedRanking[1]?.username || "Not Found"}
        </span>
        <img
          className={styles.Rank1}
          src={sortedRanking[1]?.profilePicture || noPic}
        />
        <div className={styles.Rank_details2}>
          <span style={{ fontWeight: "bolder" }}>
            {sortedRanking[1]?.totalScore || "0"} points
          </span>
          <span style={{ textAlign: "center" }}>
            {new Date(sortedRanking[1]?.lastUpdated).toLocaleDateString(
              "en-US",
              {
                month: "long",
                day: "numeric",
                year: "numeric",
              }
            )}
          </span>
          <span className={styles.Number}>2</span>
        </div>
      </div>
    </div>
  );
};

export default Rank;
