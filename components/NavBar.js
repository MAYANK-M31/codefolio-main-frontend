import styles from "../styles/NavBar.module.css";
import GoogleAuth from "../Modules/Auth/googleAuth";
export default function NavBar({ open }) {
  return (
    <div className={styles.Main}>
      <img src="/logo.svg" />
      <GoogleAuth />
    </div>
  );
}
