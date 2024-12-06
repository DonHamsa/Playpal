import { redirect } from "next/navigation";
import { useRouter } from 'next/navigation';

export default function BackButton({
  setParksLocation,
  divRef,
  setUserParkOption,
  setHoverPark,
  userParkOption,
  setUserSelectParkStatus,
  userSelectParkStatus,
  whichCard,
  setWhichChard,
}) {
  const router = useRouter();
  const onClickHandler = () => {
    if (whichCard) {
      setWhichChard(false);
    }
    if (userSelectParkStatus && userParkOption) {
      setUserSelectParkStatus(false);
      return;
    }

    if (userParkOption) {
      setUserParkOption(false);
    } else {
      // setParksLocation([]);
      // setHoverPark([]);
      router.push('/dashboard')
    }
  };

  return (
    <div className="backButtonBlock">
      <button className="backButton" onClick={onClickHandler}></button>
    </div>
  );
}
