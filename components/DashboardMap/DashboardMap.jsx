"use client";

import { GoogleMap, Polygon, Marker } from "@react-google-maps/api";
import { useEffect, useRef, useState, useMemo } from "react";
// import { createClient } from "../../utils/supabase/client";

import "./DashboardMap.css";
import { CircleDashed } from "lucide-react";

const defaultMapContainerStyle = {
  width: "470px",
  height: "380px",
  borderRadius: "25px 25px 25px 25px",
  marginBottom: "20px",
};

const radius = 2000;
const defaultMapZoom = 13;

const defaultMapOptions = {
  mapId: "368672a61443988a",
  fullscreenControl: false,
  disableDefaultUI: false,
  draggable: false,
};

const DashboardMap = ({
  formattedPostcode,
  listOfMarkersAndStatus,
  clickedParkCord,
}) => {
  let circlePath;
  let outerBounds;
  const [haveMap, setHaveMap] = useState(false);
  const [mapPath, setMapPath]= useState(null)

  const mapRef = useRef(false);

  // useEffect(() => {
  //   if (userPostcode) {
  //     const response = async () => {
  //       const data = await fetch(
  //         `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
  //           userPostcode
  //         )}&key=${process.env.NEXT_PUBLIC_API_KEY}`
  //       );
  //       let convertedPostcode = await data.json();
  //       setFormattedPostcode({
  //         lat: convertedPostcode["results"][0]["geometry"]["location"]["lat"],
  //         lng: convertedPostcode["results"][0]["geometry"]["location"]["lng"],
  //       });
  //     };
  //     response();
  //   }
  // }, [userPostcode]);
  const changeOuterBounds = (mapRef) => {
    const bounds = mapRef.current.getBounds();
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();
    return [
      { lat: ne.lat(), lng: ne.lng() },
      { lat: sw.lat(), lng: ne.lng() },
      { lat: sw.lat(), lng: sw.lng() },
      { lat: ne.lat(), lng: sw.lng() },
    ];
  };

  const calculations = () => {
    if (mapRef.current) {
      if (mapPath===null) {
      circlePath = [];

      outerBounds = changeOuterBounds(mapRef);
      const numPoints = 140;
      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * 2 * Math.PI;
        circlePath.push({
          lat: formattedPostcode.lat + (radius / 111320) * Math.cos(angle),
          lng:
            formattedPostcode.lng +
            (radius /
              (111320 * Math.cos(formattedPostcode.lat * (Math.PI / 180)))) *
              Math.sin(angle),
        });
      }

      // Reverse the order of the circlePath if needed
      circlePath.reverse();

      setMapPath([circlePath, outerBounds])
    }
      return (
        <>
        {console.log(mapPath)}
        <Polygon
          paths={mapPath}
          options={{
            strokeColor: "#000000",
            strokeOpacity: 0.8,
            strokeWeight: 0,
            fillColor: "#000000",
            fillOpacity: 0.9,
          }}
        />
        </>
      );
    }
  };

  // const userMarker = () => {
  //   return (
  //     <Marker
  //       key={Math.random()}
  //       icon={{
  //         url: "/images/userLocation.png",
  //         scaledSize: new window.google.maps.Size(35, 35), // Adjust the size if needed
  //       }}
  //     />
  //   );
  // };
  return (
    <>
      {formattedPostcode && (
        <GoogleMap
          mapContainerStyle={defaultMapContainerStyle}
          center={
            clickedParkCord
              ? { lat: clickedParkCord[1], lng: clickedParkCord[0] }
              : formattedPostcode
          }
          zoom={clickedParkCord? 16 : defaultMapZoom}
          options={defaultMapOptions}
          onLoad={(map) => {
            mapRef.current = map;
            setTimeout(() => {
              setHaveMap(true);
            }, 50);
          }}
        >
          {haveMap && calculations()}
          {formattedPostcode && (
            <Marker
              position={formattedPostcode}
              icon={{
                url: "/images/userLocation.png",
                scaledSize: new window.google.maps.Size(32, 35),
              }}
            ></Marker>
          )}
          {listOfMarkersAndStatus &&
            listOfMarkersAndStatus.map((player, index) => {
              let markerIcon;
              if (player["at_park"]) {
                markerIcon = "/images/red.png";
              } else {
                markerIcon = "/images/black.png";
              }
              return (
                <Marker
                  position={{
                    lat: player["lat_marker"],
                    lng: player["lng_marker"],
                  }}
                  icon={{
                    url: markerIcon,
                    scaledSize: new window.google.maps.Size(32, 35),
                  }}
                  key={index}
                ></Marker>
              );
            })}
        </GoogleMap>
      )}
    </>
  );
};

export { DashboardMap };
