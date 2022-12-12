import styles from "../styles/Card.module.css";
import ExpandCard from "./ExpandCard";

export default function Card({open}) {
  return (
    <div onClick={()=>open()} className={styles.Card}>
      <img className={styles.imgLayout} src="/icons/demo.png" />
      {/* <div  className={styles.imgLayout}>
      {<ExpandCard  /> 
      </div> */}
      <h2>SmartGenie Affilate Dapp</h2>
      <p>Description</p>
      <p className={styles.description}>Opensource : https://github.com/smart-genieLanguage:SolidityNetwork:Tron mainnetFramework:React js</p>
    </div>
  );
}
