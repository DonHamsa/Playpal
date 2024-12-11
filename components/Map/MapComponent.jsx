"use client";
import "./MapComponent.css";
import { GoogleMap, Polygon, Marker } from "@react-google-maps/api";
import { useEffect, useRef, useState, useMemo } from "react";

const defaultMapContainerStyle = {
  width: "400px",
  height: "380px",
  borderRadius: "25px 25px 25px 25px",
  margin: "0",
};

const defaultMapOptions = {
  mapId: "368672a61443988a",
  fullscreenControl: false,
};

const request = (center) => {
  return {
    fields: ["location", "adrFormatAddress", "addressComponents"],
    type: "park",
    location: { lat: center.lat, lng: center.lng },
    radius: 2000,
    includedPrimaryTypes: ["park"],
  };
};

const changeOuterBounds = (mapRef) => {
  const bounds = mapRef.current.getBounds();
  if (!bounds) return;

  // Create coordinates that cover the entire visible map
  const ne = bounds.getNorthEast();
  const sw = bounds.getSouthWest();
  return [
    { lat: ne.lat(), lng: ne.lng() },
    { lat: sw.lat(), lng: ne.lng() },
    { lat: sw.lat(), lng: sw.lng() },
    { lat: ne.lat(), lng: sw.lng() },
  ];
};

const MapComponent = ({
  userAddress,
  scriptLoaded,
  setParksLocation,
  parks,
  setParks,
  hoverPark,
  parkPolygonData,
  listOfParks,
  setListOfParks,
  hoverParksCentralLocation,
  whichCard,
  selectedParksIndex,
  randomMarkersPos,
  centrePointsEachPark,
}) => {
  const mapRef = useRef(null);
  const radius = 2000;
  const [userHasDragged, setUserHasDragged] = useState(0);

  let circlePath;
  let outerBounds;
  let defaultMapZoom = 5;

  if (parks.length !== 0) {
    defaultMapZoom = 13;
  }
  if (hoverParksCentralLocation) {
    defaultMapZoom = 15;
  }
  if (whichCard) {
    defaultMapZoom = 15;
  }

  useEffect(() => {
    if (parkPolygonData) {
      const length = parkPolygonData.length;
      let allParkList = [];
      for (let i = 0; i < length; i++) {
        let individualPark = [];
        let parkCoordinates = parkPolygonData[i]["geometry"]["coordinates"][0];
        parkCoordinates.forEach((coord) => {
          let parkPoint = { lat: coord[1], lng: coord[0] };
          individualPark.push(parkPoint);
        });
        allParkList.push(individualPark);
      }
      setListOfParks(allParkList);
    }
  }, [parkPolygonData]);

  const handleDrag = () => {
    setUserHasDragged(userHasDragged + 1);
  };

  if (
    userAddress &&
    mapRef.current &&
    !hoverParksCentralLocation &&
    !whichCard
  ) {
    circlePath = [];

    outerBounds = changeOuterBounds(mapRef);

    // Generate circle path points
    const numPoints = 140;
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * 2 * Math.PI;
      circlePath.push({
        lat: userAddress.lat + (radius / 111320) * Math.cos(angle),
        lng:
          userAddress.lng +
          (radius / (111320 * Math.cos(userAddress.lat * (Math.PI / 180)))) *
            Math.sin(angle),
      });
    }

    // Reverse the order of the circlePath if needed
    circlePath.reverse();

    // You can use the outerBounds and circlePath as needed here
    // console.log("Outer Bounds:", outerBounds);
    // console.log("Circle Path:", circlePath);
  }

  const userLocationMarker = useMemo(() => {
    return (
      <Marker
        position={userAddress}
        key={Math.random()}
        icon={{
          url: "/images/userLocation.png",
          scaledSize: new window.google.maps.Size(35, 35), // Adjust the size if needed
        }}
      />
    );
  }, [userAddress]);

  return (
    <div className="mapBlock">
      <div className="mapBox">
        <GoogleMap
          mapContainerStyle={defaultMapContainerStyle}
          center={
            (whichCard && {
              lat: centrePointsEachPark[Number(selectedParksIndex)][1],
              lng: centrePointsEachPark[Number(selectedParksIndex)][0],
            }) ||
            hoverParksCentralLocation ||
            userAddress ||
            defaultMapCenter
          }
          zoom={defaultMapZoom}
          options={defaultMapOptions}
          onLoad={(map) => {
            mapRef.current = map;
          }}
          onIdle={handleDrag}
          onDrag={handleDrag}
          onZoomChanged={handleDrag}
        >
          {whichCard && selectedParksIndex !== false && (
            <Marker
              position={randomMarkersPos}
              icon={{
                url:
                  whichCard === "Playing with pals"
                    ? "/images/red.png"
                    : "/images/black.png",
                // fillColor: "#90EE90",
                // fillOpacity:1,
                scaledSize: new window.google.maps.Size(32, 35),
              }}
            />
          )}
          {userAddress && userLocationMarker}
          {circlePath && outerBounds && (
            <>
              <Polygon
                paths={[circlePath, outerBounds]}
                options={{
                  strokeColor: "#000000",
                  strokeOpacity: 0.8,
                  strokeWeight: 0,
                  fillColor: "#000000",
                  fillOpacity: 0.9,
                }}
              />
            </>
          )}
          {listOfParks.length !== 0 &&
            hoverPark.length === 0 &&
            listOfParks.map((park, index) => {
              return (
                <Polygon
                  key={index}
                  path={park}
                  options={{
                    // fillColor: "rgba(147, 130, 116, 0.9)",
                    strokeColor: "#000000",
                    fillOpacity: 0,
                    strokeWeight: 0.7,
                  }}
                />
              );
            })}
          {hoverPark.length !== 0 && (
            <Polygon
              key={Math.random()}
              path={hoverPark}
              options={{
                // fillColor: "rgba(147, 130, 116, 0.9)",
                strokeColor: "#000000",
                fillOpacity: 0,
                strokeWeight: 0.7,
              }}
            />
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export { MapComponent };
