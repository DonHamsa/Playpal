/*
Since the map was loaded on client side, 
we need to make this component client rendered as well else error occurs
// */
"use client";
import "./MapComponent.css";

//Map component Component from library
import { GoogleMap, Polygon, Marker } from "@react-google-maps/api";
import { useEffect, useRef, useState, useMemo } from "react";

//Map's styling
const defaultMapContainerStyle = {
  width: "400px",
  height: "380px",
  borderRadius: "25px 25px 25px 25px",
};

const defaultMapCenter = {
  lat: 54.82615975451427,
  lng: -4.389917248775504,
};

const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,
  // mapTypeControl: false,
  gestureHandling: "auto",
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
}) => {
  // console.log(userAddress)
  const mapRef = useRef(null);
  const radius = 2000;
  const [userHasDragged, setUserHasDragged] = useState(0);

  let circlePath;
  let outerBounds;
  let defaultMapZoom = 5;

  if (parks.length !== 0) {
    defaultMapZoom = 13;
  }

  useEffect(() => {
    if (userAddress && mapRef) {
      // console.log('hello')
      const places = new window.google.maps.places.PlacesService(
        mapRef.current
      );

      let pushableParks = [];
      let parksLocation = [];
      places.nearbySearch(request(userAddress), (response) => {
        // console.log(response);
        let count = 0;
        response.forEach((place) => {
          if (count === 3) {
            return;
          }

          let types = place.types;
          const BadPlace = types.find(
            (type) => type === "bar" || type === "restaurant"
          );
          if (BadPlace) {
            return;
          }

          pushableParks.push([
            place.geometry.location.lat(),
            place.geometry.location.lng(),
          ]);
          // console.log(place)
          // setParksLocation(place.name)
          parksLocation.push(place.name);
          count++;
        });

        setParks(pushableParks);
        setParksLocation(parksLocation);
      });
    }
  }, [userAddress]);

  const handleDrag = () => {
    setUserHasDragged(userHasDragged + 1);
  };

  if (userAddress && mapRef.current) {
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

  const customPin = `
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="50" fill="rgba(71, 71, 71, 0.40)" />
    <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="40" fill="white">•</text>
  </svg>
`;

  const createMarkers = useMemo(() => {
    let list;
    if (hoverPark.length === 0) {
      list = parks;
    } else {
      list = [hoverPark];
    }
    return list.map((park) => {
      return (
        <Marker
          position={{ lat: park[0], lng: park[1] }}
          key={Math.random()}
          icon={{
            url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
              customPin
            )}`, // Encode the SVG as a data URI
            scaledSize: new window.google.maps.Size(20, 20), // Adjust the size if needed
          }}
        />
      );
    });
  }, [parks, hoverPark]);

  return (
    <div className="mapBlock">
      <div className="mapBox">
        <GoogleMap
          mapContainerStyle={defaultMapContainerStyle}
          center={userAddress || defaultMapCenter}
          zoom={defaultMapZoom}
          options={defaultMapOptions}
          onLoad={(map) => {
            mapRef.current = map;
          }}
          onIdle={handleDrag}
          onDrag={handleDrag}
          onZoomChanged={handleDrag}
        >
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
          {parks.length !== 0 && createMarkers}
        </GoogleMap>
      </div>
    </div>
  );
};

export { MapComponent };
