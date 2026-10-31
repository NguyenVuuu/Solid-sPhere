import React, { useState, useEffect } from "react";
import {
  updateShippedDate,
  getShippedOrders,
} from "../../services/orderService";

const UpdateShippedDate = () => {
  const [shippedOrders, setShippedOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [shippedDate, setShippedDate] = useState("");

  useEffect(() => {
    fetchShippedOrders();
  }, []);

  const fetchShippedOrders = async () => {
    try {
      setLoading(true);
      const response = await getShippedOrders();
      if (response.EC === 1) {
        setShippedOrders(response.DT);
      }
    } catch (error) {
      console.error("Error fetching shipped orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateShippedDate = async () => {
    if (!selectedOrder || !shippedDate) {
      alert("Vui lòng chọn đơn hàng và thời gian giao hàng");
      return;
    }

    try {
      const response = await updateShippedDate({
        orderId: selectedOrder.id,
        shippedDate: new Date(shippedDate).toISOString(),
      });

      if (response.EC === 1) {
        alert("Cập nhật thời gian giao hàng thành công!");
        fetchShippedOrders(); // Refresh danh sách
        setSelectedOrder(null);
        setShippedDate("");
      } else {
        alert("Lỗi: " + response.EM);
      }
    } catch (error) {
      console.error("Error updating shipped date:", error);
      alert("Có lỗi xảy ra khi cập nhật");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Cập nhật thời gian giao hàng</h2>

      {loading ? (
        <div>Đang tải...</div>
      ) : (
        <div className="space-y-6">
          {/* Danh sách đơn hàng SHIPPED */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Đơn hàng đang giao</h3>
            <div className="grid gap-4">
              {shippedOrders.map(order => (
                <div
                  key={order.id}
                  className={`p-4 border rounded-lg cursor-pointer ${
                    selectedOrder?.id === order.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">Đơn hàng #{order.id}</p>
                      <p className="text-sm text-gray-600">
                        Ngày tạo:{" "}
                        {new Date(order.createdDate).toLocaleDateString(
                          "vi-VN"
                        )}
                      </p>
                      <p className="text-sm text-gray-600">
                        Địa chỉ: {order.deliveryAddress}
                      </p>
                      {order.shippedDate && (
                        <p className="text-sm text-green-600">
                          Thời gian giao:{" "}
                          {new Date(order.shippedDate).toLocaleString("vi-VN")}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        {order.totalPrice?.toLocaleString("vi-VN")} VND
                      </p>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form cập nhật thời gian */}
          {selectedOrder && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-4">
                Cập nhật thời gian giao hàng cho đơn #{selectedOrder.id}
              </h4>
              <div className="flex gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Thời gian giao hàng dự kiến
                  </label>
                  <input
                    type="datetime-local"
                    value={shippedDate}
                    onChange={e => setShippedDate(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2"
                    min={new Date().toISOString().slice(0, 16)}
                  />
                </div>
                <button
                  onClick={handleUpdateShippedDate}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Cập nhật
                </button>
                <button
                  onClick={() => {
                    setSelectedOrder(null);
                    setShippedDate("");
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Hủy
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UpdateShippedDate;
