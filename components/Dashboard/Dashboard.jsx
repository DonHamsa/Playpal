"use client";

import styles from "./Dashboard.module.css";
import { VscCircleLargeFilled } from "react-icons/vsc";
import React from "react";
import PlayerCard from "../PlayerCards/PlayerCards";
import ParkAttendeesBox from "../ParkAttendeesBox/ParkAttendeesBox";
import JoinButton from "../JoinButton/JoinButton";
import LeaveParkButton from "../LeaveParkButton/LeaveParkButton";
import { DashboardMap } from "../DashboardMap/DashboardMap";
import { useJsApiLoader } from "@react-google-maps/api";
import LineDivider from "../LineDivider/LineDivider";

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
  const libraries = ["places", "drawing", "geometry"];

  const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY,
    libraries: libraries,
  });

  return (
    <div className={styles.gridBox}>
      <div className={styles.leftBox}>
        <div className={styles.outsideBox}>
          <div className={styles.paddedBox}>
            {/* <FadeInSection> */}
              <p className={styles.name}>Parks</p>
            {/* </FadeInSection> */}

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
            <p className={styles.name}>Barra Hall Park Players</p>
            <LineDivider text='Playing with Pals'/>
            <PlayerCard
              name="Hamsa Muse"
              startTime="13:30"
              endTime="12:00"
              hasBall={false}
              atPark={true}
            />
            <PlayerCard
              name="Hamsa Muse"
              startTime="13:30"
              endTime="12:00"
              hasBall={true}
              atPark={true}
            />
            {/* <PlayerCard
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
            /> */}

            {/* key at the bottom */}
            <div className={styles.ballKey}>
              <div className={styles.ballKeyCentre}>
                <p>
                  <VscCircleLargeFilled className={styles.box} />
                  Player bringing ball
                </p>
              </div>
            </div>
            <LineDivider text='Looking for Pals'/>
            <PlayerCard
              name="Hamsa Muse"
              startTime="13:30"
              endTime="12:00"
              hasBall={false}
              atPark={false}
            />
          </div>
        </div>
      </div>
      <div className={styles.rightSideBox}>
        <div className={styles.rightSideBoxPadded}>
          <div className={styles.mapBoxNHeading}>
            <p className={styles.mapText}> Map</p>
            {scriptLoaded && <DashboardMap />}
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
