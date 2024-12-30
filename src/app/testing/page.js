"use client";
import StreamConnection from "../../../components/StreamConnection/StreamConnection";
import { useState, useEffect } from "react";
import { createClient } from "../../../utils/supabase/client";
const App = () => {
  const supabase = createClient();
  const [userUUID, setUserUUID] = useState(false);
  const [profileName, setProfileName] = useState(false);
  useEffect(() => {
    const fetchingUserAuthNProfile = async () => {
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

  useEffect(() => {
    if (userUUID) {
      const gettingUserName = async () => {
        let { data, error } = await supabase
          .from("profile")
          .select("*")
          .eq("id", userUUID);
        if (data) {
          setProfileName(data[0]["display_name"]);
        } else {
          console.log(error);
        }
      };
      gettingUserName();
    }
  }, [userUUID]);

  if (!userUUID) {
    return;
  }

  return (
    <StreamConnection
      userUUID={userUUID}
      profileName={profileName}
    ></StreamConnection>
  );
};

export default App;
