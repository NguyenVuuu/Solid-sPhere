import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Check,
  Package,
  ChevronRight,
  Truck,
  RefreshCw,
  XCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../utils/redux/cartSlice";
import { useTranslation } from "react-i18next";
import { createOrderWithDetails, getOrderById, updatePlaysAllowedAfterOrder } from "../../apis/orderApi";
import notify from "../../utils/notify";

export default function ThankYouPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const [result, setResult] = useState({});
  const [orderData, setOrderData] = useState(null); // Order từ backend
  const [orderNumber, setOrderNumber] = useState("N/A");
  const [countdown, setCountdown] = useState(30);
  const [savedItems, setSavedItems] = useState([]);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false); // ⭐ Flag ngăn duplicate
  const [displayData, setDisplayData] = useState(null); // Chuyển thành state

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

  // Load displayData và orderID cho COD
  useEffect(() => {
    try {
      const data = localStorage.getItem("orderDisplay");
      if (data) {
        setDisplayData(JSON.parse(data));
      }
      
      // Nếu là COD (không có code param), lấy orderID từ localStorage
      const code = searchParams.get("code");
      if (!code) {
        const lastOrderId = localStorage.getItem("lastOrderId");
        if (lastOrderId) {
          setOrderNumber(lastOrderId);
        }
      }
    } catch (e) {
      console.error("Lỗi khi đọc orderDisplay:", e);
    }
  }, [searchParams]);

  const subtotal = displayData?.subtotal || 0;
  const tax = displayData?.tax || 0;
  const shippingCost = displayData?.shippingCost || 0;
  const discount = displayData?.discount
    ? (Number(subtotal) + Number(tax) + Number(shippingCost)) *
      Number(displayData.discount) *
      -1
    : 0;
  const total = displayData?.total || 0;

  // Xử lý VNPAY callback và TẠO ORDER SAU khi thanh toán thành công
  useEffect(() => {
    const code = searchParams.get("code");
    const amount = searchParams.get("amount");

    // Nếu không có code param → thanh toán COD (đã tạo order rồi)
    const isCOD = !code;
    
    setResult({
      code,
      amount: amount ? parseInt(amount) / 100 : 0,
      message:
        code === "00" 
          ? "Payment successful!" 
          : isCOD 
            ? "Order placed successfully! Please prepare cash for delivery."
            : "Payment failed or cancelled.",
      success: code === "00" || isCOD, // COD cũng là success
    });

    // ⭐ CHỈ tạo order cho VNPAY thành công (code=00)
    // COD đã tạo order rồi nên không cần tạo lại
    // ⭐ Check orderCreated flag và sessionStorage lock để tránh duplicate
    const orderLock = sessionStorage.getItem("orderCreationLock");
    
    if (code === "00" && !isCreatingOrder && !orderCreated && !orderLock) {
      setIsCreatingOrder(true);
      setOrderCreated(true); // ⭐ Đánh dấu đã tạo order
      sessionStorage.setItem("orderCreationLock", "true"); // ⭐ Lock tạo order

      const pendingOrder = sessionStorage.getItem("pendingOrder");
      if (!pendingOrder) {
        console.log("⚠️ No pendingOrder found (COD payment)");
        setIsCreatingOrder(false);
        sessionStorage.removeItem("orderCreationLock");
        return;
      }

      const orderPayload = JSON.parse(pendingOrder);
      console.log(
        "✅ VNPAY thanh toán thành công! Đang tạo order:",
        orderPayload
      );

      // Gọi API tạo order
      createOrderWithDetails(orderPayload)
        .then(response => {
          console.log("✅ Order created successfully:", response);
          const createdOrder = response.data || response;
          setOrderData(createdOrder);
          setOrderNumber(createdOrder.orderID || createdOrder.id || "N/A");

          // Lưu orderID vào localStorage để dùng sau
          localStorage.setItem(
            "lastOrderId",
            createdOrder.orderID || createdOrder.id
          );

          // Lấy items từ displayData để hiển thị
          const currentDisplayData = JSON.parse(
            localStorage.getItem("orderDisplay") || "{}"
          );
          if (currentDisplayData?.items) {
            setSavedItems(currentDisplayData.items);
          }

          // Clear cart SAU khi tạo order thành công
          const userId = getCurrentUserId();
          dispatch(clearCart(userId));
          
          // ⭐ Thêm 3 lượt chơi cho user khi tạo order thành công
          updatePlaysAllowedAfterOrder(userId)
            .then(updatedUser => {
              console.log("✅ Updated plays allowed:", updatedUser);
              // Update localStorage user
              if (updatedUser) {
                localStorage.setItem("user", JSON.stringify(updatedUser));
              }
            })
            .catch(err => console.error("Failed to update plays:", err));

          // Clear pendingOrder và lock (giữ orderDisplay để hiển thị)
          sessionStorage.removeItem("pendingOrder");
          sessionStorage.removeItem("orderCreationLock"); // ⭐ Remove lock

          notify.success("Đặt hàng thành công!");
          setIsCreatingOrder(false);
        })
        .catch(error => {
          console.error("❌ Failed to create order:", error);

          // Handle error codes
          const errorCode = error.response?.data?.code;
          const errorMessage = error.response?.data?.message || error.message;

          if (errorCode === 1302) {
            notify.error(
              "⚠️ Rất tiếc! Sản phẩm trong giỏ hàng không đủ số lượng tồn kho. " +
                "Vui lòng quay lại giỏ hàng và kiểm tra lại.",
              { autoClose: 7000 }
            );
          } else if (errorCode === 1303) {
            notify.error(
              "⚠️ Một số sản phẩm đã hết hàng. Vui lòng quay lại giỏ hàng.",
              { autoClose: 7000 }
            );
          } else if (errorCode === 1301) {
            notify.error(
              "⚠️ Sản phẩm không tồn tại. Vui lòng kiểm tra lại giỏ hàng.",
              { autoClose: 7000 }
            );
          } else {
            notify.error(
              `Tạo đơn hàng thất bại: ${errorMessage}. Vui lòng liên hệ hỗ trợ.`,
              { autoClose: 7000 }
            );
          }

          setIsCreatingOrder(false);
          sessionStorage.removeItem("orderCreationLock"); // ⭐ Remove lock on error
          // Redirect về cart sau 3 giây
          setTimeout(() => {
            navigate("/shopping_card");
          }, 3000);
        });
    }
  }, [searchParams, isCreatingOrder, orderCreated, dispatch, navigate]);

  // Countdown logic với cleanup khi redirect
  useEffect(() => {
    if (result.success && !isCreatingOrder && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && result.success && !isCreatingOrder) {
      // Clear localStorage trước khi redirect
      localStorage.removeItem("lastOrderId");
      localStorage.removeItem("orderDisplay");
      sessionStorage.removeItem("pendingOrder");

      navigate("/");
    }
  }, [countdown, result.success, isCreatingOrder, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-sm text-gray-500">
            Order #{orderNumber}
            {isCreatingOrder && (
              <span className="ml-2 text-yellow-600">(Đang tạo...)</span>
            )}
          </div>
        </div>

        {/* Payment Result Message */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex flex-col items-center text-center mb-8">
            <div
              className={`p-3 rounded-full mb-4 ${
                result.success ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {result.success ? (
                <Check className="text-green-600 w-8 h-8" />
              ) : (
                <XCircle className="text-red-600 w-8 h-8" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {result.success
                ? isCreatingOrder
                  ? "Đang xử lý đơn hàng..."
                  : "Thank You For Your Purchase!"
                : "Payment Failed or Cancelled"}
            </h1>
            {displayData?.paymentMethod === "VNPAY" && (
              <p className="text-lg text-gray-600 max-w-lg">{result.message}</p>
            )}

            {result.amount > 0 &&
              (displayData?.paymentMethod === "VNPAY" ? (
                result.success &&
                !isCreatingOrder && (
                  <p className="mt-2 text-sm text-gray-500">
                    Paid amount:{" "}
                    <strong>{result.amount.toLocaleString()} VND</strong>
                  </p>
                )
              ) : (
                <p className="mt-2 text-sm text-gray-500">
                  Please prepare{" "}
                  <strong>{result.amount.toLocaleString()} VND</strong> for
                  payment.
                </p>
              ))}
          </div>

          {result.success && !isCreatingOrder && (
            <>
              {/* Order Status */}
              <div className="border-t border-b border-gray-200 py-6 my-6">
                <div className="relative max-w-2xl mx-auto px-4">
                  <div className="absolute top-5 left-10 right-10 h-1 bg-gray-200 z-0"></div>
                  <div className="absolute top-5 left-10 right-1/2 h-1 bg-blue-200 z-10"></div>

                  <div className="relative z-20 flex justify-between items-center">
                    <div className="flex flex-col items-center">
                      <div className="bg-blue-600 rounded-full p-2 mb-2 z-10">
                        <Check className="text-white w-5 h-5" />
                      </div>
                      <span className="text-xs font-medium text-gray-600">
                        Order Placed
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-blue-100 rounded-full p-2 mb-2 z-10">
                        <Package className="text-blue-600 w-5 h-5" />
                      </div>
                      <span className="text-xs font-medium text-gray-400">
                        Processing
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-gray-200 rounded-full p-2 mb-2 z-10">
                        <Truck className="text-gray-400 w-5 h-5" />
                      </div>
                      <span className="text-xs font-medium text-gray-400">
                        Shipped
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              {/* <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  {t("cart.order_summary")}
                </h2>
                <div className="space-y-4 mb-6">
                  {savedItems.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-16 h-16 object-cover rounded-md bg-white p-2 border border-gray-200"
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium text-gray-800">
                          {item.productName}
                        </h3>
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-sm font-medium text-gray-800">
                        {parseFloat(item.price).toLocaleString("vi-VN")} VND
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">
                      {t("remaining.subtotal")}
                    </span>
                    <span className="font-medium">
                      {subtotal.toLocaleString()} VND
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">
                      {t("remaining.shipping")}
                    </span>
                    <span className="font-medium">
                      {shippingCost.toLocaleString()} VND
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">{t("cart.tax")}</span>
                    <span className="font-medium">
                      {tax.toLocaleString()} VND
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">{t("cart.discount")}</span>
                    <span className="font-medium text-green-500">
                      {discount.toLocaleString("vi-VN")} VND
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-medium mt-4">
                    <span className="text-gray-800">
                      {t("remaining.total")}
                    </span>
                    <span className="text-blue-700">
                      {total.toLocaleString("vi-VN")} VND
                    </span>
                  </div>
                </div>
              </div> */}
            </>
          )}
        </div>

        {/* Next Steps (only if success) */}
        {result.success && !isCreatingOrder && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              What's Next?
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-4">
                  <RefreshCw className="text-blue-600 w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-800">
                    {t("order.track_your_order")}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Check your email for tracking information once your order
                    ships.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-4">
                  <Package className="text-blue-600 w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-800">
                    Prepare for Delivery
                  </h3>
                  <p className="text-sm text-gray-600">
                    Ensure someone is available to receive your package or
                    follow tracking instructions for delivery updates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Redirect Notice */}
        {!isCreatingOrder && (
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              Redirecting to homepage in{" "}
              <span className="font-medium text-blue-600">{countdown}</span>{" "}
              seconds...
            </p>
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
              <ChevronRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}