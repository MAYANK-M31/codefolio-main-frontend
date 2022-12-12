import { useState } from "react";
import Modal from "react-modal/lib/components/Modal";
import styles from "../styles/Projects.module.css";
import Card from "./Card";
import ExpandCard from "./ExpandCard";

export default function Projects() {
  const [open, setopen] = useState(false);
  const toogleModal = ()=>{
      setopen(open=>!open)
  }
  return (
    <div className={styles.projectsDiv}>
      <h2>Projects</h2>
      <div className={styles.ListDiv}>
        <Card open={toogleModal}/>
        <Card open={toogleModal}/>
        <Card open={toogleModal}/>
        <Card open={toogleModal}/>
        <Card open={toogleModal}/>
        <Card open={toogleModal}/>

      </div>
      <Modal onRequestClose={toogleModal} isOpen={open}>
        <ExpandCard close={toogleModal} />
      </Modal>
    </div>
  );
}
