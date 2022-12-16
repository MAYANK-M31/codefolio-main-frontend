import Head from 'next/head'
import Image from 'next/image'
import NavBar from '../components/NavBar'
import styles from '../styles/Home.module.css'
import { Toaster } from 'react-hot-toast';
import qs from "querystring";
import { baseurl } from '../public/baseurl';
import { useEffect, useState } from 'react';


export default function Home() {

  return (
    <div className={styles.container}>
      <NavBar/>
      <Head>
        <title>CODEFOLIO</title>
        <meta property="og:image" content={`https://assets.vercel.com/image/upload/front/vercel/dps.png`} />

        <meta name="description" content="Build Stunning code porfolio in bio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
      <Toaster/>
    </div>
  )
}



export async function getServerSideProps(context) {
  const cookies = qs.decode(context.req.headers.cookie, "; ");
  const Token = cookies?.token;


  const {status,data} = await fetch(`${baseurl}/signin/verify`, {
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


  return { props: {  } }
}
