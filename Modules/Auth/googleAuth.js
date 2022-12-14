import React, { useState } from "react";
import styles from "../../styles/NavBar.module.css";
import Router from 'next/router'

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { baseurl } from "../../public/baseurl";

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
              console.log(data);
              setisLoading(false);
              Router.push('/mayank-m31/profile')
            } else {
              setisLoading(false);
              alert("TRY AGAIN")
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
    <div onClick={googleSignIn} className={styles.btnYear}>
      {!isLoading ? <p>Login</p> : <p>Loading</p>}
    </div>
  );
}
