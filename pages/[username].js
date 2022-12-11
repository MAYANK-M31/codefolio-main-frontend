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
              <button>
                <img src="/icons/leetcode.png" alt="lc" />
              </button>
              <button className="gfgicon">
                <img src="/icons/gfg.png" alt="GFG" />
              </button>
            </div>
          </div>
        </div>
        <div className={styles.profileRight}></div>
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
