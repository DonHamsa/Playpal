import styles from "./Section.module.css";
import Link from "next/link";

export default function Section() {
  return (
    <>
      <article className={styles.form}>
        <form>
          <fieldset className={styles.fieldset}>
            <legend className={styles.logIn}>Log in or Sign Up</legend>
            <p className={styles.para}>
              See people nearby playing football, connect with others who want
              to join in, and make new friends while bringing the joy of playing
              outside back to life
            </p>
            <label className={styles.label}> </label>
            Username or Sign Up
            <input type="email" className={styles.input} />
            <label className={styles.label}> </label>
            Password
            <input type="password" className={styles.input} />
            <Link href="./dashboard">
              <div className="center">
                <button className="btn">
                  <svg
                    width="300px"
                    height="60px"
                    viewBox="0 0 300 60"
                    className="border"
                  >
                    <polyline points="299,1 299,59 1,59 1,1 299,1" />
                    <polyline points="299,1 299,59 1,59 1,1 299,1" />
                  </svg>
                  <span>Log In </span>
                </button>
              </div>
            </Link>
          </fieldset>
        </form>
      </article>
    </>
  );
}
