import { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const ScheduleForm = ({ onClose, defaultInfo }) => {
  const API_URL = import.meta.env.VITE_API_URL || "/api";

  const [form, setForm] = useState({
    name: defaultInfo?.guestName || "",
    phone: defaultInfo?.guestPhone || "",
    email: "",
    note: "",
    appointmentAt: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("translation");

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

    // 🧠 Kiểm tra trường bắt buộc
    if (!form.name || !form.phone || !form.appointmentAt) {
      setError(t("scheduleForm.validation_error"));
      return;
    }

    try {
      setLoading(true);

      // ⚙️ Chuẩn bị payload theo BookingAppointmentDTO của backend
      const payload = {
        guestName: form.name,
        guestEmail: form.email,
        guestPhone: form.phone,
        notes: form.note,
        expectedArrival: new Date(form.appointmentAt).toISOString(), // ISO 8601
        isGuestBooking: true,
        userId: null,
      };

      console.log("📤 Gửi dữ liệu đặt lịch:", payload);

      const response = await axios.post(`${API_URL}/appointments`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("✅ Phản hồi từ server:", response.data);
      alert(t("scheduleForm.success_message"));
      onClose();
    } catch (err) {
      console.error("❌ Lỗi đặt lịch:", err);
      if (err.response) {
        alert(
          `❌ ${t("scheduleForm.error_prefix")} ${err.response.status}: ${
            err.response.data.message || t("scheduleForm.default_error")
          }`
        );
      } else {
        alert(t("scheduleForm.network_error"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white rounded-lg w-full max-w-md shadow-lg p-6 animate-fadeIn">
        <h2 className="text-xl font-semibold mb-4 text-blue-600 text-center">
          📅 {t("scheduleForm.booking_for_customer")}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Họ tên */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("scheduleForm.input_full_name")}
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={t("scheduleForm.placeholder_name")}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("scheduleForm.input_phone")}
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder={t("scheduleForm.placeholder_phone")}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("scheduleForm.input_email")}
            </label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder={t("scheduleForm.placeholder_email")}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Ngày giờ dự kiến */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("scheduleForm.input_date")}
            </label>
            <input
              type="datetime-local"
              name="appointmentAt"
              value={form.appointmentAt}
              onChange={handleChange}
              min={new Date().toISOString().slice(0, 16)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Ghi chú */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("scheduleForm.input_note")}
            </label>
            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              placeholder={t("scheduleForm.placeholder_note")}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Hiển thị lỗi nếu có */}
          {error && (
            <div className="text-red-500 text-sm text-center font-medium">
              {error}
            </div>
          )}

          {/* Nút hành động */}
          <div className="flex justify-end space-x-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-700"
            >
              {t("scheduleForm.btn_cancel")}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white disabled:opacity-50"
            >
              {loading
                ? t("scheduleForm.btn_sending")
                : t("scheduleForm.btn_save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleForm;
