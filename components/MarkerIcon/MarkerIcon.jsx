import { FaCircle } from "react-icons/fa6";
import styles from "./MarkerIcon.module.css";

export default function MarkerIcon() {
  return (
    <div className={styles.box}>
      <p className={styles.heading}>Marker Keys</p>
      <p>
        <FaCircle className={styles.BrownCircle} size="10" /> User Address
      </p>
      <p>
        <FaCircle className={styles.blackCircle} size="10" /> Looking for pals
      </p>
      <p>
        <FaCircle className={styles.redCircle} size="10" /> Playing with pals
      </p>
    </div>
  );
}
