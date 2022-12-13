import { useEffect, useState } from "react";
import styles from "../styles/Profile.module.css";

var problemsSolved = {
  easy: 0,
  medium: 0,
  hard: 0,
  total: 0,
};

export default function Profile({ data }) {
  const [problemCount, setproblemCount] = useState(problemsSolved);

  const gettotalSolved = (gfg, leetcode) => {
    return {
      total:
        ((gfg && JSON.parse(gfg[0]?.count)) + (leetcode && leetcode[0]?.count)) || 0,
      easy:
        ((gfg && JSON.parse(gfg[3]?.count)) + (leetcode && leetcode[1]?.count)) || 0,
      medium:
        ((gfg && JSON.parse(gfg[4]?.count)) + (leetcode && leetcode[2]?.count)) || 0,
      hard:
        ((gfg && JSON.parse(gfg[5]?.count)) + (leetcode && leetcode[3]?.count)) || 0,
    };
  };

  useEffect(() => {
    let totalSolved = gettotalSolved(
      data?.gfg?.data?.submitStats,
      data?.leetcode?.data?.matchedUser?.submitStats?.totalSubmissionNum
    );
    setproblemCount(totalSolved);
  }, [data]);

  return (
    <div className={styles.profileDiv}>
      <div className={styles.profileLeft}>
        <img
          src="https://media.geeksforgeeks.org/auth/profile/0qzwgked2yyt9siozgb3"
          className={styles.profileimg}
        />
        <div className={styles.profileTextDiv}>
          <h1>MAYANK MALHOTRA</h1>
          <h2>SOFTWARE ENGINEER INTERN</h2>
          <p>Profiles:</p>
          <div className={styles.linksDiv}>
            <div className={styles.linksBtn}>
              <img src="/icons/leetcode.png" alt="lc" />
            </div>
            <div className={styles.linksBtn}>
              <img src="/icons/gfg.png" alt="GFG" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.profileRight}>
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
