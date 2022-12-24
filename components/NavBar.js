import styles from "../styles/NavBar.module.css";
import GoogleAuth from "../Modules/Auth/googleAuth";
import  Router  from "next/router";
export default function NavBar({ open }) {
  return (
    <div className={styles.Main}>
      <img src="/logo.svg" />
      {/* <button onClick={()=>Router.push("/leaderboard")} className={styles.leaderbtn}>Leaderboard</button> */}
      <GoogleAuth />
    </div>
  );
}
