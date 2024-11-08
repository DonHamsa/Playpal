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
  ratingNumber,
  numberOfAttendees,
  FadeInSection
}) {



  return (
    <FadeInSection>
      <div className={styles.parkBox}>
        <p className={`${styles.textSameSize} ${styles.parkName}`}>
          <SlLocationPin className={styles.locationIcon} /> {parkName}
        </p>
        <div className={styles.ratingNIcon}>
          <p className={robotoMono.className}> Rating: {ratingNumber} </p>
          <MdKeyboardArrowRight className={styles.ratingIcon} size="11px" />
        </div>

        <p className={styles.textSameSize}>
          <GoPeople className={styles.peopleIcon} size="12px" />{" "}
          {numberOfAttendees} attendees
        </p>
      </div>
    </FadeInSection>
  );
}
