import Modal from "react-modal/lib/components/Modal";
import styles from "../styles/Projects.module.css";
import Card from "./Card";
import ExpandCard from "./ExpandCard";

export default function Projects() {
  return (
    <div className={styles.projectsDiv}>
      <h2>Projects</h2>
      <div className={styles.ListDiv}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <Modal isOpen={true}>
        <ExpandCard />
      </Modal>
    </div>
  );
}
