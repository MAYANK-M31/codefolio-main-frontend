import react, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { baseurl } from "../../../public/baseurl";
import styles from "../../../styles/Profile.module.css";
import Profile from "../../../components/Profile";
import Submissions from "../../../components/Submissions";
import Links from "../../../components/Links";
import HeaderMain from "../../../components/HeaderMain"


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
    <div style={{ paddingInline: "0px" }} className={styles.container}>
      <HeaderMain />
      <div
        style={{ paddingInline: "5vw", marginTop: "3rem" }}
        className={styles.containerTop}
      >
        <div className={styles.containerTopLeft}>
          <Profile data={data} />
          <Submissions data={data} />
        </div>
        <div className={styles.containerTopRight}>
          <Links data={data} editable={true} />
        </div>
      </div>
    </div>
  );
}
