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
  const [usernotfound, setusernotfound] = useState(false);

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

  if (error) return console.log(error);

  useEffect(() => {
    if (data && data?.status == 404) {
      setusernotfound(true);
    }
  }, [isLoading]);

  return (
    <div className={styles.container}>
      {usernotfound ? (
        <h1>USER NOT FOUND</h1>
      ) : (
        <>
          <div className={styles.containerTop}>
            <div className={styles.containerTopLeft}>
              <Profile data={data} />
              <Submissions data={data} />
            </div>
            <div className={styles.containerTopRight}>
              <Links />
            </div>
          </div>
          <Projects />
        </>
      )}

      {/* CODEFOLIO LAST BRANDING */}
      <div className="ENDLOGO">
      <img  src="/icons/madewithlove.svg" />

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
