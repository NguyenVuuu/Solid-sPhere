// Mock data cho orders
export const mockOrders = [];

let nextOrderId = 1;

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Tạo order mới
 * @param {Object} orderData - Dữ liệu order
 * @returns {Promise<Object>} Kết quả tạo order
 */
export const createOrder = async (orderData) => {
  await delay();
  
  try {
    const newOrder = {
      orderID: nextOrderId++,
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    mockOrders.push(newOrder);
    
    return {
      EC: 1,
      EM: 'Order created successfully',
      DT: newOrder
    };
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      EC: 0,
      EM: 'Error creating order',
      DT: null
    };
  }
};

/**
 * Lấy tất cả orders
 * @returns {Promise<Object>} Danh sách orders
 */
export const getAllOrders = async () => {
  await delay();
  
  try {
    return {
      EC: 1,
      EM: 'Success',
      DT: mockOrders
    };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return {
      EC: 0,
      EM: 'Error fetching orders',
      DT: []
    };
  }
};

/**
 * Lấy order theo ID
 * @param {number} orderId - ID của order
 * @returns {Promise<Object>} Order data
 */
export const getOrderById = async (orderId) => {
  await delay();
  
  try {
    const order = mockOrders.find(o => o.orderID === orderId);
    
    if (order) {
      return {
        EC: 1,
        EM: 'Success',
        DT: order
      };
    }
    
    return {
      EC: 0,
      EM: 'Order not found',
      DT: null
    };
  } catch (error) {
    console.error("Error fetching order:", error);
    return {
      EC: 0,
      EM: 'Error fetching order',
      DT: null
    };
  }
};

// Updated: 2025-10-12T16:06:41.350Z

// Updated: 2025-10-12T16:09:07.288Z
