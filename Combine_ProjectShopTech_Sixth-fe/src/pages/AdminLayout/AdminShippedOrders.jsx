import { useState, useEffect } from "react";
import { getShippedOrders, updateShippedDate } from "../../apis/orderApi";
import {
  FaTruck,
  FaCalendarAlt,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { toast } from "react-toastify";

const AdminShippedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState({
    shippedDate: "",
    notes: "",
  });

  useEffect(() => {
    fetchShippedOrders();
  }, []);

  const fetchShippedOrders = async () => {
    try {
      setLoading(true);
      const response = await getShippedOrders();

      if (response.EC === 1) {
        setOrders(response.DT || []);
      } else {
        toast.error(response.EM || "Failed to load shipped orders");
      }
    } catch (error) {
      console.error("Error fetching shipped orders:", error);
      toast.error("Failed to load shipped orders");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = order => {
    setEditingOrder(order.id);
    setFormData({
      shippedDate: order.shippedDate
        ? new Date(order.shippedDate).toISOString().slice(0, 16)
        : new Date().toISOString().slice(0, 16),
      notes: order.notes || "",
    });
  };

  const handleCancel = () => {
    setEditingOrder(null);
    setFormData({ shippedDate: "", notes: "" });
  };

  const handleSave = async orderId => {
    try {
      const updateData = {
        orderId: orderId,
        shippedDate: formData.shippedDate,
        notes: formData.notes,
      };

      const response = await updateShippedDate(updateData);

      if (response.EC === 1) {
        toast.success("Đã cập nhật thời gian giao hàng dự kiến!");
        setEditingOrder(null);
        fetchShippedOrders(); // Refresh list
      } else {
        toast.error(response.EM || "Không thể cập nhật thời gian giao hàng");
      }
    } catch (error) {
      console.error("Error updating shipped date:", error);
      toast.error("Failed to update shipped date");
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-900 text-gray-200 min-h-screen">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading shipped orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 text-gray-200 min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <FaTruck className="text-green-500" />
          Shipped Orders Management
        </h2>
        <p className="text-gray-400 mt-2">
          Update shipping dates and tracking information for orders in transit
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-12 text-center">
          <FaTruck className="text-gray-600 text-6xl mx-auto mb-4" />
          <p className="text-xl text-gray-400">No shipped orders found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map(order => (
            <div
              key={order.id}
              className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-400">Order ID</p>
                    <p className="text-xl font-semibold text-white">
                      #{order.id}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-green-900 text-green-300 rounded-full text-xs font-medium">
                      {order.status}
                    </span>
                    {editingOrder !== order.id && (
                      <button
                        onClick={() => handleEdit(order)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                        title="Edit shipping date"
                      >
                        <FaEdit />
                      </button>
                    )}
                  </div>
                </div>

                {/* Order Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-b border-gray-700">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Customer ID</p>
                    <p className="text-sm font-medium text-white">
                      {order.userId}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Order Date</p>
                    <p className="text-sm font-medium text-white">
                      {new Date(order.createdDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Total Amount</p>
                    <p className="text-sm font-medium text-white">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(order.totalPrice)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Payment Method</p>
                    <p className="text-sm font-medium text-white">
                      {order.paymentMethod}
                    </p>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="mb-4">
                  <p className="text-xs text-gray-400 mb-1">Delivery Address</p>
                  <p className="text-sm text-white">{order.deliveryAddress}</p>
                </div>

                {/* Edit Form or Display Info */}
                {editingOrder === order.id ? (
                  <div className="bg-gray-700 rounded-lg p-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <FaCalendarAlt className="inline mr-2" />
                        Thời Gian Dự Kiến Giao Hàng
                      </label>
                      <input
                        type="datetime-local"
                        value={formData.shippedDate}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            shippedDate: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        💡 Thời gian dự kiến giao hàng đến tay khách hàng
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Notes (Optional)
                      </label>
                      <textarea
                        // readOnly
                        disabled
                        value={formData.notes}
                        onChange={e =>
                          setFormData({ ...formData, notes: e.target.value })
                        }
                        placeholder="Add tracking notes or delivery instructions..."
                        rows="3"
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white cursor-not-allowed"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleSave(order.id)}
                        className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition flex items-center justify-center gap-2"
                      >
                        <FaSave />
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition flex items-center justify-center gap-2"
                      >
                        <FaTimes />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {order.shippedDate && (
                      <div className="flex items-center gap-2 text-sm">
                        <FaCalendarAlt className="text-green-400" />
                        <span className="text-gray-400">Dự kiến giao:</span>
                        <span className="text-white font-medium">
                          {new Date(order.shippedDate).toLocaleString("vi-VN", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    )}
                    {order.notes && (
                      <div className="p-3 bg-gray-700 rounded-lg text-sm text-gray-300">
                        <span className="font-semibold text-white">
                          Ghi chú:
                        </span>{" "}
                        {order.notes}
                      </div>
                    )}
                    {/* {!order.shippedDate && (
                      <div className="p-3 bg-yellow-900 border border-yellow-700 rounded-lg text-sm text-yellow-200">
                        ⚠️ Chưa cập nhật thời gian giao hàng dự kiến. Click edit để thêm.
                      </div>
                    )} */}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminShippedOrders;
