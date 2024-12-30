import { GoPerson } from "react-icons/go";
import { SlClock } from "react-icons/sl";
import { HiArrowLongRight } from "react-icons/hi2";
import styles from "./PlayerCards.module.css";
import { MessageSquare } from "lucide-react";
import tokenGenerator from "@/app/Stream/Token/TokenGen";
import { useRouter } from "next/navigation";

export default function PlayerCard({
  name,
  startTime,
  endTime,
  hasBall,
  me,
  StreamMsgClient,
  listOfNameAndUUIDS,
  userUUID,
  profileName,
}) {
  const router = useRouter();

  const onClickHandler = async () => {
    let playerUUID;
    listOfNameAndUUIDS.map((player) => {
      if (player["display_name"] === name) {
        playerUUID = player["id"];
      }
    });

    const channel = StreamMsgClient.channel("messaging", {
      members: [playerUUID, userUUID],
    });
    await channel.create();

    router.push("/testing");
  };

  return (
    <div
      className={
        hasBall ? styles.outsideCardWithBall : styles.outsideCardWithNoBall
      }
    >
      <div className={styles.playerCard}>
        <GoPerson className={styles.personIcon} />
        <div
          className={
            me
              ? styles.nameTimeMessageBoxButForUserCard
              : styles.nameTimeMessageBox
          }
        >
          <p className={styles.name}>{name}</p>
          {!me && (
            <MessageSquare
              className={styles.messIcon}
              size="14px"
              onTouchStart={onClickHandler}
              onClick={onClickHandler}
            />
          )}
          <p className={styles.time}>
            <SlClock size="10px" className={styles.clock} />
            <strong>{startTime}</strong>{" "}
            <HiArrowLongRight className={styles.arrow} /> {endTime}
          </p>
        </div>
      </div>
    </div>
  );
}
