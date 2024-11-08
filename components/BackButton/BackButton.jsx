import Image from "next/image";

export default function BackButton({
  setParksLocation,
  divRef,
  setUserParkOption,
  setHoverPark,
  userParkOption,
  setUserSelectParkStatus,
  userSelectParkStatus,
  whichCard,
  setWhichChard
}) {
  const onClickHandler = () => {

    if (whichCard){
      setWhichChard(false)
    }
    if (userSelectParkStatus && userParkOption) {
      setUserSelectParkStatus(false)
      return 
    }

    if (userParkOption) {
      setUserParkOption(false);

    } else {
      setParksLocation([]);
      setHoverPark([]);
    }
  };



  return (
    <div className="backButtonBlock">
      <button className="backButton" onClick={onClickHandler}></button>
    </div>
  );
}
