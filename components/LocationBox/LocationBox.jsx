import styles from "./LocationBox.module.css";
import LocationList from "./LocationList/LocationList";

export default function LocationBox({ parks, allParks, setHoverPark, setUserParkOption, hoverPark}) {
  return (
    <>
      <div>
        <div className={styles.locationBox}>
          <h3 className={styles.heading}>Locations</h3>
          <h5 className={styles.instruction}>Double click on the park you are at/want to go to:</h5>
          <div className= {!hoverPark.length==0 ? 'greyedOut' : ''}>
            {parks.map((name, index ) => (
              <LocationList name={name} theKey={index} parks={parks} parksLocation={allParks} key={index} setHoverPark={setHoverPark} setUserParkOption={setUserParkOption} hoverPark={hoverPark}></LocationList>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
