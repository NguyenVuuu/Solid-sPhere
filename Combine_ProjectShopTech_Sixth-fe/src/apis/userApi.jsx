import axiosInstance from "../custom/axios";
const API_URL = "/users";

// ============ USER PROFILE ENDPOINTS ============

/**
 * Get user info by ID
 */
export const getUserById = async (id) => {
  const response = await axiosInstance.get(`${API_URL}/${id}`);
  return response.data;
};

/**
 * Get full user information
 * @param {number} userId 
 * @returns {Promise} UserDTO with full information
 */
export const getUserInfo = async (userId) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};

// ============ ORDER ENDPOINTS ============

/**
 * Get all orders for a user
 * @param {number} userId 
 * @returns {Promise} Array of orders
 */
export const getUserOrders = async (userId) => {
  try {
    const response = await axiosInstance.get(`/orders/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
};

/**
 * Get detailed order information
 * @param {number} orderId 
 * @returns {Promise} Order details with all order items
 */
export const getOrderDetails = async (orderId) => {
  try {
    const response = await axiosInstance.get(`/order-details/order/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};

/**
 * Get order product details with product information
 * @param {number} orderId
 * @returns {Promise} Array<OrderProductDetailDTO> with full product details
 */
export const getOrderProductDetails = async (orderId) => {
  try {
    const response = await axiosInstance.get(`/order-details/order/${orderId}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order product details:", error);
    throw error;
  }
};

/**
 * Get order with embedded details
 * @param {number} orderId
 * @returns {Promise} OrderWithDetailsDTO
 */
export const getOrderWithDetails = async (orderId) => {
  try {
    const response = await axiosInstance.get(`/orders/${orderId}/with-details`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order with details:", error);
    throw error;
  }
};

/**
 * Get orders by status
 * @param {number} userId 
 * @param {string} status - Order status (completed, pending, cancelled, etc.)
 * @returns {Promise} Array of orders with specific status
 */
export const getUserOrdersByStatus = async (userId, status) => {
  try {
    const response = await axiosInstance.get(`/orders/user/${userId}/status/${status}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${status} orders:`, error);
    throw error;
  }
};

/**
 * Get all orders of user with details
 * @param {number} userId
 * @returns {Promise} Array<OrderWithDetailsDTO>
 */
export const getUserOrdersWithDetails = async (userId) => {
  try {
    const response = await axiosInstance.get(`/orders/user/${userId}/with-details`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders with details:", error);
    throw error;
  }
};

// ============ FAVORITE/WISHLIST ENDPOINTS ============

/**
 * Get all favorite products for a user
 * @param {number} userId 
 * @returns {Promise} Array of favorite products
 */
export const getUserFavorites = async (userId) => {
  try {
    const response = await axiosInstance.get(`/favorites/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user favorites:", error);
    throw error;
  }
};

/**
 * Get favorite products with pagination
 * @param {number} userId 
 * @param {number} page - Page number (0-based)
 * @param {number} size - Items per page
 * @returns {Promise} Paginated favorite products
 */
export const getUserFavoritesPage = async (userId, page = 0, size = 12) => {
  try {
    const response = await axiosInstance.get(`/favorites/user/${userId}/page?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching favorite products:", error);
    throw error;
  }
};

/**
 * Get recent favorite products
 * @param {number} userId 
 * @param {number} limit - Number of recent items to fetch
 * @returns {Promise} Recent favorite products
 */
export const getRecentFavorites = async (userId, limit = 10) => {
  try {
    const response = await axiosInstance.get(`/favorites/user/${userId}/recent?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recent favorites:", error);
    throw error;
  }
};

/**
 * Add product to favorites
 * @param {number} userId 
 * @param {number} productId 
 * @returns {Promise} Response
 */
export const addToFavorites = async (userId, productId) => {
  try {
    const response = await axiosInstance.post(`/favorites/add`, null, {
      params: { userId, productId },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to favorites:", error);
    throw error;
  }
};

/**
 * Remove product from favorites
 * @param {number} favoriteId 
 * @returns {Promise} Response
 */
export const removeFromFavorites = async (favoriteId) => {
  try {
    const response = await axiosInstance.delete(`/favorites/${favoriteId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing from favorites:", error);
    throw error;
  }
};

/**
 * Get count of favorite products
 * @param {number} userId 
 * @returns {Promise} Number of favorites
 */
export const getFavoritesCount = async (userId) => {
  try {
    const response = await axiosInstance.get(`/favorites/user/${userId}/count`);
    return response.data;
  } catch (error) {
    console.error("Error fetching favorites count:", error);
    throw error;
  }
};

// ============ DISCOUNT ENDPOINTS ============

/**
 * Get user discounts
 * @param {number} userId 
 * @returns {Promise} Array of user discounts
 */
export const getUserDiscounts = async (userId) => {
  try {
    const response = await axiosInstance.get(`/user-discounts/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user discounts:", error);
    throw error;
  }
};

/**
 * Get active discounts for user
 * @param {number} userId 
 * @returns {Promise} Array of active discounts
 */
export const getActiveDiscounts = async (userId) => {
  try {
    const response = await axiosInstance.get(`/user-discounts/user/${userId}/active`);
    return response.data;
  } catch (error) {
    console.error("Error fetching active discounts:", error);
    throw error;
  }
};

// ============ ACCOUNT UPDATE ENDPOINTS ============

/**
 * Update user profile information
 * @param {number} userId 
 * @param {object} userInfo - { fullName, email, phoneNumber, address }
 * @returns {Promise} Updated user info
 */
export const updateUserProfile = async (userId, userInfo) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/${userId}`, userInfo);
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

/**
 * Change user password
 * @param {number} userId 
 * @param {object} passwordData - { currentPassword, newPassword }
 * @returns {Promise} Success message
 */
export const changePassword = async (userId, passwordData) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/${userId}/change-password`, passwordData);
    return response.data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};

// ============ MINI-GAME ENDPOINTS ============

export const addGamePlays = async (userId, plays = 3) => {
  try {
    const response = await axiosInstance.patch(`${API_URL}/${userId}/plays/add`, null, {
      params: { plays },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding game plays:", error);
    throw error;
  }
};

export const consumeGamePlay = async (userId) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/${userId}/plays/consume`);
    return response.data;
  } catch (error) {
    console.error("Error consuming game play:", error);
    throw error;
  }
};
