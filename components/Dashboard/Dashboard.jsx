"use client";

import styles from "./Dashboard.module.css";
import { VscCircleLargeFilled } from "react-icons/vsc";
import React from "react";
import ParkAttendeesBox from "../ParkAttendeesBox/ParkAttendeesBox";
import JoinButton from "../JoinButton/JoinButton";
import LeaveParkButton from "../LeaveParkButton/LeaveParkButton";
import { DashboardMap } from "../DashboardMap/DashboardMap";
import { useJsApiLoader } from "@react-google-maps/api";
import LineDivider from "../LineDivider/LineDivider";
import { useEffect, useState } from "react";
import PlayerCard from "../PlayerCards/PlayerCards";
import { format } from "date-fns";
import { createClient } from "../../utils/supabase/client";
import { list } from "postcss";

export default function Dashboard({
  formattedPostcode,
  listOfParks,
  setClickedPark,
  clickedPark,
  playerAtParkOrPlanning,
  userUUID,
  setPlayerAtTheParkOrPlanning,
  activePlayerData,
  setActivePlayerData,
  listOfActivePlayers,
  listOfParkIdsNName,
  listOfParksAndRatings,
}) {
  // const FadeInSection = (props) => {
  //   const [isVisible, setVisible] = useState(false);
  //   const domRef = React.useRef();
  //   React.useEffect(() => {
  //     const observer = new IntersectionObserver((entries) => {
  //       entries.forEach((entry) => setVisible(entry.isIntersecting));
  //     });
  //     observer.observe(domRef.current);
  //   }, []);
  //   return (
  //     <div
  //       className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
  //       ref={domRef}
  //     >
  //       {props.children}
  //     </div>
  //   );
  // };
  const libraries = ["places", "drawing", "geometry"];

  const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY,
    libraries: libraries,
  });

  const [clickedParkId, setClickedParkId] = useState(null);
  const [userCardUUID, setUserCardUUID] = useState(null);
  const [listOfNameAndUUIDS, setListOfNamesAndUUIDS] = useState(null);

  // useEffect(() => {
  //   if (userCardUUID) {
  //     const gettingUserName = async () => {
  //       const supabase = createClient();
  //       const { data, error } = await supabase
  //         .from("profile")
  //         .select("display_name")
  //         .eq("id", userCardUUID);

  //       if (error) {
  //         console.error(error);
  //       } else {
  //         console.log(data);
  //       }
  //     };
  //     gettingUserName();
  //   }
  // }, [userCardUUID]);

  // if (listOfActivePlayers) {
  //   listOfActivePlayers.map((player) => {
  //     console.log(player);
  //   });
  // }
  useEffect(() => {
    if (listOfActivePlayers) {
      const gettingAllNames = async () => {
        let listOfUUID = [];
        listOfActivePlayers.map((player) => {
          listOfUUID.push(player["user_name"]);
        });
        const supabase = createClient();
        const { data, error } = await supabase
          .from("profile")
          .select("display_name, id")
          .in("id", listOfUUID);

        if (data) {
          setListOfNamesAndUUIDS(data);
        }
        if (error) {
          console.log(error);
        }
      };

      gettingAllNames();
    }
  }, [listOfActivePlayers]);

  useEffect(() => {
    if (clickedPark !== null) {
      listOfParkIdsNName.map((parkNId) => {
        if (listOfParks[clickedPark] === parkNId["park_name"]) {
          setClickedParkId(parkNId["id"]);
        }
      });
    }
  }, [clickedPark]);

  return (
    <div className={styles.gridBox}>
      <div className={styles.leftBox}>
        <div className={styles.outsideBox}>
          <div className={styles.paddedBox}>
            <p className={styles.name}>Parks</p>

            {listOfParks.length !== 0 &&
              listOfParks.map((park, index) => {
                let numberOfAttendees;
                if (listOfParksAndRatings) {
                  numberOfAttendees = listOfParksAndRatings[park];
                }

                return (
                  <ParkAttendeesBox
                    numberOfAttendees={numberOfAttendees}
                    parkName={park}
                    key={index}
                    theKey={index}
                    setClickedPark={setClickedPark}
                  />
                );
              })}
          </div>
        </div>
        {clickedPark !== null && (
          <div className={styles.outsideBoxNoScroll}>
            <div className={styles.paddedBox}>
              <p className={styles.name}>{listOfParks[clickedPark]}</p>
              <LineDivider text="Playing with Pals" />
              {clickedParkId !== null &&
                listOfActivePlayers.map((player) => {
                  if (player["park_id"] == clickedParkId) {
                    if (player["at_park"]) {
                      let userName;

                      listOfNameAndUUIDS.map((user) => {
                        if (user.id === player["user_name"]) {
                          userName = user["display_name"];
                        }
                      });

                      let startTime;
                      let endTime;
                      if (player["start_time"] === "Now") {
                        startTime = "Now";
                      } else {
                        startTime = format(
                          new Date(player["start_time"]),
                          "HH:mm"
                        );
                      }
                      if (player["end_time"] === "No End Time") {
                        endTime = "No End Time";
                      } else {
                        endTime = format(new Date(player["end_time"]), "HH:mm");
                      }

                      return (
                        <PlayerCard
                          name={userName}
                          startTime={startTime}
                          endTime={endTime}
                          hasBall={player["has_ball"]}
                          atPark={player["at_park"]}
                        />
                      );
                    }
                  }
                })}
              <LineDivider text="Looking for pals" />
              {clickedParkId !== null &&
                listOfActivePlayers.map((player) => {
                  if (player["park_id"] == clickedParkId) {
                    if (!player["at_park"]) {
                      let userName;

                      listOfNameAndUUIDS.map((user) => {
                        if (user.id === player["user_name"]) {
                          userName = user["display_name"];
                        }
                      });

                      let startTime;
                      let endTime;
                      if (player["start_time"] === "Now") {
                        startTime = "Now";
                      } else {
                        startTime = format(
                          new Date(player["start_time"]),
                          "HH:mm"
                        );
                      }
                      if (player["end_time"] === "No End Time") {
                        endTime = "No End Time";
                      } else {
                        endTime = format(new Date(player["end_time"]), "HH:mm");
                      }

                      return (
                        <PlayerCard
                          name={userName}
                          startTime={startTime}
                          endTime={endTime}
                          hasBall={player["has_ball"]}
                          atPark={player["at_park"]}
                        />
                      );
                    }
                  }
                })}
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
        )}
      </div>

      <div className={styles.rightSideBox}>
        <div className={styles.rightSideBoxPadded}>
          <div className={styles.mapBoxNHeading}>
            <p className={styles.mapText}> Map</p>
            {scriptLoaded && (
              <DashboardMap formattedPostcode={formattedPostcode} />
            )}
          </div>
          <div className={styles.buttonsBox}>
            <JoinButton playerAtParkOrPlanning={playerAtParkOrPlanning} />

            <LeaveParkButton
              playerAtParkOrPlanning={playerAtParkOrPlanning}
              userUUID={userUUID}
              setPlayerAtTheParkOrPlanning={setPlayerAtTheParkOrPlanning}
              activePlayerData={activePlayerData}
              setActivePlayerData={setActivePlayerData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
