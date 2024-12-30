'use server'

import { StreamChat } from "stream-chat";

const serverClient = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_STREAM_API_KEY,
  process.env.STREAM_API_SECRET
);

const updateUser = async (uuid, profileName) => {
  const updateResponse = await serverClient.upsertUser({
    id: uuid,
    name: profileName
  });
  console.log(updateResponse);
};

export default updateUser;
