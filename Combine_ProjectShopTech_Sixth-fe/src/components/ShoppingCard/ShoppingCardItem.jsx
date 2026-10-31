// CartItem.js
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  updateCartItemQuantity,
  removeFromCart,
} from "../../utils/redux/cartSlice";

function CartItem({ item, onQuantityChange, onRemove }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
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

  // Helper: try load the latest cart item from sessionStorage by productID
  const getCartItemFromSession = productID => {
    try {
      if (!productID) return null;
      const serialized = sessionStorage.getItem("cart");
      if (!serialized) return null;
      const parsed = JSON.parse(serialized);
      // Determine current user id from localStorage
      const savedUser = localStorage.getItem("user");
      const userId = savedUser
        ? JSON.parse(savedUser).customerID ??
          JSON.parse(savedUser).id ??
          "guest"
        : "guest";
      const userCart = parsed?.[userId]?.carts ?? parsed?.guest?.carts ?? [];
      return userCart.find(c => c.productID === productID) || null;
    } catch (e) {
      console.error("Lỗi khi đọc cart từ sessionStorage", e);
      return null;
    }
  };

  const [quantity, setQuantity] = useState(() => {
    // Prefer value from sessionStorage if available, otherwise from prop, fallback to 1
    const sessionItem = getCartItemFromSession(item?.productID);
    return sessionItem?.quantity ?? item?.quantity ?? 1;
  });

  // modal state for confirming remove when decreasing below 1
  const [showConfirmRemove, setShowConfirmRemove] = useState(false);

  // Sync quantity when the prop or session changes
  useEffect(() => {
    const sessionItem = getCartItemFromSession(item?.productID);
    if (sessionItem && typeof sessionItem.quantity === "number") {
      setQuantity(sessionItem.quantity);
    } else if (item && typeof item.quantity === "number") {
      setQuantity(item.quantity); // Cập nhật lại quantity khi item thay đổi
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.productID, item?.quantity]);

  const handleQuantityChange = async newQuantity => {
    if (newQuantity < 1) {
      setShowConfirmRemove(true);
      return;
    }

    const userId = getCurrentUserId();
    const productId = item.productID || item.productId || item.id;

    try {
      await dispatch(
        updateCartItemQuantity({
          userId,
          productId,
          quantity: newQuantity,
        })
      ).unwrap();

      setQuantity(newQuantity);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemove = async () => {
    const userId = getCurrentUserId();
    const productId = item.productID || item.productId || item.id;

    try {
      await dispatch(
        removeFromCart({
          userId,
          productId,
        })
      ).unwrap();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // When user clicks decrease button
  const handleDecreaseClick = () => {
    if (quantity <= 1) {
      // show confirm modal to remove
      setShowConfirmRemove(true);
    } else {
      handleQuantityChange(quantity - 1);
    }
  };

  const handleConfirmRemove = async () => {
    setShowConfirmRemove(false);
    await handleRemove();
  };

  const handleCancelRemove = () => {
    setShowConfirmRemove(false);
  };

  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      {/* Hình ảnh sản phẩm */}
      <div className="w-24 h-24 mr-4">
        <img
          src={item.image || item.imageUrl || item.product?.imageUrl || ""}
          alt={item.productName || item.name || item.product?.name || "Product"}
          className="w-full h-full object-cover rounded-lg"
          style={{ objectFit: "contain" }}
          onError={e => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <div
          className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs"
          style={{ display: "none" }}
        >
          No Image
        </div>
      </div>

      {/* Thông tin sản phẩm */}
      <div className="flex-grow">
        <h3 className="text-sm font-semibold text-gray-700">
          {item.productName ||
            item.name ||
            item.product?.name ||
            "Unknown Product"}
        </h3>
        <p className="text-xs text-gray-500">{item.description || ""}</p>
      </div>

      {/* Giá sản phẩm */}
      <div className="mr-4 text-sm font-semibold text-gray-700">
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(item?.unitPrice || 0)}
      </div>

      {/* Số lượng */}
      <div className="flex items-center space-x-1 mr-4">
        {/* Decrease button */}
        <button
          className="bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
          onClick={handleDecreaseClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Quantity input */}
        <div className="relative">
          <input
            type="number"
            value={quantity}
            onChange={e => {
              const value = parseInt(e.target.value) || 1;
              handleQuantityChange(Math.max(1, value));
            }}
            min="1"
            className="w-12 h-8 border border-gray-300 rounded-md text-center font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Increase button */}
        <button
          className="bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
          onClick={() => handleQuantityChange(quantity + 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Tổng tiền sản phẩm */}
      <div className="mr-4 text-sm font-semibold text-gray-700">
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(item?.totalPrice || 0)}
      </div>

      {/* Nút xóa sản phẩm */}
      <button
        onClick={handleRemove}
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Confirm remove modal */}
      {showConfirmRemove && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={handleCancelRemove}
          />
          <div className="bg-white rounded-lg shadow-lg z-10 max-w-sm w-full p-6">
            <h3 className="text-lg font-semibold mb-2">Xóa sản phẩm</h3>
            <p className="text-sm text-gray-600 mb-4">
              Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCancelRemove}
                className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmRemove}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItem;