import "./JoinButton.css";
import { TiArrowLeft } from "react-icons/ti";
import { useRouter } from "next/navigation";

export default function JoinButton({playerAtParkOrPlanning}) {
  const router = useRouter();
  return (
    <button
      disabled={playerAtParkOrPlanning}
      className="joinButton"
      type="button"
      onClick={() => {router.push(
      '/event'
      )}}
    >
      <div className="joinButtonBox">
        <TiArrowLeft className="joinIcon" size='40' />
        <p className="joinText">Join In </p>
      </div>
    </button>
  );
}
