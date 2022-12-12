import styles from "../styles/ExpandCard.module.css";

export default function ExpandCard() {
  return (
    <div className={styles.ExpandCard}>
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

      <div className={styles.utility}>
        <div className={styles.left}>
          <img src="/icons/linkedin.png" />
          <div className={styles.iconRight}>
            <h1>Linkedin</h1>
            <p>Financial Vault App to save Data securly</p>
          </div>
        </div>
        <div className={styles.DownloadBtn}>Download</div>
      </div>

      <div className={styles.preview}>
        <img src="https://play-lh.googleusercontent.com/4c45uH2nJuQDb90MKlU8sIrb4SY_tifzIpfhkdB88p33kjQufrJggzHUUMn-DqGvVbaC=w526-h296-rw" />
        <img src="https://play-lh.googleusercontent.com/4c45uH2nJuQDb90MKlU8sIrb4SY_tifzIpfhkdB88p33kjQufrJggzHUUMn-DqGvVbaC=w526-h296-rw" />
        <img src="https://play-lh.googleusercontent.com/4c45uH2nJuQDb90MKlU8sIrb4SY_tifzIpfhkdB88p33kjQufrJggzHUUMn-DqGvVbaC=w526-h296-rw" />
        <img src="https://play-lh.googleusercontent.com/4c45uH2nJuQDb90MKlU8sIrb4SY_tifzIpfhkdB88p33kjQufrJggzHUUMn-DqGvVbaC=w526-h296-rw" />
        <img src="https://play-lh.googleusercontent.com/4c45uH2nJuQDb90MKlU8sIrb4SY_tifzIpfhkdB88p33kjQufrJggzHUUMn-DqGvVbaC=w526-h296-rw" />
        <img src="https://play-lh.googleusercontent.com/4c45uH2nJuQDb90MKlU8sIrb4SY_tifzIpfhkdB88p33kjQufrJggzHUUMn-DqGvVbaC=w526-h296-rw" />

      </div>
    </div>
  );
}
