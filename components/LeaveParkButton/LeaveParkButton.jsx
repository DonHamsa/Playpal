"use client";

import styles from "./LeavePark.module.css";
import { createClient } from "../../utils/supabase/client";

export default function LeaveParkButton({
  playerAtParkOrPlanning,
  userUUID,
  setPlayerAtTheParkOrPlanning,
  activePlayerData,
  setActivePlayerData
}) {
  const onClickHandler = async () => {
    const supabase = createClient();
    const { error } = await supabase
      .from("active_players")
      .delete()
      .eq("user_name", userUUID);
    if (!error) {
      setActivePlayerData(null)
      setPlayerAtTheParkOrPlanning(false);
    } else {
      console.log(error);
    }
  };

  return (
    <button
      disabled={
        (!activePlayerData)
          ? true
          : activePlayerData[0]["at_park"] === false
          ? true
          : false
      }
      className={styles.buttonAThePark}
      onClick={onClickHandler}
    >
      Leave Park
    </button>
  );
}
