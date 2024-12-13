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
            <legend className={styles.bigHeroText}>Connect, Play, <span className={styles.liveText}>Live</span></legend>
            <p className={styles.para}>
            Discover nearby football games, join like-minded
            players, and rediscover the joy of outdoor play.
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
