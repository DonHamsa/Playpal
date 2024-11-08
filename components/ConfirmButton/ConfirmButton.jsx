import { useRouter } from "next/navigation";
import styles from "./ConfirmButton.module.css";

export default function ConfirmButton({setUserHasConfirmed, userHasConfirmed}) {
  const router= useRouter()

  const onClickHandler= ()=> {
    setUserHasConfirmed(true)
    setTimeout(()=> router.push('./dashboard'), 2000)
    
  }
  return (
    <div className={styles.buttonBox}>
      <button className={styles.Button} onClick={onClickHandler}>{userHasConfirmed ? ' Loading ....': 'Confirm Location'}</button>
    </div>
  );
}
