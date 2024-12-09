"use client";

import { MapComponent } from "../../../components/Map/MapComponent";
import Header from "@/../components/Header/Header";
import FooterTwo from "../../../components/FooterTwo/FooterTwo";
import LocationBox from "../../../components/LocationBox/LocationBox";
import BackButton from "../../../components/BackButton/BackButton";
import osmtogeojson from "osmtogeojson";
import { useJsApiLoader } from "@react-google-maps/api";
import { useState, useRef, useEffect } from "react";
import randomPointsOnPolygon from "random-points-on-polygon";
import ConfirmButton from "../../../components/ConfirmButton/ConfirmButton";
import { createClient } from "../../../utils/supabase/client";
import UserParkOptions from "../../../components/UserParkOptions/UserParkOptions";
import { useRouter } from "next/navigation";

const libraries = ["places", "drawing", "geometry"];

const overpassQuery = (lat, lng) => {
  const request = `[out:json];
(
  way["leisure"="park"]["name"~"(park|recreation|field)", i](around:1800, ${lat}, ${lng});
);
out geom;`;
  const encodedQuery = encodeURIComponent(request);
  const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodedQuery}`;
  return overpassUrl;
};

const overpassQueryForCentrePoint = (lat, lng) => {
  const request = `[out:json];
(
  way["leisure"="park"]["name"~"(park|recreation|field)", i](around:1800, ${lat}, ${lng});
);
out center;
`;
  const encodedQuery = encodeURIComponent(request);
  const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodedQuery}`;
  return overpassUrl;
};

