import { useState, useEffect, useCallback } from 'react';
import { cartApi } from '../apis/cartApi';

// Helper: lấy guest cart từ localStorage
const getGuestCart = () => {
  try {
    const guestCart = localStorage.getItem("guestCart");
    return guestCart ? JSON.parse(guestCart) : [];
  } catch (e) {
    console.error("Lỗi khi đọc guest cart:", e);
    return [];
  }
};

// Helper: lưu guest cart vào localStorage
const saveGuestCart = (cartItems) => {
  try {
    localStorage.setItem("guestCart", JSON.stringify(cartItems));
  } catch (e) {
    console.error("Lỗi khi lưu guest cart:", e);
  }
};

// Helper: tính tổng tiền cho guest cart
const calculateGuestCartTotal = (cartItems) => {
  return cartItems.reduce((total, item) => total + (item.totalPrice || 0), 0);
};

// Helper: tính tổng số lượng cho guest cart
const calculateGuestCartItems = (cartItems) => {
  return cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
};

/**
 * useCart Hook
 * Hook để quản lý giỏ hàng với backend API và Guest Cart
 */
export const useCart = (userId) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartSummary, setCartSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load cart items from backend or localStorage
  const loadCartItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (!userId) {
        // Guest cart - load from localStorage
        const guestCart = getGuestCart();
        setCartItems(guestCart);
        setCartSummary({
          totalAmount: calculateGuestCartTotal(guestCart),
          totalItems: calculateGuestCartItems(guestCart)
        });
      } else {
        // User cart - load from backend
        const [items, summary] = await Promise.all([
          cartApi.getCartItems(userId),
          cartApi.getCartSummary(userId)
        ]);
        
        setCartItems(items);
        setCartSummary(summary);
      }
    } catch (err) {
      console.error('Error loading cart items:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Add product to cart
  const addToCart = useCallback(async (productId, quantity = 1, productData = null) => {
    setLoading(true);
    setError(null);
    
    try {
      if (!userId) {
        // Guest cart - add to localStorage
        const guestCart = getGuestCart();
        const existingItem = guestCart.find(item => item.productId === productId);
        
        if (existingItem) {
          existingItem.quantity += quantity;
          existingItem.totalPrice = existingItem.quantity * existingItem.unitPrice;
        } else {
          guestCart.push({
            id: `guest_${productId}_${Date.now()}`,
            productId: productId,
            quantity: quantity,
            unitPrice: productData?.unitPrice || 0,
            totalPrice: quantity * (productData?.unitPrice || 0),
            product: productData || { id: productId, name: 'Unknown Product', imageUrl: '' }
          });
        }
        
        saveGuestCart(guestCart);
        setCartItems(guestCart);
        setCartSummary({
          totalAmount: calculateGuestCartTotal(guestCart),
          totalItems: calculateGuestCartItems(guestCart)
        });
      } else {
        // User cart - add to backend
        await cartApi.addToCart(userId, productId, quantity);
        await loadCartItems(); // Reload cart items
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId, loadCartItems]);

  // Update cart item quantity
  const updateQuantity = useCallback(async (productId, quantity) => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      if (quantity <= 0) {
        // If quantity is 0 or negative, remove item
        await cartApi.removeFromCart(userId, productId);
      } else {
        await cartApi.updateCartItemQuantity(userId, productId, quantity);
      }
      await loadCartItems(); // Reload cart items
    } catch (err) {
      console.error('Error updating quantity:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId, loadCartItems]);

  // Remove product from cart
  const removeFromCart = useCallback(async (productId) => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await cartApi.removeFromCart(userId, productId);
      await loadCartItems(); // Reload cart items
    } catch (err) {
      console.error('Error removing from cart:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId, loadCartItems]);

  // Clear cart
  const clearCart = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await cartApi.clearCart(userId);
      setCartItems([]);
      setCartSummary(null);
    } catch (err) {
      console.error('Error clearing cart:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Check if product is in cart
  const isProductInCart = useCallback((productId) => {
    return cartItems.some(item => item.product.id === productId);
  }, [cartItems]);

  // Get quantity of product in cart
  const getProductQuantity = useCallback((productId) => {
    const item = cartItems.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  }, [cartItems]);

  // Load cart items when userId changes
  useEffect(() => {
    if (userId) {
      loadCartItems();
    }
  }, [userId, loadCartItems]);

  return {
    cartItems,
    cartSummary,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    isProductInCart,
    getProductQuantity,
    loadCartItems
  };
};

export default useCart;
