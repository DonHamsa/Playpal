import { FaCircle } from "react-icons/fa6";
import styles from "./MarkerIconMobile.module.css";

export default function MarkerIcon() {
  return (
    <div className={styles.box}>
      <p className={styles.heading}>Marker Keys</p>
      <p className={styles.textAndIcon}>
        <FaCircle className={styles.BrownCircle} size="10" /> User Address
      </p>
      <p  className={styles.textAndIcon}>
        <FaCircle className={styles.blackCircle} size="10" /> Looking for pals
      </p>
      <p  className={styles.textAndIcon}> 
        <FaCircle className={styles.redCircle} size="10" /> Playing with pals
      </p>
    </div>
  );
}
