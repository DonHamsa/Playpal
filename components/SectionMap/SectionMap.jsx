import styles from "./SectionMap.module.css";

export default function SectionMap() {
  return (
    <div className={styles.outsideBox}>
      <div className={styles.box}>
        <div className={styles.textBox}>
          <h1 className={styles.text}>
            See Who is Playing, Join the Game—Never Alone with New Friends
          </h1>
        </div>
        <img 
          src="/images/themap.jpg"
          className={styles.image}
          alt="basic Map Image"
        ></img>
      </div>
    </div>
  );
}
