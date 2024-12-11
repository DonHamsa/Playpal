"use client";

import styles from "./Dashboard.module.css";
import { VscCircleLargeFilled } from "react-icons/vsc";
import React from "react";
import ParkAttendeesBox from "../ParkAttendeesBox/ParkAttendeesBox";
import JoinButton from "../JoinButton/JoinButton";
import LeaveParkButton from "../LeaveParkButton/LeaveParkButton";
import DashboardMap from "../DashboardMap/DashboardMap";
import { useJsApiLoader } from "@react-google-maps/api";
import LineDivider from "../LineDivider/LineDivider";
import { useEffect, useState } from "react";
import PlayerCard from "../PlayerCards/PlayerCards";
import { format } from "date-fns";
import { createClient } from "../../utils/supabase/client";

const libraries = ["places", "drawing", "geometry"];

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
  listOfParkIds,
  rerun,
  listOfCentrePoints,
  setClickedParkCord,
  clickedParkCord,
}) {
  const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY,
    libraries: libraries,
  });
  const supabase = createClient();

  const [clickedParkId, setClickedParkId] = useState(null);
  const [listOfNameAndUUIDS, setListOfNamesAndUUIDS] = useState(null);
  const [listOfMarkersAndStatus, setListOfMarkersAndStatus] = useState(null);

  useEffect(() => {
    if (listOfParkIds) {
      const gettingPlayerMarkers = async () => {
        const { data, error } = await supabase
          .from("active_players")
          .select("lat_marker, lng_marker, at_park")
          .in("park_id", listOfParkIds);
        if (data) {
          setListOfMarkersAndStatus(data);
        }
        if (error) {
          console.log(error);
        }
      };

      gettingPlayerMarkers();
    }
  }, [listOfParkIds, rerun]);

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
        {listOfParkIdsNName && listOfActivePlayers && (
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
                      identifier={index}
                      numberOfAttendees={numberOfAttendees}
                      parkName={park}
                      key={index}
                      theKey={index}
                      setClickedPark={setClickedPark}
                      listOfCentrePoints={listOfCentrePoints}
                      setClickedParkCord={setClickedParkCord}
                    />
                  );
                })}
            </div>
          </div>
        )}
        {clickedPark !== null && (
          <div className={styles.outsideBoxNoScroll}>
            <div className={`${styles.paddedBox} ${styles.secondPaddedBox}`}>
              <p className={styles.name}>{listOfParks[clickedPark]}</p>
              <LineDivider text="Playing with Pals" />
              {clickedParkId !== null &&
                listOfActivePlayers.map((player, index) => {
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
                          key={index}
                          name={userName}
                          startTime={startTime}
                          endTime={endTime}
                          hasBall={player["has_ball"]}
                          atPark={player["at_park"]}
                          me={userUUID === player["user_name"] ? true : false}
                        />
                      );
                    }
                  }
                })}
              <LineDivider text="Looking for pals" />
              {clickedParkId !== null &&
                listOfActivePlayers.map((player, index) => {
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
                          key={index}
                          name={userName}
                          startTime={startTime}
                          endTime={endTime}
                          hasBall={player["has_ball"]}
                          atPark={player["at_park"]}
                          me={userUUID === player["user_name"] ? true : false}
                        />
                      );
                    }
                  }
                })}
              <div className={styles.ballKey}>
                <div className={styles.ballKeyCentre}>
                  <p>
                    <VscCircleLargeFilled className={styles.box} />
                    Ball
                  </p>
                  <p>
                    <VscCircleLargeFilled className={styles.noBallbox} />
                    No ball
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
              <DashboardMap
                formattedPostcode={formattedPostcode}
                listOfMarkersAndStatus={listOfMarkersAndStatus}
                listOfCentrePoints={listOfCentrePoints}
                clickedParkCord={clickedParkCord}
              />
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
