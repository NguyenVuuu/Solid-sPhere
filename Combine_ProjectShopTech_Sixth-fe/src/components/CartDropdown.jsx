import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
  loadCartItems,
  // triggerCartRefresh,
} from "../utils/redux/cartSlice";
import { FaTrash, FaPlus, FaMinus, FaShoppingBag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CartDropdown = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { carts, cartSummary, loading } = useSelector(state => state.cart);

  // Debug: Log cart state changes
  useEffect(() => {
    console.log("CartDropdown - Cart state changed:", {
      carts,
      cartSummary,
      loading,
    });
  }, [carts, cartSummary, loading]);

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

  const [isInitialMount, setIsInitialMount] = useState(true);

  useEffect(() => {
    // Chỉ load khi dropdown được MỞ
    dispatch(loadCartItems());
  }, [dispatch]);

  // Load cart items khi component mount
  // useEffect(() => {
  //   const userId = getCurrentUserId();

  //   if (!userId) {
  //     // 🧳 Nếu chưa đăng nhập → kiểm tra giỏ hàng local
  //     const guestCart = localStorage.getItem("guestCart");
  //     if (guestCart) {
  //       try {
  //         const parsed = JSON.parse(guestCart);
  //         const hasInvalidPrice = parsed.some(
  //           item =>
  //             typeof item.unitPrice === "string" && item.unitPrice.includes("₫")
  //         );

  //         if (hasInvalidPrice) {
  //           console.warn("🧹 Clearing invalid guest cart data");
  //           localStorage.removeItem("guestCart");
  //         }
  //       } catch (e) {
  //         localStorage.removeItem("guestCart");
  //       }
  //     }
  //   } else {
  //     // 👤 Nếu đã đăng nhập → load giỏ hàng từ server
  //     console.log("📦 Loading cart for userId:", userId);
  //   }

  //   // 🧠 Dù có hay không userId, hàm loadCartItems sẽ xử lý logic trong thunk
  //   dispatch(loadCartItems(userId)).catch(err => {
  //     console.error("❌ Failed to load cart:", err);
  //   });
  // }, [dispatch]);

  // Calculate total từ cartSummary hoặc từ carts
  const totalAmount = cartSummary
    ? cartSummary.totalAmount
    : carts.reduce((total, item) => {
        return (
          total +
          (item.totalPrice ||
            item.quantity * (item.unitPrice || item.product?.unitPrice || 0) ||
            0)
        );
      }, 0);

  const handleIncrement = async (productId, currentQuantity) => {
    const userId = getCurrentUserId();
    dispatch(
      updateCartItemQuantity({
        userId,
        productId,
        quantity: currentQuantity + 1,
      })
    ).catch(error => console.error("❌ Error updating quantity:", error));
  };

  const handleDecrement = async (productId, currentQuantity) => {
    const userId = getCurrentUserId();
    try {
      if (currentQuantity <= 1) {
        // `removeFromCart` giờ cũng tự fetch lại
        await dispatch(removeFromCart({ userId, productId })).unwrap();
      } else {
        // `updateCartItemQuantity` cũng tự fetch lại
        await dispatch(
          updateCartItemQuantity({
            userId,
            productId,
            quantity: currentQuantity - 1,
          })
        ).unwrap();
      }
    } catch (error) {
      console.error("❌ Error updating quantity:", error);
    }
  };

  const handleRemove = async productId => {
    const userId = getCurrentUserId();
    dispatch(removeFromCart({ userId, productId })).catch(error =>
      console.error("❌ Error removing item:", error)
    );
  };

  const handleCheckout = () => {
    navigate("/shopping_card_checkout");
    onClose();
  };

  const handleViewCart = () => {
    navigate("/shopping_card_item");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-full mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-2xl z-[100] overflow-hidden animate-fadeIn">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-black via-gray-900 to-purple-950 border-b border-purple-800">
        <h3 className="text-white font-bold text-lg flex items-center gap-2">
          <FaShoppingBag className="text-purple-400" />
          {t("cart.title")} ({carts.length})
        </h3>
      </div>

      {/* Cart Items */}
      <div className="max-h-96 overflow-y-auto bg-gray-50">
        {carts.length === 0 ? (
          <div className="p-8 text-center">
            <FaShoppingBag className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-2 font-medium">
              {t("cart.your_cart_is_empty")}
            </p>
            <p className="text-gray-400 text-sm">
              {t("cart.add_some_products_to")}
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {carts.map((item, index) => (
              <div
                key={item.id || `cart-item-${index}`}
                className="flex gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all group"
              >
                {/* Product Image */}
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                  <img
                    src={item.product?.imageUrl || item.imageUrl || ""}
                    alt={item.product?.name || item.name || ""}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-gray-800 font-medium text-sm mb-1 truncate group-hover:text-purple-700 transition-colors">
                    {item.product?.name || item.name || ""}
                  </h4>
                  <p className="text-purple-700 font-semibold text-sm mb-2">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(
                      item.unitPrice ||
                        item.product?.unitPrice ||
                        item.price ||
                        0
                    )}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleDecrement(
                          item.product?.id || item.id,
                          item.quantity
                        )
                      }
                      className="w-6 h-6 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded border border-gray-300 transition-colors"
                    >
                      <FaMinus size={10} />
                    </button>
                    <span className="text-gray-800 font-medium text-sm w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleIncrement(
                          item.product?.id || item.id,
                          item.quantity
                        )
                      }
                      className="w-6 h-6 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded border border-gray-300 transition-colors"
                    >
                      <FaPlus size={10} />
                    </button>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(item.product?.id || item.id)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded transition-all"
                  title={t("cart.remove_from_cart")}
                >
                  <FaTrash size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer with Total and Actions */}
      {carts.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-white">
          {/* Subtotal */}
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
            <span className="text-gray-600 font-medium">
              {t("cart.subtotal")}
            </span>
            <span className="text-gray-900 font-bold text-lg">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(totalAmount)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={handleViewCart}
              className="w-full py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-300 transition-all"
            >
              {t("cart.view_cart")}
            </button>
            <button
              onClick={handleCheckout}
              className="w-full py-2.5 bg-gradient-to-r from-black via-gray-900 to-purple-950 hover:from-gray-900 hover:to-purple-900 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 border border-purple-800"
            >
              {t("cart.checkout")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDropdown;