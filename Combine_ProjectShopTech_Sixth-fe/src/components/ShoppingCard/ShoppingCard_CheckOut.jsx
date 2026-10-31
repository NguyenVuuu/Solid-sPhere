import React, { useState, useContext } from "react";
import Support from "../../components/Support/Support";
import { Link, useLocation, useNavigate } from "react-router-dom";
import path from "../../constant/path";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../context/UserContext"; // Đảm bảo đường dẫn chính xác

// Component tượng trưng cho Order Summary (đã chỉnh sửa để nhận prop và hiển thị dữ liệu thật)
const OrderSummary = ({ cartItems, selectedShippingCost }) => {
  const { t } = useTranslation();

  console.log("Cart Items in OrderSummary:", cartItems); // Kiểm tra dữ liệu cartItems
  const subtotal = 50000;
  const total = subtotal + selectedShippingCost;

  return (
    <div className="bg-white rounded-md shadow-md p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">
        {t("cart.order_summary")}
      </h2>
      <div className="space-y-3">
        {cartItems.length === 0 ? (
          <p className="text-sm text-gray-500">{t("cart.gi_hng_trng")}</p>
        ) : (
          cartItems.map(item => (
            <div
              className="flex items-center justify-between"
              key={item.productID}
              style={{ width: "100%" }}
            >
              {" "}
              {/* Thêm inline style */}
              <div className="flex items-center" style={{ flexGrow: 1 }}>
                {" "}
                {/* Thêm inline style */}
                <div className="w-16 h-16 bg-gray-200 rounded-md mr-3">
                  {item.images && item.images.length > 0 && (
                    <img
                      src={item.images[0]}
                      alt={item.productName}
                      className="w-full h-full object-cover rounded-md"
                    />
                  )}
                </div>
                <div style={{ flexGrow: 1 }}>
                  {" "}
                  {/* Thêm inline style */}
                  <h6 className="text-sm font-medium text-gray-800">
                    {item.productName}
                  </h6>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-gray-800">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(item.price * item.quantity)}
              </span>
            </div>
          ))
        )}
        <div className="border-t border-gray-200 pt-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {t("remaining.subtotal")}
            </span>
            <span className="text-sm font-semibold text-gray-800"></span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm text-gray-600">
              {t("remaining.shipping")}
            </span>
            <span className="text-sm font-semibold text-gray-800">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(selectedShippingCost)}
            </span>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-3">
          <div className="flex items-center justify-between">
            <span className="text-md font-semibold text-gray-800">
              {t("remaining.total")}
            </span>
            <span className="text-md font-bold text-indigo-600">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

function ShoppingCard_CheckOut() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  const cartItems = useSelector(state => state.cart.carts);
  const [selectedShippingOption, setSelectedShippingOption] =
    useState("standard");
  const { user } = useContext(UserContext); // Lấy thông tin user từ UserContext

  // Tính toán phí vận chuyển dựa trên tùy chọn đã chọn
  const shippingCost = selectedShippingOption === "standard" ? 20000 : 0;

  const [email, setEmail] = useState(user?.email || ""); // Sử dụng optional chaining
  const [firstName, setFirstName] = useState(
    user?.fullName?.split(" ")[0] || ""
  ); // Sử dụng optional chaining
  const [lastName, setLastName] = useState(
    user?.fullName?.split(" ").slice(1).join(" ") || ""
  ); // Sử dụng optional chaining
  const [streetAddress, setStreetAddress] = useState(user?.address || ""); // Sử dụng optional chaining
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || ""); // Sử dụng optional chaining

  const handleNext = () => {
    navigate("/shopping_card_item");
  };

  const handleShippingChange = event => {
    setSelectedShippingOption(event.target.value);
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <Link to={path.home} className="text-blue-500 hover:underline mr-1">
              {t("product.home")}
            </Link>
            <span className="mr-1">/</span>
            <Link to={path.card} className="text-blue-500 hover:underline mr-1">
              Shopping Cart
            </Link>
            <span className="mr-1">/</span>
            <span>{t("cart.checkout_process")}</span>
          </div>
          <div className="flex items-center">
            {" "}
            {/* Sử dụng flex để xếp hàng ngang và căn chỉnh dọc */}
            <h1 className="text-2xl font-bold mb-4 mr-4 mt-4">
              {t("remaining.checkout")}
            </h1>{" "}
            {/* Thêm margin-right */}
            {/* Nút Sign In */}
            <Link to={path.login}>
              {" "}
              {/* Thay đổi path.login bằng đường dẫn đăng nhập của bạn */}
              <button className="bg-white border border-blue-500 text-blue-500 font-semibold py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
                {t("cart.sign_in")}
              </button>
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-2 items-center">
            <div className=""></div>
            <div className="mt-4 flex items-center justify-center space-x-8">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="ml-2 text-sm font-semibold text-indigo-600">
                  {t("remaining.shipping")}
                </span>
              </div>
              <div className="border-t-2 border-gray-300 w-24"></div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 text-gray-500 flex items-center justify-center text-xs font-semibold">
                  2
                </div>
                <span className="ml-2 text-sm text-gray-500">
                  {t("cart.payment_review")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Address Form */}
          <div className="bg-white rounded-md shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              {t("cart.shipping_address")}
            </h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("cart.email_address")}
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {t("cart.you_can_create_an")}
                </p>
              </div>
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("cart.first_name")}
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("cart.last_name")}
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("cart.company")}
                </label>
                <input
                  type="text"
                  id="company"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="streetAddress"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("cart.street_address")}
                </label>
                <input
                  type="text"
                  id="streetAddress"
                  value={streetAddress}
                  onChange={e => setStreetAddress(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <input
                  type="text"
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />{" "}
                {/* Address Line 2 (Optional) */}
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("cart.city")}
                </label>
                <input
                  type="text"
                  id="city"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="stateProvince"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("cart.stateprovince")}
                </label>
                <select
                  id="stateProvince"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option>{t("cart.please_select_a_region")}</option>
                  {/* Add options here */}
                </select>
              </div>
              <div>
                <label
                  htmlFor="zipPostalCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("cart.zippostal_code")}
                </label>
                <input
                  type="text"
                  id="zipPostalCode"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("cart.country")}
                </label>
                <select
                  id="country"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option>{t("cart.united_states")}</option>
                  {/* Add options here */}
                </select>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("cart.phone_number")}
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <OrderSummary
              cartItems={cartItems}
              selectedShippingCost={shippingCost}
            />

            {/* Shipping Options */}
            <div className="bg-white rounded-md shadow-md p-4 mt-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">
                {t("cart.shipping_options")}
              </h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="shipping"
                      id="standard"
                      className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      value="standard"
                      checked={selectedShippingOption === "standard"}
                      onChange={handleShippingChange}
                    />
                    <label
                      htmlFor="standard"
                      className="ml-2 text-sm text-gray-700"
                    >
                      {t("cart.standard_shipping")}
                    </label>
                  </div>
                  <span className="text-sm text-gray-700">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(20000)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 ml-6">
                  {t("cart.price_may_vary_depending")}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="shipping"
                      id="pickup"
                      className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      value="pickup"
                      checked={selectedShippingOption === "pickup"}
                      onChange={handleShippingChange}
                    />
                    <label
                      htmlFor="pickup"
                      className="ml-2 text-sm text-gray-700"
                    >
                      {t("cart.pickup_from_store")}
                    </label>
                  </div>
                  <span className="text-sm text-gray-700">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(0)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 ml-6">
                  {t("cart.1234_street_address_city")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className="mt-8 flex justify-end">
          <Link to={path.shopping_card_item}>
            <button
              onClick={handleNext}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {t("cart.next")}
            </button>
          </Link>
        </div>
      </div>
      <Support></Support>
    </div>
  );
}

export default ShoppingCard_CheckOut;
