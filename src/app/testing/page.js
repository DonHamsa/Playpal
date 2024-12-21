"use client";
import StreamConnection from "../../../components/StreamConnection/StreamConnection";
import { useState, useEffect } from "react";
import { createClient } from "../../../utils/supabase/client";

const App = () => {

const [userUUID, setUserUUID]= useState(false)
useEffect(() => {
  const fetchingUserAuthNProfile = async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }
    setUserUUID(user["id"]);
  };
  fetchingUserAuthNProfile(), [];
});

if (!userUUID) {return }


  return (
   <StreamConnection userUUID={userUUID} >

   </StreamConnection>
  );
};

export default App;
