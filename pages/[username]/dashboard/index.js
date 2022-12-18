import react, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { baseurl } from "../../../public/baseurl";
import styles from "../../../styles/Profile.module.css";
import Profile from "../../../components/Profile";
import Submissions from "../../../components/Submissions";
import Links from "../../../components/Links";
import HeaderMain from "../../../components/HeaderMain";
import qs from "querystring";
import TotalSolved from "../../../components/TotalSolved";
import Joyride from 'react-joyride';

import dynamic from 'next/dynamic'

const JoyRideNoSSR = dynamic(
  () => import('react-joyride'),
  { ssr: false }
)

const steps = [
  {
    target: ".Header_linkBar__SzFjN",
    content: "Public codefolio link. Copy From Here",
  },
  {
    target: ".Header_userBtn__WHdlu",
    content: "Edit your Profile From Here",
  },
  {
    target: ".Links_headingdiv__usDX2 img",
    content: "Add New Links using this Button",
  }
];

export default function profile({ data }) {
  const [isLoading, setisloading] = useState(false);

  useEffect(() => {
    setisloading(false);
  }, []);

  if (isLoading) return <h1>Loading</h1>;
  if (data?.status == 404) return <h1>USER NOT FOUND</h1>;

  return (
    <div>
      <HeaderMain username={data?.user?.username} />
      <JoyRideNoSSR
      run={false}
       steps={steps} 
       styles={{
        options: {
          arrowColor: '#e3ffeb',
          backgroundColor: 'white',
          overlayColor: 'rgba(255, 255, 255, 0.3)',
          primaryColor: '#27C937',
          textColor: '#004a14',
          width: "fit-content",
        }
      }}
      showSkipButton={true}
      disableCloseOnEsc={true}
      continuous={true}
      nonce={true}
      showProgress={true}
      hideCloseButton={true}
      />
      <div style={{ marginTop: "5rem" }} className={styles.container}>
        <div className={styles.containerTop}>
          <div className={styles.containerTopLeft}>
            <Profile data={data} />
            <TotalSolved data={data} />
            <Submissions data={data} />
          </div>

          <div className={styles.containerTopRight}>
            <Links data={data} editable={true} />
          </div>
        </div>

        <div className={styles.BottomLinkDiv}>
          <Links data={data} editable={true} />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const cookies = qs.decode(context.req.headers.cookie, "; ");
  const username = cookies?.username;

  const data = await fetch(`${baseurl}/profile?username=${username}`).then(
    (res) => res.json()
  );

  return { props: { data } };
}
