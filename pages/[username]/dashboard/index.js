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
    </div>
  );
}


export async function getServerSideProps(context) {
  const { username } = context.query;

  const cookies = qs.decode(context.req.headers.cookie, "; ");
  const Token = cookies?.token;


  const userData = await fetch(`${baseurl}/signin/verify`, {
    method: "POST",
    headers: new Headers({
      Authorization: "Bearer " + Token,
      "Content-Type": "application/x-www-form-urlencoded",
    }),
  }).then((res) => res.json());

  if (userData?.status != 200) {
    context.res.writeHead(302, {
      Location: "/",
    });
    context.res.end();
  }

  const data = await fetch(`${baseurl}/profile?username=${userData?.data?.username}`).then(
    (res) => res.json()
  );

  return { props: { data } };
}

