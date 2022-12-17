import react, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { baseurl } from "../../../public/baseurl";
import styles from "../../../styles/Profile.module.css";
import Profile from "../../../components/Profile";
import Submissions from "../../../components/Submissions";
import Links from "../../../components/Links";
import HeaderMain from "../../../components/HeaderMain"
import qs from "querystring"

export default function profile({data}) {
 
  const [isLoading, setisloading] = useState(false);

  useEffect(() => {
    
    setisloading(false);
  }, []);
  
  if (isLoading) return <h1>Loading</h1>;
  if (data?.status == 404) return <h1>USER NOT FOUND</h1>;
  
  return (
    <div style={{ paddingInline: "0px" }} className={styles.container}>
      <HeaderMain username={data?.user?.username} />
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
      <div className={styles.BottomLinkDiv}>
        <Links data={data} />
      </div>
    </div>
  );
}


export async function getServerSideProps(context) {

  const cookies = qs.decode(context.req.headers.cookie, "; ");
  const username = cookies?.username
 
  const data = await fetch(`${baseurl}/profile?username=${username}`).then(
    (res) => res.json()
  );

  return { props: { data } };
}

