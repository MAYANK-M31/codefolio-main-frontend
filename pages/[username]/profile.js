import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Header from "../../components/Header";
import styles from "../../styles/myprofile.module.css";
import { getCookie } from "cookies-next";
import { baseurl } from "../../public/baseurl";

export default function profile() {
  const Token = getCookie("token");
  const [ismounting, setismounting] = useState(false);
  const [Data, setData] = useState(null);

  const { isLoading, error, data } = useQuery(
    "useData",
    () =>
      fetch(`${baseurl}/signin/getuser`, {
        method: "POST",
        headers: new Headers({
          Authorization: "Bearer " + Token,
          "Content-Type": "application/x-www-form-urlencoded",
        }),
      }).then((res) => res.json()),
    {
      enabled: !!Token,
    }
  );

  useEffect(() => {
    setismounting(true);
    if (data) setData(data.data);
  }, [data]);

  if (!ismounting)
    return (
      <div className={styles.container}>
        <Header />
      </div>
    );

  return (
    <div className={styles.container}>
      <Header />

      {isLoading ? (
        <p>F</p>
      ) : (
        <div className={styles.Box}>
          <p class="font-small text-2xl font-semibold text-center mt-0 mb-5 text-white-600">
            My Profile
          </p>
          <form>
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
                value={Data?.name}
                className={styles.input}
                style={{textTransform:"uppercase"}}
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
                value={Data?.username}
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
                className={styles.input}
                placeholder="Ex. coder_450"
                required
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
                className={styles.input}
                placeholder="Ex. coder_450"
                required
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
                    value={Data?.profile}
                    placeholder="Paste image link or select"
                    required
                  />
                  <div className={styles.selectIcon}>
                    <img src="/icons/gfg.png" />
                    <img src="/icons/leetcode.png" />
                    <img src="/icons/google.png" />
                  </div>
                </div>
                <div className={styles.profilepic}>
                  <img />
                </div>
              </div>
            </div>

            <button className={styles.btn} type="submit">
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
