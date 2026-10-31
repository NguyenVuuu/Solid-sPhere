import React, { useState, useEffect, useRef, useContext } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import axios from "axios";
import { ChatContext } from "./ChatProvider";
import { UserContext } from "../../context/UserContext";
import ScheduleForm from "../Schedule/ScheduleForm";
import { processAppointmentPrompt } from "../../utils/gemini/geminiHandler";
import { useTranslation } from "react-i18next";

const STORAGE_KEY = "customer-support-session";

const ChatWindow = () => {
  const { isOpen } = useContext(ChatContext);
  const { user } = useContext(UserContext);
  const API_URL = import.meta.env.VITE_API_URL || "/api";
  const WS_URL = `${import.meta.env.VITE_WS_URL || "http://localhost:8081"}/ws`;

  const [connected, setConnected] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]); // Dành cho UI
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [customer, setCustomer] = useState({ name: "", phone: "" });
  const [isRegistered, setIsRegistered] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [useAI, setUseAI] = useState(false);
  const [askedAI, setAskedAI] = useState(false);
  const [isBotThinking, setIsBotThinking] = useState(false); // Thêm state loading cho AI
  const { t } = useTranslation("translation");

  // *** NEW STATE ***
  // Lịch sử chat dành riêng cho Gemini API
  const [chatHistory, setChatHistory] = useState([]);

  const messagesEndRef = useRef(null);

  // Track user trước đó để phân biệt "guest chưa login" vs "user đã logout"
  const prevUserRef = useRef(user);

  // Auto-fill thông tin từ user đã login
  useEffect(() => {
    if (user && !isRegistered) {
      setCustomer({
        name: user.fullName || user.name || "",
        phone: user.phoneNumber || user.phone || "",
      });
    }
  }, [user, isRegistered]);

  // Reset tất cả khi user logout (chỉ khi user TỪNG login rồi mới logout)
  useEffect(() => {
    const wasLoggedIn = prevUserRef.current;
    prevUserRef.current = user;

    if (wasLoggedIn && !user && isRegistered) {
      // User đã logout, reset lại tất cả
      setCustomer({ name: "", phone: "" });
      setIsRegistered(false);
      setMessages([]);
      setSessionId(null);
      setUseAI(false);
      setAskedAI(false);
      setInput("");
      setChatHistory([]);
      setShowScheduleForm(false);
      setIsBotThinking(false);

      // Ngắt kết nối WebSocket nếu có
      if (stompClient && stompClient.connected) {
        stompClient.disconnect();
      }
      setConnected(false);
      setStompClient(null);

      // Xóa session từ localStorage
      localStorage.removeItem(STORAGE_KEY);

      console.log("✅ Chat session reset after logout");
    }
  }, [user, isRegistered, stompClient]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!isRegistered || !sessionId || !isOpen || useAI) return; // Không kết nối WS nếu dùng AI

    const socket = new SockJS(WS_URL);
    const client = Stomp.over(socket);
    client.debug = () => {};

    client.connect({}, () => {
      setConnected(true);
      setStompClient(client);

      const session = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!session?.sessionCode) return;

      client.subscribe(`/topic/chat/${session.sessionCode}`, msg => {
        const body = JSON.parse(msg.body);
        setMessages(prev => {
          if (body?.id && prev.some(m => m.id === body.id)) {
            return prev;
          }

          const pendingIndex = prev.findIndex(
            m =>
              m.pending &&
              m.senderType === body.senderType &&
              m.senderName === body.senderName &&
              m.content === body.content
          );

          if (pendingIndex !== -1) {
            const updated = [...prev];
            updated[pendingIndex] = {
              ...updated[pendingIndex],
              ...body,
              pending: false,
            };
            return updated;
          }

          return [...prev, body];
        });
      });
    });

    return () => {
      if (client.connected) {
        client.disconnect(() => setConnected(false));
      }
    };
  }, [isRegistered, sessionId, isOpen, useAI, WS_URL]); // Thêm WS_URL vào dependency

  const handleRegister = async e => {
    e.preventDefault();
    if (!customer.name || !customer.phone) return;

    try {
      const res = await axios.post(`${API_URL}/chat/start`, {
        fullName: customer.name,
        phoneNumber: customer.phone,
      });

      const sessionData = {
        chatId: res.data.chatId,
        sessionCode: res.data.sessionCode,
        customer: { name: customer.name, phone: customer.phone },
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
      setSessionId(sessionData.chatId);
      setIsRegistered(true);
      setAskedAI(true); // Hiển thị prompt hỏi dùng AI
    } catch (err) {
      console.error("❌ Lỗi tạo phiên chat:", err);
      alert("Không thể bắt đầu chat. Vui lòng thử lại.");
    }
  };

  // *** LOGIC HANDLE-SEND ĐÃ ĐƯỢC CẬP NHẬT HOÀN TOÀN ***
  const handleSend = async e => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();

    // 1. Cập nhật UI ngay lập tức với trạng thái pending
    const tempId = `temp-${Date.now()}`;
    setMessages(prev => [
      ...prev,
      {
        id: tempId,
        senderType: "CUSTOMER",
        senderName: customer.name || "Khách",
        content: userMsg,
        pending: !useAI, // chỉ pending nếu chat với nhân viên
      },
    ]);
    setInput("");

    // 2. Xử lý logic theo chế độ (AI hoặc Nhân viên)
    if (useAI) {
      setIsBotThinking(true); // Bot bắt đầu suy nghĩ

      // Chuẩn bị tin nhắn và lịch sử cho API
      const newUserMessage = { role: "user", parts: [{ text: userMsg }] };
      const currentHistory = [...chatHistory]; // Lấy lịch sử *trước* khi thêm tin nhắn mới

      // Cập nhật lịch sử chat cho Gemini (để dùng cho lần gọi tiếp theo)
      setChatHistory([...currentHistory, newUserMessage]);

      // Gọi Gemini API
      const aiResponse = await processAppointmentPrompt(
        userMsg,
        currentHistory
      );

      setIsBotThinking(false); // Bot suy nghĩ xong

      if (aiResponse && aiResponse.data) {
        // AI trả về JSON hợp lệ
        const { data, missing_fields } = aiResponse;

        // Lưu phản hồi JSON của AI vào lịch sử
        setChatHistory(prev => [
          ...prev,
          { role: "model", parts: [{ text: JSON.stringify(aiResponse) }] },
        ]);

        if (missing_fields?.length > 0) {
          // Trường hợp 1: AI cần thêm thông tin
          const question = `Mình cần thêm thông tin sau để đặt lịch: ${missing_fields.join(
            ", "
          )}. Bạn cung cấp giúp mình nhé?`;

          setMessages(prev => [
            ...prev,
            { senderType: "STAFF", senderName: "Bot", content: question },
          ]);
        } else {
          // Trường hợp 2: Đã đủ thông tin, tiến hành đặt lịch
          try {
            // Hiển thị tin nhắn chờ
            setMessages(prev => [
              ...prev,
              {
                senderType: "STAFF",
                senderName: "Bot",
                content: "OK, mình đang xử lý đặt lịch cho bạn...",
              },
            ]);

            await axios.post(`${API_URL}/appointments`, data);

            // Thông báo thành công
            setMessages(prev => [
              ...prev,
              {
                senderType: "STAFF",
                senderName: "Bot",
                content: `✅ Lịch hẹn của bạn đã được đặt thành công! (Tên: ${
                  data.guestName
                }, SĐT: ${data.guestPhone}, Thời gian: ${new Date(
                  data.expectedArrival
                ).toLocaleString("vi-VN")})`,
              },
            ]);
            // Reset lịch sử chat AI sau khi thành công
            setChatHistory([]);
            setUseAI(false); // Tắt AI, quay về chat thường
            setAskedAI(false); // Ẩn nút hỏi AI
          } catch (err) {
            console.error("Lỗi khi đặt lịch:", err);
            setMessages(prev => [
              ...prev,
              {
                senderType: "STAFF",
                senderName: "Bot",
                content: "❌ Có lỗi khi tạo lịch hẹn, vui lòng thử lại sau.",
              },
            ]);
          }
        }
      } else {
        // AI không trả về JSON hợp lệ
        setMessages(prev => [
          ...prev,
          {
            senderType: "STAFF",
            senderName: "Bot",
            content:
              "Mình chưa hiểu rõ ý bạn, bạn có thể nói rõ hơn được không?",
          },
        ]);
      }
    } else {
      // Logic chat WebSocket với nhân viên (như cũ)
      if (!stompClient || !stompClient.connected) {
        setMessages(prev => [
          ...prev,
          {
            senderType: "STAFF",
            senderName: "Bot",
            content: "Lỗi kết nối máy chủ chat. Vui lòng tải lại.",
          },
        ]);
        return;
      }
      const msg = {
        chatId: sessionId,
        senderType: "CUSTOMER",
        senderName: customer.name || "Khách",
        content: userMsg,
      };
      stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(msg));
    }
  };

  // *** LOGIC KHỞI TẠO AI (QUAN TRỌNG) ***
  const handleEnableAI = () => {
    setUseAI(true);
    setAskedAI(false); // Ẩn lựa chọn
    setConnected(false); // Đảm bảo ngắt kết nối WS

    // 1. Tạo trạng thái JSON ban đầu dựa trên thông tin đã đăng ký
    const initialData = {
      guestName: customer.name,
      guestPhone: customer.phone,
      guestEmail: null,
      notes: null,
      expectedArrival: null,
      isGuestBooking: true,
      userId: null,
    };
    const initialMissing = ["expectedArrival", "guestEmail", "notes"];
    const initialJson = { data: initialData, missing_fields: initialMissing };

    // 2. "Mớm" (Prime) lịch sử chat của Gemini với thông tin này
    // Bằng cách này, AI sẽ không hỏi lại Tên và SĐT
    setChatHistory([
      { role: "model", parts: [{ text: JSON.stringify(initialJson) }] },
    ]);

    // 3. Gửi tin nhắn chào mừng AI
    setMessages(prev => [
      ...prev,
      {
        senderType: "STAFF",
        senderName: "Bot",
        content: `Chào ${customer.name}! Mình là Bot AI. Bạn muốn đặt dịch vụ gì và vào thời gian nào ạ? 💬`,
      },
    ]);
  };

  const handleDisableAI = () => {
    setAskedAI(false);
    setUseAI(false);
    setMessages(prev => [
      ...prev,
      {
        senderType: "STAFF",
        senderName: "Bot",
        content: "Không sao, mình sẽ kết nối bạn với nhân viên tư vấn nhé 🙂",
      },
    ]);
    // Logic kết nối WebSocket sẽ tự động chạy lại (do dependency `useAI` trong useEffect)
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 left-6 z-50 w-96 h-[520px] bg-white shadow-xl rounded-3xl border border-gray-100 flex flex-col overflow-hidden transition-all duration-300">
      {/* Header - Màu như header chính */}
      <div className="flex items-center justify-between bg-gradient-to-r from-black via-gray-900 to-purple-950 text-white px-5 py-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
            💬
          </div>
          <div>
            <h3 className="font-semibold text-base">
              {t("bookingChat.booking_form")}
            </h3>
            <span className="text-xs opacity-90">
              {isRegistered
                ? useAI
                  ? t("bookingChat.aiSupport")
                  : connected
                  ? t("bookingChat.connected")
                  : t("bookingChat.connecting")
                : t("bookingChat.notRegistered")}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isRegistered && !useAI && (
            <button
              onClick={() => setShowScheduleForm(true)}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 border border-white/10"
              title="Đặt lịch hẹn"
            >
              <span>📅</span>
              <span>{t("bookingChat.booking")}</span>
            </button>
          )}
        </div>
      </div>

      {/* Nội dung chat - Màu trắng chủ đạo */}
      <div className="flex-1 overflow-y-auto px-5 py-4 bg-white">
        {!isRegistered ? (
          <form onSubmit={handleRegister} className="flex flex-col gap-4 mt-4">
            <div className="text-center mb-2">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-gray-900 to-purple-950 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                💬
              </div>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {t("bookingChat.booking_form")}
              </h2>
              <p className="text-sm text-gray-500">
                {user
                  ? t("bookingChat.registerInfo")
                  : t("bookingChat.registeredInfo")}
              </p>
              {user && (
                <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full border border-green-200">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{t("bookingChat.loginedInfo")}</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1.5">
                  <span>{t("bookingChat.fullName")}</span>
                  {user && customer.name && (
                    <span className="text-xs text-green-600 flex items-center gap-1">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Đã điền
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  placeholder={t("bookingChat.enterFullName")}
                  value={customer.name}
                  onChange={e =>
                    setCustomer({ ...customer, name: e.target.value })
                  }
                  className="w-full border border-gray-200 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-950/20 focus:border-purple-950 transition-all text-sm"
                />
              </div>

              <div>
                <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1.5">
                  <span>{t("bookingChat.phone")}</span>
                  {user && customer.phone && (
                    <span className="text-xs text-green-600 flex items-center gap-1">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Đã điền
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  placeholder={t("bookingChat.enterPhone")}
                  value={customer.phone}
                  onChange={e =>
                    setCustomer({ ...customer, phone: e.target.value })
                  }
                  className="w-full border border-gray-200 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-950/20 focus:border-purple-950 transition-all text-sm"
                />
              </div>

              {user && (
                <p className="text-xs text-gray-500 italic px-1">
                  {t("bookingChat.registeredNote")}
                </p>
              )}

              <button
                type="submit"
                disabled={!customer.name || !customer.phone}
                className="w-full bg-gradient-to-r from-black via-gray-900 to-purple-950 hover:opacity-90 text-white px-4 py-3 rounded-xl transition-all font-medium text-sm shadow-lg shadow-purple-950/20 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t("bookingChat.startChat")}
              </button>
            </div>
          </form>
        ) : (
          <>
            {messages.length === 0 && !askedAI ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-6">
                <div className="w-20 h-20 mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-4xl">
                  💭
                </div>
                <p className="text-gray-400 text-sm">
                  {t("bookingChat.noMessages")}
                </p>
                <p className="text-gray-300 text-xs mt-1">
                  {t("bookingChat.startConversation")}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((m, i) => (
                  <div
                    key={m.id ?? i}
                    className={`flex ${
                      m.senderType === "CUSTOMER"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[75%] px-4 py-2.5 rounded-2xl shadow-sm transition-all ${
                        m.senderType === "CUSTOMER"
                          ? "bg-gradient-to-r from-black via-gray-900 to-purple-950 text-white rounded-br-sm"
                          : "bg-gray-50 text-gray-800 border border-gray-100 rounded-bl-sm"
                      } ${m.pending ? "opacity-60 italic" : ""}`}
                    >
                      <p className="text-xs font-medium mb-0.5 opacity-70">
                        {m.senderName}
                      </p>
                      <p className="text-sm leading-relaxed">{m.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Hiển thị "Bot đang gõ..." */}
            {isBotThinking && (
              <div className="flex justify-start">
                <div className="max-w-[75%] px-4 py-2.5 rounded-2xl shadow-sm bg-gray-50 text-gray-800 border border-gray-100 rounded-bl-sm">
                  <p className="text-xs font-medium mb-0.5 opacity-70">Bot</p>
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-1">
                      <div
                        className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 ml-1">
                      {t("bookingChat.botTyping")}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Lựa chọn dùng AI */}
            {askedAI && (
              <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 p-4 rounded-2xl shadow-sm text-center">
                <div className="mb-3">
                  <span className="text-2xl">🤖</span>
                </div>
                <p className="text-sm text-gray-700 mb-1">
                  {t("bookingChat.useAISupport")}
                </p>
                <p className="text-sm font-semibold text-gray-900 mb-4">
                  {t("bookingChat.aiBenefits")}
                </p>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={handleEnableAI}
                    className="bg-gradient-to-r from-black via-gray-900 to-purple-950 hover:opacity-90 text-white px-5 py-2 rounded-xl text-sm font-medium transition-all shadow-md"
                  >
                    {t("bookingChat.useAI")}
                  </button>
                  <button
                    onClick={handleDisableAI}
                    className="bg-white hover:bg-gray-50 text-gray-700 px-5 py-2 rounded-xl text-sm font-medium transition-all border border-gray-200"
                  >
                    {t("bookingChat.useStaff")}
                  </button>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="pb-4" />
          </>
        )}
      </div>

      {/* Thanh nhập tin nhắn */}
      {isRegistered && (
        <form
          onSubmit={handleSend}
          className="flex border-t border-gray-100 p-4 bg-white items-center gap-2"
        >
          <input
            type="text"
            placeholder={t("bookingChat.enterMessages")}
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-950/20 focus:border-purple-950 transition-all text-sm"
            disabled={isBotThinking || askedAI}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-black via-gray-900 to-purple-950 hover:opacity-90 text-white px-5 py-2.5 rounded-xl transition-all disabled:opacity-50 font-medium text-sm shadow-md"
            disabled={(!connected && !useAI) || isBotThinking || askedAI}
          >
            Gửi
          </button>
        </form>
      )}

      {/* Schedule Form (Modal) */}
      {showScheduleForm && (
        <ScheduleForm
          onClose={() => setShowScheduleForm(false)}
          defaultInfo={null}
        />
      )}
    </div>
  );
};

export default ChatWindow;
