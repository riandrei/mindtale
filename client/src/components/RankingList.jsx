import React from "react";
import styles from "../css/RankingList.module.css";
import noPic from "../assets/account.png";

export const RankingList = ({ ranking }) => {
  const sortedRanking = ranking?.toSorted(
    (a, b) => b.totalScore - a.totalScore
  );

  return (
    <>
      {/* Renders the ranks from 4 and onward */}
      {sortedRanking?.slice(3).map((rank, index) => (
        <div key={index} className={styles.RankingList}>
          <div className={styles.Specific_Ranklist}>
            <div className={styles.Specific_Ranklist_inner}>
              <span className={styles.RankNum}>{index + 4}</span>
              <img
                className={styles.User}
                src={rank?.profilePicture || noPic}
              />
              <div className={styles.Specific_Ranklist_inner_inner}>
                <span>{rank?.username || "Not Found"}</span>
              </div>
            </div>
            <div className={styles.Percent}>
              <span>
                {new Date(sortedRanking[2]?.lastUpdated).toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }
                )}
              </span>
              <span style={{ marginLeft: "20px", fontWeight: "bolder" }}>
                {rank?.totalScore || "0"} points
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* Fallback if less than 7 rankings exist */}
      {Array.from(
        { length: Math.max(0, 10 - (sortedRanking?.length || 0)) },
        (_, index) => (
          <div key={`empty-${index}`} className={styles.RankingList}>
            <div className={styles.Specific_Ranklist}>
              <div className={styles.Specific_Ranklist_inner}>
                <span className={styles.RankNum}>
                  {index + sortedRanking?.length + 1}
                </span>
                <img className={styles.User} src={noPic} />
                <div className={styles.Specific_Ranklist_inner_inner}>
                  <span>Not Found</span>
                </div>
              </div>
              <div className={styles.Percent}>
                <span>0 points</span>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default RankingList;
