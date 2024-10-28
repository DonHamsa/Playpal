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
}) {
  const onMouseEnterHandler = () => {
    setHoverPark(parksLocation[theKey]);
    if (para) {
      // para.current.classList.add('makeBlack')
    }
  };
  const onMouseLeaveHandler = () => {
    setHoverPark([]);
  };
  const handleClick = () => {
    setUserParkOption(true);
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
