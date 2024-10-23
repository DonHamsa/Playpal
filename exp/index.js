function addressAutocomplete(containerElement, callback, options) {
  const MIN_ADDRESS_LENGTH = 3;
  const DEBOUNCE_DELAY = 300;

  // create container for input element
  const inputContainerElement = document.createElement("div");
  inputContainerElement.setAttribute("class", "input-container");
  containerElement.appendChild(inputContainerElement);

  // create input element
  const inputElement = document.createElement("input");
  inputElement.setAttribute("type", "text");
  inputElement.setAttribute("placeholder", options.placeholder);
  inputContainerElement.appendChild(inputElement);

  // add input field clear button
  const clearButton = document.createElement("div");
  clearButton.classList.add("clear-button");
  addIcon(clearButton);
  clearButton.addEventListener("click", (e) => {
    e.stopPropagation();
    inputElement.value = "";
    callback(null);
    clearButton.classList.remove("visible");
    closeDropDownList();
  });
  inputContainerElement.appendChild(clearButton);

  /* We will call the API with a timeout to prevent unneccessary API activity.*/
  let currentTimeout;

  /* Save the current request promise reject function. To be able to cancel the promise when a new request comes */
  let currentPromiseReject;

  /* Focused item in the autocomplete list. This variable is used to navigate with buttons */
  let focusedItemIndex;

  /* Process a user input: */
  inputElement.addEventListener("input", function (e) {
    const currentValue = this.value;

    /* Close any already open dropdown list */
    closeDropDownList();

    // Cancel previous timeout
    if (currentTimeout) {
      clearTimeout(currentTimeout);
    }

    // Cancel previous request promise
    if (currentPromiseReject) {
      currentPromiseReject({
        canceled: true,
      });
    }

    if (!currentValue) {
      clearButton.classList.remove("visible");
    }

    // Show clearButton when there is a text
    clearButton.classList.add("visible");

    // Skip empty or short address strings
    if (!currentValue || currentValue.length < MIN_ADDRESS_LENGTH) {
      return false;
    }

    /* Call the Address Autocomplete API with a delay */
    currentTimeout = setTimeout(() => {
      currentTimeout = null;

      /* Create a new promise and send geocoding request */
      const promise = new Promise((resolve, reject) => {
        currentPromiseReject = reject;

        // The API Key provided is restricted to JSFiddle website
        // Get your own API Key on https://myprojects.geoapify.com
        const apiKey = "bb626bc521cb4f1f9988a690a7b6e3a5";

        var url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          currentValue
        )}&format=json&limit=5&apiKey=${apiKey}`;

        fetch(url).then((response) => {
          currentPromiseReject = null;

          // check if the call was successful
          if (response.ok) {
            response.json().then((data) => resolve(data));
          } else {
            response.json().then((data) => reject(data));
          }
        });
      });

      promise.then(
        (data) => {
          // here we get address suggestions
          let currentItems = data.results;

          /*create a DIV element that will contain the items (values):*/
          const autocompleteItemsElement = document.createElement("div");
          autocompleteItemsElement.setAttribute("class", "autocomplete-items");
          inputContainerElement.appendChild(autocompleteItemsElement);

          /* For each item in the results */
          data.results.forEach((result, index) => {
            /* Create a DIV element for each element: */
            const itemElement = document.createElement("div");
            /* Set formatted address as item value */
            itemElement.innerHTML = result.formatted;
            autocompleteItemsElement.appendChild(itemElement);

            /* Set the value for the autocomplete text field and notify: */
            itemElement.addEventListener("click", function (e) {
              inputElement.value = currentItems[index].formatted;
              callback(currentItems[index]);
              /* Close the list of autocompleted values: */
              closeDropDownList();
            });
          });
        },
        (err) => {
          if (!err.canceled) {
            console.log(err);
          }
        }
      );
    }, DEBOUNCE_DELAY);
  });

  /* Add support for keyboard navigation */
  inputElement.addEventListener("keydown", function (e) {
    var autocompleteItemsElement = containerElement.querySelector(
      ".autocomplete-items"
    );
    if (autocompleteItemsElement) {
      var itemElements = autocompleteItemsElement.getElementsByTagName("div");
      if (e.keyCode == 40) {
        e.preventDefault();
        /*If the arrow DOWN key is pressed, increase the focusedItemIndex variable:*/
        focusedItemIndex =
          focusedItemIndex !== itemElements.length - 1
            ? focusedItemIndex + 1
            : 0;
        /*and and make the current item more visible:*/
        setActive(itemElements, focusedItemIndex);
      } else if (e.keyCode == 38) {
        e.preventDefault();

        /*If the arrow UP key is pressed, decrease the focusedItemIndex variable:*/
        focusedItemIndex =
          focusedItemIndex !== 0
            ? focusedItemIndex - 1
            : (focusedItemIndex = itemElements.length - 1);
        /*and and make the current item more visible:*/
        setActive(itemElements, focusedItemIndex);
      } else if (e.keyCode == 13) {
        /* If the ENTER key is pressed and value as selected, close the list*/
        e.preventDefault();
        if (focusedItemIndex > -1) {
          closeDropDownList();
        }
      }
    } else {
      if (e.keyCode == 40) {
        /* Open dropdown list again */
        var event = document.createEvent("Event");
        event.initEvent("input", true, true);
        inputElement.dispatchEvent(event);
      }
    }
  });

  function setActive(items, index) {
    if (!items || !items.length) return false;

    for (var i = 0; i < items.length; i++) {
      items[i].classList.remove("autocomplete-active");
    }

    /* Add class "autocomplete-active" to the active element*/
    items[index].classList.add("autocomplete-active");

    // Change input value and notify
    inputElement.value = currentItems[index].formatted;
    callback(currentItems[index]);
  }

  function closeDropDownList() {
    const autocompleteItemsElement = inputContainerElement.querySelector(
      ".autocomplete-items"
    );
    if (autocompleteItemsElement) {
      inputContainerElement.removeChild(autocompleteItemsElement);
    }

    focusedItemIndex = -1;
  }

  function addIcon(buttonElement) {
    const svgElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgElement.setAttribute("viewBox", "0 0 24 24");
    svgElement.setAttribute("height", "24");

    const iconElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    iconElement.setAttribute(
      "d",
      "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
    );
    iconElement.setAttribute("fill", "currentColor");
    svgElement.appendChild(iconElement);
    buttonElement.appendChild(svgElement);
  }

  /* Close the autocomplete dropdown when the document is clicked. 
      Skip, when a user clicks on the input field */
  document.addEventListener("click", function (e) {
    if (e.target !== inputElement) {
      closeDropDownList();
    } else if (!containerElement.querySelector(".autocomplete-items")) {
      // open dropdown list again
      var event = document.createEvent("Event");
      event.initEvent("input", true, true);
      inputElement.dispatchEvent(event);
    }
  });
}

addressAutocomplete(
  document.getElementById("autocomplete-container"),
  (data) => {
    // console.log("Selected option: ");
    const long = data.bbox.lon1;
    const lat = data.bbox.lat1;
    initMap(long, lat);
  },
  {
    placeholder: "Enter an address here",
  }
);

((g) => {
  var h,
    a,
    k,
    p = "The Google Maps JavaScript API",
    c = "google",
    l = "importLibrary",
    q = "__ib__",
    m = document,
    b = window;
  b = b[c] || (b[c] = {});
  var d = b.maps || (b.maps = {}),
    r = new Set(),
    e = new URLSearchParams(),
    u = () =>
      h ||
      (h = new Promise(async (f, n) => {
        await (a = m.createElement("script"));
        e.set("libraries", [...r] + "");
        for (k in g)
          e.set(
            k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
            g[k]
          );
        e.set("callback", c + ".maps." + q);
        a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
        d[q] = f;
        a.onerror = () => (h = n(Error(p + " could not load.")));
        a.nonce = m.querySelector("script[nonce]")?.nonce || "";
        m.head.append(a);
      }));
  d[l]
    ? console.warn(p + " only loads once. Ignoring:", g)
    : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
})({
  key: "AIzaSyCPJKZqcuw4yy1bTTxk7S__J0Mg8a-8OAE",
  v: "weekly",
  // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
  // Add other bootstrap parameters as needed, using camel case.
});

let map;

async function initMap(long, lat) {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    "marker"
  );

  const beachFlagImg = document.createElement("img");
  beachFlagImg.src = "https://i.postimg.cc/nrWZmxqn/icons8-user-50.png";
  beachFlagImg.style.width = "30px";
  beachFlagImg.style.height = "30px";

  if ((long && lat) || navigator.geolocation) {
    // console.log(long, lat);
    let userLocation;

    const gettingLocation = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            resolve(position);
          },

          (error) => {
            handleLocationError(true, infoWindow, map.getCenter());
            reject(error);
          }
        );
      });
    };

    const waitingForUserLocation = await gettingLocation();

    if (long && lat) {
      userLocation = {
        lat: lat,
        lng: long,
      };
      // console.log("We are using custom location");
    }

    map = new Map(document.getElementById("map"), {
      zoom: 13.4,
      mapId: "368672a61443988a",
      center: userLocation,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: false
    });

    const marker = new AdvancedMarkerElement({
      map,
      position: userLocation,
      // content: pinBackground.element,
      content: beachFlagImg,
      // scaledSize: new google.maps.Size(40, 40)
    });

    findPlaces(userLocation);

    let overlay;

    google.maps.event.addListener(map, "idle", () => {
      const bounds = map.getBounds();
      if (overlay) {
        overlay.setMap(null);
      }

      if (!bounds) return;

      // Create coordinates that cover the entire visible map
      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();
      const outerBounds = [
        { lat: ne.lat(), lng: ne.lng() },
        { lat: sw.lat(), lng: ne.lng() },
        { lat: sw.lat(), lng: sw.lng() },
        { lat: ne.lat(), lng: sw.lng() },
      ];

      const center = userLocation;
      const radius = 2000; // in meters

      const circlePath = [];
      const numPoints = 100;
      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * 2 * Math.PI;
        circlePath.push({
          lat: center.lat + (radius / 111320) * Math.cos(angle),
          lng:
            center.lng +
            (radius / (111320 * Math.cos(center.lat * (Math.PI / 180)))) *
              Math.sin(angle),
        });
      }

      // Reverse the order of the circlePath
      circlePath.reverse();

      overlay = new google.maps.Polygon({
        paths: [outerBounds, circlePath],
        strokeColor: "#000000",
        strokeOpacity: 0.8,
        strokeWeight: 0,
        fillColor: "#000000",
        fillOpacity: 0.9,
        map: map,
      });
    });

    let listOfMarkers = [];

    const fetchedMarkers = async () => {
      console.log("running");

      if (listOfMarkers) {
        listOfMarkers.forEach((marker) => {
          marker.setMap(null); // Remove each marker from the map
        });
        listOfMarkers.length = 0;
      }
      await fetch("http://localhost:3000/", {
        method: "GET", // or PUT for updating
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => await response.json())
        .then((response) => {
          response.forEach((object) => {
            const userMarker = document.createElement("div");

            userMarker.style.width = "28px";
            userMarker.style.height = "28px";
            // userMarker.style.backgroundColor = "black";
            userMarker.style.borderRadius = "50%";
            userMarker.style.display = "flex";
            userMarker.style.alignItems = "center";
            userMarker.style.justifyContent = "center";
            userMarker.style.color = "white";
            userMarker.innerText = "⚽";
            let markerView = new AdvancedMarkerElement({
              map,
              position: {
                lat: object.location[0],
                lng: object.location[1],
              },
              content: userMarker,
            });
            listOfMarkers.push(markerView);
          });
        });
      // console.log(listOfMarkers)
    };

    fetchedMarkers();

    google.maps.event.addListener(map, "click", function (event) {
      const userMarker = document.createElement("div");

      userMarker.style.width = "5px";
      userMarker.style.height = "5px";
      userMarker.style.backgroundColor = "black";
      userMarker.style.borderRadius = "50%";
      userMarker.style.display = "flex";
      userMarker.style.alignItems = "center";
      userMarker.style.justifyContent = "center";
      userMarker.style.color = "white";
      userMarker.innerText = "⚽";

      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      const data = {
        email: "hamsamuse.hm@gmail.com",
        location: [lat, lng],
      };

      const sendData = async () => {
        await fetch("http://localhost:3000/user", {
          method: "POST", // or PUT for updating
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // Convert data to JSON string
        });
        fetchedMarkers();
      };

      sendData();
    });

    const buttonNode = document.getElementById("button");
    const email = { email: "hamsamuse.hm@gmail.com" };
    buttonNode.addEventListener("click", async () => {
      // console.log('Button has been clicked!')
      await fetch("http://localhost:3000/", {
        method: "DELETE", // or PUT for updating
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email), // Convert data to JSON string
      });
      console.log("hello");
      fetchedMarkers();
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

async function findPlaces(userLocation) {
  const { Place } = await google.maps.importLibrary("places");
  const geocoder = new google.maps.Geocoder();
  const center = new google.maps.LatLng(userLocation.lat, userLocation.lng);
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    "marker"
  );
  const listOfLocDiv = document.getElementById("listOfLoc");

  function resetMarkerSizes(markers) {
    markers.forEach((marker) => {
      marker.content.style.width = "28px";
      marker.content.style.height = "28px";
      marker.content.style.backgroundColor = "rgba(100, 131, 100, 0.4";
    });
  }

  const request = {
    fields: ["location", "adrFormatAddress", "addressComponents"],
    locationRestriction: {
      center: center,
      radius: 2000,
    },
    includedPrimaryTypes: ["park"],
    maxResultCount: 7,
  };

  const { places } = await Place.searchNearby(request);

  if (places.length) {
    const { LatLngBounds } = await google.maps.importLibrary("core");
    const bounds = new LatLngBounds();
    let numberNAddress = {};
    let markers = [];

    // console.log(places.length)
    places.forEach(async (place) => {
      const latlng = place.Eg.location;
      const geoLocation = await geocoder.geocode({ location: latlng });
      const theKey = place.Eg.addressComponents[0].longText;
      const value = place.Eg.addressComponents[1].longText;

      if (
        numberNAddress.hasOwnProperty(theKey) &&
        numberNAddress[theKey] === value
      ) {
        return;
      }

      numberNAddress[theKey] = place.Eg.addressComponents[1].longText;

      if (geoLocation.results[0]["formatted_address"].length > 22) {
        const pElement = document.createElement("p");
        pElement.textContent = geoLocation.results[0]["formatted_address"];
        listOfLocDiv.appendChild(pElement);

        const pinElement = document.createElement("div");

        pinElement.style.width = "25px";
        pinElement.style.height = "25px";
        pinElement.style.backgroundColor = "rgba(100, 131, 100, 0.7)";
        pinElement.style.borderRadius = "50%";
        pinElement.style.display = "flex";
        pinElement.style.alignItems = "center";
        pinElement.style.justifyContent = "center";
        pinElement.style.color = "white";
        pinElement.innerText = "•";

        let markerView = new AdvancedMarkerElement({
          map,
          position: place.location,
          title: place.displayName,
          content: pinElement,
        });

        markers.push(markerView);

        // const infowindow = new google.maps.InfoWindow({
        //   content: `${geoLocation.results[0]["formatted_address"]}`,
        //   ariaLabel: "Uluru",
        // });

        pElement.addEventListener("click", () => {
          resetMarkerSizes(markers);

          markerView.content.style.width = "25px";
          markerView.content.style.height = "25px";
          markerView.content.style.backgroundColor = "rgba(100, 131, 200, 0.60";
        });

        bounds.extend(place.location);
        // console.log(markerView)
      }

      // map.fitBounds(bounds)
    });
  } else {
    console.log("No results");
  }
}

initMap();
