import Head from "next/head";
import Image from "next/image";
import NavBar from "../components/NavBar";
import styles from "../styles/Home.module.css";
import toast, { Toaster } from "react-hot-toast";
import qs from "querystring";
import { baseurl } from "../public/url";
import { useEffect, useState } from "react";
import GoogleAuth from "../Modules/Auth/googleAuth";
import GoogleAuth2 from "../Modules/Auth/googleAuth2";

export default function Home() {
  return (
    <div className={styles.container}>
      <NavBar />
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

      <main className={styles.main}>
        <h1 className={styles.title}>
          All <span className={styles.first}>Coding</span> Profiles at{" "}
          <span className={styles.second}>One Place</span>{" "}
        </h1>
        <h1 className={styles.title}>
          in one <span className={styles.third}>Simple Link.</span>
        </h1>

        <GoogleAuth2 />
        <div className={styles.grid}>
          <img src={"/example.png"} />
        </div>
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
      <Toaster />
    </div>
  );
}

export async function getServerSideProps(context) {
  const cookies = qs.decode(context.req.headers.cookie, "; ");
  const Token = cookies?.token;

  const { status, data } = await fetch(`${baseurl}/signin/verify`, {
    method: "POST",
    headers: new Headers({
      Authorization: "Bearer " + Token,
      "Content-Type": "application/x-www-form-urlencoded",
    }),
  }).then((res) => res.json());

  if (status == 200) {
    context.res.writeHead(302, {
      Location: "/" + data?.username + "/dashboard",
    });
    context.res.end();
  }

  return { props: {} };
}
