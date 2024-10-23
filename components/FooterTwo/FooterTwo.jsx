import styles from "./FooterTwo.module.css";
import Image from "next/image";

export default function FooterTwo() {
  return (
    <>
      <div className={styles.footerBox}>
        <div className={styles.iconBox}>
          <Image
            src="/images/insta.jpg"
            width="30"
            height="30"
            className={styles.icons}
            alt='image'
          ></Image>
          <Image
            src="/images/twitt.jpg"
            width="30"
            height="30"
            className={styles.icons}
            alt='image'

          ></Image>
          <Image
            src="/images/facebook.jpg"
            width="30"
            height="30"
            className={styles.icons}
            alt='image'

          ></Image>
        </div>
      </div>
    </>
  );
}
