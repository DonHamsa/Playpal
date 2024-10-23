import { SlLocationPin } from "react-icons/sl";
import styles from "./LocationList.module.css";

export default function LocationList({
  name,
  parksLocation,
  theKey,
  setHoverPark,
  setUserParkOption
}) {
  const onMouseEnterHandler = () => {
    setHoverPark(parksLocation[theKey]);
  };
  const onMouseLeaveHandler = () => {
    setHoverPark([]);
  };
  const handleClick= ()=>{
    setUserParkOption(true)
  }
  return (
    <p
      className={styles.nameBox}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      onClick={handleClick}
    >
      <SlLocationPin className={styles.marker} />
      {name}
    </p>
  );
}
