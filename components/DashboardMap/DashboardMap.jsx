"use client";

import { GoogleMap, Polygon, Marker } from "@react-google-maps/api";
import { useEffect, useRef, useState, useMemo } from "react";
import "./DashboardMap.css";

const defaultMapContainerStyle = {
  width: "470px",
  height: "380px",
  borderRadius: "25px 25px 25px 25px",
  marginBottom: '20px'
};

const radius = 2000;
const defaultMapZoom = 13;

const userAddress = { lat: 51.52131476800326, lng: -0.4368598884788708 };

const defaultMapOptions = {
  mapId: "368672a61443988a",
  fullscreenControl: false,
  disableDefaultUI: false,
  draggable: false,
  
};

const DashboardMap = () => {
  let circlePath;
  let outerBounds;
  const [haveMap, setHaveMap] = useState(false);
  const mapRef = useRef(false);

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
      circlePath = [];

      outerBounds = changeOuterBounds(mapRef);
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

      return (
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
      );
    }
  };

  const userMarker = () => {
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
  };
  return (
    <GoogleMap
      mapContainerStyle={defaultMapContainerStyle}
      center={userAddress}
      zoom={defaultMapZoom}
      options={defaultMapOptions}
      onLoad={(map) => {
        mapRef.current = map;
        setTimeout(() => {
          setHaveMap(true);
        }, 50);
      }}
    >
      {haveMap &&
        calculations()
      }
    </GoogleMap>
  );
};

export { DashboardMap };
