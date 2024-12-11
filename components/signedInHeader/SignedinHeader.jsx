"use client";

import styles from "./SignedInHeader.module.css";
import Image from "next/image";
import BigBox from "./ClientDiv";
import { CiUser } from "react-icons/ci";
import { signOut } from "@/app/login/actions";


export default function signedInHeader({ profileName, setProfileCreated }) {

  const signOutFunction=()=>{
    signOut()
  }

  return (
    <div className={styles.outsideBox}>
      {profileName.length !== 0 ? (
        <p className={styles.welcomeText}>
        <CiUser className={styles.profileIcon} size='23' onClick={()=>{setProfileCreated(false)}} />
          Hello,
          <span className={styles.userName}>{profileName}</span>
        </p>
      ) : (
        <p></p>
      )}
      <BigBox>
        <div className={styles.textNIcon} onClick={()=>signOutFunction()}>
          <Image src="/images/logoutIcon.png" width="50" height="50" alt="Log Out Icon"/>
          <p className={styles.logoutText}>Log Out</p>
        </div>
      </BigBox>
    </div>
  );
}
