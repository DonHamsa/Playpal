import styles from "./ChatLogOut.module.css";
import { signOut } from "@/app/login/actions";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import Link from "next/link";

export default function ChatLogOut() {
  const signOutFunction = () => {
    signOut();
  };

  return (
    <div className={styles.bigBox}>
      <Link href='/dashboard' className={styles.backIcon}>
        <MdOutlineKeyboardBackspace size='55' />
      </Link>
      <div className={styles.outsideBox}>
        <div className={styles.textNIcon} onClick={() => signOutFunction()}>
          <img
            src="/images/logoutIcon.png"
            alt="Log Out Icon"
            className={styles.image}
          />
          <p className={styles.logoutText}>Log Out</p>
        </div>
      </div>
    </div>
  );
}
