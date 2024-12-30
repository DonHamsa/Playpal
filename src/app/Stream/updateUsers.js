import { StreamChat } from "stream-chat";

const serverClient = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_STREAM_API_KEY,
  process.env.STREAM_API_SECRET
);

const updateUsers = async () => {
  const updateResponse = await serverClient.upsertUser({
    id: "5f99c736-3fd1-4d38-8cbc-e33c40d9f201",
    name: "idiot",
  });

  console.log(updateResponse);
};

export default updateUsers;
