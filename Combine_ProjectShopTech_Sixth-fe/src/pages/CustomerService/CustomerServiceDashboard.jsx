import React, { useEffect, useState, useCallback, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import axios from "axios";
import { useTranslation } from "react-i18next";

// Components
import ChatSidebar from "../../components/Chat/ChatSidebar";
import ChatWindow from "../../components/Chat/ChatWindow";
import ScheduleForm from "../../components/Schedule/ScheduleForm";
import AppointmentBookingForm from "../../components/AppointmentBookingForm"; // Import form mới

const CustomerServiceDashboard = () => {
  const API_URL = import.meta.env.VITE_API_URL || "/api";
  const WS_URL = `${import.meta.env.VITE_WS_URL || "http://localhost:8081"}/ws`;

  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);

  // State quản lý Modal
  const [showScheduleForm, setShowScheduleForm] = useState(false); // Form Lịch trình (Internal/Detail)
  const [showAppointmentForm, setShowAppointmentForm] = useState(false); // Form Đặt hẹn (Booking)

  const { t } = useTranslation("translation");
  const messagesEndRef = useRef(null);

  const loadSessions = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_URL}/chat/active`);
      setSessions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("❌ Error loading sessions:", err);
    }
  }, [API_URL]);

  // Kết nối WebSocket
  useEffect(() => {
    let isMounted = true;

    loadSessions();
    const socket = new SockJS(WS_URL);
    const client = Stomp.over(socket);
    client.debug = () => {};

    client.connect(
      {},
      () => {
        if (!isMounted) return;
        setStompClient(client);
        setConnected(true);
        client.subscribe("/topic/chat/global", async msg => {
          if (!isMounted) return;
          const body = JSON.parse(msg.body);
          if (body.type === "NEW_SESSION") await loadSessions();
          if (body.type === "NEW_MESSAGE") {
            const { sessionCode, senderType, content } = body;

            if (!isMounted) return;
            setSessions(prev => {
              let updated = [...prev];
              const idx = updated.findIndex(s => s.sessionCode === sessionCode);

              if (idx !== -1) {
                let session = { ...updated[idx] };
                session.lastMessage = content;
                session.lastMessageFrom = senderType;
                session.unread = senderType === "CUSTOMER";

                updated.splice(idx, 1);
                updated.unshift(session);
              }

              updated = updated.sort((a, b) => {
                if (a.unread && !b.unread) return -1;
                if (!a.unread && b.unread) return 1;
                return 0;
              });

              return updated;
            });

            if (isMounted && selectedSession?.sessionCode === sessionCode) {
              setMessages(prev => [...prev, body]);
            }
          }
        });
      },
      error => {
        if (!isMounted) return;
        console.error("❌ WebSocket failed:", error);
        setConnected(false);
      }
    );

    return () => {
      isMounted = false;
      if (client.connected)
        client.disconnect(() => console.log("🔌 Disconnected"));
    };
  }, [WS_URL, loadSessions, selectedSession]);

  // Refresh mỗi 15s
  useEffect(() => {
    const interval = setInterval(() => loadSessions(), 15000);
    return () => clearInterval(interval);
  }, [loadSessions]);

  // Khi chọn session
  const handleSelectSession = async session => {
    try {
      setSelectedSession(session);
      await axios.put(`${API_URL}/chat/${session.id}/read`);

      setSessions(prev =>
        prev.map(s => (s.id === session.id ? { ...s, unread: false } : s))
      );

      const res = await axios.get(`${API_URL}/chat/${session.id}/messages`);
      setMessages(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("❌ Error selecting session:", err);
    }
  };

  // Gửi tin nhắn
  const handleSend = e => {
    e.preventDefault();
    if (!input.trim() || !stompClient || !selectedSession) return;

    const msg = {
      chatId: selectedSession.id,
      senderType: "STAFF",
      senderName: t("dashboard.staff_name"), // "CSKH" or "Support"
      content: input.trim(),
    };

    stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(msg));

    setSessions(prev =>
      prev.map(s => (s.id === selectedSession.id ? { ...s, unread: false } : s))
    );

    setInput("");
  };

  return (
    <div className="flex h-screen bg-white font-sans overflow-hidden">
      <ChatSidebar
        sessions={sessions}
        selectedSession={selectedSession}
        onSelect={handleSelectSession}
      />

      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-black via-gray-900 to-purple-950 text-white shadow-lg px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl">💬</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold">
                  {t("dashboard.title")}
                </h1>
                <p className="text-sm opacity-90 mt-0.5 flex items-center gap-2">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      connected ? "bg-green-400 animate-pulse" : "bg-red-400"
                    }`}
                  ></span>
                  {connected
                    ? t("dashboard.connected")
                    : t("dashboard.disconnected")}{" "}
                  • {sessions.length} {t("dashboard.active_sessions")}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Nút Đặt lịch hẹn (Booking Form) */}
              <button
                onClick={() => setShowAppointmentForm(true)}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 border border-white/10 shadow-lg"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {t("dashboard.btn_book_appointment")}
              </button>

              {/* Nút Lịch trình (Schedule Form - cho session hiện tại) */}
              <button
                onClick={() => setShowScheduleForm(true)}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 border border-white/10"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                {t("dashboard.btn_schedule")}
              </button>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        {selectedSession ? (
          <ChatWindow
            selectedSession={selectedSession}
            messages={messages}
            input={input}
            setInput={setInput}
            handleSend={handleSend}
            connected={connected}
            messagesEndRef={messagesEndRef}
            onOpenSchedule={() => setShowScheduleForm(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 text-center px-8">
            <div className="w-24 h-24 mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center text-5xl shadow-sm">
              💬
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {t("dashboard.welcome_title")}
            </h3>
            <p className="text-gray-500 text-sm max-w-md">
              {t("dashboard.welcome_subtitle")}
            </p>
          </div>
        )}
      </div>

      {/* 1. Form Lịch trình (ScheduleForm) - Dùng để xem/sửa chi tiết dựa trên session */}
      {showScheduleForm && (
        <ScheduleForm
          onClose={() => setShowScheduleForm(false)}
          defaultInfo={selectedSession}
        />
      )}

      {/* 2. Form Đặt hẹn (AppointmentBookingForm) - Dùng để tạo mới hoàn toàn */}
      <AppointmentBookingForm
        isOpen={showAppointmentForm}
        onClose={() => setShowAppointmentForm(false)}
        customerInfo={
          selectedSession
            ? {
                name: selectedSession.guestName,
                phone: selectedSession.guestPhone,
              }
            : null
        }
      />
    </div>
  );
};

export default CustomerServiceDashboard;
