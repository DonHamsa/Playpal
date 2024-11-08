import styles from './LeavePark.module.css'

export default function LeaveParkButton({userAtPark}){
  return(
    <button className={userAtPark ? styles.buttonAThePark : styles.button}>
      Leave Park 
    </button>
  )
}