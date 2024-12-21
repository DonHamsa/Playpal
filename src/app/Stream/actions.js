"use server";

import { StreamChat } from "stream-chat";

const serverClient = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_STREAM_API_KEY,
  process.env.STREAM_API_SECRET
);

export async function createToken(userId) {
  const token = serverClient.createToken(userId);
  return token;
}
