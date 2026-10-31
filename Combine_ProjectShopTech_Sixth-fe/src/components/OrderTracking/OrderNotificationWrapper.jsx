import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getOrdersByUser } from "../../apis/orderApi";
import path from "../../constant/path";

/**
 * Component wrapper để theo dõi đơn hàng đang giao và hiển thị thông báo
 * Có thể được đặt ở bất kỳ đâu trong ứng dụng (ví dụ: Layout chính)
 */
const OrderNotificationWrapper = ({ userId }) => {
  const navigate = useNavigate();
  const [timers, setTimers] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [expiredOrderId, setExpiredOrderId] = useState(null);
  const [notifiedOrders, setNotifiedOrders] = useState(new Set());

  // Fetch đơn hàng đang giao và khởi tạo timers
  useEffect(() => {
    const fetchShippedOrders = async () => {
      if (!userId) return;

      try {
        const allOrders = await getOrdersByUser(userId);
        const shipped = allOrders.filter(order => order.status === "SHIPPED");

        // Lấy delivery dates đã lưu từ localStorage
        const savedDeliveryDates = JSON.parse(
          localStorage.getItem("orderDeliveryDates") || "{}"
        );

        const initialTimers = {};
        const newDeliveryDates = { ...savedDeliveryDates };

        shipped.forEach(order => {
          let deliveryDate;

          // Nếu đã có delivery date được lưu, sử dụng nó
          if (savedDeliveryDates[order.id]) {
            deliveryDate = new Date(savedDeliveryDates[order.id]);
          } else {
            // Tạo thời gian giao hàng ngẫu nhiên từ ngày hiện tại + 1-5 ngày
            const randomDays = Math.floor(Math.random() * 5) + 1;
            const now = new Date();
            deliveryDate = new Date(now);
            deliveryDate.setDate(deliveryDate.getDate() + randomDays);

            // Lưu delivery date mới
            newDeliveryDates[order.id] = deliveryDate.toISOString();
          }

          const now = new Date();
          const remainingTime = Math.max(0, deliveryDate - now);

          initialTimers[order.id] = remainingTime;
        });

        // Lưu delivery dates vào localStorage
        localStorage.setItem(
          "orderDeliveryDates",
          JSON.stringify(newDeliveryDates)
        );
        setTimers(initialTimers);
      } catch (err) {
        console.error("Error fetching shipped orders:", err);
      }
    };

    fetchShippedOrders();

    // Refresh mỗi 5 phút để cập nhật danh sách đơn hàng
    const refreshInterval = setInterval(fetchShippedOrders, 5 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, [userId]);

  // Cập nhật bộ đếm thời gian
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prevTimers => {
        const newTimers = { ...prevTimers };

        Object.keys(newTimers).forEach(orderId => {
          if (newTimers[orderId] > 0) {
            newTimers[orderId] -= 1000;
          } else if (newTimers[orderId] <= 0 && !notifiedOrders.has(orderId)) {
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

  const handleNavigateToTracking = () => {
    setShowNotification(false);
    navigate(path.profile + "?tab=order-tracking");
  };

  if (!showNotification) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg
              className="h-8 w-8 text-green-600"
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
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            🎉 Đơn hàng đã đến!
          </h3>
          <p className="text-gray-600 mb-6">
            Đơn hàng <span className="font-semibold">#{expiredOrderId}</span> đã
            đến thời gian giao hàng dự kiến.
            <br />
            Vui lòng kiểm tra và xác nhận đã nhận hàng.
          </p>
          <div className="space-y-3">
            <button
              onClick={handleNavigateToTracking}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Đi đến theo dõi đơn hàng
            </button>
            <button
              onClick={() => setShowNotification(false)}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Để sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderNotificationWrapper;
