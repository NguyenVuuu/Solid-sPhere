import ChatMessage from "./ChatMessage";
import { useTranslation } from "react-i18next";

const ChatWindow = ({
  selectedSession,
  messages,
  input,
  setInput,
  handleSend,
  connected,
  messagesEndRef,
  onOpenSchedule,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-purple-900 text-white flex items-center justify-center font-semibold text-lg">
            {selectedSession.guestName?.charAt(0)?.toUpperCase() || "?"}
          </div>
          <div>
            <h3 className="font-semibold text-base text-gray-800">
              {selectedSession.guestName}
            </h3>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
              <span>📞</span>
              <span>{selectedSession.guestPhone}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 bg-white">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-4xl">
              💬
            </div>
            <p className="text-sm text-gray-400">
              {t("chat.no_messages")}
            </p>
            <p className="text-xs text-gray-300 mt-1">
              Bắt đầu cuộc trò chuyện
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((m, i) => <ChatMessage key={i} message={m} />)}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="flex border-t border-gray-100 p-4 bg-white items-center gap-2"
      >
        <input
          type="text"
          placeholder={t("chat.enter_message")}
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-950/20 focus:border-purple-950 transition-all text-sm"
        />
        <button
          type="submit"
          disabled={!connected}
          className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all shadow-md ${
            connected
              ? "bg-gradient-to-r from-black via-gray-900 to-purple-950 text-white hover:opacity-90"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {t("chat.send")}
        </button>
      </form>
    </>
  );
};

export default ChatWindow;