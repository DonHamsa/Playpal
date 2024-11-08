"use client";

import { MapComponent } from "../../../components/Map/MapComponent";
import AddressBar from "../../../components/AddressBar/AddressBar";
import Header from "@/../components/Header/Header";
import FooterTwo from "../../../components/FooterTwo/FooterTwo";
import LocationBox from "../../../components/LocationBox/LocationBox";
import BackButton from "../../../components/BackButton/BackButton";
import OptionPage from "../../../components/OptionPage/OptionPage";
import osmtogeojson from "osmtogeojson";
import { useJsApiLoader } from "@react-google-maps/api";
import { useState, useRef, useEffect } from "react";
import randomPointsOnPolygon from "random-points-on-polygon";
import ConfirmButton from "../../../components/ConfirmButton/ConfirmButton";
import Dashboard from "../../../components/Dashboard/Dashboard";

const libraries = ["places", "drawing", "geometry"];

const overpassQuery = (lat, lng) => {
  const request = `[out:json];
(
  way["leisure"="park"]["name"~"(park|recreation|field)", i](around:2000, ${lat}, ${lng});
);
out geom;`;
  const encodedQuery = encodeURIComponent(request);
  const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodedQuery}`;
  return overpassUrl;
};

const overpassQueryForCentrePoint = (lat, lng) => {
  const request = `[out:json];
(
  way["leisure"="park"]["name"~"(park|recreation|field)", i](around:2000, ${lat}, ${lng});
);
out center;
`;
  const encodedQuery = encodeURIComponent(request);
  const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodedQuery}`;
  return overpassUrl;
};

export default function Map() {
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
  const divRef = useRef(null);
  const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 
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
  //  geoJsonData["features"][2]['geometry']['coordinates'][0],

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
            namesOfParks.push(park.properties.tags.name);
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
    
      <Header/>
      
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
              <div
                ref={divRef}
                className={
                  userParkOption && !userSelectParkStatus ? "hide" : "show"
                }
              >
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
                {parksLocation.length !== 0 && !userSelectParkStatus && (
                  <LocationBox
                    parks={parksLocation}
                    allParks={parks}
                    setHoverPark={setHoverPark}
                    setUserParkOption={setUserParkOption}
                    hoverPark={hoverPark}
                    listOfParks={listOfParks}
                    setHoverParksCentralLocation={setHoverParksCentralLocation}
                    centrePointsEachPark={centrePointsEachPark}
                    setSelectedParksIndex={setSelectedParksIndex}
                  />
                )}
              </div>
              {userParkOption && !userSelectParkStatus && (
                <OptionPage
                  setUserSelectParkStatus={setUserSelectParkStatus}
                  setWhichChard={setWhichChard}
                />
              )}
              {whichCard && <ConfirmButton setUserHasConfirmed={setUserHasConfirmed} userHasConfirmed={userHasConfirmed}/>}

              {parksLocation.length !== 0 && (
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
      
      <FooterTwo/>
    </>
  );
}
