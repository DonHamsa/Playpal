import Image from "next/image";

export default function BackButton({
  setParksLocation,
  divRef,
  setUserParkOption,
  setHoverPark,
  userParkOption,
}) {
  const onClickHandler = () => {
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
