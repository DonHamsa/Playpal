"use client";

import { MapComponent } from "../../../components/Map/MapComponent";
import AddressBar from "../../../components/AddressBar/AddressBar";
import Header from "@/../components/Header/Header";
import FooterTwo from "../../../components/FooterTwo/FooterTwo";
import LocationBox from "../../../components/LocationBox/LocationBox";
import BackButton from "../../../components/BackButton/BackButton";

import { useJsApiLoader } from "@react-google-maps/api";
import { useState, useRef, useEffect } from "react";
const libraries = ["places", "drawing", "geometry"];

export default function Map() {
  const [userManualAddress, setUserManualAddress] = useState(null);
  const [parksLocation, setParksLocation] = useState([]);
  const [parks, setParks] = useState([]);
  const [hoverPark, setHoverPark] = useState([]);
  const [userParkOption, setUserParkOption] = useState(false);
  const divRef = useRef(null);

  const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCPJKZqcuw4yy1bTTxk7S__J0Mg8a-8OAE",
    libraries: libraries,
  });

  useEffect(() => {
    if (divRef.current) {
      divRef.current.classList.add("mapNList");
      if (!userParkOption && parksLocation.length===0) {
        console.log('drbvrtbjnerbn')
        divRef.current.classList.remove("mapNList");
        console.log(divRef.current.classList);
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
            <div ref={divRef} className={userParkOption ? "hide" : "show"}>
              <MapComponent
                userAddress={userManualAddress}
                loadedState={scriptLoaded}
                setParksLocation={setParksLocation}
                parks={parks}
                setParks={setParks}
                hoverPark={hoverPark}
              />
              {parksLocation.length !== 0 && (
                <LocationBox
                  parks={parksLocation}
                  allParks={parks}
                  setHoverPark={setHoverPark}
                  setUserParkOption={setUserParkOption}
                />
              )}
            </div>

            {parksLocation.length !== 0 && (
              <BackButton
                setParksLocation={setParksLocation}
                divRef={divRef.current}
                setUserParkOption={setUserParkOption}
                setHoverPark={setHoverPark}
                userParkOption={userParkOption}
              />
            )}
          </>
        )}
      </div>
      <FooterTwo />
    </>
  );
}
