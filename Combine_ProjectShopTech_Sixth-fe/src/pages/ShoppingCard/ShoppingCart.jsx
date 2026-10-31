"use client";

import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import path from "../../constant/path";
import CartItem from "../../components/ShoppingCard/ShoppingCardItem";
import {
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  loadCartItems,
  // triggerCartRefresh,
} from "../../utils/redux/cartSlice";
import { useState, useEffect } from "react";
import ConfirmModal from "../../components/ConfirmModal";

const ShoppingCart = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Lấy dữ liệu giỏ hàng từ Redux
  const {
    carts: cartItems,
    cartSummary,
    loading,
    error,
    // needsRefresh,
  } = useSelector(state => state.cart);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(() => () => {});

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

  // Load cart items khi component mount
  useEffect(() => {
    const userId = getCurrentUserId();
    if (userId) {
      dispatch(loadCartItems(userId));
    }
  }, [dispatch]);

  // 🔄 Listen needsRefresh để tự động reload khi CartDropdown update
  const [isInitialMount, setIsInitialMount] = useState(true);

  // useEffect(() => {
  //   // Skip lần mount đầu tiên
  //   if (isInitialMount) {
  //     setIsInitialMount(false);
  //     return;
  //   }

  //   const userId = getCurrentUserId();
  //   if (userId) {
  //     console.log(
  //       "🔄 ShoppingCart: needsRefresh triggered, reloading cart...",
  //       { needsRefresh }
  //     );
  //     dispatch(loadCartItems(userId))
  //       .unwrap()
  //       .then(res => {
  //         console.log("✅ ShoppingCart: Cart reloaded successfully", res);
  //       })
  //       .catch(err => {
  //         console.error("❌ ShoppingCart: Failed to reload cart:", err);
  //       });
  //   }
  // }, [needsRefresh]);

  const openConfirm = (message, action) => {
    setConfirmMessage(message);
    setConfirmAction(() => action || (() => {}));
    setConfirmOpen(true);
  };

  const handleConfirmOk = () => {
    setConfirmOpen(false);
    try {
      confirmAction();
    } catch (e) {
      console.error(e);
    }
  };

  const handleConfirmCancel = () => setConfirmOpen(false);

  // Xử lý cập nhật giỏ hàng
  const handleRemove = async productId => {
    const userId = getCurrentUserId();
    await dispatch(removeFromCart({ userId, productId }))
      .unwrap()
      .then(() => {
        // dispatch(triggerCartRefresh()); // ✅ Gửi tín hiệu reload cho dropdown
      })
      .catch(err => console.error(err));
  };

  // CartPage.jsx
  const handleQuantityChange = (productId, newQuantity) => {
    const userId = getCurrentUserId();
    dispatch(
      updateCartItemQuantity({ userId, productId, quantity: newQuantity })
    )
      .unwrap()
      .then(() => {
        // dispatch(triggerCartRefresh()); // ✅ Gửi tín hiệu reload cho dropdown
      })
      .catch(err => console.error(err));
  };

  const handleClearCart = () => {
    const userId = getCurrentUserId();
    openConfirm(t("cart.remove"), () => dispatch(clearCart(userId)));
  };
  const [loginConfirmOpen, setLoginConfirmOpen] = useState(false);
  const handleCheckout = () => {
    const userId = getCurrentUserId();

    if (!userId) {
      setLoginConfirmOpen(true);
    } else if (cartItems.length === 0) {
      openConfirm(t("cart.gi_hng_trng"));
    } else {
      navigate(path.shopping_card_checkout);
    }
  };

  // Tính tổng tiền từ cartSummary hoặc từ cartItems
  const subtotal = cartSummary
    ? cartSummary.totalAmount
    : cartItems.reduce((sum, item) => sum + (item.totalPrice || 0), 0);

  const formatCurrency = value =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);

  return (
    <div className="container mx-auto p-6">
      {/* Breadcrumb */}
      <div className="mt-2 flex items-center text-sm text-gray-500">
        <Link to={path.home} className="text-blue-500 hover:underline mr-1">
          {t("product.home")}
        </Link>
        <span className="mr-1">/</span>
        <span>{t("cart.title")}</span>
      </div>

      <h1 className="text-2xl font-bold mb-4 mt-4">{t("cart.title")}</h1>

      {loading && (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p>{t("common.loading")}</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>
            {t("common.error")}: {error}
          </p>
        </div>
      )}

      {!loading && cartItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-600">
          <p>{t("cart.gi_hng_trng")}</p>
          <Link to={path.home}>
            <button className="mt-4 bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition">
              {t("cart.tip_tc_mua_sm")}
            </button>
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            {cartItems.map(item => (
              <CartItem
                key={item.id}
                item={{
                  productID: item.product.id,
                  name: item.product.name,
                  price: item.unitPrice,
                  imageUrl: item.product.imageUrl,
                  quantity: item.quantity,
                  totalPrice: item.totalPrice,
                }}
                onQuantityChange={handleQuantityChange}
                onRemove={() => handleRemove(item.product.id)}
              />
            ))}

            <div className="flex justify-between mt-6">
              <button
                onClick={handleClearCart}
                className="bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition"
              >
                {t("cart.xa_gi_hng")}
              </button>
              <button
                onClick={handleCheckout}
                className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition"
              >
                {t("cart.checkout")}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between text-lg font-semibold">
              <span>{t("order.subtotal")}</span>
              <span className="text-indigo-600">
                {formatCurrency(subtotal)}
              </span>
            </div>
          </div>
        </>
      )}

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmOpen}
        title={t("cart.remove")}
        message={confirmMessage}
        onConfirm={handleConfirmOk}
        onCancel={handleConfirmCancel}
        confirmText={t("common.confirm")}
        cancelText={t("common.cancel")}
      />
      <ConfirmModal
        isOpen={loginConfirmOpen}
        title={t("header.pleaseLogin")}
        message={t("cart.please_login_to_checkout")}
        onConfirm={() => {
          setLoginConfirmOpen(false);
          navigate(path.login);
        }}
        onCancel={() => setLoginConfirmOpen(false)}
        confirmText={t("header.login")}
        cancelText={t("common.cancel")}
      />
    </div>
  );
};

export default ShoppingCart;