
import styles from './ChatLogOut.module.css'
import { signOut } from '@/app/login/actions'

export default function ChatLogOut() {

  const signOutFunction=()=>{
      signOut()
    }
    
  return (
    <div className={styles.outsideBox}>
        <div className={styles.textNIcon} onClick={()=>signOutFunction()}>
          <img src="/images/logoutIcon.png"  alt="Log Out Icon" className={styles.image} />
          <p className={styles.logoutText}>Log Out</p>
        </div>
    </div>
  )
} 