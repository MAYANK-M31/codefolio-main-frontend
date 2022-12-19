import React, { useState } from "react";
import styles from "../../styles/NavBar.module.css";
import Router from "next/router";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { baseurl } from "../../public/url";
import { setCookie } from "cookies-next";
import toast from "react-hot-toast";

export default function GoogleAuth() {
  const [isLoading, setisLoading] = useState(false);

  const googleSignIn = () => {
    setisLoading(true);
    try {
      setisLoading(true);
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((res) => {
          res.user.getIdToken().then(async (token) => {
            const data = await fetch(`${baseurl}/signin`, {
              method: "POST",
              headers: new Headers({
                Authorization: "Bearer " + token,
                "Content-Type": "application/x-www-form-urlencoded",
              }),
            }).then((res) => res.json());
            // console.log(data);
            if (data.status == 200) {
              toast.loading("PLEASE WAIT REDIRECTING", { duration: 4000 });

              setCookie("token", data.token, { maxAge: 86400 });
              setCookie("googleProfile", data.profile, { maxAge: 86400 });
              setCookie("username", data?.data?.username, { maxAge: 86400 });
              // IF NEW USER ONBOARD
              if (data?.newuser) {
                Router.push(`/${data?.data?.username}/profile`);
              } else {
                Router.push(`/${data?.data?.username}/dashboard`);
              }
              toast.success("Loggedin successfully");
              // setisLoading(false);
            } else {
              setisLoading(false);
              toast.error("Please Login Again");
            }
            // console.log(token);
          });
        })
        .catch((e) => {
          console.log(e);
          setisLoading(false);
          toast.error("Please Login Again");
        });
    } catch (error) {
      console.error(error);
      setisLoading(false);
      toast.error("Please Login Again");
    }
  };

  const googleSignOut = () => {
    try {
      signOut(auth).then((res) => {
        console.log(res);
        alert("Sign Out");
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div onClick={googleSignIn} className={styles.btnYear}>
      {!isLoading ? <p>Login</p> : <p>Loading</p>}
    </div>
  );
}
