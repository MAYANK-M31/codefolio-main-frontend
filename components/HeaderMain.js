import styles from "../styles/Header.module.css";

export default function HeaderMain({ username }) {
  return (
    <div className={styles.Main}>
      <div className={styles.section}>
        <img src="/logo.svg" />
      </div>
      <div className={styles.section}>
        <div className={styles.linkBar}>
          <img src="/icons/lock.svg" />
          <p>codefolio.link/MAYANK-M31</p>
          <img src="/icons/link.svg" />
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.utility}>
          <div className={styles.refresh}><img src="/icons/reload.svg" /></div>
          <div className={styles.userBtn}>mayank-m31 <img src="/icons/angle-down.svg" /></div>
        </div>
      </div>
    </div>
  );
}
