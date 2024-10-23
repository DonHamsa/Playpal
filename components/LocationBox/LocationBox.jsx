import styles from "./LocationBox.module.css";
import LocationList from "./LocationList/LocationList";

export default function LocationBox({ parks, allParks, setHoverPark, setUserParkOption}) {
  return (
    <>
      <div>
        <div className={styles.locationBox}>
          <h3 className={styles.heading}>Locations</h3>
          <h5 className={styles.instruction}>Select a location to view on the map:</h5>
          <div>
            {parks.map((name, index ) => (
              <LocationList name={name} theKey={index} parks={parks} parksLocation={allParks} key={index} setHoverPark={setHoverPark} setUserParkOption={setUserParkOption}>  </LocationList>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
