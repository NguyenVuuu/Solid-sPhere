import React, { useState, useEffect } from "react";
import { FaStar, FaHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../utils/redux/cartSlice';
import notify from '../../utils/notify';
import { addFavorite, removeFavorite, checkIsFavorited } from '../../apis/favoriteApi';

const ProductCard = ({ product }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isCheckingFavorite, setIsCheckingFavorite] = useState(false);

  // Helper: lấy userId từ localStorage
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

  // Check if product is favorited
  useEffect(() => {
    const userId = getCurrentUserId();
    if (userId && product?.productID) {
      setIsCheckingFavorite(true);
      checkIsFavorited(userId, product.productID)
        .then(setIsFavorited)
        .finally(() => setIsCheckingFavorite(false));
    }
  }, [product?.productID]);

  const handleClick = () => {
    navigate(`/product/${product.productID}/productAbout`);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    
    const userId = getCurrentUserId();
    
    try {
      await dispatch(addToCart({
        userId,
        productId: product.productID,
        quantity: 1,
        productData: {
          id: product.productID,
          name: product.productName,
          unitPrice: product.price || 0,
          imageUrl: product.image || ''
        }
      })).unwrap();
      
      notify.success("Đã thêm sản phẩm vào giỏ hàng!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      notify.error("Lỗi khi thêm sản phẩm vào giỏ hàng!");
    }
  };

  const handleAddToWishlist = async (e) => {
    e.stopPropagation();
    const userId = getCurrentUserId();
    
    if (!userId) {
      notify.error("Vui lòng đăng nhập để thêm yêu thích");
      return;
    }

    try {
      if (isFavorited) {
        await removeFavorite(userId, product.productID);
        setIsFavorited(false);
        notify.success("Đã xóa khỏi yêu thích");
      } else {
        await addFavorite(userId, product.productID);
        setIsFavorited(true);
        notify.success("Đã thêm vào yêu thích");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      notify.error("Lỗi khi thêm/xóa yêu thích");
    }
  };

  return (
    <div
      className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300 cursor-pointer"
      onClick={handleClick}
    >
      {/* Stock Status Badge */}
      <div className="absolute top-3 left-3 z-10">
        {product.inStock ? (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
            {t('product.in_stock')}
          </span>
        ) : (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
            {t('product.check_availability')}
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex flex-col gap-2">
          <button
            onClick={handleAddToWishlist}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors relative"
            disabled={isCheckingFavorite}
            title={isFavorited ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"}
          >
            <FaHeart className={`w-4 h-4 transition-all ${isFavorited ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
            {isCheckingFavorite && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 border border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </button>
          <button
            onClick={handleAddToCart}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          >
            <FaShoppingCart className="w-4 h-4 text-gray-600 hover:text-blue-500" />
          </button>
        </div>
      </div>

      {/* Product Image */}
      <div className="aspect-square bg-gray-50 flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.productName}
          className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} className="text-yellow-400 w-3 h-3 mr-0.5" />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">(4.8)</span>
        </div>

        {/* Product Name */}
        <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {product.productName}
        </h3>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 line-through">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(product.price * 1.25)}
            </p>
            <p className="text-lg font-bold text-gray-900">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(product.price)}
            </p>
          </div>
          
          {/* Quick View Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            className="opacity-0 group-hover:opacity-100 p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300"
          >
            <FaEye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;