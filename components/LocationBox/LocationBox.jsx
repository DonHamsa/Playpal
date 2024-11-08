import styles from "./LocationBox.module.css";
import LocationList from "./LocationList/LocationList";

export default function LocationBox({ parks, allParks, setHoverPark, setUserParkOption, hoverPark, listOfParks,centrePointsEachPark, setHoverParksCentralLocation, setSelectedParksIndex}) {
  return (
    <>
      <div>
        <div className={styles.locationBox}>
          <h3 className={styles.heading}>Locations</h3>
          <h5 className={styles.instruction}>Double click on the park you are at/want to go to:</h5>
          <div className= {!hoverPark.length==0 ? 'greyedOut' : ''}>
            {allParks.map((name, index ) => (
              <LocationList name={name} theKey={index}  parksLocation={allParks} key={index} setHoverPark={setHoverPark} setUserParkOption={setUserParkOption} hoverPark={hoverPark} listOfParks={listOfParks} centrePointsEachPark={centrePointsEachPark} setHoverParksCentralLocation={setHoverParksCentralLocation} setSelectedParksIndex={setSelectedParksIndex}></LocationList>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
