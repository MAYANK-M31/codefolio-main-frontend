import react, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { baseurl } from "../public/baseurl";
import styles from "../styles/Profile.module.css";
import Profile from "../components/Profile";
import Submissions from "../components/Submissions";
import Links from "../components/Links";
import Projects from "../components/Projects";
import ExpandCard from "../components/ExpandCard";

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
      <div className={styles.containerTop}>
        <div className={styles.containerTopLeft} >
          <Profile data={data} />
          <Submissions data={data} />
        </div>
        <div className={styles.containerTopRight}>
          <Links/>
        </div>
      </div>
      <Projects />
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
