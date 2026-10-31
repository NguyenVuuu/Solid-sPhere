import React from "react";

export const ChatContext = React.createContext({
  isOpen: false,
  toggle: () => {},
});

const ChatProvider = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen((v) => !v);
  return (
    <ChatContext.Provider value={{ isOpen, toggle }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;