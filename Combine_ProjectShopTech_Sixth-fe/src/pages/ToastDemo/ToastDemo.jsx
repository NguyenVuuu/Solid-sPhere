import { useTranslation } from 'react-i18next';
import { useToast } from '../../components/Toast';
import { FaBell, FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa';

const ToastDemo = () => {
  const { t } = useTranslation();

  const { showSuccess, showError, showWarning, showInfo } = useToast();

  const handleShowSuccess = () => {
    showSuccess('🎉 Thao tác thành công! Dữ liệu đã được lưu.', 5000, 'top-right');
  };

  const handleShowError = () => {
    showError('❌ Lỗi xảy ra! Vui lòng thử lại sau.', 5000, 'top-right');
  };

  const handleShowWarning = () => {
    showWarning('⚠️ Cảnh báo! Bạn có chắc muốn tiếp tục?', 5000, 'top-right');
  };

  const handleShowInfo = () => {
    showInfo('💡 Thông tin: Hệ thống sẽ bảo trì vào 2h sáng.', 5000, 'top-right');
  };

  // Different Positions
  const handleTopLeft = () => {
    showSuccess('📍 Toast ở Top Left', 3000, 'top-left');
  };

  const handleTopCenter = () => {
    showInfo('📍 Toast ở Top Center', 3000, 'top-center');
  };

  const handleBottomRight = () => {
    showWarning('📍 Toast ở Bottom Right', 3000, 'bottom-right');
  };

  const handleBottomLeft = () => {
    showError('📍 Toast ở Bottom Left', 3000, 'bottom-left');
  };

  const handleBottomCenter = () => {
    showSuccess('📍 Toast ở Bottom Center', 3000, 'bottom-center');
  };

  // Multiple Toasts
  const handleMultiple = () => {
    showSuccess('✅ Đơn hàng #1234 đã được tạo', 4000, 'top-right');
    setTimeout(() => {
      showInfo('📦 Đang chuẩn bị gói hàng...', 4000, 'top-right');
    }, 500);
    setTimeout(() => {
      showWarning('🚚 Chờ shipper nhận hàng', 4000, 'top-right');
    }, 1000);
    setTimeout(() => {
      showSuccess('🎉 Giao hàng thành công!', 4000, 'top-right');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ top: '10%', left: '10%' }}></div>
        <div className="absolute w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse" style={{ bottom: '10%', right: '10%', animationDelay: '1s' }}></div>
        <div className="absolute w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" style={{ top: '50%', left: '50%', animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 p-6 rounded-3xl">
              <FaBell className="text-white text-6xl animate-bounce" />
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
            Toast Notification 2025
          </h1>
          <p className="text-purple-200 text-xl font-semibold">
            ✨ Glassmorphism • 🎨 Animated Gradients • 💫 Micro-interactions
          </p>
        </div>

        {/* Toast Types */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 mb-8">
          <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-3">
            <div className="w-2 h-10 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
            Toast Types
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <button
              onClick={handleShowSuccess}
              className="group relative bg-gradient-to-br from-emerald-500/20 to-green-600/20 backdrop-blur-sm border-2 border-emerald-400/50 rounded-2xl p-8 hover:shadow-2xl hover:scale-110 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/0 via-green-500/20 to-emerald-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <FaCheckCircle className="text-5xl text-emerald-400 mb-4 mx-auto group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" />
                <h3 className="font-black text-emerald-300 mb-2 text-xl">Success</h3>
                <p className="text-sm text-emerald-200/80">✨ Show success toast</p>
              </div>
            </button>

            <button
              onClick={handleShowError}
              className="group relative bg-gradient-to-br from-rose-500/20 to-red-600/20 backdrop-blur-sm border-2 border-rose-400/50 rounded-2xl p-8 hover:shadow-2xl hover:scale-110 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-400/0 via-red-500/20 to-rose-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <FaTimesCircle className="text-5xl text-rose-400 mb-4 mx-auto group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" />
                <h3 className="font-black text-rose-300 mb-2 text-xl">Error</h3>
                <p className="text-sm text-rose-200/80">⚠️ Show error toast</p>
              </div>
            </button>

            <button
              onClick={handleShowWarning}
              className="group relative bg-gradient-to-br from-amber-500/20 to-orange-600/20 backdrop-blur-sm border-2 border-amber-400/50 rounded-2xl p-8 hover:shadow-2xl hover:scale-110 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-orange-500/20 to-amber-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <FaExclamationTriangle className="text-5xl text-amber-400 mb-4 mx-auto group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" />
                <h3 className="font-black text-amber-300 mb-2 text-xl">Warning</h3>
                <p className="text-sm text-amber-200/80">💡 Show warning toast</p>
              </div>
            </button>

            <button
              onClick={handleShowInfo}
              className="group relative bg-gradient-to-br from-blue-500/20 to-cyan-600/20 backdrop-blur-sm border-2 border-blue-400/50 rounded-2xl p-8 hover:shadow-2xl hover:scale-110 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 via-cyan-500/20 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <FaInfoCircle className="text-5xl text-blue-400 mb-4 mx-auto group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" />
                <h3 className="font-black text-blue-300 mb-2 text-xl">Info</h3>
                <p className="text-sm text-blue-200/80">🔔 Show info toast</p>
              </div>
            </button>
          </div>
        </div>

        {/* Toast Positions */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 mb-8">
          <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-3">
            <div className="w-2 h-10 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full animate-pulse"></div>
            Toast Positions
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <button
              onClick={handleTopLeft}
              className="bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-sm border-2 border-purple-400/50 rounded-2xl p-5 hover:shadow-2xl hover:scale-110 hover:-translate-y-1 transition-all duration-300 text-white font-bold text-lg"
            >
              📍 Top Left
            </button>

            <button
              onClick={handleTopCenter}
              className="bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-sm border-2 border-purple-400/50 rounded-2xl p-5 hover:shadow-2xl hover:scale-110 hover:-translate-y-1 transition-all duration-300 text-white font-bold text-lg"
            >
              📍 Top Center
            </button>

            <button
              onClick={handleShowSuccess}
              className="bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-sm border-2 border-purple-400/50 rounded-2xl p-5 hover:shadow-2xl hover:scale-110 hover:-translate-y-1 transition-all duration-300 text-white font-bold text-lg"
            >
              📍 Top Right
            </button>

            <button
              onClick={handleBottomLeft}
              className="bg-gradient-to-br from-blue-500/30 to-cyan-500/30 backdrop-blur-sm border-2 border-blue-400/50 rounded-2xl p-5 hover:shadow-2xl hover:scale-110 hover:-translate-y-1 transition-all duration-300 text-white font-bold text-lg"
            >
              📍 Bottom Left
            </button>

            <button
              onClick={handleBottomCenter}
              className="bg-gradient-to-br from-blue-500/30 to-cyan-500/30 backdrop-blur-sm border-2 border-blue-400/50 rounded-2xl p-5 hover:shadow-2xl hover:scale-110 hover:-translate-y-1 transition-all duration-300 text-white font-bold text-lg"
            >
              📍 Bottom Center
            </button>

            <button
              onClick={handleBottomRight}
              className="bg-gradient-to-br from-blue-500/30 to-cyan-500/30 backdrop-blur-sm border-2 border-blue-400/50 rounded-2xl p-5 hover:shadow-2xl hover:scale-110 hover:-translate-y-1 transition-all duration-300 text-white font-bold text-lg"
            >
              📍 Bottom Right
            </button>
          </div>
        </div>

        {/* Special Features */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <div className="w-2 h-8 bg-gradient-to-b from-pink-600 to-red-600 rounded-full"></div>
            Special Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleMultiple}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-lg"
            >
              🚀 Show Multiple Toasts (Order Flow)
            </button>

            <button
              onClick={() => {
                showSuccess('✨ Auto-dismiss sau 5 giây', 5000, 'top-right');
              }}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-lg"
            >
              ⏱️ Auto Dismiss with Progress Bar
            </button>
          </div>
        </div>

        {/* Features List */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-100">
            <div className="text-3xl mb-3">✨</div>
            <h3 className="font-bold text-gray-800 mb-2">Smooth Animations</h3>
            <p className="text-gray-600 text-sm">Slide-in & fade-out với ease-out timing</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-100">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="font-bold text-gray-800 mb-2">Modern Design</h3>
            <p className="text-gray-600 text-sm">Gradient colors, backdrop blur, shadows</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100">
            <div className="text-3xl mb-3">⏱️</div>
            <h3 className="font-bold text-gray-800 mb-2">Progress Bar</h3>
            <p className="text-gray-600 text-sm">Visual countdown trước khi auto-dismiss</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-pink-100">
            <div className="text-3xl mb-3">📍</div>
            <h3 className="font-bold text-gray-800 mb-2">6 Positions</h3>
            <p className="text-gray-600 text-sm">Top/Bottom × Left/Center/Right</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-100">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="font-bold text-gray-800 mb-2">Stack Multiple</h3>
            <p className="text-gray-600 text-sm">Hiển thị nhiều toast cùng lúc</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-cyan-100">
            <div className="text-3xl mb-3">🖱️</div>
            <h3 className="font-bold text-gray-800 mb-2">Click to Dismiss</h3>
            <p className="text-gray-600 text-sm">Đóng nhanh bằng cách click X</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToastDemo;
