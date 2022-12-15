import react, { useEffect, useState } from "react";
import HeaderMain from "../../../components/HeaderMain";
import Links from "../../../components/Links";
import Profile from "../../../components/Profile";
import Submissions from "../../../components/Submissions";
import styles from "../../../styles/Profile.module.css";

export default function profile() {
  let data = null;
  return (
    <div style={{ paddingInline: "0px" }} className={styles.container}>
      <HeaderMain />
      <div style={{paddingInline:"5vw",marginTop:"3rem"}} className={styles.containerTop}>
        <div className={styles.containerTopLeft}>
          <Profile data={data} />
          <Submissions data={data} />
        </div>
        <div className={styles.containerTopRight}>
          <Links editable={true}/>
        </div>
      </div>
    </div>
  );
}
