'use client'

import styles from "./Dashboard.module.css";
import { VscCircleLargeFilled } from "react-icons/vsc";
import React from "react";
import PlayerCard from "../PlayerCards/PlayerCards";
import ParkAttendeesBox from "../ParkAttendeesBox/ParkAttendeesBox";
import JoinButton from "../JoinButton/JoinButton";
import LeaveParkButton from "../LeaveParkButton/LeaveParkButton";

export default function Dashboard() {
  const FadeInSection = (props) => {
    const [isVisible, setVisible] = React.useState(false);
    const domRef = React.useRef();
    React.useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => setVisible(entry.isIntersecting));
      });
      observer.observe(domRef.current);
    }, []);
    return (
      <div
        className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
        ref={domRef}
      >
        {props.children}
      </div>
    );
  };
  return (
    <div className={styles.gridBox}>
      <div className={styles.leftBox}>
        <div className={styles.outsideBox}>
          <div className={styles.paddedBox}>
            <FadeInSection>
              <p className={styles.name}>Parks and Attendees</p>
            </FadeInSection>

            <ParkAttendeesBox
              ratingNumber="5.77"
              parkName="Barra Hall Park"
              numberOfAttendees="12"
              FadeInSection={FadeInSection}
            />
            <ParkAttendeesBox
              ratingNumber="5.77"
              parkName="Barra Hall Park"
              numberOfAttendees="12"
              FadeInSection={FadeInSection}
            />
            <ParkAttendeesBox
              ratingNumber="5.77"
              parkName="Barra Hall Park"
              numberOfAttendees="12"
              FadeInSection={FadeInSection}
            />
            <ParkAttendeesBox
              ratingNumber="5.77"
              parkName="Barra Hall Park"
              numberOfAttendees="12"
              FadeInSection={FadeInSection}
            />
            <ParkAttendeesBox
              ratingNumber="5.77"
              parkName="Barra Hall Park"
              numberOfAttendees="12"
              FadeInSection={FadeInSection}
            />
            <ParkAttendeesBox
              ratingNumber="5.77"
              parkName="Barra Hall Park"
              numberOfAttendees="12"
              FadeInSection={FadeInSection}
            />
            <ParkAttendeesBox
              ratingNumber="5.77"
              parkName="Barra Hall Park"
              numberOfAttendees="12"
              FadeInSection={FadeInSection}
            />
            <ParkAttendeesBox
              ratingNumber="5.77"
              parkName="Barra Hall Park"
              numberOfAttendees="12"
              FadeInSection={FadeInSection}
            />
            <ParkAttendeesBox
              ratingNumber="5.77"
              parkName="Barra Hall Park"
              numberOfAttendees="12"
              FadeInSection={FadeInSection}
            />
            <ParkAttendeesBox
              ratingNumber="10"
              parkName="Hayes Recreational Park"
              numberOfAttendees="5"
              FadeInSection={FadeInSection}
            />
          </div>
        </div>

        <div className={styles.outsideBoxNoScroll}>
          <div className={styles.paddedBox}>
            <p className={styles.name}>Central Park Players</p>
            <PlayerCard
              name="Hamsa Muse"
              startTime="13:30"
              endTime="12:00"
              hasBall={false}
            />
            <PlayerCard
              name="Ayuub Muse"
              startTime="15:30"
              endTime="17:00"
              hasBall={true}
            />
            <PlayerCard
              name="Amira Muse"
              startTime="11:30"
              endTime="13:00"
              hasBall={false}
            />
            <PlayerCard
              name="Haashim Muse"
              startTime="11:30"
              endTime="12:00"
              hasBall={false}
            />

            {/* key at the bottom */}
            <div className={styles.ballKey}>
              <div className={styles.ballKeyCentre}>
                <p>
                  <VscCircleLargeFilled className={styles.box} />
                  Player bringing ball
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rightSideBox}>
        <div className={styles.rightSideBoxPadded} >
          <div className={styles.mapBoxNHeading}>
            <p> Map</p>
          </div>
          <div className={styles.buttonsBox}>
            <JoinButton />
            <LeaveParkButton userAtPark={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
