import Header from "../../components/Header";
import styles from "../../styles/myprofile.module.css";

export default function profile() {
  return (
    <div className={styles.container}>
      <Header />

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
              className={styles.input}
              placeholder="Enter your full name"
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
                <input placeholder="Paste image link or select" required />
                <div className={styles.selectIcon} >
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
    </div>
  );
}
