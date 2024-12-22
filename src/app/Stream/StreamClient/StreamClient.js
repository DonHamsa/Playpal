import { StreamChat } from "stream-chat";

export default function StreamClient () {
  const client = new StreamChat(process.env.NEXT_PUBLIC_STREAM_API_KEY);
  return client 
}