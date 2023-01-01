import react, { useEffect, useState } from "react";
import Router from "next/router";
import { useQuery, prefetchQuery } from "react-query";
import { baseurl, cdnurl } from "../../public/url";
import styles from "../../styles/Profile.module.css";
import Profile from "../../components/Profile";
import Submissions from "../../components/Submissions";
import Links from "../../components/Links";
import Projects from "../../components/Projects";
import ExpandCard from "../../components/ExpandCard";
import qs from "querystring";
import Head from "next/head";
import TotalSolved from "../../components/TotalSolved";


export default function profile({ data }) {
  if (data?.status == 404) return <h1>USER NOT FOUND</h1>;
  const [Data,setData] = useState(data)

  useEffect(()=>{
    setData(data)
  },[data])

  const [link, setlink] = useState(`codefolio.link`);

  const toogleYear = (y) => {
    const Fetch = async () => {
      const response = await fetch(
        `${baseurl}/profile?username=${data?.user?.username}&year=${y}`
      ).then((res) => res.json());
      setData(response);
    };
    Fetch();
  };

  useEffect(() => {
    setlink(`https://${window.location.host}`);
  }, []);

  return (
    <div className={styles.container}>

      <Head>
        <title>{data?.user && data?.user?.name.toUpperCase()+":PORTFOLIO" || "CODEFOLIO"}</title>
        <meta
          property="og:image"
          content={data?.user?.profile || `https://codefolio-mayank-m31.vercel.app/icons/vercel.png`}
        />

        <meta
          name="description"
          content={`This is my Porfolio please check out. Poweredby:Codefolio `}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.containerTop}>
        <div className={styles.containerTopLeft}>
          <Profile data={data} />
          <TotalSolved data={data} />
          <Submissions data={Data} changeYear={toogleYear} currYear={new Date().getFullYear()} />
        </div>
        <div className={styles.containerTopRight}>
          <Links data={data} />
        </div>
      </div>
  
        <div className={styles.BottomLinkDiv}>
          <Links data={data} />
        </div>

      {/* <Projects /> */}

      {/* CODEFOLIO LAST BRANDING */}
      <a href={link} className="ENDLOGO">
        <img src="/icons/madewithlove.svg" />
      </a>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { username } = context.query;



  const data =  fetch(`${cdnurl}?username=${username}`).then(
    (res) => res.json()
  );

  
  const onlyUserdata =  fetch(`${baseurl}/profile?username=${username}&onlyuserdata=true`).then(
    (res) => res.json()
  );

  return Promise.all([onlyUserdata,data]).then((res)=>{
    var resData = {user:null,gfg:null,leetcode:null,status:200}
    resData.user = res[0]?.user
    resData.gfg = res[1]?.gfg
    resData.leetcode = res[1]?.leetcode
    resData.status = res[0]?.status || res[1]?.status
    return { props: { data:resData } }
  })

}
