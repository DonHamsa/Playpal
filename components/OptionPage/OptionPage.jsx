import styles from "./OptionPage.module.css";
import Card from "./Card/Card";

export default function OptionPage({setUserSelectParkStatus}) {
  return (
    <div className={styles.choiceBox}>
      <h3 className={styles.heading}>What is your park status?</h3>
      <Card imageSource='/images/2ppl.png' text=' Playing with pals' setUserSelectParkStatus={setUserSelectParkStatus}/>
      <Card imageSource='/images/search.png' text='Looking for pals' setUserSelectParkStatus={setUserSelectParkStatus}/>

    </div>
  );
}
