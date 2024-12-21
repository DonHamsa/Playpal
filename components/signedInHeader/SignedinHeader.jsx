"use client";

import styles from "./SignedInHeader.module.css";
import BigBox from "./ClientDiv";
import { CiUser } from "react-icons/ci";
import { signOut } from "@/app/login/actions";


export default function SignedInHeader({ profileName, setProfileCreated }) {

  const signOutFunction=()=>{
    signOut()
  }

  return (
    <div className={styles.outsideBox}>
      {profileName.length !== 0 ? (
        <p className={styles.welcomeText}>
        <CiUser className={styles.profileIcon}  onClick={()=>{setProfileCreated(false)}} />
          Hello,
          <span className={styles.userName}>{profileName}</span>
        </p>
      ) : (
        <p></p>
      )}
      <BigBox>
        <div className={styles.textNIcon} onClick={()=>signOutFunction()}>
          <img src="/images/logoutIcon.png"  alt="Log Out Icon" className={styles.image} />
          <p className={styles.logoutText}>Log Out</p>
        </div>
      </BigBox>
    </div>
  );
}
