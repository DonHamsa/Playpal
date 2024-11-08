import Image from "next/image";
import styles from "./Card.module.css";

export default function Card({ text, imageSource, setUserSelectParkStatus, setWhichChard, theKey }) {

  return (
    <div className={styles.box}  onClick={()=>{setUserSelectParkStatus(true), setWhichChard(theKey)}}>
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
