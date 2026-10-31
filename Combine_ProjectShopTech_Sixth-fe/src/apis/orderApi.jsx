import axiosInstance from "../custom/axios";

// API tạo đơn hàng
export const createOrder = async orderData => {
  try {
    const res = await axiosInstance.post("/orders", orderData);
    return res.data; // trả về OrderDTO
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

/**
 * API tạo đơn hàng cùng với tất cả order details trong 1 transaction
 * Đảm bảo atomicity: nếu có sản phẩm không đủ hàng, toàn bộ order sẽ rollback
 * @param {Object} orderData - Dữ liệu order và items
 * @param {Object} orderData.order - Thông tin order (userId, deliveryAddress, paymentMethod, etc.)
 * @param {Array} orderData.items - Danh sách sản phẩm (productId, amount, unitPrice)
 * @returns {Promise} OrderDTO
 */
export const createOrderWithDetails = async orderData => {
  try {
    const res = await axiosInstance.post("/orders/with-details", orderData);
    return res.data; // trả về OrderDTO
  } catch (error) {
    console.error("Error creating order with details:", error);
    throw error;
  }
};

// API tạo chi tiết đơn hàng
export const createOrderDetail = async detailData => {
  try {
    const res = await axiosInstance.post("/order-details", detailData);
    return res.data;
  } catch (error) {
    console.error("Error creating order detail:", error);
    throw error;
  }
};

// API cập nhật số lượt chơi cho user sau khi đặt hàng
export const updatePlaysAllowedAfterOrder = async userId => {
  try {
    const res = await axiosInstance.put(`/users/${userId}/add-plays`, {});
    return res.data; // trả về UserDTO with updated numberOfPlaysAllowed
  } catch (error) {
    console.error("Error updating plays allowed:", error);
    throw error;
  }
};

// API lấy thông tin số lượt chơi của user từ backend
export const getPlaysInfo = async userId => {
  try {
    const res = await axiosInstance.get(`/users/${userId}/plays-info`);
    return res.data; // trả về UserDTO with numberOfPlaysAllowed and numberOfGamesPlayed
  } catch (error) {
    console.error("Error fetching plays info:", error);
    throw error;
  }
};

// API trừ 1 lượt chơi khi user bắt đầu chơi game
export const decrementPlayCount = async userId => {
  try {
    const res = await axiosInstance.put(`/users/${userId}/decrement-play`, {});
    return res.data; // trả về UserDTO with updated numberOfPlaysAllowed
  } catch (error) {
    console.error("Error decrementing play count:", error);
    throw error;
  }
};

export const deleteOrder = async orderId => {
  try {
    const res = await axiosInstance.delete(`/orders/${orderId}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};

// API lấy danh sách đơn hàng theo user
export const getOrdersByUser = async userId => {
  try {
    const res = await axiosInstance.get(`/orders/user/${userId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
};

// API lấy chi tiết đơn hàng
export const getOrderById = async orderId => {
  try {
    const res = await axiosInstance.get(`/orders/${orderId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};

// API lấy danh sách sản phẩm trong đơn hàng
export const getOrderDetails = async orderId => {
  try {
    const res = await axiosInstance.get(`/order-details/order/${orderId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};

// API lấy chi tiết đơn hàng với thông tin sản phẩm đầy đủ (tối ưu cho hiển thị)
export const getOrderDetailsForDisplay = async orderId => {
  try {
    const res = await axiosInstance.get(
      `/order-details/order/${orderId}/display`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching order details for display:", error);
    throw error;
  }
};

// API lấy danh sách sản phẩm chi tiết của đơn hàng (endpoint mới)
export const getOrderProductDetails = async orderId => {
  try {
    const res = await axiosInstance.get(
      `/order-details/order/${orderId}/products`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching order product details:", error);
    throw error;
  }
};
// API cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (orderId, status) => {
  try {
    const res = await axiosInstance.patch(
      `/orders/${orderId}/status?status=${status}`
    );
    return res.data;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

// ============ ORDER TRACKING APIs ============

/**
 * Admin: Cập nhật thời gian giao hàng cho đơn hàng SHIPPED
 * @param {Object} updateData - { orderId, shippedDate, notes }
 */
export const updateShippedDate = async updateData => {
  try {
    const res = await axiosInstance.put(
      "/orders/admin/update-shipped-date",
      updateData
    );
    return res.data; // { EC, EM, DT }
  } catch (error) {
    console.error("Error updating shipped date:", error);
    throw error;
  }
};

/**
 * Admin: Lấy danh sách đơn hàng SHIPPED
 */
export const getShippedOrders = async () => {
  try {
    const res = await axiosInstance.get("/orders/admin/shipped-orders");
    return res.data; // { EC, EM, DT: OrderDTO[] }
  } catch (error) {
    console.error("Error fetching shipped orders:", error);
    throw error;
  }
};

/**
 * Customer: Xem danh sách đơn hàng đang giao (SHIPPED)
 * @param {number} userId - ID của customer
 */
export const getCustomerShippedOrders = async userId => {
  try {
    const res = await axiosInstance.get(
      `/orders/customer/${userId}/tracking/shipped`
    );
    return res.data; // { EC, EM, DT: OrderTrackingDTO[] }
  } catch (error) {
    console.error("Error fetching customer shipped orders:", error);
    throw error;
  }
};

/**
 * Customer: Theo dõi chi tiết một đơn hàng
 * @param {number} userId - ID của customer
 * @param {number} orderId - ID của order
 */
export const getOrderTracking = async (userId, orderId) => {
  try {
    const res = await axiosInstance.get(
      `/orders/customer/${userId}/tracking/${orderId}`
    );
    return res.data; // { EC, EM, DT: OrderTrackingDTO }
  } catch (error) {
    console.error("Error fetching order tracking:", error);
    throw error;
  }
};