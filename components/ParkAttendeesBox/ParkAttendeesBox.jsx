"use client";

import { SlLocationPin } from "react-icons/sl";
import { GoPeople } from "react-icons/go";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Roboto_Mono } from "@next/font/google";
import styles from "./ParkAttendees.module.css";

const robotoMono = Roboto_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function ParkAttendeesBox({
  parkName,
  ratingNumber = "N/A",
  numberOfAttendees = "N/A",
  FadeInSection,
  setClickedPark,
  theKey,
  identifier,
  listOfCentrePoints,
  setClickedParkCord,
}) {
  return (
    <div
      className={styles.parkBox}
      onClick={() => {
        setClickedPark(theKey);
      }}
      onMouseOver={()=>setClickedParkCord(listOfCentrePoints[identifier])}
      onMouseLeave ={()=>setClickedParkCord(false)}
    >
      <p className={`${styles.textSameSize} ${styles.parkName}`}>
        <SlLocationPin className={styles.locationIcon} /> {parkName}
      </p>
      <div className={styles.ratingNIcon}>
        <p className={styles.ratingsText}> Rating: {ratingNumber} </p>
        <MdKeyboardArrowRight className={styles.ratingIcon} size="11px" />
      </div>

      <p className={`${styles.textSameSize} ${styles.lastLine}`}>
        <GoPeople className={styles.peopleIcon} /> {numberOfAttendees} players
      </p>
    </div>
  );
}
