import { useEffect, useState, CSSProperties } from "react";
import { useQuery } from "react-query";
import Header from "../../components/Header";
import styles from "../../styles/myprofile.module.css";
import { getCookie, setCookie } from "cookies-next";
import { baseurl } from "../../public/url";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Router, { useRouter } from "next/router";
import Loader from "react-spinners/PacmanLoader";

const override = {
  margin: "40vh auto",
  borderColor: "white",
  display: "flex",
  justifyContent: "center",
};

export default function profile() {
  const Token = getCookie("token");
  const googleProfile = getCookie("googleProfile");
  const router = useRouter();
  let canGoBack = router?.query?.canGoBack;

  const [isSaving, setisSaving] = useState(false);

  const [name, setname] = useState("");
  const [username, setusername] = useState("");
  const [title, settitle] = useState("");
  const [bio, setbio] = useState("");
  const [leetcodeId, setleetcodeId] = useState(null);
  const [gfgId, setgfgId] = useState(null);
  const [imagelink, setimagelink] = useState("/vercel.svg");
  const [imagelinkValue, setimagelinkValue] = useState("");

  const [ImagePlatform, setImagePlatform] = useState("");

  const getProfileData = useQuery(
    "userDate",
    () =>
      fetch(`${baseurl}/signin/getuser`, {
        method: "POST",
        headers: new Headers({
          Authorization: "Bearer " + Token,
          "Content-Type": "application/x-www-form-urlencoded",
        }),
      }).then((res) => res.json()),

    {
      enabled: false,
    }
  );

  useEffect(() => {
    getProfileData.refetch();
    let data = getProfileData.data;
    var x = data?.data;

    // console.log(data);

    if (x) {
      setname(x.name);
      setusername(x.username);
      settitle(x.title);
      setimagelink(x.profile);
      setleetcodeId(x.websites?.leetcode);
      setgfgId(x.websites?.gfg);
      setimagelinkValue(x.profile);
      setbio(x.bio);
      getImagePlatform(x.profile);
    }
  }, [getProfileData.data]);

  const getImagePlatform = (x) => {
    // ADDING PLATFORM BUTTON
    if (x.search(/google/) !== -1) {
      setImagePlatform("google");
    } else if (x.search(/leetcode/) !== -1) {
      setImagePlatform("leetcode");
    } else if (x.search(/gfg/) !== -1) {
      setImagePlatform("gfg");
    } else {
      setImagePlatform("");
    }
  };

  const selectImgPlatform = (v) => {
    if (v == "leetcode" && leetcodeId.length == 0)
      return toast.error(`Please add ${v} Id`, { position: "top-center" });
    if (v == "gfg" && leetcodeId.length == 0)
      return toast.error(`Please add ${v} Id`, { position: "top-center" });

    setImagePlatform(v);

    if (v == "google") {
      setimagelinkValue(googleProfile);
      setimagelink(googleProfile);
    }
  };

  const toogleImageLink = (e) => {
    let value = e.target.value;
    setimagelink(value);
    setimagelinkValue(value);
    getImagePlatform(value);
    if (value.length == 0) {
      selectImgPlatform("google");
    }
  };

  const Save = async (e) => {
    e.preventDefault();

    setisSaving(true);

    // if (!leetcodeId && !gfgId){
    //   setisSaving(false)
    //   return toast.error("Either Leetcode or GFG ID is required");

    // }

    const body = {
      username: username,
      leetcode: leetcodeId,
      gfg: gfgId,
      name: name,
      title: title,
      bio: bio,
      profile: imagelinkValue,
    };
    await axios({
      method: "post",
      url: `${baseurl}/update`,
      data: body,
      headers: {
        Authorization: "Bearer " + Token,
      },
    })
      .then(({ data }) => {
        if (data.status != 200) return toast.error(data?.message);
        setCookie("username", username,{maxAge:86400});
        Router.push(`/${username}/dashboard`);
        toast.success("Updated Successfully");
      })
      .catch((e) => {
        //handle error
        console.log(e);
        setisSaving(false);
        return toast.error("Something went wrong");
      });
  };

  return (
    <div className={styles.container}>
      <Header />

      {getProfileData.isLoading ? (
        <Loader
          color={"#ffffff"}
          loading={true}
          cssOverride={override}
          size={35}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <div className={styles.Box}>
          <p class="font-small text-2xl font-semibold text-center mt-0 mb-5 text-white-600">
            My Profile
          </p>
          <form onSubmit={(e) => Save(e)}>
            <div class="mb-6">
              <label
                for="email"
                class="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
              >
                Enter your name
              </label>
              <input
                type="name"
                id="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
                className={styles.input}
                style={{ textTransform: "uppercase" }}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div class="mb-6">
              <label
                for="email"
                class="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                className={styles.input}
                value={username}
                onChange={(e) => setusername(e.target.value)}
                placeholder="Ex. CODER_450"
                required
              />
            </div>

            <div class="mb-6">
              <label
                for="email"
                class="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
              >
                Portfolio Title
              </label>
              <input
                value={title}
                onChange={(e) => settitle(e.target.value)}
                className={styles.input}
                placeholder="Ex. Software Engineer Intern"
                required
              />
            </div>

            <div class="mb-6">
              <label
                for="email"
                class="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
              >
                Bio
              </label>
              <input
                value={bio}
                onChange={(e) => setbio(e.target.value)}
                className={styles.input}
                placeholder="Ex. GTBIT 2020-2024"
                required
              />
            </div>

            <div class="mb-6">
              <label
                for="email"
                class="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
              >
                Leetcode ID
              </label>
              <input
                value={leetcodeId}
                onChange={(e) => setleetcodeId(e.target.value)}
                className={styles.input}
                placeholder="Ex. coder_450"
              />
            </div>

            <div class="mb-6">
              <label
                for="email"
                class="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
              >
                GFG ID
              </label>
              <input
                value={gfgId}
                onChange={(e) => setgfgId(e.target.value)}
                className={styles.input}
                placeholder="Ex. coder_450"
              />
            </div>

            <div class="mb-6">
              <label
                for="email"
                class="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
              >
                Profile Photo
              </label>
              <div className={styles.imagelinkdiv}>
                <div className={styles.imageinput}>
                  <input
                    value={imagelinkValue}
                    onChange={toogleImageLink}
                    placeholder="Paste valid link or select"
                    // required
                  />
                  <div className={styles.selectIcon}>
                    <img
                      onClick={() => selectImgPlatform("gfg")}
                      style={{
                        backgroundColor:
                          ImagePlatform == "gfg" ? "white" : "transparent",
                      }}
                      src="/icons/gfg.png"
                    />
                    <img
                      onClick={() => selectImgPlatform("leetcode")}
                      style={{
                        backgroundColor:
                          ImagePlatform == "leetcode" ? "white" : "transparent",
                      }}
                      src="/icons/leetcode.png"
                    />
                    <img
                      onClick={() => selectImgPlatform("google")}
                      style={{
                        backgroundColor:
                          ImagePlatform == "google" ? "white" : "transparent",
                      }}
                      src="/icons/google.png"
                    />
                  </div>
                </div>
                <div className={styles.profilepic}>
                  <img
                    onError={() => {
                      setimagelink("/icons/error.svg");
                      setimagelinkValue("");
                      setImagePlatform(null);
                    }}
                    referrerpolicy="no-referrer"
                    alt="pic"
                    src={imagelink}
                  />
                </div>
              </div>
            </div>

            <button type="button" className={styles.btn} type="submit">
              {!isSaving ? "Save" : "Loading Please wait"}
            </button>
          </form>
          <button
              onClick={() => {
                Router.back();
                toast.loading("Going Back Please Wait", { duration: 1500 });
              }}
              style={{
                backgroundColor: "transparent",
                border: "1px solid white",
                display: canGoBack == "true" ? null : "none",
              }}
              className={styles.btn}
            >
              Back
            </button>
        </div>
      )}
      <Toaster />
    </div>
  );
}
