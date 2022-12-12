import styles from "../styles/Links.module.css";

export default function Links() {
  return (
    <div className={styles.LinksDiv}>
      <div className={styles.NavBar}>
        <h1>Links</h1>
        <div className={styles.closeBox}>
          <div
            style={{ backgroundColor: "#27C93F" }}
            className={styles.close}
          ></div>
          <div
            style={{ backgroundColor: "#FFBD2E" }}
            className={styles.close}
          ></div>
          <div
            style={{ backgroundColor: "#FF5F56" }}
            className={styles.close}
          ></div>
        </div>
      </div>

      {/* LEETCODE */}
      <div className={styles.LinkBtn}>
        <img src="/icons/leetcode-black.svg" />

        <h3>Leetcode</h3>
      </div>

      {/* GFG */}
      <div className={styles.LinkBtn}>
        <img src="/icons/gfg.png" />
        <h3>GeeksForGeeks</h3>
      </div>

      {/* LinkedIN */}
      <div className={styles.LinkBtn}>
        <img src="/icons/linkedin.png" />
        <h3>LinkedIn</h3>
      </div>

      {/* Resume */}
      <div className={styles.LinkBtn}>
        {/* <img src="/icons/linkedin.png" /> */}
        <h3>Resume</h3>
      </div>
      
    </div>
  );
}
