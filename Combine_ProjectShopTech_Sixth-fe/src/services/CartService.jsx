import { cartApi } from '../apis/cartApi';

/**
 * CartService
 * Service để quản lý giỏ hàng trong frontend
 */
class CartService {
  constructor() {
    this.cartItems = [];
    this.cartSummary = null;
    this.currentUserId = null;
  }

  /**
   * Set current user ID
   * @param {number} userId - User ID
   */
  setCurrentUser(userId) {
    this.currentUserId = userId;
  }

  /**
   * Get current user ID
   * @returns {number|null} Current user ID
   */
  getCurrentUser() {
    return this.currentUserId;
  }

  /**
   * Load cart items from backend
   * @param {number} userId - User ID
   * @returns {Promise<Array>} Cart items
   */
  async loadCartItems(userId = this.currentUserId) {
    if (!userId) {
      throw new Error('User ID is required');
    }

    try {
      this.cartItems = await cartApi.getCartItems(userId);
      this.cartSummary = await cartApi.getCartSummary(userId);
      return this.cartItems;
    } catch (error) {
      console.error('Error loading cart items:', error);
      throw error;
    }
  }

  /**
   * Add product to cart
   * @param {number} productId - Product ID
   * @param {number} quantity - Quantity to add
   * @param {number} userId - User ID
   * @returns {Promise<Object>} Added cart item
   */
  async addToCart(productId, quantity = 1, userId = this.currentUserId) {
    if (!userId) {
      throw new Error('User ID is required');
    }

    try {
      const cartItem = await cartApi.addToCart(userId, productId, quantity);
      await this.loadCartItems(userId); // Reload cart items
      return cartItem;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }

  /**
   * Update cart item quantity
   * @param {number} productId - Product ID
   * @param {number} quantity - New quantity
   * @param {number} userId - User ID
   * @returns {Promise<Object>} Updated cart item
   */
  async updateCartItemQuantity(productId, quantity, userId = this.currentUserId) {
    if (!userId) {
      throw new Error('User ID is required');
    }

    try {
      const cartItem = await cartApi.updateCartItemQuantity(userId, productId, quantity);
      await this.loadCartItems(userId); // Reload cart items
      return cartItem;
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  }

  /**
   * Remove product from cart
   * @param {number} productId - Product ID
   * @param {number} userId - User ID
   * @returns {Promise<void>}
   */
  async removeFromCart(productId, userId = this.currentUserId) {
    if (!userId) {
      throw new Error('User ID is required');
    }

    try {
      await cartApi.removeFromCart(userId, productId);
      await this.loadCartItems(userId); // Reload cart items
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  }

  /**
   * Clear cart
   * @param {number} userId - User ID
   * @returns {Promise<void>}
   */
  async clearCart(userId = this.currentUserId) {
    if (!userId) {
      throw new Error('User ID is required');
    }

    try {
      await cartApi.clearCart(userId);
      this.cartItems = [];
      this.cartSummary = null;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }

  /**
   * Get cart items
   * @returns {Array} Cart items
   */
  getCartItems() {
    return this.cartItems;
  }

  /**
   * Get cart summary
   * @returns {Object|null} Cart summary
   */
  getCartSummary() {
    return this.cartSummary;
  }

  /**
   * Get total items count
   * @returns {number} Total items count
   */
  getTotalItems() {
    return this.cartSummary ? this.cartSummary.totalItems : 0;
  }

  /**
   * Get total amount
   * @returns {number} Total amount
   */
  getTotalAmount() {
    return this.cartSummary ? this.cartSummary.totalAmount : 0;
  }

  /**
   * Check if cart is empty
   * @returns {boolean} True if cart is empty
   */
  isEmpty() {
    return this.cartItems.length === 0;
  }

  /**
   * Find cart item by product ID
   * @param {number} productId - Product ID
   * @returns {Object|undefined} Cart item
   */
  findCartItemByProductId(productId) {
    return this.cartItems.find(item => item.product.id === productId);
  }

  /**
   * Get cart item quantity by product ID
   * @param {number} productId - Product ID
   * @returns {number} Quantity
   */
  getCartItemQuantity(productId) {
    const cartItem = this.findCartItemByProductId(productId);
    return cartItem ? cartItem.quantity : 0;
  }

  /**
   * Check if product is in cart
   * @param {number} productId - Product ID
   * @returns {boolean} True if product is in cart
   */
  isProductInCart(productId) {
    return this.findCartItemByProductId(productId) !== undefined;
  }

  /**
   * Sync cart with backend
   * @param {number} userId - User ID
   * @returns {Promise<void>}
   */
  async syncCart(userId = this.currentUserId) {
    if (!userId) {
      throw new Error('User ID is required');
    }

    try {
      await this.loadCartItems(userId);
    } catch (error) {
      console.error('Error syncing cart:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const cartService = new CartService();
export default cartService;