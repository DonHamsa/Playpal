"use client";

import { MapComponent } from "../../../components/Map/MapComponent";
import AddressBar from "../../../components/AddressBar/AddressBar";
import Header from "@/../components/Header/Header";
import FooterTwo from "../../../components/FooterTwo/FooterTwo";
import LocationBox from "../../../components/LocationBox/LocationBox";
import BackButton from "../../../components/BackButton/BackButton";
import OptionPage from "../../../components/OptionPage/OptionPage";

import { useJsApiLoader } from "@react-google-maps/api";
import { useState, useRef, useEffect } from "react";
const libraries = ["places", "drawing", "geometry"];

export default function Map() {
  const [userManualAddress, setUserManualAddress] = useState(null);
  const [parksLocation, setParksLocation] = useState([]);
  const [parks, setParks] = useState([]);
  const [hoverPark, setHoverPark] = useState([]);
  const [userParkOption, setUserParkOption] = useState(false);
  const [userSelectParkStatus, setUserSelectParkStatus] = useState(false);
  const divRef = useRef(null);

  const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyChG76dCtgyEkKvEtYNt8eQDWjUaP42A0o",
    libraries: libraries,
  });

  useEffect(() => {
    if (divRef.current) {
      divRef.current.classList.add("mapNList");
      if (!userParkOption && parksLocation.length === 0) {
        divRef.current.classList.remove("mapNList");
      }
    }
  }, [parksLocation, userParkOption]);

  return (
    <>
      <Header />

      <div>
        {scriptLoaded && parksLocation.length == 0 && (
          <AddressBar
            scriptLoaded={scriptLoaded}
            loadError={loadError}
            userLocationFunction={setUserManualAddress}
          />
        )}

        {scriptLoaded && (
          <>
            <div ref={divRef} className={userParkOption && !userSelectParkStatus ? "hide" : "show"}>
              <MapComponent
                userAddress={userManualAddress}
                loadedState={scriptLoaded}
                setParksLocation={setParksLocation}
                parks={parks}
                setParks={setParks}
                hoverPark={hoverPark}
              />
              {(parksLocation.length !== 0 && !userSelectParkStatus)  && (
                <LocationBox
                  parks={parksLocation}
                  allParks={parks}
                  setHoverPark={setHoverPark}
                  setUserParkOption={setUserParkOption}
                  hoverPark={hoverPark}
                />
              )}
            </div>
            {userParkOption && !userSelectParkStatus && (
              <OptionPage setUserSelectParkStatus={setUserSelectParkStatus} />
            )}

            {parksLocation.length !== 0 && (
              <BackButton
                setUserSelectParkStatus={setUserSelectParkStatus}
                setParksLocation={setParksLocation}
                divRef={divRef.current}
                setUserParkOption={setUserParkOption}
                setHoverPark={setHoverPark}
                userParkOption={userParkOption}
                userSelectParkStatus={userSelectParkStatus}
              />
            )}
          </>
        )}
      </div>
      <FooterTwo />
    </>
  );
}
