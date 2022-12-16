import { deleteCookie } from "cookies-next";
import  Router  from "next/router";
import { useState } from "react";
import styles from "../styles/Header.module.css";


export default function HeaderMain({ username }) {
  const [open,setopen] = useState(false)
  const logout = ()=>{
    deleteCookie("token");
    deleteCookie("googleProfile")
    deleteCookie("username")
    console.log(Router);
    // Router.push(Router.basePath)
  }
  return (
    <div className={styles.Main}>
      <div className={styles.section}>
        <img src="/logo.svg" />
      </div>
      <div className={styles.section}>
        <div className={styles.linkBar}>
          <img src="/icons/lock.svg" />
          <p>codefolio.link/MAYANK-M31</p>
          <img src="/icons/link.svg" />
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.utility}>
          <div className={styles.refresh}>
            <img src="/icons/reload.svg" />
          </div>
          <div onClick={()=>setopen(x=>!x)} className={styles.userBtn}>
            {username} <img src="/icons/angle-down.svg" />

            {open &&
            <div className={styles.dropdown}>
              <div onClick={()=>Router.push(Router.basePath+"/"+username+"/profile")} className={styles.userBtn}>
                Edit Profile
              </div>
              <div onClick={logout} style={{"color":"rgb(255, 95, 86)"}} className={styles.userBtn}>
                Logout
              </div>
            </div>
}
          </div>
        </div>
      </div>
    </div>
  );
}
