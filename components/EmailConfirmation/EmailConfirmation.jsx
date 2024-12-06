import styles from "./EmailConfirmation.module.css";
import Image from "next/image";
import Link from "next/link";

export default function EmailConfirmation() {
  return (
    <div className={styles.outsideBox} >
      <div className={styles.bigBox}>
        <Image src="/images/email.png" width="70" height="70" className={styles.image}></Image>
        <p className={styles.verify}>Verify your email Address</p>
        <p className={styles.longText}>
          <spam  className={styles.highlightText}>Pleas click on the link </spam>in the email we just sent you to confirm your
          email address
        </p>
        <Link className={styles.link} href='./login'><p className={styles.resend}>Log In</p></Link>
        <p></p>
      </div>
    </div>
  );
}
