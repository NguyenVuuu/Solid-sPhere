const ChatSidebar = ({ sessions, selectedSession, onSelect }) => (
    <div className="w-1/3 bg-white border-r border-gray-100 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
          <span className="text-xl">💬</span>
          <span>Phiên chat đang hoạt động</span>
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          {sessions.length} cuộc trò chuyện
        </p>
      </div>
  
      {/* List sessions */}
      <div className="flex-1 overflow-y-auto">
        {sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className="w-16 h-16 mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-3xl">
              💭
            </div>
            <p className="text-sm text-gray-400">Không có phiên chat nào</p>
            <p className="text-xs text-gray-300 mt-1">Chờ khách hàng kết nối</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {sessions.map(s => (
              <div
                key={s.id}
                onClick={() => onSelect(s)}
                className={`flex items-center p-4 cursor-pointer transition-all ${
                  selectedSession?.id === s.id
                    ? "bg-gradient-to-r from-gray-900 to-purple-950 text-white border-l-4 border-purple-500"
                    : "hover:bg-gray-50"
                }`}
              >
                {/* Avatar */}
                <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center font-semibold mr-3 ${
                  selectedSession?.id === s.id
                    ? "bg-white/20 text-white"
                    : "bg-gradient-to-br from-gray-800 to-purple-900 text-white"
                }`}>
                  {s.guestName?.charAt(0)?.toUpperCase() || "?"}
                </div>
  
                {/* Thông tin */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <p className={`font-medium truncate ${
                      selectedSession?.id === s.id ? "text-white" : "text-gray-800"
                    }`}>
                      {s.guestName}
                    </p>
                    {s.unread && (
                      <span className={`ml-2 w-2 h-2 rounded-full animate-pulse ${
                        selectedSession?.id === s.id ? "bg-white" : "bg-purple-500"
                      }`} />
                    )}
                  </div>
                  <p className={`text-xs truncate ${
                    selectedSession?.id === s.id ? "text-white/80" : "text-gray-500"
                  }`}>
                    📞 {s.guestPhone}
                  </p>
                  {s.lastMessage && (
                    <p
                      className={`text-xs mt-1.5 truncate ${
                        selectedSession?.id === s.id
                          ? "text-white/90"
                          : s.lastMessageFrom === "CUSTOMER"
                          ? "text-gray-700 font-medium"
                          : "text-gray-400"
                      }`}
                    >
                      <span className="mr-1">
                        {s.lastMessageFrom === "CUSTOMER" ? "👤" : "👩‍💼"}
                      </span>
                      {s.lastMessage}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  
  export default ChatSidebar;