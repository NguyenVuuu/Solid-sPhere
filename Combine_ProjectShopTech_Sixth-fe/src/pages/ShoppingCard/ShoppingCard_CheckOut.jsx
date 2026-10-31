"use client";

import { useState, useContext,useEffect } from "react";
import Support from "../../components/Support/Support";
import { Link, useNavigate } from "react-router-dom";
import path from "../../constant/path";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../context/UserContext"; // Đảm bảo đường dẫn chính xác
import DiscountModal from "../../components/DiscountModal";
// import { getActiveDiscounts } from "../../apis/discountApi";

// Component tượng trưng cho Order Summary (đã chỉnh sửa để nhận prop và hiển thị dữ liệu thật)
const OrderSummary = ({ cartItems, selectedShippingCost }) => {
  const { t } = useTranslation();

  //get order data from localstorage
  // const orderData = JSON.parse(localStorage.getItem("orderData")) || {};
  //calcute subtotal from cartItems of orderData
  const getUnitPrice = (item) => {
    // Prefer numeric unitPrice if available
    if (typeof item?.unitPrice === "number") return item.unitPrice;
    // Fallback to price string like "11.495.000 ₫"
    if (typeof item?.price === "string") {
      const parsed = parseFloat(item.price.replace(/[^\d.-]/g, "")) || 0;
      return parsed;
    }
    // Fallback to number in price field
    if (typeof item?.price === "number") return item.price;
    // Last resort: derive from totalPrice/quantity
    if (item?.totalPrice && item?.quantity) {
      const q = Number(item.quantity) || 1;
      return Number(item.totalPrice) / q;
    }
    return 0;
  };

  const subtotal = cartItems.reduce((total, item) => {
    const unit = getUnitPrice(item);
    const qty = Number(item?.quantity) || 1;
    return total + unit * qty;
  }, 0);
  const total = subtotal + selectedShippingCost;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h2 className="text-base font-semibold text-gray-800 mb-3">
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
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-14 h-14 bg-gray-100 border border-gray-200 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={
                      item.image ||
                      item.imageUrl ||
                      item.product?.imageUrl ||
                      "/placeholder.svg"
                    }
                    alt={item.productName}
                    className="w-full h-full object-contain"
                    onError={e => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h6 className="text-sm font-medium text-gray-800 truncate">
                    {item.productName}
                  </h6>
                  <p className="text-xs text-gray-500">
                    x{Number(item.quantity) || 1}
                  </p>
                </div>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(getUnitPrice(item) * (Number(item.quantity) || 1))}
              </span>
            </div>
          ))
        )}
        <div className="border-t border-gray-200 pt-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {t("remaining.subtotal")}
            </span>
            <span className="text-sm font-semibold text-gray-900">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(subtotal)}
            </span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm text-gray-600">
              {t("remaining.shipping")}
            </span>
            <span className="text-sm font-semibold text-gray-900">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(selectedShippingCost)}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-800">
              {t("remaining.total")}
            </span>
            <span className="text-base font-bold text-indigo-600">
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
  // const location = useLocation()
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.carts);
  const [selectedShippingOption, setSelectedShippingOption] =
    useState("standard");
  const { user } = useContext(UserContext); // Lấy thông tin user từ UserContext
  const { t } = useTranslation();

  // Tính toán phí vận chuyển dựa trên tùy chọn đã chọn
  const shippingCost = selectedShippingOption === "standard" ? 20000 : 0;

  var id;
  if (user) {
    id = user.id;
  } else {
    id = 0;
  }
  const [email, setEmail] = useState(user?.email || ""); // Sử dụng optional chaining
  const [firstName, setFirstName] = useState(
    user?.fullName?.split(" ")[0] || ""
  ); // Sử dụng optional chaining
  const [lastName, setLastName] = useState(
    user?.fullName?.split(" ").slice(1).join(" ") || ""
  ); // Sử dụng optional chaining
  const [streetAddress, setStreetAddress] = useState(user?.address || ""); // Sử dụng optional chaining
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || ""); // Sử dụng optional chaining
  const [country, setCountry] = useState({ selectedOption: "vietnam" });
  const [stateProvince, setState] = useState({ selectedOption: "" });
  const [city, setCity] = useState("");
  // State để lưu lỗi
  const [errors, setErrors] = useState({});

  // --- Auto-detect city/province/country from shipping address ---
  const removeVietnameseTones = str => {
    return String(str)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase();
  };

  // Map a few common provinces/cities -> option values defined in <select>
  const PROVINCE_MAP = [
    { code: "hanoi", keywords: ["ha noi", "hanoi", "thu do ha noi"] },
    {
      code: "hochiminh",
      keywords: ["tp.hcm", "ho chi minh", "hcm", "thanh pho ho chi minh"],
    },
    { code: "danang", keywords: ["da nang", "danang"] },
    { code: "cantho", keywords: ["can tho", "cantho"] },
    { code: "haiphong", keywords: ["hai phong", "haiphong"] },
    { code: "binhduong", keywords: ["binh duong", "binhduong", "bd"] },
    { code: "dongnai", keywords: ["dong nai", "dongnai"] },
    { code: "khanhhoa", keywords: ["khanh hoa", "khanhhoa", "nha trang"] },
    { code: "quangninh", keywords: ["quang ninh", "quangninh"] },
    { code: "nghean", keywords: ["nghe an", "nghean", "vinh"] },
    { code: "thai nguyen", keywords: ["thai nguyen", "thainguyen"] },
  ];

  const detectProvinceCode = address => {
    const norm = removeVietnameseTones(address || "");
    for (const p of PROVINCE_MAP) {
      if (p.keywords.some(k => norm.includes(k))) return p.code;
    }
    return "";
  };

  // Try to guess city from address by using the segment before province or last district segment
  const detectCityFromAddress = (address, provinceCode) => {
    if (!address) return "";
    const parts = address.split(",").map(p => p.trim()).filter(Boolean);
    if (parts.length >= 2) {
      // If we detected province by name, try to find that segment, else take second last
      const normParts = parts.map(removeVietnameseTones);
      const provinceMatchIndex = (() => {
        if (!provinceCode) return -1;
        const province = PROVINCE_MAP.find(p => p.code === provinceCode);
        if (!province) return -1;
        return normParts.findIndex(segment =>
          province.keywords.some(k => segment.includes(k))
        );
      })();
      if (provinceMatchIndex > 0) {
        return parts[provinceMatchIndex - 1];
      }
      // Fallback: take the second last segment as city/district
      return parts[parts.length - 2];
    }
    return "";
  };

  // Auto-fill when shipping address changes
  useEffect(() => {
    if (!streetAddress || streetAddress.trim().length < 3) return;
    const provinceCode = detectProvinceCode(streetAddress);
    if (provinceCode) {
      setState({ selectedOption: provinceCode });
      // default country to Vietnam when we detect a VN province
      setCountry(prev => (prev?.selectedOption ? prev : { selectedOption: "vietnam" }));

      const guessedCity = detectCityFromAddress(streetAddress, provinceCode);
      if (guessedCity) setCity(guessedCity);
    } else {
      // If cannot detect province, keep current selections; user can pick manually
      const guessedCity = detectCityFromAddress(streetAddress, "");
      if (guessedCity) setCity(guessedCity);
    }
  }, [streetAddress]);

  const handleNext = e => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form
    // Only check once when component mounts
    // if (!user) {
    //   if (window.confirm(t("cart.please_login_to_view_cart"))) {
    //     navigate(path.login);
    //     return;
    //   } else {
    //     // If user cancels the confirmation, navigate back to previous page
    //     navigate(-1);
    //   }
    // }
    // Empty dependency array so it only runs once

    // Kiểm tra các trường bắt buộc
    const newErrors = {};
    if (!email.trim()) newErrors.email = t("form.email_required");
    if (!firstName.trim()) newErrors.firstName = t("form.first_name_required");
    if (!lastName.trim()) newErrors.lastName = t("form.last_name_required");
   
    // if (!phoneNumber.trim()) newErrors.phoneNumber = t("form.phone_required");
    if (!city.trim()) newErrors.city = t("form.city_required");
    if (!country.selectedOption) newErrors.country = t("form.country_required");
    // Nếu có lỗi, đặt lỗi vào state và focus vào ô đầu tiên bị lỗi
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorField = Object.keys(newErrors)[0];
      document.getElementById(firstErrorField)?.focus();
      return;
    }

    // Nếu không có lỗi, lưu shipping cost và chuyển hướng
    localStorage.setItem("selectedShippingCost", shippingCost);
    //address la cac field shipping address+ city, state, province+ country

    // Lưu thông tin khách hàng vào localStorage
    const customerInfo = {
      id,
      firstName,
      lastName,
      email,
      fullAddress:
        streetAddress +
        ", " +
        city +
        ", " +
        stateProvince.selectedOption +
        ", " +
        country.selectedOption,
      phoneNumber,
    };
    localStorage.setItem("customerInfo", JSON.stringify(customerInfo));

    navigate(path.shopping_payment);
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
            {/* <Link to={path.login}>
              <button className="bg-white border border-blue-500 text-blue-500 font-semibold py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">{t('cart.sign_in')}</button>
            </Link> */}
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
                  Shipping
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
              Shipping Infomation
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
                  className={`mt-1 block w-full h-10 rounded-md bg-gray-50 border border-gray-200 px-3 text-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
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
                  className={`mt-1 block w-full h-10 rounded-md bg-gray-50 border border-gray-200 px-3 text-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 ${
                    errors.firstName ? "border-red-500" : ""
                  }`}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.firstName}
                  </p>
                )}
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
                  className={`mt-1 block w-full h-10 rounded-md bg-gray-50 border border-gray-200 px-3 text-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 ${
                    errors.lastName ? "border-red-500" : ""
                  }`}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="streetAddress"
                  className="block text-sm font-medium text-gray-700"
                >
                  Shipping Address *
                </label>
                <input
                  type="text"
                  id="streetAddress"
                  value={streetAddress}
                  onChange={e => setStreetAddress(e.target.value)}
                  className={`mt-1 block w-full h-10 rounded-md bg-gray-50 border border-gray-200 px-3 text-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 ${
                    errors.streetAddress ? "border-red-500" : ""
                  }`}
                />
                {errors.streetAddress && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.streetAddress}
                  </p>
                )}
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
                  className="mt-1 block w-full h-10 rounded-md bg-gray-50 border border-gray-200 px-3 text-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                  onChange={e => setCity(e.target.value)}
                  value={city}
                />
              </div>
              <div>
                <label
                  htmlFor="stateProvince"
                  className="block text-sm font-medium text-gray-700"
                >
                  State/Province
                </label>
                <select
                  id="stateProvince"
                  className="mt-1 block w-full h-10 rounded-md bg-gray-50 border border-gray-200 px-3 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                  onChange={e => setState({ selectedOption: e.target.value })}
                  value={stateProvince.selectedOption}
                >
                  <option value="">{t("cart.please_select_a_region")}</option>
                  <option value="hanoi">{t("cart.h_ni")}</option>
                  <option value="hochiminh">{t("cart.h_ch_minh")}</option>
                  <option value="haiphong">{t("cart.hi_phng")}</option>
                  <option value="danang">{t("cart.nng")}</option>
                  <option value="cantho">{t("cart.cn_th")}</option>
                  <option value="angiang">{t("cart.an_giang")}</option>
                  <option value="bacgiang">{t("cart.bc_giang")}</option>
                  <option value="backan">{t("cart.bc_kn")}</option>
                  <option value="baclieu">{t("cart.bc_liu")}</option>
                  <option value="bacninh">{t("cart.bc_ninh")}</option>
                  <option value="bentre">{t("cart.bn_tre")}</option>
                  <option value="binhdinh">{t("cart.bnh_nh")}</option>
                  <option value="binhduong">{t("cart.bnh_dng")}</option>
                  <option value="binhphuoc">{t("cart.bnh_phc")}</option>
                  <option value="binhthuan">{t("cart.bnh_thun")}</option>
                  <option value="camau">{t("cart.c_mau")}</option>
                  <option value="caobang">{t("cart.cao_bng")}</option>
                  <option value="daklak">{t("cart.k_lk")}</option>
                  <option value="daknong">{t("cart.k_nng")}</option>
                  <option value="dienbien">{t("cart.in_bin")}</option>
                  <option value="dongnai">{t("cart.ng_nai")}</option>
                  <option value="dongthap">{t("cart.ng_thp")}</option>
                  <option value="gialai">{t("cart.gia_lai")}</option>
                  <option value="hagiang">{t("cart.h_giang")}</option>
                  <option value="hanam">{t("cart.h_nam")}</option>
                  <option value="hatinh">{t("cart.h_tnh")}</option>
                  <option value="haiduong">{t("cart.hi_dng")}</option>
                  <option value="haugiang">{t("cart.hu_giang")}</option>
                  <option value="hoabinh">{t("cart.ha_bnh")}</option>
                  <option value="hungyen">{t("cart.hng_yn")}</option>
                  <option value="khanhhoa">{t("cart.khnh_ha")}</option>
                  <option value="kiengiang">{t("cart.kin_giang")}</option>
                  <option value="kontum">{t("cart.kon_tum")}</option>
                  <option value="laichau">{t("cart.lai_chu")}</option>
                  <option value="lamdong">{t("cart.lm_ng")}</option>
                  <option value="langson">{t("cart.lng_sn")}</option>
                  <option value="laocai">{t("cart.lo_cai")}</option>
                  <option value="longan">{t("cart.long_an")}</option>
                  <option value="namdinh">{t("cart.nam_nh")}</option>
                  <option value="nghean">{t("cart.ngh_an")}</option>
                  <option value="ninhbinh">{t("cart.ninh_bnh")}</option>
                  <option value="ninhthuan">{t("cart.ninh_thun")}</option>
                  <option value="phutho">{t("cart.ph_th")}</option>
                  <option value="phuyen">{t("cart.ph_yn")}</option>
                  <option value="quangbinh">{t("cart.qung_bnh")}</option>
                  <option value="quangnam">{t("cart.qung_nam")}</option>
                  <option value="quangngai">{t("cart.qung_ngi")}</option>
                  <option value="quangninh">{t("cart.qung_ninh")}</option>
                  <option value="quangtri">{t("cart.qung_tr")}</option>
                  <option value="soctrang">{t("cart.sc_trng")}</option>
                  <option value="sonla">{t("cart.sn_la")}</option>
                  <option value="tayninh">{t("cart.ty_ninh")}</option>
                  <option value="thaibinh">{t("cart.thi_bnh")}</option>
                  <option value="thainguyen">{t("cart.thi_nguyn")}</option>
                  <option value="thanhhoa">{t("cart.thanh_ha")}</option>
                  <option value="thuathienhue">{t("cart.tha_thin_hu")}</option>
                  <option value="tiengiang">{t("cart.tin_giang")}</option>
                  <option value="travinh">{t("cart.tr_vinh")}</option>
                  <option value="tuyenquang">{t("cart.tuyn_quang")}</option>
                  <option value="vinhlong">{t("cart.vnh_long")}</option>
                  <option value="vinhphuc">{t("cart.vnh_phc")}</option>
                  <option value="yenbai">{t("cart.yn_bi")}</option>
                </select>
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
                  className="mt-1 block w-full h-10 rounded-md bg-gray-50 border border-gray-200 px-3 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                  onChange={e => setCountry({ selectedOption: e.target.value })}
                  value={country.selectedOption}
                >
                  <option value="vietnam">{t("cart.vit_nam")}</option>
                  <option value="us">{t("cart.united_states")}</option>
                  <option value="china">{t("cart.china")}</option>
                  <option value="japan">{t("cart.japan")}</option>
                  <option value="korea">{t("cart.south_korea")}</option>
                  <option value="singapore">{t("cart.singapore")}</option>
                  <option value="thailand">{t("cart.thailand")}</option>
                  <option value="malaysia">{t("cart.malaysia")}</option>
                  <option value="indonesia">{t("cart.indonesia")}</option>
                  <option value="philippines">{t("cart.philippines")}</option>
                  <option value="australia">{t("cart.australia")}</option>
                  <option value="uk">{t("cart.united_kingdom")}</option>
                  <option value="france">{t("cart.france")}</option>
                  <option value="germany">{t("cart.germany")}</option>
                  <option value="canada">{t("cart.canada")}</option>
                  <option value="russia">{t("cart.russia")}</option>
                  <option value="india">{t("cart.india")}</option>
                  <option value="brazil">{t("cart.brazil")}</option>
                  <option value="mexico">{t("cart.mexico")}</option>
                  <option value="southafrica">{t("cart.south_africa")}</option>
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
                  className={`mt-1 block w-full h-10 rounded-md bg-gray-50 border border-gray-200 px-3 text-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 ${
                    errors.phoneNumber ? "border-red-500" : ""
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
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
              <h2 className="text-base font-semibold text-gray-800 mb-2">
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
                    <label htmlFor="standard" className="ml-2 text-sm text-gray-700">
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
                </div>
                <p className="text-xs text-gray-500 ml-6">
                  {t("product.123_hung_vuong_street")}
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

// Updated: 2025-10-12T16:06:26.126Z

// Updated: 2025-10-12T16:09:02.536Z