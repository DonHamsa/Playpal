"use client";
import { createToken } from "@/app/Stream/actions";
import { useState, useCallback, useEffect } from "react";
import ChatLogOut from "../ChatLogOut/ChatLogOut";

import "./layout.css";
import {
  useCreateChatClient,
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import "./layout.css";

const StreamConnection = ({ userUUID, profileName }) => {
  const [token, setToken] = useState(null);
  const sort = { last_message_at: -1 };
  const filters = {
    type: "messaging",
    members: { $in: [userUUID] },
  };
  const options = {
    limit: 10,
  };

  const tokenProvider = useCallback(async () => {
    const token = await createToken(userUUID);
    setToken(token);
    return token;
  }, [userUUID]);

  let client = useCreateChatClient({
    apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY,
    tokenOrProvider: tokenProvider,
    userData: { id: userUUID },
  });

  useEffect(() => {
    if (client) {
      const createChannel = async () => {
        const user = await client.connectUser(
          { id: userUUID, name: profileName },
          token // The token for the user, typically generated server-side
        );
      };
      createChannel();
    }
  }, [client]);

  if (!client) {
    return;
  }

  return (
    <>
      <ChatLogOut />
      <div className="chatBody">
        <Chat client={client}>
          <ChannelList filters={filters} sort={sort} options={options} />
          <Channel>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        </Chat>
      </div>
    </>
  );
};

export default StreamConnection;
