"use client";
import { createClient } from "../../../utils/supabase/client";
import ProfileForm from "../../../components/ProfileForm/ProfileForm";
import UserParkOptions from "../../../components/UserParkOptions/UserParkOptions";
import NotiCards from "../../../components/NotiCards/NotiCards";
export default function Page() {
 

  return (
    <>
    <NotiCards parkName='Hayes Recreational Park' time= "16:30"/>
    </>
  );
}
