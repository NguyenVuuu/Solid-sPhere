import axios from "../custom/axios";
import notify from "../utils/notify";

// Cart API endpoints
export const cartApi = {
  // Get cart by user ID
  getCartByUserId: async userId => {
    try {
      const response = await axios.get(`/cart/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error getting cart:", error);
      throw error;
    }
  },

  // Get cart items by user ID
  getCartItems: async userId => {
    try {
      const response = await axios.get(`/cart/user/${userId}/items`);
      return response.data;
    } catch (error) {
      console.error("Error getting cart items:", error);
      throw error;
    }
  },

  // Add product to cart
  addToCart: async (userId, productId, quantity = 1) => {
    try {
      const response = await axios.post(`/cart/user/${userId}/add`, null, {
        params: { productId, quantity },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        const { code, message } = error.response.data;
        if (code === 1302) {
          notify.error("Không đủ hàng để thêm sản phẩm này!");
        } else if (code === 1303) {
          notify.error("Sản phẩm đã hết hàng!");
        } else {
          notify.error(message || "Thêm vào giỏ hàng thất bại!");
        }
      } else {
        notify.error("Không thể kết nối đến máy chủ!");
      }
      throw error;
    }
  },

  // Update cart item quantity
  updateCartItemQuantity: async (userId, productId, quantity) => {
    try {
      const response = await axios.put(`/cart/user/${userId}/update`, null, {
        params: { productId, quantity },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        const { code, message } = error.response.data;
        if (code === 1302) {
          notify.error("Không đủ hàng để cập nhật số lượng này!");
        } else if (code === 1303) {
          notify.error("Sản phẩm đã hết hàng!");
        } else {
          notify.error(message || "Cập nhật giỏ hàng thất bại!");
        }
      } else {
        notify.error("Không thể kết nối đến máy chủ!");
      }
      throw error;
    }
  },

  // Remove product from cart
  removeFromCart: async (userId, productId) => {
    try {
      const response = await axios.delete(`/cart/user/${userId}/remove`, {
        params: { productId },
      });
      return response.data;
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw error;
    }
  },

  // Clear cart
  clearCart: async userId => {
    try {
      const response = await axios.delete(`/cart/user/${userId}/clear`);
      return response.data;
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw error;
    }
  },

  // Get cart summary
  getCartSummary: async userId => {
    try {
      const response = await axios.get(`/cart/user/${userId}/summary`);
      return response.data;
    } catch (error) {
      console.error("Error getting cart summary:", error);
      throw error;
    }
  },
};

// CartItem API endpoints
export const cartItemApi = {
  // Get all cart items
  getAllCartItems: async () => {
    try {
      const response = await axios.get("/cart-items");
      return response.data;
    } catch (error) {
      console.error("Error getting all cart items:", error);
      throw error;
    }
  },

  // Get cart item by ID
  getCartItemById: async id => {
    try {
      const response = await axios.get(`/cart-items/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error getting cart item:", error);
      throw error;
    }
  },

  // Get cart items by cart ID
  getCartItemsByCartId: async cartId => {
    try {
      const response = await axios.get(`/cart-items/cart/${cartId}`);
      return response.data;
    } catch (error) {
      console.error("Error getting cart items by cart ID:", error);
      throw error;
    }
  },

  // Create cart item
  createCartItem: async cartItem => {
    try {
      const response = await axios.post("/cart-items", cartItem);
      return response.data;
    } catch (error) {
      console.error("Error creating cart item:", error);
      throw error;
    }
  },

  // Update cart item
  updateCartItem: async (id, cartItem) => {
    try {
      const response = await axios.put(`/cart-items/${id}`, cartItem);
      return response.data;
    } catch (error) {
      console.error("Error updating cart item:", error);
      throw error;
    }
  },

  // Delete cart item by ID
  deleteCartItem: async id => {
    try {
      const response = await axios.delete(`/cart-items/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting cart item:", error);
      throw error;
    }
  },

  // Delete cart items by cart ID
  deleteCartItemsByCartId: async cartId => {
    try {
      const response = await axios.delete(`/cart-items/cart/${cartId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting cart items by cart ID:", error);
      throw error;
    }
  },

  // Delete cart item by cart ID and product ID
  deleteCartItemByCartAndProduct: async (cartId, productId) => {
    try {
      const response = await axios.delete(
        `/cart-items/cart/${cartId}/product/${productId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting cart item by cart and product:", error);
      throw error;
    }
  },

  // Count cart items by cart ID
  countCartItemsByCartId: async cartId => {
    try {
      const response = await axios.get(`/cart-items/cart/${cartId}/count`);
      return response.data;
    } catch (error) {
      console.error("Error counting cart items:", error);
      throw error;
    }
  },

  // Calculate total amount by cart ID
  calculateTotalAmountByCartId: async cartId => {
    try {
      const response = await axios.get(`/cart-items/cart/${cartId}/total`);
      return response.data;
    } catch (error) {
      console.error("Error calculating total amount:", error);
      throw error;
    }
  },
};

// Export addToCart directly for easier importing
export const addToCart = cartApi.addToCart;

export default cartApi;