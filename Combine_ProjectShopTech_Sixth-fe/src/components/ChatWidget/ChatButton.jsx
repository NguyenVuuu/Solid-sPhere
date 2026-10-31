import React, { useContext } from "react";
import { ChatContext } from "./ChatProvider";
import { UserContext } from "../../context/UserContext";
import { useTranslation } from "react-i18next";

const ChatButton = () => {
  const { isOpen, toggle } = useContext(ChatContext);
  const { isCustomerService } = useContext(UserContext);
  const { t } = useTranslation("translation");

  // Ẩn ChatButton nếu user là nhân viên chăm sóc khách hàng
  if (isCustomerService) {
    return null;
  }

  return (
    <>
      <style>{`
        @keyframes float-button {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.7; }
          50% { transform: scale(1.05); opacity: 0.3; }
          100% { transform: scale(0.95); opacity: 0.7; }
        }
        .float-animation-button {
          animation: float-button 3s ease-in-out infinite;
        }
        .pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      <div className="fixed bottom-6 left-6 z-50">
        <div className="relative group">
          {/* Pulse rings - màu tím như header */}
          {!isOpen && (
            <>
              <div className="absolute inset-0 rounded-full bg-purple-950 opacity-40 pulse-ring"></div>
              <div
                className="absolute inset-0 rounded-full bg-purple-800 opacity-30 pulse-ring"
                style={{ animationDelay: "1s" }}
              ></div>
            </>
          )}

          {/* Main button - gradient như header */}
          <button
            onClick={toggle}
            className={`relative flex items-center justify-center w-16 h-16 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 ${
              isOpen
                ? "bg-white text-gray-700 hover:bg-gray-50 rotate-0"
                : "bg-gradient-to-r from-black via-gray-900 to-purple-950 text-white hover:opacity-90 float-animation-button"
            } focus:outline-none focus:ring-4 focus:ring-purple-950/30`}
            aria-label={isOpen ? "Đóng khung chat" : "Mở khung chat"}
          >
            {isOpen ? (
              <svg
                className="w-7 h-7 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            )}
          </button>

          {/* Tooltip */}
          {!isOpen && (
            <div className="absolute left-20 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
              {t("bookingChat.booking_form")}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatButton;
