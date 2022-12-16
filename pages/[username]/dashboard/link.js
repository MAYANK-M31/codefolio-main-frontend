import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Header from "../../../components/Header";
import styles from "../../../styles/myprofile.module.css";
import { getCookie } from "cookies-next";
import { baseurl } from "../../../public/baseurl";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Router from "next/router";

const icons = {
  twitter: "/icons/twitter.png",
  linkedin: "/icons/linkedin.png",
  facebook: "/icons/facebook.png",
};

export default function link() {
  const Token = getCookie("token");

  const [title, settitle] = useState("");
  const [url, seturl] = useState("");
  const [imagelink, setimagelink] = useState("");
  const [validImage, setvalidImage] = useState(false);

  const [isSaving, setisSaving] = useState(false);

  const toogleImage = (x) => {
      let t = x.toLowerCase()
    settitle(t)
    if (t.search(/twitter/) !== -1) {
      setvalidImage(true);
      setimagelink(icons["twitter"]);
    } else if (t.search(/linkedin/) !== -1) {
      setvalidImage(true);
      setimagelink(icons["linkedin"]);
    } else if (t.search(/facebook/) !== -1) {
      setvalidImage(true);
      setimagelink(icons["facebook"]);
    }else{
        setvalidImage(false)
    }
  };

  const Save = async (e) => {
    setisSaving(true)
    e.preventDefault();


    const body = {
      title: title,
      url: url,
      logo: imagelink,
    };

    await axios({
      method: "post",
      url: `${baseurl}/update/newlink`,
      data: body,
      headers: {
        Authorization: "Bearer " + Token,
      },
    })
      .then(({ data }) => {
        if(data.status != 200) return toast.error(data?.message),setisSaving(false)
        console.log(data);
        Router.back()
        toast.success("ADDED Successfully");
      })
      .catch((e) => {
        //handle error
        console.log(e);
        setisSaving(false)
        return toast.error("Something went wrong");
      });
  };

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.Box}>
        <p class="font-small text-2xl font-semibold text-center mt-0 mb-5 text-white-600">
          Add Link
        </p>

        <form onSubmit={(e) => Save(e)}>
          <div class="mb-6">
            <label
              for="email"
              class="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="name"
              id="name"
              value={title}
              onChange={(e) => {toogleImage(e.target.value)}}
              className={styles.input}
              placeholder="Ex Twitter,linkedin or Resume etc"
              required
            />
          </div>

          <div class="mb-6">
            <label
              for="email"
              class="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
            >
              URL
            </label>
            <input
              value={url}
              onChange={(e) => {seturl(e.target.value)}}
              className={styles.input}
              placeholder="Ex. www.linkedin/in/samjoe"
              required
            />
          </div>

          <div class="mb-6">
            <label
              for="email"
              class="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
            >
              Logo
            </label>
            <div className={styles.imagelinkdiv}>
              <div
                style={{ width: !validImage && "100%" }}
                className={styles.imageinput}
              >
                <input
                style={{width:"100%"}}
                  value={imagelink}
                  onChange={(e) => {setvalidImage(true),setimagelink(e.target.value)}}
                  placeholder="Paste valid link"
                  // required
                />
              </div>
              {validImage && (
                <div className={styles.profilepic}>
                  <img
                    onError={()=>{setimagelink(""),setvalidImage(false)}}
                    // onLoad={()=>setvalidImage(true)}
                    // referrerpolicy="no-referrer"
                    alt="pic"
                    src={imagelink}
                  />
                </div>
              )}
            </div>
          </div>

          <button type="button" className={styles.btn} type="submit">
            {!isSaving ? "Add" : "Loading"}
          </button>
        </form>
        <button
          onClick={() => {
            Router.back();
          }}
          style={{ backgroundColor: "transparent", border: "1px solid white" }}
          className={styles.btn}
        >
          Back
        </button>
      </div>
      <Toaster />
    </div>
  );
}
