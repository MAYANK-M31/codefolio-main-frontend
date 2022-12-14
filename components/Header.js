import styles from "../styles/Header.module.css";

export default function Header({ open }) {
  return (
    <div className={styles.Main}>
      <img src="/logo.svg" />
    </div>
  );
}
