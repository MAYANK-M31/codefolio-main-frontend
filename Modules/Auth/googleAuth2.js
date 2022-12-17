import React, { useState } from "react";
import styles from "../../styles/Home.module.css";
import Router from "next/router";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { baseurl } from "../../public/baseurl";
import { setCookie } from "cookies-next";
import toast from "react-hot-toast";

export default function GoogleAuth2() {
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
              setCookie("token", data.token);
              setCookie("googleProfile", data.profile);
              console.log(data);

              setCookie("username", data?.data?.username);
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
              toast.error("Login Failed Try Again");
            }
            console.log(token);
          });
        })
        .catch((e) => {
          console.log(e);
          setisLoading(false);
        });
    } catch (error) {
      console.error(error);
      setisLoading(false);
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
    <p onClick={googleSignIn} className={styles.getStartBtn}>
      Get your Codefolio{" "}
    </p>
  );
}
