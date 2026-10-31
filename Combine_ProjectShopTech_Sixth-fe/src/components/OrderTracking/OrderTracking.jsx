import { useState, useEffect } from "react";
import {
  updateOrderStatus,
  getCustomerShippedOrders,
} from "../../apis/orderApi";
import {
  FaTruck,
  FaClock,
  FaMapMarkerAlt,
  FaBox,
  FaCheckCircle,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

const OrderTracking = ({ userId, onNavigateToTracking }) => {
  const { t } = useTranslation();

  const [shippedOrders, setShippedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timers, setTimers] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [expiredOrderId, setExpiredOrderId] = useState(null);
  const [notifiedOrders, setNotifiedOrders] = useState(new Set());

  // Fetch đơn hàng đang giao (SHIPPED) từ API mới
  useEffect(() => {
    const fetchShippedOrders = async () => {
      try {
        setLoading(true);

        // Sử dụng API tracking mới
        const response = await getCustomerShippedOrders(userId);

        if (response.EC === 1) {
          const ordersData = response.DT || [];
          setShippedOrders(ordersData);

          // Khởi tạo timers cho mỗi đơn hàng dựa trên shippedDate từ backend
          const initialTimers = {};

          ordersData.forEach(order => {
            // Chỉ tạo timer nếu có shippedDate từ Backend
            if (order.shippedDate) {
              const deliveryDate = new Date(order.shippedDate);
              const now = new Date();
              const remainingTime = Math.max(0, deliveryDate - now);
              initialTimers[order.orderId] = remainingTime;
            }
            // Nếu không có shippedDate, không tạo timer (sẽ hiển thị thông báo chờ)
          });

          setTimers(initialTimers);
        } else {
          setError(response.EM || "Không thể tải danh sách đơn hàng");
        }
      } catch (err) {
        setError("Không thể tải danh sách đơn hàng: " + err.message);
        console.error("Error fetching shipped orders:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchShippedOrders();
    }
  }, [userId]);

  // Cập nhật bộ đếm thời gian mỗi giây
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prevTimers => {
        const newTimers = { ...prevTimers };

        Object.keys(newTimers).forEach(orderId => {
          if (newTimers[orderId] > 0) {
            newTimers[orderId] -= 1000; // Giảm 1 giây
          } else if (newTimers[orderId] <= 0 && !notifiedOrders.has(orderId)) {
            // Hiển thị thông báo khi hết thời gian (chỉ 1 lần)
            setExpiredOrderId(orderId);
            setShowNotification(true);
            setNotifiedOrders(prev => new Set([...prev, orderId]));
          }
        });

        return newTimers;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [notifiedOrders]);

  // Refresh data từ Backend mỗi 30 giây để đảm bảo có dữ liệu mới nhất
  useEffect(() => {
    if (!userId) return;

    const refreshInterval = setInterval(async () => {
      try {
        const response = await getCustomerShippedOrders(userId);
        if (response.EC === 1) {
          const ordersData = response.DT || [];
          setShippedOrders(ordersData);

          // Cập nhật lại timers với dữ liệu mới từ Backend
          setTimers(prevTimers => {
            const newTimers = {};

            ordersData.forEach(order => {
              // Chỉ tạo timer nếu có shippedDate
              if (order.shippedDate) {
                const deliveryDate = new Date(order.shippedDate);
                const now = new Date();
                const remainingTime = Math.max(0, deliveryDate - now);
                newTimers[order.orderId] = remainingTime;
              }
            });

            return newTimers;
          });
        }
      } catch (err) {
        console.error("Error refreshing orders:", err);
      }
    }, 30000); // 30 giây

    return () => clearInterval(refreshInterval);
  }, [userId]);

  // Format thời gian còn lại - Hiển thị tổng số giờ (không giới hạn 24h)
  const formatTime = milliseconds => {
    if (milliseconds <= 0) return "00:00:00";

    const totalSeconds = Math.floor(milliseconds / 1000);
    const totalHours = Math.floor(totalSeconds / 3600); // Tổng số giờ (có thể > 24)
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Hiển thị tổng số giờ, không chia thành ngày
    return `${String(totalHours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  // Format thời gian còn lại dạng text (ví dụ: "3 ngày 5 giờ")
  const formatTimeText = milliseconds => {
    if (milliseconds <= 0) return "Đã đến giờ giao hàng";

    const totalSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const parts = [];
    if (days > 0) parts.push(`${days} ${t("my_tracking.days")}`);
    if (hours > 0) parts.push(`${hours} ${t("my_tracking.hours")}`);
    if (minutes > 0 && days === 0)
      parts.push(`${minutes} ${t("my_tracking.minutes")}`); // Chỉ hiển thị phút nếu < 1 ngày

    return parts.length > 0
      ? parts.join(" ")
      : // "Dưới 1 phút"
        t("my_tracking.under_1_minute");
  };

  // Xử lý khi nhấn nút "Đã nhận hàng"
  const handleConfirmReceived = async orderId => {
    try {
      await updateOrderStatus(orderId, "DELIVERED");

      // Cập nhật lại danh sách đơn hàng
      setShippedOrders(prev => prev.filter(order => order.orderId !== orderId));

      // Xóa timer
      setTimers(prev => {
        const newTimers = { ...prev };
        delete newTimers[orderId];
        return newTimers;
      });

      alert("Đã xác nhận nhận hàng thành công!");
    } catch (err) {
      console.error("Error updating order status:", err);
      alert("Có lỗi xảy ra khi xác nhận nhận hàng");
    }
  };

  // Format giá tiền
  const formatPrice = price => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Format ngày
  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2">Đang tải...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (shippedOrders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          {/* Bạn không có đơn hàng nào đang giao. */}
          {t("my_tracking.no_orders")}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FaTruck className="text-green-500" />
        {/* Theo dõi đơn hàng đang giao */}
        {t("my_tracking.your_orders")}
      </h2>

      <div className="space-y-4">
        {shippedOrders.map(order => {
          const remainingTime = timers[order.orderId] || 0;
          const isExpired = remainingTime <= 0;

          return (
            <div
              key={order.orderId}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <FaBox className="text-blue-500" />
                    {t("my_tracking.order")} #{order.orderId}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    📅 {t("my_tracking.order_date")}:{" "}
                    {formatDate(order.createdDate)}
                  </p>
                  {order.shippedDate && (
                    <p className="text-sm text-green-600 mt-1 font-medium">
                      🎯
                      {/* Dự kiến giao: */}
                      {t("my_tracking.expected_delivery_time")}
                      {": "}
                      {new Date(order.shippedDate).toLocaleString("vi-VN")}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    {formatPrice(order.totalPrice)}
                  </p>
                  <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 mt-1">
                    <FaTruck className="mr-1" />
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Tracking Status */}
              {order.trackingStatus && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <p className="text-blue-900 font-semibold text-sm flex items-center gap-2">
                    <FaCheckCircle className="text-blue-600" />
                    {order.trackingStatus}
                  </p>
                  {order.shippedDate && (
                    <p className="text-blue-700 text-xs mt-1">
                      ⏰ Thời gian giao dự kiến:
                      {new Date(order.shippedDate).toLocaleString("vi-VN", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  )}
                </div>
              )}

              {/* Delivery Address */}
              <div className="flex items-start gap-2 mb-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <FaMapMarkerAlt className="text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">
                    {t("my_tracking.delivery_address")}:
                  </p>
                  <p>{order.deliveryAddress}</p>
                </div>
              </div>

              {/* Notes */}
              {order.notes && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-gray-700">
                  <span className="font-semibold">
                    📝
                    {t("my_tracking.notes")}:
                  </span>{" "}
                  {order.notes}
                </div>
              )}

              {/* Order Items Summary */}
              {order.totalItems && (
                <div className="mb-4 text-sm text-gray-600">
                  <span className="font-medium">
                    {t("my_tracking.total_items")}
                  </span>{" "}
                  {order.totalItems} {t("my_tracking.items")}
                </div>
              )}

              {/* Countdown Timer hoặc Thông Báo Chờ */}
              {order.shippedDate ? (
                // Có shippedDate → Hiển thị countdown
                <div className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center space-x-4">
                    <FaClock
                      className={`text-3xl ${
                        isExpired ? "text-red-500" : "text-blue-500"
                      }`}
                    />
                    <div>
                      <p className="text-sm text-gray-600 mb-1 font-medium">
                        {isExpired
                          ? // "Đã đến thời gian giao hàng dự kiến!"
                            t("my_tracking.reached_delivery_time")
                          : //  "Thời gian đến khi giao hàng"
                            t("my_tracking.time_to_delivery")}
                      </p>

                      {/* Countdown dạng số */}
                      <p
                        className={`text-3xl font-mono font-bold ${
                          isExpired
                            ? "text-red-600 animate-pulse"
                            : "text-blue-600"
                        }`}
                      >
                        {formatTime(remainingTime)}
                      </p>

                      {/* Countdown dạng text dễ đọc */}
                      {!isExpired && (
                        <p className="text-sm text-gray-600 mt-1">
                          ≈ {formatTimeText(remainingTime)}
                        </p>
                      )}

                      {/* Thời gian giao dự kiến */}
                      {!isExpired && (
                        <p className="text-xs text-gray-500 mt-1">
                          🎯
                          {/* Giao lúc: */}
                          {t("my_tracking.expected_delivery_time")}
                          {": "}
                          {new Date(order.shippedDate).toLocaleString("vi-VN", {
                            weekday: "short",
                            day: "2-digit",
                            month: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleConfirmReceived(order.orderId)}
                    disabled={!isExpired}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                      isExpired
                        ? "bg-green-500 hover:bg-green-600 text-white cursor-pointer shadow-md hover:shadow-lg"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    title={
                      isExpired
                        ? // "Click để xác nhận đã nhận hàng"
                          t("my_tracking.click_confirm_received")
                        : // "Chỉ có thể xác nhận khi đã đến thời gian giao hàng dự kiến"
                          t("my_tracking.can_confirm_when_time_up")
                    }
                  >
                    <FaCheckCircle />
                    {/* Đã nhận hàng */}
                    {t("my_tracking.confirm_received")}
                  </button>
                </div>
              ) : (
                // Chưa có shippedDate → Hiển thị thông báo
                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                        <FaClock className="text-white text-xl" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-yellow-900 mb-2">
                        {/* Đang chờ cập nhật thời gian giao hàng */}
                        {t("my_tracking.waiting_for_update")}
                      </h4>

                      <div className="flex items-center gap-2 text-xs text-yellow-700">
                        <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                        <span>
                          {/* Vui lòng kiểm tra lại sau */}
                          {t("my_tracking.check_again")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal thông báo khi hết thời gian */}
      {showNotification && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>

          <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Đơn hàng đã đến!
              </h3>
              <p className="text-gray-600 mb-6">
                Đơn hàng #{expiredOrderId} đã đến thời gian giao hàng dự kiến.
                Vui lòng xác nhận đã nhận hàng.
              </p>
              <button
                onClick={() => setShowNotification(false)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
