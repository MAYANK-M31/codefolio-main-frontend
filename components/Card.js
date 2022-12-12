import styles from "../styles/Card.module.css";

export default function Card() {
  return (
    <div className={styles.Card}>
      <img src="/icons/demo.png" />
      <h2>SmartGenie Affilate Dapp</h2>
      <p>Description</p>
      <p className={styles.description}>Opensource : https://github.com/smart-genieLanguage:SolidityNetwork:Tron mainnetFramework:React js</p>
    </div>
  );
}
