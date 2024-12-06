'use client'

import styles from "./Section.module.css";
import Link from "next/link";
import "./button.css";
import { useRouter } from "next/navigation";


export default function Section() {
  const router= useRouter()
  return (
    <>
      <article className={styles.form}>
        <form>
          <fieldset className={styles.fieldset}>
            {/* <legend className={styles.logIn}>Log in or Sign Up</legend> */}
            <p className={styles.para}>
              See people nearby playing football, connect with others who want
              to join in, and make new friends while bringing the joy of playing
              outside back to life
            </p>
            <button className="btn-23" onClick={()=>router.push('./login')} type="button">
              <span className="text">Get Playing</span>
              <span aria-hidden="" className="marquee">
                Signin
              </span>
              
            </button>
          </fieldset>
        </form>
      </article>
    </>
  );
}
