"use client";
import styles from "./SignedInHeader.module.css";

export default function BigBox({ children }) {
  return <div className={styles.logOut}>{children}</div>;
}
