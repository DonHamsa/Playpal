import { SlLocationPin } from "react-icons/sl";
import styles from "./LocationList.module.css";
import { useRef } from "react";

export default function LocationList({
  name,
  parksLocation,
  theKey,
  setHoverPark,
  setUserParkOption,
  hoverPark,
  listOfParks,
  setHoverParksCentralLocation,
  centrePointsEachPark,
  setSelectedParksIndex
}) {
  const onMouseEnterHandler = () => {
    setHoverPark(listOfParks[theKey]);
    setHoverParksCentralLocation({lat:centrePointsEachPark[theKey][1],lng:centrePointsEachPark[theKey][0] })
    
  };
  const onMouseLeaveHandler = () => {
    setHoverPark([]);
    setHoverParksCentralLocation(false)

  };
  const handleClick = () => {
    setUserParkOption(true);
    setSelectedParksIndex(theKey)
    
  };

  const para = useRef("");

  return (
    <p
      className={styles.nameBox}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      onDoubleClick={handleClick}
      ref={para}
    >
      <SlLocationPin className={styles.marker} />
      {name}
    </p>
  );
}
