"use server";
import { StreamChat } from "stream-chat";

export default async function tokenGenerator(userUUID) {
  const serverClient = StreamChat.getInstance(
    process.env.NEXT_PUBLIC_STREAM_API_KEY,
    process.env.STREAM_API_SECRET
  );
  const tokenProvider = serverClient.createToken(userUUID);
  return tokenProvider;
}
