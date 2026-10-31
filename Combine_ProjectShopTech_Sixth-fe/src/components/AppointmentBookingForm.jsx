import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const AppointmentBookingForm = ({ isOpen, onClose, customerInfo }) => {
  const { t } = useTranslation("translation");
  const API_URL = import.meta.env.VITE_API_URL || "/api";

  const [formData, setFormData] = useState({
    guestName: customerInfo?.name || "",
    guestEmail: "",
    guestPhone: customerInfo?.phone || "",
    expectedArrival: "",
    notes: "",
    isGuestBooking: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Format datetime for backend
      const appointmentData = {
        ...formData,
        expectedArrival: new Date(formData.expectedArrival).toISOString(),
      };

      const response = await axios.post(
        `${API_URL}/appointments`,
        appointmentData
      );

      console.log("✅ Appointment booked successfully:", response.data);
      setSubmitSuccess(true);

      // Reset form after 2 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
        setFormData({
          guestName: customerInfo?.name || "",
          guestEmail: "",
          guestPhone: customerInfo?.phone || "",
          expectedArrival: "",
          notes: "",
          isGuestBooking: true,
        });
      }, 2000);
    } catch (error) {
      console.error("❌ Error booking appointment:", error);
      alert(t("scheduleForm.booking_error_alert"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center glass-overlay transition-all duration-300"
      onClick={handleOverlayClick}
    >
      {/* Form Container với hiệu ứng bong bóng */}
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 scale-100 animate-pulse-subtle">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors"
        >
          ×
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
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
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {t("scheduleForm.booking_title")}
          </h2>
          <p className="text-gray-600">{t("scheduleForm.booking_subtitle")}</p>
        </div>

        {submitSuccess ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-green-600 mb-2">
              {t("scheduleForm.booking_success")}
            </h3>
            <p className="text-gray-600">
              {t("scheduleForm.booking_success_note")}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Guest Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("scheduleForm.input_full_name")}
              </label>
              <input
                type="text"
                name="guestName"
                value={formData.guestName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={t("scheduleForm.placeholder_name_simple")}
              />
            </div>

            {/* Guest Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("scheduleForm.input_email")} *
              </label>
              <input
                type="email"
                name="guestEmail"
                value={formData.guestEmail}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={t("scheduleForm.placeholder_email_example")}
              />
            </div>

            {/* Guest Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("scheduleForm.input_phone")}
              </label>
              <input
                type="tel"
                name="guestPhone"
                value={formData.guestPhone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={t("scheduleForm.placeholder_phone_example")}
              />
            </div>

            {/* Expected Arrival */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("scheduleForm.input_date")}
              </label>
              <input
                type="datetime-local"
                name="expectedArrival"
                value={formData.expectedArrival}
                onChange={handleInputChange}
                required
                min={new Date().toISOString().slice(0, 16)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("scheduleForm.input_note")}
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder={t("scheduleForm.placeholder_note_desc")}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {t("scheduleForm.btn_processing")}
                </div>
              ) : (
                t("scheduleForm.btn_book_now")
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AppointmentBookingForm;
