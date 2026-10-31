import axios from "axios";
import promptTextTemplate from "./text.txt";

import { API_BASE_URL } from "../../config/api";

const GEMINI_PROXY_URL = `${API_BASE_URL}/gemini`;

// ========== 1. Tạo thời gian ISO theo múi giờ Việt Nam ==========
function getCurrentDateTimeISO_VN() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const parts = formatter.formatToParts(now).reduce((acc, part) => {
    if (part.type !== "literal") acc[part.type] = part.value;
    return acc;
  }, {});

  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}+07:00`;
}

// ========== 2. Hàm gọi Gemini với strict prompt ==========
export async function processAppointmentPrompt(prompt, chatHistory = []) {
  try {
    const currentDateTime = getCurrentDateTimeISO_VN();

    // Thay biến thời gian vào prompt
    const systemPrompt = promptTextTemplate.replace(
      "%CURRENT_DATETIME_ISO%",
      currentDateTime
    );

    // Xây payload
    const payload = {
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
      contents: [
        ...chatHistory,
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        response_mime_type: "application/json",
      },
    };

    // Gọi API
    const res = await axios.post(GEMINI_PROXY_URL, payload);

    // Extract JSON string
    const text = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return safeJSON(text);
  } catch (err) {
    console.error("❌ Gemini proxy error:", err.response?.data || err.message);
    return null;
  }
}

// ========== 3. Parse JSON an toàn ==========
function safeJSON(str) {
  try {
    if (!str) return null;
    const cleaned = str.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.warn("⚠️ JSON không hợp lệ:", str);
    return null;
  }
}
