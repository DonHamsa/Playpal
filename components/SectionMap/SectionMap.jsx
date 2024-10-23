import styles from "./SectionMap.module.css";
import Image from "next/image";

export default function SectionMap() {
  return (
    <div className={styles.outsideBox}>
      <div className={styles.box}>
        <div className={styles.textBox}>
          <h1 className={styles.text}>
            See Who is Playing, Join the Game—Never Alone with New Friends
          </h1>
        </div>
        <Image
          src="/images/themap.jpg"
          width="394"
          height="250"
          className={styles.image}
          alt="image"
        ></Image>
      </div>
    </div>
  );
}
