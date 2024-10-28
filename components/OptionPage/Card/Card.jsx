import Image from "next/image";
import styles from "./Card.module.css";

export default function Card({ text, imageSource, setUserSelectParkStatus }) {


  return (
    <div className={styles.box}  onClick={()=>{setUserSelectParkStatus(true)}}>
      <Image
        className={styles.image}
        src={imageSource}
        width="30"
        height="30"
      ></Image>
      <p>{text}</p>
    </div>
  );
}
