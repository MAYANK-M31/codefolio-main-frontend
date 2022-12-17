import { useEffect, useState } from "react";
import styles from "../styles/Profile.module.css";

export default function TotalSolved({ data }) {
  const gettotalSolved = (gfg, leetcode) => {
  
    return {
      total:
        ((gfg && JSON.parse(gfg[0]?.count)) || 0) +
        ((leetcode && leetcode[0]?.count) || 0),
      easy:
        ((gfg && JSON.parse(gfg[3]?.count)) || 0) +
        ((leetcode && leetcode[1]?.count) || 0),
      medium:
        ((gfg && JSON.parse(gfg[4]?.count)) || 0) +
        ((leetcode && leetcode[2]?.count) || 0),
      hard:
        ((gfg && JSON.parse(gfg[5]?.count)) || 0) +
        ((leetcode && leetcode[3]?.count) || 0),
    };
  };

  let totalSolved = gettotalSolved(
    data?.gfg?.data?.submitStats,
    data?.leetcode?.data?.matchedUser?.submitStats?.totalSubmissionNum
  );

  const problemCount = totalSolved;


  return (
    <div className={styles.TotalCountDiv}>
      <div className={styles.profileBottom}>
        <div className={styles.numbers}>
          <h2>{problemCount.total}</h2>
          <p>Total Solved</p>
        </div>
        <div className={styles.numbers}>
          <h2>{problemCount.easy}</h2>
          <p style={{ color: "#27C93F" }}>Easy</p>
        </div>
        <div className={styles.numbers}>
          <h2>{problemCount.medium}</h2>
          <p style={{ color: "#FFBD2E" }}>Medium</p>
        </div>
        <div className={styles.numbers}>
          <h2>{problemCount.hard}</h2>
          <p style={{ color: "#FF5F56" }}>Hard</p>
        </div>
      </div>
    </div>
  );
}