export default function Map() {
  const router = useRouter();
  const [parkPolygonData, setParkPolygonData] = useState(null);
  const [userManualAddress, setUserManualAddress] = useState(null);
  const [parksLocation, setParksLocation] = useState([]);
  const [parks, setParks] = useState([]);
  const [hoverPark, setHoverPark] = useState([]);
  const [userParkOption, setUserParkOption] = useState(false);
  const [userSelectParkStatus, setUserSelectParkStatus] = useState(false);
  const [listOfParks, setListOfParks] = useState([]);
  const [centrePointsEachPark, setCentrePointsEachPark] = useState([]);
  const [hoverParksCentralLocation, setHoverParksCentralLocation] =
    useState(false);
  const [selectedParksIndex, setSelectedParksIndex] = useState(false);
  const [whichCard, setWhichChard] = useState(false);
  const [randomMarkersPos, setRandomMarkersPos] = useState(false);
  const [userHasConfirmed, setUserHasConfirmed] = useState(false);

  const [userUUID, setUserUUID] = useState(null);
  const [startTime, setStartTime] = useState("Now");
  const [endTime, setEndTime] = useState("No End Time"); // Default value is "No End Time"
  const [bringBall, setBringBall] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [filteredEndTimes, setFilteredEndTimes] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Playing with pals");
  const [showPage, setShowPage] = useState(false);
  const divRef = useRef(null);

  const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY,
    libraries: libraries,
  });

  useEffect(() => {
    const allowedReferer = "https:localhost:3000/dashboard";
    const referer = document.referrer; // Access the Referer header

    if (!referer || !referer.startsWith(allowedReferer)) {
      router.push("/dashboard ");
    } else {
      setShowPage(true);
    }
  }, [router]);

  useEffect(() => {
    const gettingUserUUID = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserUUID(user["id"]);
    };
    gettingUserUUID();
  }, []);

  useEffect(() => {
    if (userUUID) {
      const userPostcode = async () => {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("profile")
          .select("postcode")
          .eq("id", userUUID);
        if (data) {
          let postCodeLatNLng = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              data[0]["postcode"]
            )}&key=${process.env.NEXT_PUBLIC_API_KEY}`
          );
          postCodeLatNLng = await postCodeLatNLng.json();
          setUserManualAddress(
            postCodeLatNLng["results"][0]["geometry"]["location"]
          );
        }
      };

      userPostcode();
    }
  }, [userUUID]);

  useEffect(() => {
    if (whichCard !== false) {
      divRef.current.classList.remove("mapNList");
    }
  }, [whichCard]);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.classList.add("mapNList");
    }
  }, [parksLocation, userParkOption]);

  useEffect(() => {
    if (userManualAddress) {
      fetch(
        overpassQueryForCentrePoint(
          userManualAddress.lat,
          userManualAddress.lng
        )
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          let geoJsonData = osmtogeojson(data);
          geoJsonData = geoJsonData.features;
          let listOfCentrePoints = [];
          geoJsonData.forEach((park) => {
            let coord = park["geometry"]["coordinates"];
            listOfCentrePoints.push(coord);
          });
          setCentrePointsEachPark(listOfCentrePoints);
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        });
    }
  }, [userManualAddress]);

  useEffect(() => {
    if (userManualAddress) {
      fetch(overpassQuery(userManualAddress.lat, userManualAddress.lng))
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          let geoJsonData = osmtogeojson(data);
          geoJsonData = geoJsonData["features"];
          setParkPolygonData(geoJsonData);
          let namesOfParks = [];
          geoJsonData.forEach((park) => {
            namesOfParks.push(park.properties.name);
          });
          setParks(namesOfParks);
          // Log the GeoJSON data
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        });
    }
  }, [userManualAddress]);

  useEffect(() => {
    if (selectedParksIndex !== false) {
      let parkClicked = parkPolygonData[selectedParksIndex];
      let randomCoord = randomPointsOnPolygon(1, parkClicked);
      let coord = randomCoord[0]["geometry"]["coordinates"];
      setRandomMarkersPos({ lat: coord[1], lng: coord[0] });
    }
  }, [selectedParksIndex]);

  return (
    <>
      {showPage && (
        <>
          <Header />

          <div className="eventMiddleBox">
            {/* {scriptLoaded && parksLocation.length == 0 && (
          <AddressBar
            scriptLoaded={scriptLoaded}
            loadError={loadError}
            userLocationFunction={setUserManualAddress}
          />
        )} */}

            {scriptLoaded && (
              <>
                <div
                  ref={divRef}
                  className={
                    userParkOption && !userSelectParkStatus
                      ? "hide"
                      : "show mapNList"
                  }
                >
                  {userManualAddress && (
                    <MapComponent
                      userAddress={userManualAddress}
                      loadedState={scriptLoaded}
                      setParksLocation={setParksLocation}
                      parks={parks}
                      hoverPark={hoverPark}
                      parkPolygonData={parkPolygonData}
                      listOfParks={listOfParks}
                      setListOfParks={setListOfParks}
                      hoverParksCentralLocation={hoverParksCentralLocation}
                      selectedParksIndex={selectedParksIndex}
                      centrePointsEachPark={centrePointsEachPark}
                      whichCard={whichCard}
                      randomMarkersPos={randomMarkersPos}
                    />
                  )}
                  {!userSelectParkStatus && userManualAddress && (
                    <LocationBox
                      parks={parksLocation}
                      allParks={parks}
                      setHoverPark={setHoverPark}
                      setUserParkOption={setUserParkOption}
                      hoverPark={hoverPark}
                      listOfParks={listOfParks}
                      setHoverParksCentralLocation={
                        setHoverParksCentralLocation
                      }
                      centrePointsEachPark={centrePointsEachPark}
                      setSelectedParksIndex={setSelectedParksIndex}
                    />
                  )}
                </div>
                {userParkOption && !userSelectParkStatus && (
                  <UserParkOptions
                    setUserSelectParkStatus={setUserSelectParkStatus}
                    setWhichChard={setWhichChard}
                    startTime={startTime}
                    setStartTime={setStartTime}
                    endTime={endTime}
                    setEndTime={setEndTime}
                    bringBall={bringBall}
                    setBringBall={setBringBall}
                    timeSlots={timeSlots}
                    setTimeSlots={setTimeSlots}
                    filteredEndTimes={filteredEndTimes}
                    setFilteredEndTimes={setFilteredEndTimes}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                  />
                )}
                {whichCard && (
                  <ConfirmButton
                    setUserHasConfirmed={setUserHasConfirmed}
                    userHasConfirmed={userHasConfirmed}
                    userUUID={userUUID}
                    randomMarkersPos={randomMarkersPos}
                    startTime={startTime}
                    endTime={endTime}
                    parks={parks}
                    selectedParksIndex={selectedParksIndex}
                    bringBall={bringBall}
                    selectedOption={selectedOption}
                  />
                )}

                {parks.length !== 0 && (
                  <BackButton
                    setUserSelectParkStatus={setUserSelectParkStatus}
                    setParksLocation={setParksLocation}
                    divRef={divRef.current}
                    setUserParkOption={setUserParkOption}
                    setHoverPark={setHoverPark}
                    userParkOption={userParkOption}
                    userSelectParkStatus={userSelectParkStatus}
                    whichCard={whichCard}
                    setWhichChard={setWhichChard}
                  />
                )}
              </>
            )}
          </div>

          <FooterTwo />
        </>
      )}
    </>
  );
}
