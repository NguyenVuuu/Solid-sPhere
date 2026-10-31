import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getOrdersByUser } from "../../apis/orderApi";
import OrderDetailModal from "./OrderDetailModal";

const UserOrders = ({ userId }) => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const orderData = await getOrdersByUser(userId);
        setOrders(orderData);
      } catch (err) {
        setError("Không thể tải danh sách đơn hàng");
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const getStatusColor = status => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "PROCESSING":
        return "bg-orange-100 text-orange-700";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-700";
      case "SHIPPED":
        return "bg-purple-100 text-purple-700";
      case "DELIVERED":
        return "bg-green-100 text-green-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      case "RETURNED":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = status => {
    switch (status) {
      case "PENDING":
        return <span>{t("my_order.pending")}</span>;
      case "PROCESSING":
        return <span>{t("my_order.processing")}</span>;
      case "CONFIRMED":
        return <span>{t("my_order.confirmed")}</span>;
      case "SHIPPED":
        return <span>{t("my_order.shipped")}</span>;
      case "DELIVERED":
        return <span>{t("my_order.delivered")}</span>;
      case "CANCELLED":
        return <span>{t("my_order.cancelled")}</span>;
      case "RETURNED":
        return <span>{t("my_order.returned")}</span>;
      default:
        return status;
    }
  };

  const formatPrice = price => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const handleViewOrder = orderId => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrderId(null);
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

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Bạn chưa có đơn hàng nào.</p>
      </div>
    );
  }

  // Nhóm đơn hàng theo trạng thái
  const groupedOrders = orders.reduce((acc, order) => {
    const status = order.status;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(order);
    return acc;
  }, {});

  const renderOrderTable = (orders, title) => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("my_order.order_id")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("my_order.order_date")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("my_order.total_amount")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("my_order.status")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("my_order.actions")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(order.createdDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatPrice(order.totalPrice)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewOrder(order.id)}
                        className="text-blue-600 hover:text-blue-900"
                        title={t("my_order.view_details")}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>

                      <button
                        className="text-green-600 hover:text-green-900"
                        title={t("my_order.download_invoice")}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        <span>{t("my_order.your_orders")}</span>
      </h2>

      {/* Đơn hàng chờ xử lý */}
      {groupedOrders.PENDING &&
        groupedOrders.PENDING.length > 0 &&
        renderOrderTable(
          groupedOrders.PENDING,
          <span>{t("my_order.pending")}</span>
        )}

      {/* Đơn hàng đang xử lý */}
      {groupedOrders.PROCESSING &&
        groupedOrders.PROCESSING.length > 0 &&
        renderOrderTable(
          groupedOrders.PROCESSING,
          <span>{t("my_order.processing")}</span>
        )}

      {/* Đơn hàng đang xử lý */}
      {groupedOrders.CONFIRMED &&
        groupedOrders.CONFIRMED.length > 0 &&
        renderOrderTable(
          groupedOrders.CONFIRMED,
          <span>{t("my_order.confirmed")}</span>
        )}

      {/* Đơn hàng đang giao */}
      {groupedOrders.SHIPPED &&
        groupedOrders.SHIPPED.length > 0 &&
        renderOrderTable(
          groupedOrders.SHIPPED,
          <span>{t("my_order.shipped")}</span>
        )}

      {/* Đơn hàng đã giao */}
      {groupedOrders.DELIVERED &&
        groupedOrders.DELIVERED.length > 0 &&
        renderOrderTable(
          groupedOrders.DELIVERED,
          <span>{t("my_order.delivered")}</span>
        )}

      {/* Đơn hàng đã hủy */}
      {groupedOrders.CANCELLED &&
        groupedOrders.CANCELLED.length > 0 &&
        renderOrderTable(
          groupedOrders.CANCELLED,
          <span>{t("my_order.cancelled")}</span>
        )}

      {/* Đơn hàng đã trả */}
      {groupedOrders.RETURNED &&
        groupedOrders.RETURNED.length > 0 &&
        renderOrderTable(
          groupedOrders.RETURNED,
          <span>{t("my_order.returned")}</span>
        )}

      {/* Modal chi tiết đơn hàng */}
      <OrderDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        orderId={selectedOrderId}
      />
    </div>
  );
};

export default UserOrders;
