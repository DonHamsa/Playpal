import styles from "./pages.module.css";
import Image from "next/image";

export default function Header() {
  return (
    <>
      <div className={styles.imageBlock}>
        <Image
          src="/images/logo.png"
          width="200"
          height="130"
          alt="image"
          className={styles.image}
        ></Image>
      </div>
    </>
  );
}
