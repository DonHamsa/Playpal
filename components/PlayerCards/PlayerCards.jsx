import { GoPerson } from "react-icons/go";
import { SlClock } from "react-icons/sl";
import { HiArrowLongRight } from "react-icons/hi2";
import styles from "./PlayerCards.module.css";

export default function PlayerCard({ name, startTime, endTime, hasBall }) {

  let stylingClass;
  if (hasBall){
    stylingClass='outsideCardWithBall '
  }
  else{
    stylingClass='outsideCardWithNoBall '
  }

  return (
    <div className={hasBall? styles.outsideCardWithBall : styles.outsideCardWithNoBall}>
      <div className={styles.playerCard}>
        <GoPerson className={styles.personIcon} />
        <div>
          <p className={styles.name}>{name}</p>
          <p className={styles.time}>
            <SlClock size="10px" className={styles.clock} />
            <strong>{startTime}</strong> <HiArrowLongRight className={styles.arrow}   />{" "}
            {endTime}
          </p>
        </div>
      </div>
    </div>
  );
}
