import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../../utils/redux/cartSlice";
import path from "../../constant/path";
import axios from "axios";
import { addOrder } from "../../utils/redux/orderSlice";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
import { API_BASE_URL } from "../../config/api";
const CreateOrder = ({
  customerInfo,
  cartItems,
  paymentMethod,
  shippingCost,
  voucher,
}) => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Calculate order totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const taxRate = 0.1;
  const tax = subtotal * taxRate;
  const discount = voucher.discount / 100; // You can add discount logic here if needed
  console.log("voucher", voucher);

  const total = (subtotal + tax + shippingCost) * (1 - discount);
  console.log("total", total);

  // const handleCreateOrder = () => {
  //   // Create the order object
  //   const order = {
  //     orderId: generateOrderId(),
  //     orderDate: new Date().toISOString(),
  //     customer: customerInfo.id,
  //     items: cartItems,
  //     subtotal,
  //     tax,
  //     shippingCost,
  //     discount,
  //     total,
  //     paymentMethod,
  //     shippingMethod: shippingCost === 0 ? "Pickup from store" : "Standard Shipping",
  //     status: "Processing",
  //   };

  //   // Save the order to localStorage (in a real app, you would send this to a server)
  //   const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
  //   const updatedOrders = [...existingOrders, order];
  //   localStorage.setItem("orders", JSON.stringify(updatedOrders));

  //   // Clear the cart
  //   dispatch(clearCart());

  //   // Call the callback if provided
  //   if (onOrderCreated) {
  //     onOrderCreated(order);
  //   }

  //   // Navigate to the order confirmation page
  //   navigate(`${path.order_confirmation}/${order.orderId}`);
  // };

  // const handleCreateOrder = async () => {
  //   const orderData = {
  //     customerID: customerInfo.id, // Sửa thành customerID
  //     employeeID: null,
  //     voucherID: null,
  //     totalAmount: total,
  //     status: "Shipping",
  //   };

  //   try {
  //     const response = await axios.post('http://localhost:4000/api/order/add', orderData); // Sử dụng axios.post

  //     if (response.data.EC === 1) {
  //       console.log('Đơn hàng đã được lưu thành công, Order ID:', response.data.DT.orderID);

  //       // Hiển thị thông báo xác nhận thanh toán
  //       const confirmPayment = window.confirm("Bạn có chắc chắn muốn thanh toán đơn hàng này?");
  //       if (!confirmPayment) {
  //         return; // Nếu người dùng không xác nhận, dừng lại
  //       }

  //       // Hiển thị thông báo đặt hàng thành công
  //       alert("Đặt hàng thành công!");

  //       // Xóa giỏ hàng sau khi đặt hàng thành công
  //       dispatch(clearCart());

  //       // Điều hướng về trang chủ
  //       navigate(path.home);
  //     } else {
  //       console.error('Lỗi khi lưu đơn hàng:', response.data.EM);
  //       // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi cho người dùng)
  //       alert("Đã xảy ra lỗi khi lưu đơn hàng. Vui lòng thử lại.");
  //     }
  //   } catch (error) {
  //     console.error('Lỗi khi gọi API lưu đơn hàng:', error);
  //     // Xử lý lỗi mạng hoặc lỗi server
  //     alert("Đã xảy ra lỗi khi kết nối đến máy chủ. Vui lòng thử lại.");
  //   }
  // };

  const handleCreateOrder = async () => {
    const orderData = {
      customerID: customerInfo.id, // Sửa thành customerID
      employeeID: null,
      voucherID: voucher.id,
      totalAmount: total,
      status: "Shipping",
      cartItems: cartItems.map((item) => ({
        productID: item.productID,
        quantity: item.quantity,
        price: item.price,
      })), // Chuẩn bị dữ liệu chi tiết đơn hàng
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/order/add`,
        orderData
      ); // Sử dụng axios.post

      if (response.data.EC === 1) {
        console.log(
          "Đơn hàng đã được lưu thành công, Order ID:",
          response.data.DT.orderID
        );
        // Dispatch action để lưu đơn hàng vào Redux store
        // Tạo đối tượng order để lưu vào Redux
        const order = {
          orderID: response.data.DT.orderID,
          orderDate: new Date().toISOString(),
          customer: customerInfo,
          items: cartItems,
          subtotal,
          tax,
          shippingCost,
          discount: discount,
          total,
          paymentMethod,
          shippingMethod:
            shippingCost === 0 ? "Pickup from store" : "Standard Shipping",
          status: "Processing",
        };
        localStorage.setItem("orders", JSON.stringify(order));
        console.log(order);

        dispatch(addOrder(order));
        // Hiển thị thông báo xác nhận thanh toán
        const confirmPayment = window.confirm(
          "Bạn có chắc chắn muốn thanh toán đơn hàng này?"
        );
        if (!confirmPayment) {
          return; // Nếu người dùng không xác nhận, dừng lại
        }

        // Điều hướng về trang cảm ơn
        navigate(`/thank_for_shopping?code=00&amount=${total * 100}`); // Navigate to thank you page with parameters
        // navigate(path.home);
        toast.success("Đặt hàng thành công!");
      } else {
        console.error("Lỗi khi lưu đơn hàng:", response.data.EM);
        alert("Đã xảy ra lỗi khi lưu đơn hàng. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API lưu đơn hàng:", error);
      alert("Đã xảy ra lỗi khi kết nối đến máy chủ. Vui lòng thử lại.");
    }
  };
  return (
    <div className="mt-8">
      <button
        onClick={handleCreateOrder}
        className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition duration-200 flex items-center justify-center"
      >
        <span className="mr-2">{t('cart.complete_order')}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default CreateOrder;

// Updated: 2025-10-12T16:06:33.290Z

// Updated: 2025-10-12T16:08:45.428Z
