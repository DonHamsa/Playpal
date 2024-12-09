import { FaCircle } from "react-icons/fa6";
import styles from './MarkerIcon.module.css'

export default function MarkerIcon(){
  return(
  <div className={styles.box}>
    <p className={styles.heading}>Marker Keys</p>
    <p><FaCircle className={styles.blackCircle}/> Looking for pals</p>
    <p><FaCircle className={styles.redCircle}/> Playing with pals</p>
    <p><FaCircle className={styles.BrownCircle}/> User Address</p>
  </div>

  )
}