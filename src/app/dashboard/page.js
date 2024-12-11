"use client";
import Dashboard from "../../../components/Dashboard/Dashboard";
import FooterTwo from "../../../components/FooterTwo/FooterTwo";
import { createClient } from "../../../utils/supabase/client";
import SignedInHeader from "../../../components/signedInHeader/SignedinHeader";
import ProfileForm from "../../../components/ProfileForm/ProfileForm";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import osmtogeojson from "osmtogeojson";
import { IoIosNotificationsOutline } from "react-icons/io";
import NotiCards from "../../../components/NotiCards/NotiCards";
import { format } from "date-fns";
import MarkerIcon from "../../../components/MarkerIcon/MarkerIcon";

const overpassQuery = (lat, lng) => {
  const request = `[out:json];
(
  way["leisure"="park"]["name"~"(park|recreation|field)", i](around:1800, ${lat}, ${lng});
);
out geom;`;
  const encodedQuery = encodeURIComponent(request);
  const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodedQuery}`;
  return overpassUrl;
};

const overpassQueryForCentrePoint = (lat, lng) => {
  const request = `[out:json];
(
  way["leisure"="park"]["name"~"(park|recreation|field)", i](around:1800, ${lat}, ${lng});
);
out center;
`;
  const encodedQuery = encodeURIComponent(request);
  const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodedQuery}`;
  return overpassUrl;
};

