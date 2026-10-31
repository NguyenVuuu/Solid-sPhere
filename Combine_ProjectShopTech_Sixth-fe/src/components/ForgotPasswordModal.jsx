import { useState } from "react";
import { FaEnvelope, FaKey, FaLock, FaShieldAlt, FaTimes, FaCheckCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import axiosInstance from "../custom/axios";
import notify from "../utils/notify";

import { BACKEND_BASE_URL } from "../config/api";

const API_URL = BACKEND_BASE_URL;

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1); // 1: email & confirm, 2: OTP, 3: new password
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validateEmail = () => {
    const errors = {};
    if (!email.trim()) {
      errors.email = t('forgotPassword.validation.email_required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = t('forgotPassword.validation.email_invalid');
    }
    if (!confirmEmail.trim()) {
      errors.confirmEmail = t('forgotPassword.validation.confirm_email_required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(confirmEmail)) {
      errors.confirmEmail = t('forgotPassword.validation.email_invalid');
    } else if (email.trim() && confirmEmail.trim() && email.toLowerCase() !== confirmEmail.toLowerCase()) {
      errors.confirmEmail = t('forgotPassword.validation.emails_not_match');
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateOTP = () => {
    const errors = {};
    if (!otp.trim()) {
      errors.otp = t('forgotPassword.validation.otp_required');
    } else if (!/^\d{6}$/.test(otp)) {
      errors.otp = t('forgotPassword.validation.otp_invalid');
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePassword = () => {
    const errors = {};
    if (!newPassword) {
      errors.newPassword = t('forgotPassword.validation.password_required');
    } else if (newPassword.length < 6) {
      errors.newPassword = t('forgotPassword.validation.password_min_length');
    }
    if (!confirmPassword) {
      errors.confirmPassword = t('forgotPassword.validation.confirm_password_required');
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = t('forgotPassword.validation.passwords_not_match');
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!validateEmail()) return;

    setLoading(true);
    try {
      const response = await axiosInstance.post(`${API_URL}/api/auth/forgot-password`, { email });
      if (response.data && response.data.result && response.data.result.success) {
        notify.success(t('forgotPassword.otp_sent'));
        setStep(2);
        setErrors({});
      } else {
        notify.error(response.data?.message || t('forgotPassword.error.send_otp_failed'));
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      const errorMessage = error.response?.data?.message || error.message || t('forgotPassword.error.send_otp_failed');
      notify.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!validateOTP()) return;

    setLoading(true);
    try {
      const response = await axiosInstance.post(`${API_URL}/api/auth/verify-otp`, { email, otp });
      if (response.data && response.data.result && response.data.result.success) {
        notify.success(t('forgotPassword.otp_verified'));
        setStep(3);
        setErrors({});
      } else {
        notify.error(response.data?.message || t('forgotPassword.error.otp_invalid'));
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      const errorMessage = error.response?.data?.message || error.message || t('forgotPassword.error.otp_invalid');
      notify.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;

    setLoading(true);
    try {
      const response = await axiosInstance.post(`${API_URL}/api/auth/reset-password`, {
        email,
        otp,
        newPassword
      });
      if (response.data && response.data.result && response.data.result.success) {
        notify.success(t('forgotPassword.reset_success'));
        handleClose();
      } else {
        notify.error(response.data?.message || t('forgotPassword.error.reset_failed'));
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      const errorMessage = error.response?.data?.message || error.message || t('forgotPassword.error.reset_failed');
      notify.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setEmail("");
    setConfirmEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setErrors({});
    onClose();
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setOtp("");
      setErrors({});
    } else if (step === 3) {
      setStep(2);
      setNewPassword("");
      setConfirmPassword("");
      setErrors({});
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[10000] p-4" onClick={handleClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {t('forgotPassword.title')}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                step >= s
                  ? 'bg-gradient-to-r from-black via-gray-900 to-purple-950 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {step > s ? <FaCheckCircle /> : s}
              </div>
              {s < 3 && (
                <div className={`w-16 h-1 mx-2 ${
                  step > s ? 'bg-gradient-to-r from-black via-gray-900 to-purple-950' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Enter Email and Confirm */}
        {step === 1 && (
          <form onSubmit={handleSendOTP} className="space-y-5">
            <div className="text-center mb-6">
              <FaEnvelope className="text-5xl text-purple-600 mx-auto mb-3" />
              <p className="text-gray-600">{t('forgotPassword.step1.description')}</p>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <FaEnvelope />
              </div>
              <input
                type="email"
                placeholder={t('forgotPassword.step1.email_placeholder')}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.email
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-purple-500 focus:border-purple-500'
                }`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <FaEnvelope />
              </div>
              <input
                type="email"
                placeholder={t('forgotPassword.step1.confirm_email_placeholder')}
                value={confirmEmail}
                onChange={(e) => {
                  setConfirmEmail(e.target.value);
                  if (errors.confirmEmail) setErrors({ ...errors, confirmEmail: '' });
                }}
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.confirmEmail
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-purple-500 focus:border-purple-500'
                }`}
              />
            </div>
            {errors.confirmEmail && <p className="text-red-500 text-sm">{errors.confirmEmail}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-black via-gray-900 to-purple-950 hover:from-gray-900 hover:to-purple-900 text-white font-semibold rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
            >
              {loading ? t('forgotPassword.sending') : t('forgotPassword.step1.send_otp')}
            </button>
          </form>
        )}

        {/* Step 2: Enter OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOTP} className="space-y-5">
            <div className="text-center mb-6">
              <FaKey className="text-5xl text-purple-600 mx-auto mb-3" />
              <p className="text-gray-600">{t('forgotPassword.step2.description', { email })}</p>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <FaKey />
              </div>
              <input
                type="text"
                placeholder={t('forgotPassword.step2.otp_placeholder')}
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setOtp(value);
                  if (errors.otp) setErrors({ ...errors, otp: '' });
                }}
                maxLength={6}
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all text-center text-2xl tracking-widest ${
                  errors.otp
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-purple-500 focus:border-purple-500'
                }`}
              />
            </div>
            {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                {t('forgotPassword.back')}
              </button>
              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="flex-1 py-3 bg-gradient-to-r from-black via-gray-900 to-purple-950 hover:from-gray-900 hover:to-purple-900 text-white font-semibold rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
              >
                {loading ? t('forgotPassword.verifying') : t('forgotPassword.step2.verify')}
              </button>
            </div>
          </form>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div className="text-center mb-6">
              <FaLock className="text-5xl text-purple-600 mx-auto mb-3" />
              <p className="text-gray-600">{t('forgotPassword.step3.description')}</p>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <FaLock />
              </div>
              <input
                type="password"
                placeholder={t('forgotPassword.step3.new_password_placeholder')}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (errors.newPassword) setErrors({ ...errors, newPassword: '' });
                }}
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.newPassword
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-purple-500 focus:border-purple-500'
                }`}
              />
            </div>
            {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <FaShieldAlt />
              </div>
              <input
                type="password"
                placeholder={t('forgotPassword.step3.confirm_password_placeholder')}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                }}
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.confirmPassword
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-purple-500 focus:border-purple-500'
                }`}
              />
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                {t('forgotPassword.back')}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-gradient-to-r from-black via-gray-900 to-purple-950 hover:from-gray-900 hover:to-purple-900 text-white font-semibold rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
              >
                {loading ? t('forgotPassword.resetting') : t('forgotPassword.step3.reset_password')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;

