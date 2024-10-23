import React, { useEffect, useState, useRef } from "react";
import styles from './AddressBar.module.css'


export default function AddressBar({scriptLoaded, loadError, userLocationFunction}){


  const [input, setInput] = useState({});
  const inputRef = useRef(null);


  useEffect(() => {
    if (!scriptLoaded || loadError) return;

    const options = {
      fields: ["address_components", "geometry", ],
    };

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, options);
    
    autocomplete.addListener("place_changed", () => handlePlaceChanged(autocomplete));

    // return () => autocomplete.removeListener("place_changed", handlePlaceChanged);
  }, [scriptLoaded, loadError]);

  const handleChange = (event) => {
    const {name, value} = event.target;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handlePlaceChanged = async(address) => {
    if (!scriptLoaded) return;
    const place = address.getPlace()

    if (!place || !place.geometry) {
      setInput({});
      return;
    }
    userLocationFunction({lat: place.geometry.location.lat(),lng: place.geometry.location.lng()});
    // userLocationFunction(place)
  };


  return(
    <>

      <div className={styles.addressBox}>
        <input
          type="search"
          name="streetAddress"
          ref={inputRef}
          value={input.streetAddress || ""}
          onChange={handleChange}
          className={styles.input}
          placeholder="Enter your address here"
          required
        />
      </div>

    </>
  )
}