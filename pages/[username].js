import react, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { baseurl } from "../public/baseurl";
import styles from "../styles/Profile.module.css";

export default function profile() {
  const router = useRouter();

  const { username } = router.query;
  const { isLoading, error, data } = useQuery(
    "repoData",
    () =>
      fetch(`${baseurl}/profile?username=${username}`).then((res) =>
        res.json()
      ),
    {
      enabled: !!username,
    }
  );

  if (error) return console.error(error);

  console.log(data);

  return (
    <div className={styles.container}>
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
              <div className={styles.linksBtn} >
                <img src="/icons/leetcode.png" alt="lc" />
              </div>
              <div className={styles.linksBtn} >
                <img src="/icons/gfg.png" alt="GFG" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.profileRight}>
          <div className={styles.numbers} >
            <h2>250</h2>
            <p>Total Solved</p>
          </div>
          <div className={styles.numbers} >
            <h2>250</h2>
            <p style={{color:"#27C93F"}} >Easy</p>
          </div>
          <div className={styles.numbers} >
            <h2>250</h2>
            <p style={{color:"#FFBD2E"}}>Medium</p>
          </div>
          <div className={styles.numbers} >
            <h2>250</h2>
            <p style={{color:"#FF5F56"}}>Hard</p>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div>
      <p>{username}</p>
      {!isLoading ? (
        <div>
          <img src={data?.gfg?.data?.profile?.userAvatar}></img>
          <p>{JSON.stringify(data)}</p>
        </div>
      ) : (
        <p>LOADING..</p>
      )}
    </div> */
}
