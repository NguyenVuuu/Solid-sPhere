const ChatMessage = ({ message }) => (
    <div
      className={`flex ${
        message.senderType === "STAFF" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[75%] px-4 py-2.5 rounded-2xl shadow-sm transition-all ${
          message.senderType === "STAFF"
            ? "bg-gradient-to-r from-black via-gray-900 to-purple-950 text-white rounded-br-sm"
            : "bg-gray-50 text-gray-800 border border-gray-100 rounded-bl-sm"
        }`}
      >
        <p className="text-xs font-medium mb-0.5 opacity-70">
          {message.senderName}
        </p>
        <p className="text-sm leading-relaxed">
          {message.content}
        </p>
      </div>
    </div>
  );
  
  export default ChatMessage;