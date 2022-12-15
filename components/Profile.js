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
  const [user, setuser] = useState(null);
  const [globalrank, setglobalrank] = useState(0);
  const [schoolrank, setschoolrank] = useState(0);
  const [imagelink, setimagelink] = useState("/logo.svg");

  const gettotalSolved = (gfg, leetcode) => {
    return {
      total:
        (gfg && JSON.parse(gfg[0]?.count)) ||
        0 + (leetcode && leetcode[0]?.count) ||
        0,
      easy:
        (gfg && JSON.parse(gfg[3]?.count)) ||
        0 + (leetcode && leetcode[1]?.count) ||
        0,
      medium:
        (gfg && JSON.parse(gfg[4]?.count)) ||
        0 + (leetcode && leetcode[2]?.count) ||
        0,
      hard:
        (gfg && JSON.parse(gfg[5]?.count)) ||
        0 + (leetcode && leetcode[3]?.count) ||
        0,
    };
  };

  useEffect(() => {
console.log(data);
    if (data && data?.status == 200) {
      let totalSolved = gettotalSolved(
        data?.gfg?.data?.submitStats,
        data?.leetcode?.data?.matchedUser?.submitStats?.totalSubmissionNum
      );
      console.log(totalSolved);
      setproblemCount(totalSolved);
      setuser(data?.user);
      setimagelink(data?.user.profile);
      setschoolrank(data?.gfg?.data?.profile?.rank);
      setglobalrank(data?.leetcode?.data?.matchedUser?.profile?.ranking);
    }
  }, [data]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  
  return (
    <div className={styles.profileDiv}>
      <div className={styles.profileLeft}>
        <img
          onError={() => setimagelink("/logo.svg")}
          className={styles.profileimg}
          referrerpolicy="no-referrer"
          src={imagelink}
        />
        <div className={styles.profileTextDiv}>
          <h1>{user?.name}</h1>
          <h2>{user?.title}</h2>
          <p>{user?.bio}</p>
          <span>Rank:</span>
          <div className={styles.linksDiv}>
            <div className={styles.rank}>
              <img
                style={{ marginTop: "0.1rem" }}
                src="/icons/globe.png"
                alt="lc"
              />
              <p>{globalrank == 0 ? "-" : numberWithCommas(globalrank)}</p>
            </div>

            <div className={styles.rank}>
              <img src="/icons/school.png" alt="lc" />
              <p>{schoolrank == 0 ? "-" : numberWithCommas(schoolrank)}</p>
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
