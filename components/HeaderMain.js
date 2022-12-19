import { deleteCookie } from "cookies-next";
import Router from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/Header.module.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";

export default function HeaderMain({ username }) {
  const [open, setopen] = useState(false);
  const logout = () => {
    deleteCookie("token");
    deleteCookie("googleProfile");
    deleteCookie("username");
    Router.push("/");
  };

  const [link, setlink] = useState(`codefolio.link/${username}`);

  useEffect(() => {
    setlink(`${window.location.host}/${username}`);
  }, []);

  return (
    <div className={styles.Main}>
      <Toaster />

      <div className={styles.section}>
        <img className={styles.logo} src="/logo.svg" />
      </div>
      <div className={styles.section}>
        <div className={styles.linkBar}>
          <img src="/icons/lock.svg" />
          <p>{link}</p>
          <img
            className={styles.clip}
            onClick={() => {
              navigator.clipboard.writeText("https://"+link),
                toast.success("Copied to clipboard");
            }}
            src="/icons/link.svg"
          />
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.utility}>
          {/* <div className={styles.refresh}>
            <img src="/icons/reload.svg" />
          </div> */}
          <div onClick={() => setopen((x) => !x)} className={styles.userBtn}>
            <p>{username}</p>
            <img src="/icons/angle-down.svg" />

            {open && (
              <div className={styles.dropdown}>
                <div
                  onClick={() =>
                    Router.push(Router.basePath + "/" + username + "/profile"+"?canGoBack=true")
                  }
                  className={styles.userBtn}
                >
                  Edit Profile
                </div>
                <div
                  onClick={logout}
                  style={{ color: "rgb(255, 95, 86)" }}
                  className={styles.userBtn}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
