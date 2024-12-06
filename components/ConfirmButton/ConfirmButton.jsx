import { useRouter } from "next/navigation";
import styles from "./ConfirmButton.module.css";
import { createClient } from "../../utils/supabase/client";

export default function ConfirmButton({
  setUserHasConfirmed,
  userHasConfirmed,
  userUUID,
  randomMarkersPos,
  startTime,
  endTime,
  parks,
  selectedParksIndex,
  bringBall,
  selectedOption,
}) {
  const router = useRouter();

  const onClickHandler = async () => {
    setUserHasConfirmed(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("parks")
      .select("*")
      .eq("park_name", parks[selectedParksIndex]);

    if (error) {
      console.error("Error fetching user:", error);
    } else {
      const parkId = data[0]["id"];
      const { error } = await supabase
        .from("active_players")
        .insert([
          {
            lat_marker: randomMarkersPos["lat"],
            lng_marker: randomMarkersPos["lng"],
            has_ball: bringBall,
            start_time: startTime,
            end_time: endTime,
            park_id: parkId,
            user_name: userUUID,
            at_park: selectedOption === "Playing with pals" ? true : false,
          },
        ])
    if (error){
      console.log(error)
      return
    }
    }


    router.push("./dashboard");
  };
  return (
    <div className={styles.buttonBox}>
      <button className={styles.Button} onClick={onClickHandler} disabled={userHasConfirmed}>
        {userHasConfirmed ? " Loading ...." : "Confirm Location"}
      </button>
    </div>
  );
}
