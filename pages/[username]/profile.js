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

          <button
          className={styles.btn}
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
