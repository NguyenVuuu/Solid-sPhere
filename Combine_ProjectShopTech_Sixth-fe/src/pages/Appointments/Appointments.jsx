import { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCheckCircle,
  FaTimes,
  FaTools,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { 
  fetchAppointments, 
  createAppointment, 
  updateAppointmentStatus, 
  deleteAppointment 
} from "../../apis/appointmentApi";

export default function Appointments() {
  const { t } = useTranslation();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    customer: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });

  const services = [
    {
      id: "repair",
      name: "Laptop/PC Repair",
      icon: "🔧",
      duration: "1-2 hours",
    },
    { id: "upgrade", name: "Hardware Upgrade", icon: "⚡", duration: "1 hour" },
    {
      id: "consultation",
      name: "Technical Consultation",
      icon: "💡",
      duration: "30 mins",
    },
    { id: "warranty", name: "Warranty Check", icon: "🛡️", duration: "30 mins" },
    {
      id: "installation",
      name: "Software Installation",
      icon: "💻",
      duration: "45 mins",
    },
    {
      id: "cleaning",
      name: "Device Cleaning",
      icon: "🧹",
      duration: "30 mins",
    },
  ];

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ];

  /** 🟩 Lấy danh sách lịch hẹn */
  const loadAppointments = async () => {
    setLoading(true);
    try {
      const data = await fetchAppointments();
      setAppointments(data);
    } catch (err) {
      console.error("Lỗi khi tải lịch hẹn:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  /** 🟦 Gửi form tạo lịch hẹn */
  const handleSubmit = async e => {
    e.preventDefault();
    if (
      !form.customer ||
      !form.email ||
      !form.phone ||
      !form.date ||
      !form.time ||
      !form.service
    ) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    try {
      await createAppointment(form);
      alert("Đặt lịch thành công!");
      setForm({
        customer: "",
        phone: "",
        email: "",
        service: "",
        date: "",
        time: "",
        notes: "",
      });
      loadAppointments();
    } catch (err) {
      console.error("Lỗi khi tạo lịch hẹn:", err);
    }
  };

  /** 🟨 Cập nhật trạng thái */
  const updateStatus = async (id, status) => {
    try {
      await updateAppointmentStatus(id, status);
      loadAppointments();
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái:", err);
    }
  };

  /** 🟥 Xóa lịch hẹn */
  const handleDeleteAppointment = async id => {
    if (window.confirm("Bạn có chắc muốn hủy lịch hẹn này không?")) {
      try {
        await deleteAppointment(id);
        loadAppointments();
      } catch (err) {
        console.error("Lỗi khi hủy lịch hẹn:", err);
      }
    }
  };

  const getStatusBadge = status => {
    const config = {
      pending: {
        label: "Pending",
        color: "bg-yellow-100 text-yellow-800 border-yellow-300",
      },
      confirmed: {
        label: "Confirmed",
        color: "bg-green-100 text-green-800 border-green-300",
      },
      completed: {
        label: "Completed",
        color: "bg-blue-100 text-blue-800 border-blue-300",
      },
      cancelled: {
        label: "Cancelled",
        color: "bg-red-100 text-red-800 border-red-300",
      },
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold border ${
          config[status]?.color || ""
        }`}
      >
        {config[status]?.label || "Unknown"}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-purple-950 text-white py-16">
        <div className="text-center">
          <FaCalendarAlt className="text-6xl mx-auto mb-4 text-purple-400" />
          <h1 className="text-5xl font-bold mb-4">Đặt lịch sửa chữa</h1>
          <p className="text-xl text-purple-300">
            Đặt lịch hẹn nhanh chóng – tiện lợi
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-4xl">🗓️</span> Tạo lịch hẹn mới
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="font-semibold text-gray-700">Họ và tên *</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={form.customer}
                  onChange={e => setForm({ ...form, customer: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border-2 rounded-xl"
                  placeholder="Nguyễn Văn A"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-gray-700">
                  Số điện thoại *
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border-2 rounded-xl"
                    placeholder="0901234567"
                  />
                </div>
              </div>
              <div>
                <label className="font-semibold text-gray-700">Email *</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border-2 rounded-xl"
                    placeholder="example@email.com"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="font-semibold text-gray-700 mb-2">
                Dịch vụ *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {services.map(s => (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => setForm({ ...form, service: s.name })}
                    className={`p-4 border-2 rounded-xl ${
                      form.service === s.name
                        ? "bg-purple-900 text-white border-purple-600"
                        : "border-gray-300 hover:border-purple-600"
                    }`}
                  >
                    <div className="text-2xl mb-1">{s.icon}</div>
                    <div className="font-semibold text-sm">{s.name}</div>
                    <div className="text-xs opacity-75">{s.duration}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-gray-700">Ngày *</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={e => setForm({ ...form, date: e.target.value })}
                  className="w-full px-4 py-3 border-2 rounded-xl"
                />
              </div>
              <div>
                <label className="font-semibold text-gray-700">Giờ *</label>
                <select
                  value={form.time}
                  onChange={e => setForm({ ...form, time: e.target.value })}
                  className="w-full px-4 py-3 border-2 rounded-xl"
                >
                  <option value="">Chọn giờ</option>
                  {timeSlots.map(t => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Ghi chú</label>
              <textarea
                rows="3"
                value={form.notes}
                onChange={e => setForm({ ...form, notes: e.target.value })}
                className="w-full border-2 rounded-xl p-3"
                placeholder="Mô tả vấn đề hoặc yêu cầu..."
              ></textarea>
            </div>

            <button className="w-full bg-purple-900 text-white py-4 rounded-xl font-bold hover:scale-105 transition-transform">
              Đặt lịch hẹn
            </button>
          </form>
        </div>

        {/* Danh sách lịch hẹn */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span>📋</span> Lịch hẹn hiện tại
          </h2>

          {loading ? (
            <p className="text-gray-600">Đang tải...</p>
          ) : (
            <div className="space-y-4">
              {appointments.map(apt => (
                <div
                  key={apt.id}
                  className="border-2 rounded-2xl p-6 hover:shadow-lg"
                >
                  <div className="flex justify-between mb-2">
                    <div>
                      <h3 className="font-bold">{apt.guestName}</h3>
                      <p className="text-sm text-gray-600">{apt.guestEmail}</p>
                    </div>
                    {getStatusBadge(apt.status || "pending")}
                  </div>
                  <p className="text-gray-700 flex items-center gap-2">
                    <FaClock /> {apt.expectedArrival}
                  </p>
                  <p className="mt-2 text-purple-700 flex items-center gap-2">
                    <FaTools /> {apt.notes}
                  </p>
                  <p className="italic text-sm text-gray-600">{apt.notes}</p>

                  <div className="flex gap-2 mt-3">
                    <button
                      className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                      onClick={() => updateStatus(apt.id, "confirmed")}
                    >
                      <FaCheckCircle className="inline mr-1" /> Xác nhận
                    </button>
                    <button
                      className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                      onClick={() => handleDeleteAppointment(apt.id)}
                    >
                      <FaTimes className="inline mr-1" /> Hủy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 bg-gradient-to-r from-purple-900 to-purple-950 text-white p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <FaMapMarkerAlt /> Địa điểm sửa chữa
            </h3>
            <p>123 Võ Văn Ngân, TP. Thủ Đức</p>
            <p>Hotline: 1900 xxxx</p>
            <p>Giờ làm việc: Thứ 2–Thứ 7 (8:00 – 18:00)</p>
          </div>
        </div>
      </div>
    </div>
  );
}