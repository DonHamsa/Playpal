import Image from "next/image";

export default function BackButton({
  setParksLocation,
  divRef,
  setUserParkOption,
  setHoverPark,
  userParkOption,
  setUserSelectParkStatus,
  userSelectParkStatus
}) {
  const onClickHandler = () => {
    if (userSelectParkStatus && userParkOption) {
      console.log('hello')
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
