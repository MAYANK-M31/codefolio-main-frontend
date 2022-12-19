import react, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { baseurl } from "../../../public/url";
import styles from "../../../styles/Profile.module.css";
import Profile from "../../../components/Profile";
import Submissions from "../../../components/Submissions";
import Links from "../../../components/Links";
import HeaderMain from "../../../components/HeaderMain";
import qs from "querystring";
import TotalSolved from "../../../components/TotalSolved";
import Loader from "react-spinners/PacmanLoader";

const override = {
  borderColor: "white",
};

import dynamic from "next/dynamic";
import { getCookie, setCookie } from "cookies-next";
import TypeWriter from "../../../components/Typewriter";

const JoyRideNoSSR = dynamic(() => import("react-joyride"), { ssr: false });

const steps = [
  {
    target: ".Header_linkBar__SzFjN",
    content: "PUBLIC CODEFOLIO LINK!! COPY FROM HERE.",
  },
  {
    target: ".Header_userBtn__WHdlu",
    content: "EDIT YOUR PROFILE FROM HERE.",
  },
  {
    target: "#addlink",
    content: "ADD NEW LINK USING THIS BUTTON.",
  },
];

export default function profile() {
  const [isLoading, setisloading] = useState(true);
  const [data, setdata] = useState(null);

  const tour = getCookie("tour") && true;

  const username = getCookie("username");

  useEffect(() => {
    const Fetch = async () => {
      const response = await fetch(
        `${baseurl}/profile?username=${username}`
      ).then((res) => res.json());
      setisloading(false);
      setdata(response);
    };

    Fetch();
  }, []);

  if (isLoading)
    return (
      <div className={styles.loadContainer} >
      <Loader
        color={"#ffffff"}
        loading={true}
        cssOverride={override}
        size={35}
        aria-label="Loading Spinner"
        data-testid="loader"
        className={"loader"}
      />
      <p>Fetching your Awesome Profile <span className={styles.emoji}>😍</span></p>
      <p>Collecting & Merging Realtime Data from <TypeWriter data={["Leetcode.","GeeksForGeeks."]} /> </p>

      </div>
    );
  if (data?.status == 404) return <h1>USER NOT FOUND</h1>;

  return (
    <div>
      <HeaderMain username={data?.user?.username} />
      <JoyRideNoSSR
        run={tour}
        steps={steps}
        styles={{
          options: {
            arrowColor: "#e3ffeb",
            backgroundColor: "white",
            overlayColor: "rgba(0, 0, 0, 0.8)",
            primaryColor: "#27C937",
            textColor: "#004a14",
            width: "fit-content",
          },
        }}
        scrollToFirstStep={true}
        spotlightClicks={true}
        showSkipButton={true}
        disableCloseOnEsc={true}
        continuous={true}
        nonce={true}
        showProgress={true}
        hideCloseButton={true}
        callback={(e) => {
          e.action == "reset" &&
            setCookie("tour", false, {
              maxAge: Date.now() + 2 * 10 * 365 * 24 * 60 * 60,
            });
        }}
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

// export async function getServerSideProps(context) {
//   const cookies = qs.decode(context.req.headers.cookie, "; ");
//   const username = cookies?.username;

//   const data = await fetch(`${baseurl}/profile?username=${username}`).then(
//     (res) => res.json()
//   );

//   return { props: { data } };
// }
