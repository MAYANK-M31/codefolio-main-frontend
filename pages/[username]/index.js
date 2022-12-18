import react, { useEffect, useState } from "react";
import Router from "next/router";
import { useQuery, prefetchQuery } from "react-query";
import { baseurl } from "../../public/baseurl";
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

  const [link, setlink] = useState(`codefolio.link`);

  useEffect(() => {
    setlink(`https://${window.location.host}`);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>CODEFOLIO:Link-In-Bio</title>
        <meta
          property="og:image"
          content={`https://codefolio-mayank-m31.vercel.app/icons/vercel.png`}
        />

        <meta
          name="description"
          content="Build Stunning code porfolio in bio"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.containerTop}>
        <div className={styles.containerTopLeft}>
          <Profile data={data} />
          <TotalSolved data={data} />
          <Submissions data={data} />
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

  const data = await fetch(`${baseurl}/profile?username=${username}`).then(
    (res) => res.json()
  );

  return { props: { data } };
}
