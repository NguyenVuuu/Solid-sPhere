import React, { memo, useState, useEffect } from 'react';
import { ImageOff, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// OrderTable - Displays a list of orders with search and status update functionality
const OrderTable = memo(({ orders = [], theme = 'dark', updateOrderStatus, getOrderById }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [localOrders, setLocalOrders] = useState(orders); // State nội bộ
  const [customerNames, setCustomerNames] = useState({}); // Store customer names by userId

  // Đồng bộ localOrders với orders từ props khi orders thay đổi
  useEffect(() => {
    setLocalOrders(orders);
  }, [orders]);

  // Fetch customer names when orders change
  useEffect(() => {
    const fetchCustomerNames = async () => {
      const uniqueUserIds = [...new Set(orders.map(order => order.userId).filter(Boolean))];
      const names = {};
      
      for (const userId of uniqueUserIds) {
        try {
          const response = await fetch(`/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
          });
          if (response.ok) {
            const userData = await response.json();
            names[userId] = userData.fullName || userData.name || 'Unknown';
          }
        } catch (error) {
          console.log(`Error fetching user ${userId}:`, error);
          names[userId] = 'Unknown';
        }
      }
      
      setCustomerNames(names);
    };

    if (orders.length > 0) {
      fetchCustomerNames();
    }
  }, [orders]);
console.log('OrderTable - orders data:', orders);
console.log('OrderTable - getOrderById:', getOrderById);
console.log('OrderTable - first order status:', orders[0]?.status);
console.log('OrderTable - all order statuses:', orders.map(order => ({ id: order.id, status: order.status })));

  // Filter orders based on search term
  const filteredOrders = searchTerm.trim() === ''
    ? localOrders
    : localOrders.filter((order) =>
        (order.id?.toString() || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.status || '').toLowerCase().includes(searchTerm.toLowerCase())
      );

  // Define theme-based classes
  const themeClasses = {
    dark: {
      container: 'bg-gray-900 text-gray-200',
      table: 'bg-gray-800 border-gray-700',
      tableHeader: 'bg-gray-900 text-gray-300',
      tableRow: 'hover:bg-gray-700 text-gray-200',
      secondaryText: 'text-gray-400',
      input: 'bg-gray-800 border-gray-600 text-gray-200 focus:ring-blue-500',
      emptyState: 'text-gray-400',
      select: 'bg-gray-800 border-gray-600 text-gray-200 focus:ring-blue-500',
    },
    light: {
      container: 'bg-white text-gray-800',
      table: 'bg-white border-gray-300',
      tableHeader: 'bg-gray-200 text-gray-700',
      tableRow: 'hover:bg-gray-200 text-gray-800',
      secondaryText: 'text-gray-600',
      input: 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400',
      emptyState: 'text-gray-500',
      select: 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400',
    },
  };

  const currentTheme = themeClasses[theme] || themeClasses.dark;

  // Determine color for status
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-indigo-100 text-indigo-800';
      case 'shipped':
        return 'bg-green-100 text-green-800';
      case 'delivered':
        return 'bg-purple-100 text-purple-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'returned':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format the order date to DD/MM/YYYY
  const formatOrderDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Handle status change
  const handleStatusChange = async (orderId, newStatus) => {
    if (!orderId) {
      console.error('Order ID is undefined');
      alert('Không thể cập nhật trạng thái: Order ID không hợp lệ.');
      return;
    }

    // Lưu trạng thái hiện tại để rollback nếu cần
    const previousOrders = [...localOrders];

    // Optimistic update: Cập nhật giao diện ngay lập tức
    setLocalOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );

    if (updateOrderStatus) {
      try {
        // Gọi API để cập nhật
        await updateOrderStatus(orderId, newStatus);
        // Sau khi API thành công, không cần làm gì thêm vì useEffect sẽ đồng bộ với orders từ props
      } catch (error) {
        console.error(`Failed to update order ${orderId}:`, error);
        alert('Cập nhật trạng thái thất bại. Vui lòng thử lại.');
        // Rollback giao diện về trạng thái trước đó
        setLocalOrders(previousOrders);
      }
    }
  };

  return (
    <div className={`p-6 ${currentTheme.container}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">{t('admin.danh_sch_n_hng')}</h2>
        <div className="relative w-64">
          <input
            type="text"
            placeholder={t('admin.tm_kim_n_hng')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${currentTheme.input}`}
          />
          <Search
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${currentTheme.secondaryText}`}
            size={20}
          />
        </div>
      </div>

      {localOrders.length === 0 && (
        <div className={`flex justify-center items-center h-64 ${currentTheme.emptyState}`}>
          <ImageOff className="mr-2" size={24} />
          <span>{t('admin.khng_tm_thy_n')}</span>
        </div>
      )}

      {localOrders.length > 0 && filteredOrders.length === 0 && (
        <div className={`flex justify-center items-center h-64 ${currentTheme.emptyState}`}>
          <ImageOff className="mr-2" size={24} />
          <span>{t('remaining.khong_tim_thay_don_hang_phu_hop')}</span>
        </div>
      )}

      {localOrders.length > 0 && filteredOrders.length > 0 && (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className={`min-w-full border ${currentTheme.table}`}>
            <thead className={currentTheme.tableHeader}>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">{t('admin.order_id')}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">{t('admin.customer_id')}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Customer Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">{t('admin.voucher_id')}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">{t('admin.order_date')}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">{t('admin.total_amount')}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">{t('admin.status')}</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-300'}`}>
              {filteredOrders.map((order, index) => (
                <tr
                  key={order.id || `order-${index}`}
                  className={`transition-colors duration-150 ${currentTheme.tableRow}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    #{order.id || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {order.userId || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {customerNames[order.userId] || order.customerName || order.userName || 'Loading...'}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${currentTheme.secondaryText}`}>
                    No Use
                  </td>
                  <td className={`px-6 py-4 text-sm ${currentTheme.secondaryText}`}>
                    {formatOrderDate(order.createdDate)}
                  </td>
                  <td className={`px-6 py-4 text-sm ${currentTheme.secondaryText}`}>
                    {order.totalPrice != null
                      ? new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(order.totalPrice)
                      : '0.00'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <select
                      value={order.status || 'PENDING'}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`px-2 py-1 text-xs rounded-full border focus:outline-none focus:ring-2 ${currentTheme.select} ${getStatusColor(order.status)}`}
                    >
                      {['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURNED'].map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                      <option value="">-- Select Status --</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
});

export default OrderTable;
// Updated: 2025-10-12T16:06:41.992Z

// Updated: 2025-10-12T16:09:03.270Z
