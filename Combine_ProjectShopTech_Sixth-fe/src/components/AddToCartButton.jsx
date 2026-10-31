import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../utils/redux/cartSlice';
import { useTranslation } from 'react-i18next';
import { FaShoppingCart, FaCheck } from 'react-icons/fa';
import { parseVietnamesePrice } from '../utils/priceUtils';

/**
 * AddToCartButton Component
 * Component để thêm sản phẩm vào giỏ hàng
 */
const AddToCartButton = ({ product, className = "", showQuantity = true }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.cart);
  
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Lấy user ID từ localStorage
  const getCurrentUserId = () => {
    try {
      const savedUser = localStorage.getItem("user");
      if (!savedUser) return null;
      const parsed = JSON.parse(savedUser);
      return parsed?.customerID ?? parsed?.id ?? parsed?.customerId ?? null;
    } catch (e) {
      console.error("Lỗi khi đọc user từ localStorage:", e);
      return null;
    }
  };

  const handleAddToCart = async () => {
    const userId = getCurrentUserId();

    if (!product || !product.id) {
      alert(t("cart.product_not_found"));
      return;
    }

    try {
      console.log("AddToCartButton - Adding to cart:", {
        userId,
        productId: product.id,
        quantity,
        originalPrice: product.unitPrice || product.price,
        productData: {
          id: product.id,
          name: product.name,
          unitPrice: product.unitPrice || product.price || 0,
          imageUrl: product.imageUrl || product.image || ''
        }
      });

      await dispatch(addToCart({ 
        userId, 
        productId: product.id, 
        quantity,
        productData: {
          id: product.id,
          name: product.name,
          unitPrice: product.unitPrice || product.price || 0,
          imageUrl: product.imageUrl || product.image || ''
        }
      })).unwrap();
      
      setAdded(true);
      setTimeout(() => setAdded(false), 2000); // Reset after 2 seconds
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(t("cart.error_adding_to_cart"));
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= (product?.quantity || 999)) {
      setQuantity(newQuantity);
    }
  };

  if (!product) return null;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showQuantity && (
        <div className="flex items-center border border-gray-300 rounded">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            -
          </button>
          <input
            type="number"
            min="1"
            max={product.quantity || 999}
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
            className="w-16 px-2 py-2 text-center border-0 focus:outline-none"
          />
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= (product.quantity || 999)}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
      )}

      <button
        onClick={handleAddToCart}
        disabled={loading || added}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
          ${added 
            ? 'bg-green-600 text-white' 
            : 'bg-blue-600 hover:bg-blue-700 text-white'
          }
          ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}
        `}
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : added ? (
          <>
            <FaCheck className="w-4 h-4" />
            {t("cart.added")}
          </>
        ) : (
          <>
            <FaShoppingCart className="w-4 h-4" />
            {t("cart.add_to_cart")}
          </>
        )}
      </button>
    </div>
  );
};

export default AddToCartButton;
