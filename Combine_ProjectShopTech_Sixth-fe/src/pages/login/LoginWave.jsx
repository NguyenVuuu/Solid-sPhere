import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn, FaEnvelope, FaLock, FaUser, FaShieldAlt } from "react-icons/fa";
import { UserContext } from "../../context/UserContext";
import { registerUser } from "../../services/LoginServices";
import Header from "../../components/Header";
import notify from "../../utils/notify";
import Footer from "../../components/Footer";
import { useTranslation } from 'react-i18next';
import axiosInstance from "../../custom/axios";
import ForgotPasswordModal from "../../components/ForgotPasswordModal";

import { BACKEND_BASE_URL } from "../../config/api";

const API_URL = BACKEND_BASE_URL;

export default function LoginWave() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100 flex items-center justify-center py-12 px-4 pt-40">
        <AuthCard />
      </div>
      <Footer />
    </>
  );
}

// Auth Card Component
function AuthCard() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, user, getUserRole } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [showInactiveModal, setShowInactiveModal] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [inactiveUserInfo, setInactiveUserInfo] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  useEffect(() => {
    if (user) {
      const userRole = getUserRole();
      const from = location.state?.from?.pathname || "/";
      // Redirect tất cả role về trang chủ hoặc trang trước để tránh lỗi React #300
      // Admin và customer_service sẽ thấy link quản lý trong header
      navigate(from === '/login' ? '/' : from, { replace: true });
    }
  }, [user]);
  // Form state
  const [signUpForm, setSignUpForm] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const [signInForm, setSignInForm] = useState({
    email: '',
    password: ''
  });

  // Validation state
  const [signUpErrors, setSignUpErrors] = useState({});
  const [signInErrors, setSignInErrors] = useState({});

  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  // useEffect(() => {
  //   if (user) {
  //     const from = location.state?.from?.pathname || "/";
  //     navigate(from, { replace: true });
  //   }
  // }, [user, navigate, location]);

  // Handle input changes for signup form
  const handleSignUpChange = (e) => {
    const { name, value } = e.target;

    // Format phone number input
    if (name === 'phoneNumber') {
      // Allow digits and + sign (only at the beginning)
      let formattedPhone = value;

      // If starts with +, keep it and only digits after
      if (value.startsWith('+')) {
        const digitsAfterPlus = value.slice(1).replace(/\D/g, '');
        formattedPhone = '+' + digitsAfterPlus.slice(0, 11); // +84 + 9-10 digits
      } else {
        // Remove all non-digit characters
        const digitsOnly = value.replace(/\D/g, '');
        formattedPhone = digitsOnly.slice(0, 10); // 0 + 9 digits
      }

      setSignUpForm(prev => ({
        ...prev,
        [name]: formattedPhone
      }));
    } else {
      setSignUpForm(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user types
    if (signUpErrors[name]) {
      setSignUpErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle input changes for signin form
  const handleSignInChange = (e) => {
    const { name, value } = e.target;

    setSignInForm(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user types
    if (signInErrors[name]) {
      setSignInErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate signup form
  const validateSignUp = () => {
    const errors = {};

    if (!signUpForm.fullName.trim()) {
      errors.fullName = t('common.validation.full_name_required');
    }

    if (!signUpForm.email.trim()) {
      errors.email = t('common.validation.email_required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpForm.email)) {
      errors.email = t('common.validation.email_invalid');
    }

    if (!signUpForm.phoneNumber.trim()) {
      errors.phoneNumber = t('common.validation.phone_required');
    } else if (!/^(0|\+84)[0-9]{9,10}$/.test(signUpForm.phoneNumber)) {
      errors.phoneNumber = t('common.validation.phone_invalid');
    }

    if (!signUpForm.password) {
      errors.password = t('common.validation.password_required');
    } else if (signUpForm.password.length < 6) {
      errors.password = t('common.validation.password_min_length');
    }

    if (!signUpForm.confirmPassword) {
      errors.confirmPassword = t('common.validation.confirm_password_required');
    } else if (signUpForm.password !== signUpForm.confirmPassword) {
      errors.confirmPassword = t('common.validation.passwords_not_match');
    }

    setSignUpErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validate signin form
  const validateSignIn = () => {
    const errors = {};

    if (!signInForm.email.trim()) {
      errors.email = t('common.validation.email_required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signInForm.email)) {
      errors.email = t('common.validation.email_invalid');
    }

    if (!signInForm.password) {
      errors.password = t('common.validation.password_required');
    }

    setSignInErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle signup submission
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateSignUp()) {
      return;
    }

    setLoading(true);

    try {
      console.log('Đang đăng ký với email:', signUpForm.email, 'và số điện thoại:', signUpForm.phoneNumber);

      // Call real register service from LoginServices
      // Backend expects: { fullName, email, phoneNumber, password, confirmPassword }
      const registerData = {
        fullName: signUpForm.fullName,
        email: signUpForm.email,
        phoneNumber: signUpForm.phoneNumber,
        password: signUpForm.password,
        confirmPassword: signUpForm.confirmPassword
      };

      const response = await registerUser(registerData);

      if (response.success) {
        // Show success notification
        notify.success(t('common.auth.register_success'));

        // Switch to login view after a short delay
        setTimeout(() => {
          setIsLogin(true);
        }, 2000);

        // Reset signup form
        setSignUpForm({
          fullName: '',
          email: '',
          phoneNumber: '',
          password: '',
          confirmPassword: ''
        });
      }

    } catch (err) {
      console.error('=== SIGNUP ERROR IN COMPONENT ===');
      console.error('Error object:', err);
      console.error('Error message:', err.message);

      // Display the error message from the service
      const errorMessage = err.message || t('common.auth.register_failed');
      notify.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle signin submission
  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!validateSignIn()) {
      return;
    }

    setLoading(true);

    try {
      console.log('Đang gửi yêu cầu đăng nhập với email:', signInForm.email);

      // Call the login function from UserContext
      await login({
        email: signInForm.email,
        password: signInForm.password
      });

      console.log('Đăng nhập thành công, đang chuyển hướng...');
      notify.success(t('common.auth.login_success'));
      // Redirect immediately based on role to avoid race with useEffect
      const role = getUserRole();
      if (role === 'admin') {
        navigate('/admin', { replace: true });
        return;
      }
      if (role === 'customer_service') {
        navigate('/customer-service', { replace: true });
        return;
      }
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });

    } catch (err) {
      console.error("=== SIGNIN ERROR IN COMPONENT ===");
      console.error("Error object:", err);
      console.error("Error message:", err.message);

      // Display the error message from the service
      const errorMessage = err.message || t('common.auth.login_failed');
      
      // Check if account is inactive - show large modal in center instead of toast
      if (errorMessage.includes('vô hiệu hóa') || errorMessage.includes('ACCOUNT_INACTIVE') || errorMessage.includes('1110')) {
        // Try to fetch user info from email in form
        try {
          const userResponse = await axiosInstance.get(`/users/email/${signInForm.email}`);
          const userData = userResponse.data.result || userResponse.data;
          if (userData) {
            setInactiveUserInfo({
              email: userData.email || signInForm.email,
              userName: userData.fullName || signInForm.email,
              userPhone: userData.phoneNumber || null,
              userId: userData.id || null
            });
          } else {
            setInactiveUserInfo({
              email: signInForm.email,
              userName: null,
              userPhone: null,
              userId: null
            });
          }
        } catch (err) {
          // If can't fetch user info, use email from form
          console.log("Could not fetch user info:", err);
          setInactiveUserInfo({
            email: signInForm.email,
            userName: null,
            userPhone: null,
            userId: null
          });
        }
        setEmailSent(false);
        setShowInactiveModal(true);
      } else {
        notify.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/oauth2/authorization/google`;
  };

  // Gửi email yêu cầu mở khóa tài khoản
  const handleRequestUnlock = async () => {
    if (!inactiveUserInfo || !inactiveUserInfo.email) {
      notify.error(t('common.auth.email_not_found'));
      return;
    }

    setIsSendingEmail(true);
    try {
      const response = await axiosInstance.post('/auth/request-unlock', {
        email: inactiveUserInfo.email,
        userName: inactiveUserInfo.userName,
        userPhone: inactiveUserInfo.userPhone,
        userId: inactiveUserInfo.userId
      });

      if (response.data && response.data.result && response.data.result.success) {
        setEmailSent(true);
        notify.success(t('common.auth.unlock_email_sent'));
      } else {
        notify.error(response.data?.message || t('common.auth.unlock_email_error'));
      }
    } catch (error) {
      console.error('Error sending unlock request:', error);
      notify.error(error.response?.data?.message || t('common.auth.unlock_request_error'));
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Đóng modal và reset state
  const handleCloseInactiveModal = () => {
    setShowInactiveModal(false);
    setEmailSent(false);
    setInactiveUserInfo(null);
  };

  return (
    <>
      {/* Inactive Account Modal - Simple and user-friendly */}
      {showInactiveModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4" onClick={handleCloseInactiveModal}>
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 transform transition-all" onClick={(e) => e.stopPropagation()}>
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-900 text-center mb-3">
              {t('common.auth.account_locked')}
            </h2>

            {/* Message */}
            <div className="text-center mb-6">
              <p className="text-sm text-gray-600 mb-4">
                {t('common.auth.account_locked_message')}
              </p>
              
              {/* Success message */}
              {emailSent && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-green-700">
                    {t('common.auth.unlock_request_sent')}
                  </p>
                </div>
              )}
            </div>

            {/* Action Button */}
            <div className="space-y-3">
              <button
                onClick={handleRequestUnlock}
                disabled={isSendingEmail || emailSent}
                className="w-full py-2.5 bg-gradient-to-r from-black via-gray-900 to-purple-950 text-white rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSendingEmail ? t('common.auth.sending') : emailSent ? t('common.auth.unlock_request_sent_status') : t('common.auth.request_unlock')}
              </button>
              
              <button
                onClick={handleCloseInactiveModal}
                className="w-full py-2.5 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                {t('common.close')}
              </button>
            </div>

            {/* Contact info - subtle */}
            <div className="mt-4 pt-4 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-500">
                {t('common.auth.need_support')} <span className="text-gray-700 font-medium">0901234567</span>
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left Side - Form */}
          <div className="p-8 lg:p-12">
            {/* Toggle Tabs */}
            <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all ${isLogin
                  ? 'bg-gradient-to-r from-black via-gray-900 to-purple-950 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                {t('common.login')}
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all ${!isLogin
                  ? 'bg-gradient-to-r from-black via-gray-900 to-purple-950 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                {t('common.register')}
              </button>
            </div>

            {/* Login Form */}
            {isLogin ? (
              <form onSubmit={handleSignIn} className="space-y-5">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('common.welcome_back')}</h2>
                  <p className="text-gray-600">{t('common.sign_in_to_continue')}</p>
                </div>

                <ModernInput
                  name="email"
                  type="email"
                  placeholder={t('common.email')}
                  value={signInForm.email}
                  onChange={handleSignInChange}
                  error={signInErrors.email}
                  icon={<FaEnvelope />}
                />

                <ModernInput
                  name="password"
                  type="password"
                  placeholder={t('common.password')}
                  value={signInForm.password}
                  onChange={handleSignInChange}
                  error={signInErrors.password}
                  icon={<FaLock />}
                />

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                    <span className="ml-2 text-sm text-gray-600">{t('common.remember_me')}</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-purple-700 hover:text-purple-900 font-medium"
                  >
                    {t('common.forgot_password')}
                  </button>
                </div>

                <ModernButton
                  text={loading ? t('common.signing_in') : t('common.sign_in')}
                  type="submit"
                  disabled={loading}
                />

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">{t('common.or_continue_with')}</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  <SocialButton icon={<FaGooglePlusG />} onClick={handleGoogleLogin} />
                  <SocialButton icon={<FaFacebookF />} />
                  <SocialButton icon={<FaGithub />} />
                  <SocialButton icon={<FaLinkedinIn />} />
                </div>
              </form>
            ) : (
              /* Register Form */
              <form onSubmit={handleSignUp} className="space-y-5">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('common.create_account')}</h2>
                  <p className="text-gray-600">{t('common.join_us_to_start')}</p>
                </div>

                <ModernInput
                  name="fullName"
                  placeholder={t('common.full_name')}
                  value={signUpForm.fullName}
                  onChange={handleSignUpChange}
                  error={signUpErrors.fullName}
                  icon={<FaUser />}
                />

                <ModernInput
                  name="email"
                  type="email"
                  placeholder={t('common.email')}
                  value={signUpForm.email}
                  onChange={handleSignUpChange}
                  error={signUpErrors.email}
                  icon={<FaEnvelope />}
                />

                <ModernInput
                  name="phoneNumber"
                  type="tel"
                  placeholder={t('common.phone_number')}
                  value={signUpForm.phoneNumber}
                  onChange={handleSignUpChange}
                  error={signUpErrors.phoneNumber}
                  icon={<FaUser />}
                />

                <ModernInput
                  name="password"
                  type="password"
                  placeholder={t('common.password')}
                  value={signUpForm.password}
                  onChange={handleSignUpChange}
                  error={signUpErrors.password}
                  icon={<FaLock />}
                />

                <ModernInput
                  name="confirmPassword"
                  type="password"
                  placeholder={t('common.confirm_password')}
                  value={signUpForm.confirmPassword}
                  onChange={handleSignUpChange}
                  error={signUpErrors.confirmPassword}
                  icon={<FaShieldAlt />}
                />

                <div className="flex items-start">
                  <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-1" />
                  <span className="ml-2 text-sm text-gray-600">
                    {t('common.i_agree_to')} <a href="#" className="text-purple-700 hover:text-purple-900 font-medium">{t('common.terms_conditions')}</a>{t('common.and')}<a href="#" className="text-purple-700 hover:text-purple-900 font-medium">{t('common.privacy_policy')}</a>
                  </span>
                </div>

                <ModernButton
                  text={loading ? t('common.creating_account') : t('common.create_account')}
                  type="submit"
                  disabled={loading}
                />

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">{t('common.or_sign_up_with')}</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  <SocialButton icon={<FaGooglePlusG />} onClick={handleGoogleLogin} />
                  <SocialButton icon={<FaFacebookF />} />
                  <SocialButton icon={<FaGithub />} />
                  <SocialButton icon={<FaLinkedinIn />} />
                </div>
              </form>
            )}
          </div>

          {/* Right Side - Promo Banner */}
          <div className="bg-gradient-to-br from-black via-gray-900 to-purple-950 p-8 lg:p-12 text-white flex flex-col justify-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-800 rounded-full filter blur-3xl opacity-20"></div>

            <div className="relative z-10">
              <div className="mb-8">
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <FaShieldAlt className="text-3xl" />
                </div>
                <h3 className="text-4xl font-bold mb-4">
                  {isLogin ? t('common.new_here') : t('common.already_have_account')}
                </h3>
                <p className="text-purple-200 text-lg leading-relaxed mb-8">
                  {isLogin
                    ? t('common.register_description')
                    : t('common.login_description')}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <Feature text={t('common.secure_payment')} />
                <Feature text={t('common.fast_free_shipping')} />
                <Feature text={t('common.customer_support_24_7')} />
                <Feature text={t('common.exclusive_member_deals')} />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-purple-800">
                <Stat number="10K+" label={t('common.products')} />
                <Stat number="50K+" label={t('common.customers')} />
                <Stat number="4.9★" label={t('common.rating')} />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Forgot Password Modal */}
      <ForgotPasswordModal 
        isOpen={showForgotPassword} 
        onClose={() => setShowForgotPassword(false)} 
      />
    </div>
    </>
  );
}

// Modern Input Component
const ModernInput = ({ type = "text", placeholder, name, value, onChange, error, icon }) => (
  <div className="w-full">
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
        {icon}
      </div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${error
          ? 'border-red-500 focus:ring-red-500'
          : 'border-gray-300 focus:ring-purple-500 focus:border-purple-500'
          }`}
      />
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

// Modern Button Component
const ModernButton = ({ text, onClick, type = "button", disabled }) => (
  <button
    onClick={onClick}
    type={type}
    disabled={disabled}
    className="w-full py-3 bg-gradient-to-r from-black via-gray-900 to-purple-950 hover:from-gray-900 hover:to-purple-900 text-white font-semibold rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
  >
    {text}
  </button>
);

// Social Button Component
const SocialButton = ({ icon, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-purple-500 transition-all text-gray-600 hover:text-purple-700"
  >
    <span className="text-xl">{icon}</span>
  </button>
);

// Feature Component
const Feature = ({ text }) => (
  <div className="flex items-center gap-3">
    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
    <span className="text-purple-100">{text}</span>
  </div>
);

// Stat Component
const Stat = ({ number, label }) => (
  <div className="text-center">
    <div className="text-2xl font-bold text-white mb-1">{number}</div>
    <div className="text-sm text-purple-300">{label}</div>
  </div>
);
// Updated: 2025-10-12T16:06:23.114Z

// Updated: 2025-10-12T16:08:57.087Z
