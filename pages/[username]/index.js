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

export default function profile({ data }) {
  if (data?.status == 404) return <h1>USER NOT FOUND</h1>;

  return (
    <div className={styles.container}>
      <div className={styles.containerTop}>
        <div className={styles.containerTopLeft}>
          <Profile data={data} />
          <Submissions data={data} />
        </div>
        <div className={styles.containerTopRight}>
          <Links data={data} />
        </div>
      </div>
      {/* <Projects /> */}

      {/* CODEFOLIO LAST BRANDING */}
      <div className="ENDLOGO">
        <img src="/icons/madewithlove.svg" />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { username } = context.query;

  const data = await fetch(`${baseurl}/profile?username=${username}`).then(
    (res) => res.json()
  );

  return { props: { data} };
}
