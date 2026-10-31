import React from "react";
import ChatProvider from "./ChatProvider";
import ChatButton from "./ChatButton";
import ChatWindow from "./ChatWindow";

const ChatWidget = () => {
  return (
    <ChatProvider>
      <ChatButton />
      <ChatWindow />
    </ChatProvider>
  );
};

export default ChatWidget;