export default function DashboardPage() {
  const router = useRouter();
  const [profileName, setProfileName] = useState("");
  const [profileCreated, setProfileCreated] = useState("we do not know");
  const [postcode, setPostcode] = useState(null);
  const [formattedPostcode, setFormattedPostcode] = useState(null);
  const [listOfParks, setListOfParks] = useState([]);
  const [clickedPark, setClickedPark] = useState(null);
  const [newUserProfileInfo, setNewUserProfileInfo] = useState();
  const [userUUID, setUserUUID] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userAge, setUserAge] = useState(null);
  const [activePlayerData, setActivePlayerData] = useState(null);
  const [playerAtParkOrPlanning, setPlayerAtTheParkOrPlanning] = useState(true);
  const [playerPlanning, setPlayerPlanning] = useState(null);
  const [playerPlanningParkId, setPlayerPlanningParkId] = useState(null);
  const [playerPlanningParkName, setPlayerPlanningParkName] = useState(null);
  const [playerStartNEndTime, setPlayerStartNEndTime] = useState(null);
  const [notificationClicked, setNotificationClicked] = useState(false);
  const [rerun, setRerun] = useState(0);

  const [listOfParkIdsNName, setListOfParkIdsNName] = useState(null);
  const [listOfParkIds, setListOfParkIds] = useState(null);
  const [listOfActivePlayers, setListOfActivePlayers] = useState(null);
  const [listOfParksAndRatings, setListOfParksAndRatings] = useState(null);
  const [listOfCentrePoints, setListOfCentrePoints] = useState(null);
  const [clickedParkCord, setClickedParkCord] = useState(null);

  const supabase = createClient();

  useEffect(() => {
    if (formattedPostcode) {
      fetch(
        overpassQueryForCentrePoint(
          formattedPostcode.lat,
          formattedPostcode.lng
        )
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          let geoJsonData = osmtogeojson(data);
          geoJsonData = geoJsonData.features;
          let listOfCentrePoints = [];
          geoJsonData.forEach((park) => {
            let coord = park["geometry"]["coordinates"];
            listOfCentrePoints.push(coord);
          });
          setListOfCentrePoints(listOfCentrePoints);
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        });
    }
  }, [formattedPostcode]);

  useEffect(() => {
    const channel = supabase
      .channel("active_players_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "active_players" },
        (payload) => {
          // console.log(payload);
          setRerun((previousValue) => previousValue + 1);
        }
      )
      .subscribe();

    const profileChannel = supabase
      .channel("profile_table__changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "profile" },
        (payload) => {
          setRerun((previousValue) => previousValue + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(profileChannel);
    };
  }, [supabase]);

  const handleClick = () => {
    setNotificationClicked(!notificationClicked);
  };

  useEffect(() => {
    if (listOfParkIds) {
      const gettingCount = () => {
        let parkAndCount = {};

        listOfParkIdsNName.map(async (park) => {
          const parkName = park["park_name"];
          const supabase = createClient();
          const { count, error } = await supabase
            .from("active_players")
            .select("park_id", { count: "exact" })
            .eq("park_id", park["id"]);

          if (error) {
            console.error(error);
          } else {
            parkAndCount[parkName] = count;
          }
        });
        setListOfParksAndRatings(parkAndCount);
      };
      gettingCount();
    }
  }, [listOfParkIds, playerAtParkOrPlanning, rerun]);

  useEffect(() => {
    if (listOfParkIds) {
      const gettingPlayerTableCards = async () => {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("active_players")
          .select("*")
          .in("park_id", listOfParkIds);
        if (data) {
          setListOfActivePlayers(data);
        } else {
          console.log(error);
        }
      };
      gettingPlayerTableCards();
    }
  }, [listOfParkIds, rerun]);

  useEffect(() => {
    if (listOfParks.length !== 0) {
      const getListOfParkIds = async () => {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("parks")
          .select("*")
          .in("park_name", listOfParks);
        if (data) {
          setListOfParkIdsNName(data);
          let parkIds = [];
          data.map((park) => {
            parkIds.push(park["id"]);
          });
          setListOfParkIds(parkIds);
        } else {
          console.log(error);
        }
      };
      getListOfParkIds();
    }
  }, [listOfParks, playerPlanning, playerAtParkOrPlanning, profileName]);

  useEffect(() => {
    if (playerPlanningParkId) {
      const gettingParkName = async () => {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("parks")
          .select("park_name")
          .eq("id", playerPlanningParkId);
        if (data) {
          setPlayerPlanningParkName(data[0]["park_name"]);
        }
        if (error) {
          console.log(error);
        }
      };
      gettingParkName();
    }
  }, [playerPlanningParkId]);

  useEffect(() => {
    if (userUUID) {
      const gettingActivePlayer = async () => {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("active_players")
          .select("*")
          .eq("user_name", userUUID);

        if (data.length !== 0) {
          setActivePlayerData(data);
          setPlayerAtTheParkOrPlanning(true);
          if (data[0]["at_park"] == false) {
            let startTime;
            let endTime;
            setPlayerPlanningParkId(data[0]["park_id"]);
            setPlayerPlanning(true);
            if (data[0]["start_time"] === "Now") {
              startTime = "Now";
            } else {
              startTime = format(new Date(data[0]["start_time"]), "HH:mm");
            }
            if (data[0]["end_time"] === "No End Time") {
              endTime = "No End Time";
            } else {
              endTime = format(new Date(data[0]["end_time"]), "HH:mm");
            }
            setPlayerStartNEndTime({ startTime: startTime, endTime: endTime });
          }
        } else {
          setPlayerAtTheParkOrPlanning(false);
        }
      };
      gettingActivePlayer();
    }
  }, [userUUID]);

  useEffect(() => {
    const updateProfile = async () => {
      if (newUserProfileInfo && userUUID) {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("profile")
          .update({
            display_name: newUserProfileInfo[0],
            age: newUserProfileInfo[1],
            postcode: newUserProfileInfo[2],
          })
          .eq("id", userUUID)
          .select();
        if (data) {
          setProfileName(data[0]["display_name"]);
          setPostcode(data[0]["postcode"]);
          setUserAge(data[0]["age"]);
          setProfileCreated(true);
        }
      }
    };
    updateProfile();
  }, [newUserProfileInfo]);

  useEffect(() => {
    if (listOfParks) {
      const insertingIntoTable = async () => {
        let listOfParksUpsert = [];
        listOfParks.forEach((park) =>
          listOfParksUpsert.push({ park_name: park })
        );
        const supabase = createClient();
        const { data, error } = await supabase.from("parks").upsert(
          listOfParksUpsert,
          { onConflict: "park_name" } // Ensures conflicts on 'park_name' are ignored
        );
        if (error) {
          console.log(error);
        }
      };
      insertingIntoTable();
    }
  }, [listOfParks]);

  useEffect(() => {
    if (postcode) {
      const response = async () => {
        const data = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            postcode
          )}&key=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        let convertedPostcode = await data.json();
        setFormattedPostcode({
          lat: convertedPostcode["results"][0]["geometry"]["location"]["lat"],
          lng: convertedPostcode["results"][0]["geometry"]["location"]["lng"],
        });
      };
      response();
    }
  }, [postcode]);

  useEffect(() => {
    if (formattedPostcode) {
      fetch(overpassQuery(formattedPostcode.lat, formattedPostcode.lng))
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          let geoJsonData = osmtogeojson(data);
          geoJsonData = geoJsonData["features"];
          let namesOfParks = [];
          geoJsonData.forEach((park) => {
            namesOfParks.push(park.properties.name);
          });
          setListOfParks(namesOfParks);
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        });
    }
  }, [formattedPostcode]);

  useEffect(() => {
    const fetchingUserAuthNProfile = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }
      setUserUUID(user["id"]);
      setUserEmail(user["email"]);

      let { data, error } = await supabase
        .from("profile")
        .select("*")
        .eq("id", user["id"]);
      setProfileName(data[0]["display_name"]);
      if (data[0]["age"] === null) {
        setProfileCreated(false);
      } else {
        setProfileCreated(true);
        setPostcode(data[0]["postcode"]);
        setUserAge(data[0]["age"]);
      }
    };
    fetchingUserAuthNProfile();
  }, []);

  return (
    <>
      {userUUID && (
        <>
          <SignedInHeader
            profileName={profileName}
            setProfileCreated={setProfileCreated}
          />
          {playerPlanning && playerPlanningParkName && playerStartNEndTime && (
            <div className="lookingIcon">
              <div onClick={handleClick} className="notiIcon">
                <IoIosNotificationsOutline size="23px" />
              </div>
              {notificationClicked && (
                <div className="notiBox">
                  <NotiCards
                    userUUID={userUUID}
                    playerPlanningParkName={playerPlanningParkName}
                    time={`${playerStartNEndTime["startTime"]}-${playerStartNEndTime["endTime"]}`}
                    setPlayerPlanning={setPlayerPlanning}
                    setPlayerPlanningParkId={setPlayerPlanningParkId}
                    setPlayerPlanningParkName={setPlayerPlanningParkName}
                    setPlayerStartNEndTime={setPlayerStartNEndTime}
                    setPlayerAtTheParkOrPlanning={setPlayerAtTheParkOrPlanning}
                    setActivePlayerData={setActivePlayerData}
                  />{" "}
                </div>
              )}
            </div>
          )}

          <MarkerIcon />
      
          <Dashboard
            listOfActivePlayers={listOfActivePlayers}
            listOfParkIdsNName={listOfParkIdsNName}
            formattedPostcode={formattedPostcode}
            listOfParks={listOfParks}
            setClickedPark={setClickedPark}
            clickedPark={clickedPark}
            activePlayerData={activePlayerData}
            playerAtParkOrPlanning={playerAtParkOrPlanning}
            userUUID={userUUID}
            setPlayerAtTheParkOrPlanning={setPlayerAtTheParkOrPlanning}
            setActivePlayerData={setActivePlayerData}
            listOfParksAndRatings={listOfParksAndRatings}
            listOfParkIds={listOfParkIds}
            rerun={rerun}
            listOfCentrePoints={listOfCentrePoints}
            setClickedParkCord={setClickedParkCord}
            clickedParkCord={clickedParkCord}
          />
          {!profileCreated && (
            <ProfileForm
              setNewUserProfileInfo={setNewUserProfileInfo}
              profileName={profileName}
              userEmail={userEmail}
              userAge={userAge}
              postcode={postcode}
            />
          )}
          <FooterTwo />
        </>
      )}
    </>
  );
}
