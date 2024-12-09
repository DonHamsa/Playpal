import styles from "./NotiCards.module.css";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineAccessTime } from "react-icons/md";
import { createClient } from "../../utils/supabase/client";
export default function NotiCards({
  playerPlanningParkName,
  time,
  userUUID,
  setPlayerPlanning,
  setPlayerPlanningParkId,
  setPlayerPlanningParkName,
  setPlayerStartNEndTime,
  setPlayerAtTheParkOrPlanning,
  setActivePlayerData
}) {
  const onClickHandler = async () => {
    const supabase = createClient();
    const { error } = await supabase
      .from("active_players")
      .delete()
      .eq("user_name", userUUID)
  
      setPlayerPlanning(null);
      setPlayerPlanningParkId(null);
      setPlayerPlanningParkName(null);
      setPlayerStartNEndTime(null);
      setPlayerAtTheParkOrPlanning(false)
      setActivePlayerData(null)
    
  };

  return (
    <div className={styles.outsideBox}>
      <div className={styles.firstColumn}>
        <p className={styles.parkName}>{playerPlanningParkName}</p>
        <p className={styles.timeNclock}>
          <MdOutlineAccessTime className={styles.timeIcon} size="13px" />{" "}
          <span className={styles.time}>{time}</span>
        </p>
      </div>
      <div className={styles.secondColumn}>
        <div className={styles.binIcon}>
          <RiDeleteBinLine size="27px" onClick={onClickHandler} />
        </div>
      </div>
    </div>
  );
}
