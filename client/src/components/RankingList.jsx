import React from "react";
import styles from "../css/RankingList.module.css";
import noPic from "../assets/account.png";

export const RankingList = ({ ranking }) => {
  const sortedRanking = ranking?.sort((a, b) => b.totalScore - a.totalScore);

  return (
    <>
      {sortedRanking?.map(
        (rank, index) =>
          index > 2 && (
            <div className={styles.RankingList}>
              <div className={styles.Specific_Ranklist}>
                <div className={styles.Specific_Ranklist_inner}>
                  <span className={styles.RankNum}>{index + 1}</span>
                  <img
                    className={styles.User}
                    src={rank?.profilePicture || noPic}
                  />
                  <div className={styles.Specific_Ranklist_inner_inner}>
                    <span>{rank?.username || "Not Found"}</span>
                  </div>
                </div>

                <div className={styles.Percent}>
                  <span>{rank?.totalScore || "0"} points</span>
                </div>
              </div>
            </div>
          )
      )}
      {Array.from({ length: 7 }, (_, index) => {
        const rank = sortedRanking?.[index]; // Get the rank object at the current index
        return (
          <div className={styles.RankingList}>
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
                <span>{rank?.totalScore || "0"} points</span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default RankingList;
