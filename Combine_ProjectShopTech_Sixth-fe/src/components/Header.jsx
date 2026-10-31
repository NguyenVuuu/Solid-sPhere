import React, { useContext, useEffect, useState, useRef } from "react";
import logo from "../assets/logo-text.png";
import { FaShoppingCart, FaFacebookF } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import path from "../constant/path";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../context/UserContext";
import { FaChevronDown } from "react-icons/fa";
import CartDropdown from "./CartDropdown";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { loadCartItems } from "../utils/redux/cartSlice";
import notify from "../utils/notify";

const Header = () => {
  const { t } = useTranslation();

  const { carts, cartSummary, loading } = useSelector(state => state.cart);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const cartDropdownRef = useRef(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const dispatch = useDispatch();
  // Access UserContext
  const { user, logout, isCustomer, isAdmin, isCustomerService } =
    useContext(UserContext);

  // Define navigate
  const navigate = useNavigate();

  // Handler cho navigation với loading
  const handleNavigateWithLoading = (path, state) => {
    setIsNavigating(true);
    // Scroll to top khi navigate
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    navigate(path, { state });
    
    // Reset loading sau một khoảng thời gian ngắn
    setTimeout(() => {
      setIsNavigating(false);
    }, 500);
  };

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      if (dropdownRef.current && !dropdownRef.current.matches(":hover")) {
        setShowDropdown(false);
      }
    }, 100);
  };
  useEffect(() => {
    console.log("CartDropdown - Cart state changed:", {
      carts,
      cartSummary,
      loading,
    });
  }, [carts, cartSummary, loading]);
  useEffect(() => {
    dispatch(loadCartItems());
  }, [dispatch]);
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (
        cartDropdownRef.current &&
        !cartDropdownRef.current.contains(event.target)
      ) {
        setShowCartDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuItemClick = action => {
    console.log(`Selected action: ${action}`);
    setShowDropdown(false);
  };

  // Handle logout
  const handleLogoutConfirm = () => {
    logout(); // Call logout from UserContext
    setShowDropdown(false);
    notify.success("Đăng xuất thành công!");
    // navigate("/login"); // Redirect to login page
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getFormattedDate = () => {
    const days = [
      t("header.sunday"),
      t("header.monday"),
      t("header.tuesday"),
      t("header.wednesday"),
      t("header.thursday"),
      t("header.friday"),
      t("header.saturday"),
    ];
    const months = [
      t("header.jan"),
      t("header.feb"),
      t("header.mar"),
      t("header.apr"),
      t("header.may"),
      t("header.jun"),
      t("header.jul"),
      t("header.aug"),
      t("header.sep"),
      t("header.oct"),
      t("header.nov"),
      t("header.dec"),
    ];

    const day = days[currentDateTime.getDay()];
    const date = currentDateTime.getDate();
    const month = months[currentDateTime.getMonth()];
    const year = currentDateTime.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };

  const formatTime = () => {
    let hours = currentDateTime.getHours();
    const minutes = currentDateTime.getMinutes().toString().padStart(2, "0");
    const seconds = currentDateTime.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? t("common.pm") : t("common.am");
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes}:${seconds} ${ampm}`;
  };

  const handleClickCart = () => {
    setShowCartDropdown(!showCartDropdown);
  };

  const handleCartMouseEnter = () => {
    setShowCartDropdown(true);
  };

  const handleCartMouseLeave = () => {
    setTimeout(() => {
      if (
        cartDropdownRef.current &&
        !cartDropdownRef.current.matches(":hover")
      ) {
        setShowCartDropdown(false);
      }
    }, 100);
  };

  const cartQuantity = useSelector(state =>
    state.cart.cartSummary ? state.cart.cartSummary.totalItems : 0
  );

  return (
    <>
      {/* Loading Overlay khi navigate */}
      {isNavigating && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center animate-fadeIn">
          <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center">
            {/* Spinner */}
            <div className="relative w-16 h-16 mb-4">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-purple-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-purple-950 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-lg font-semibold text-purple-950 animate-pulse">
              Đang tải...
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Vui lòng đợi trong giây lát
            </p>
          </div>
        </div>
      )}
      
      <header
        className={`font-sans fixed top-0 left-0 right-0 z-50 ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
      {/* Top Bar - Simplified */}
      <div
        className={`bg-gradient-to-r from-black via-gray-900 to-purple-950 text-white text-xs flex justify-between items-center px-4 md:px-8 py-2 transition-all duration-300 ${
          isScrolled ? "hidden" : ""
        }`}
      >
        {/* Date & Time - Simplified */}
        <div className="flex items-center gap-3 text-white/90">
          <span className="hidden sm:inline">{getFormattedDate()}</span>
          <span className="hidden md:inline">{formatTime()}</span>
        </div>

        {/* Store Location - Simplified */}
        <div className="hidden lg:flex items-center gap-2 text-sm">
          <span>📍</span>
          <span className="text-white/90">{t("header.visitShop")}</span>
          <Link
            to="/contact"
            className="text-white/90 hover:text-white underline"
          >
            {t("header.contactUs")}
          </Link>
        </div>

        {/* Contact Info - Simplified */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-white/90">
            {t("header.call")} <strong>{t("header.inContactUs")}</strong>
          </span>
          <a
            href="#"
            className="w-7 h-7 flex items-center justify-center text-white hover:text-purple-300 transition-colors"
          >
            <FaFacebookF className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Main Navigation Bar - Simplified */}
      <div
        className={`bg-gradient-to-r from-black via-gray-900 to-purple-950 border-b border-gray-700 ${
          isScrolled ? "py-2" : "py-3"
        }`}
      >
        {/* Container: 3-column layout - Logo | Menu Center | Icons */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-3 items-center">
          {/* LEFT: Logo */}
          <div className="flex items-center justify-start">
            <Link to={path.home}>
              <img
                src={logo}
                alt={t("remaining.logo")}
                className={`rounded-lg ${isScrolled ? "h-9" : "h-11"}`}
              />
            </Link>
          </div>

          {/* CENTER: Navigation Links - Simplified */}
          <nav className="flex justify-center">
            <ul className="flex gap-4 md:gap-6 text-sm font-medium text-white whitespace-nowrap">
              {/* Home */}
              <li>
                <Link
                  to={path.home}
                  className="hover:text-purple-300 transition-colors"
                >
                  {t("nav.home")}
                </Link>
              </li>

              {/* Products Dropdown - Simplified */}
              <li className="relative group">
                <div className="flex items-center gap-1 hover:text-purple-300 cursor-pointer transition-colors">
                  <span>{t("nav.products")}</span>
                  <FaChevronDown
                    size={12}
                    className="transition-transform group-hover:rotate-180"
                  />
                </div>

                {/* Dropdown Menu - Simplified */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[700px] z-20 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                    {/* Grid Layout for Categories - Simplified */}
                    <div className="grid grid-cols-4 gap-4">
                      {/* Column 1: Laptops */}
                      <div>
                        <h3 className="text-gray-900 font-semibold text-sm mb-2">
                          {t("categories.laptops")}
                        </h3>
                        <button
                          onClick={() =>
                            handleNavigateWithLoading("/products", {
                              list: [45, 46, 47, 48, 49, 50, 51],
                            })
                          }
                          disabled={isNavigating}
                          className="block w-full text-left px-2 py-1.5 text-sm text-gray-600 hover:text-white hover:bg-purple-950 rounded transition-colors disabled:opacity-50 disabled:cursor-wait"
                        >
                          {isNavigating ? "Đang tải..." : t("categories.allLaptops")}
                        </button>
                      </div>

                      {/* Column 2: Gaming Gear */}
                      <div>
                        <h3 className="text-gray-900 font-semibold text-sm mb-2">
                          {t("categories.gamingGear")}
                        </h3>
                        <button
                          onClick={() =>
                            handleNavigateWithLoading("/products", {
                              list: [6, 7, 8, 9, 10],
                            })
                          }
                          disabled={isNavigating}
                          className="block w-full text-left px-2 py-1.5 text-sm text-gray-600 hover:text-white hover:bg-purple-950 rounded transition-colors disabled:opacity-50 disabled:cursor-wait"
                        >
                          {isNavigating ? "Đang tải..." : t("categories.mouse")}
                        </button>
                        <button
                          onClick={() =>
                            handleNavigateWithLoading("/products", {
                              list: [1, 2, 3, 4, 5],
                            })
                          }
                          disabled={isNavigating}
                          className="block w-full text-left px-2 py-1.5 text-sm text-gray-600 hover:text-white hover:bg-purple-950 rounded transition-colors disabled:opacity-50 disabled:cursor-wait"
                        >
                          {isNavigating ? "Đang tải..." : t("categories.keyboard")}
                        </button>
                        <button
                          onClick={() =>
                            handleNavigateWithLoading("/products", {
                              list: [14, 15, 16],
                            })
                          }
                          disabled={isNavigating}
                          className="block w-full text-left px-2 py-1.5 text-sm text-gray-600 hover:text-white hover:bg-purple-950 rounded transition-colors disabled:opacity-50 disabled:cursor-wait"
                        >
                          {isNavigating ? "Đang tải..." : t("categories.gameGear")}
                        </button>
                        <button
                          onClick={() =>
                            handleNavigateWithLoading("/products", {
                              list: [11, 12, 13],
                            })
                          }
                          disabled={isNavigating}
                          className="block w-full text-left px-2 py-1.5 text-sm text-gray-600 hover:text-white hover:bg-purple-950 rounded transition-colors disabled:opacity-50 disabled:cursor-wait"
                        >
                          {isNavigating ? "Đang tải..." : t("categories.mousePad")}
                        </button>
                        <button
                          onClick={() =>
                            handleNavigateWithLoading("/products", { list: [42, 43] })
                          }
                          disabled={isNavigating}
                          className="block w-full text-left px-2 py-1.5 text-sm text-gray-600 hover:text-white hover:bg-purple-950 rounded transition-colors disabled:opacity-50 disabled:cursor-wait"
                        >
                          {isNavigating ? "Đang tải..." : t("categories.headphone")}
                        </button>
                      </div>

                      {/* Column 3: PC Parts */}
                      <div>
                        <h3 className="text-gray-900 font-semibold text-sm mb-2">
                          {t("categories.pcParts")}
                        </h3>
                        <button
                          onClick={() =>
                            handleNavigateWithLoading("/products", {
                              list: [36, 37, 38, 39],
                            })
                          }
                          disabled={isNavigating}
                          className="block w-full text-left px-2 py-1.5 text-sm text-gray-600 hover:text-white hover:bg-purple-950 rounded transition-colors disabled:opacity-50 disabled:cursor-wait"
                        >
                          {isNavigating ? "Đang tải..." : t("categories.monitor")}
                        </button>
                        <button
                          onClick={() =>
                            handleNavigateWithLoading("/products", { list: [17] })
                          }
                          disabled={isNavigating}
                          className="block w-full text-left px-2 py-1.5 text-sm text-gray-600 hover:text-white hover:bg-purple-950 rounded transition-colors disabled:opacity-50 disabled:cursor-wait"
                        >
                          {isNavigating ? "Đang tải..." : t("categories.case")}
                        </button>
                        <button
                          onClick={() =>
                            handleNavigateWithLoading("/products", { list: [18, 19] })
                          }
                          disabled={isNavigating}
                          className="block w-full text-left px-2 py-1.5 text-sm text-gray-600 hover:text-white hover:bg-purple-950 rounded transition-colors disabled:opacity-50 disabled:cursor-wait"
                        >
                          {isNavigating ? "Đang tải..." : t("categories.cpu")}
                        </button>
                        <button
                          onClick={() =>
                            handleNavigateWithLoading("/products", {
                              list: [20, 21, 22],
                            })
                          }
                          disabled={isNavigating}
                          className="block w-full text-left px-2 py-1.5 text-sm text-gray-600 hover:text-white hover:bg-purple-950 rounded transition-colors disabled:opacity-50 disabled:cursor-wait"
                        >
                          {isNavigating ? "Đang tải..." : t("categories.mainboard")}
                        </button>
                        <button
                          onClick={() =>
                            handleNavigateWithLoading("/products", {
                              list: [23, 24, 25, 26],
                            })
                          }
                          disabled={isNavigating}
                          className="block w-full text-left px-2 py-1.5 text-sm text-gray-600 hover:text-white hover:bg-purple-950 rounded transition-colors disabled:opacity-50 disabled:cursor-wait"
                        >
                          {isNavigating ? "Đang tải..." : t("categories.psu")}
                        </button>
                        <button
                          onClick={() =>
                            handleNavigateWithLoading("/products", {
                              list: [27, 28, 29],
                            })
                          }
                          disabled={isNavigating}
                          className="block w-full text-left px-2 py-1.5 text-sm text-gray-600 hover:text-white hover:bg-purple-950 rounded transition-colors disabled:opacity-50 disabled:cursor-wait"
                        >
                          {isNavigating ? "Đang tải..." : t("categories.storage")}
                        </button>
                        <button
                          onClick={() =>
                            handleNavigateWithLoading("/products", {
                              list: [30, 31, 32],
                            })
                          }
                          disabled={isNavigating}
                          className="block w-full text-left px-2 py-1.5 text-sm text-gray-600 hover:text-white hover:bg-purple-950 rounded transition-colors disabled:opacity-50 disabled:cursor-wait"
                        >
                          {isNavigating ? "Đang tải..." : t("categories.ram")}
                        </button>
                      </div>

                      {/* Column 4: Smart Devices */}
                      <div>
                        <h3 className="text-gray-900 font-semibold text-sm mb-2">
                          {t("categories.smartDevice")}
                        </h3>
                        <button
                          onClick={() =>
                            handleNavigateWithLoading("/products", {
                              list: [52, 53, 54],
                              brand: "iPhone",
                            })
                          }
                          disabled={isNavigating}
                          className="block w-full text-left px-2 py-1.5 text-sm text-gray-600 hover:text-white hover:bg-purple-950 rounded transition-colors disabled:opacity-50 disabled:cursor-wait"
                        >
                          {isNavigating ? "Đang tải..." : t("categories.iphone")}
                        </button>
                        <button
                          onClick={() =>
                            handleNavigateWithLoading("/products", {
                              list: [52, 53, 54],
                              brand: "Samsung",
                            })
                          }
                          disabled={isNavigating}
                          className="block w-full text-left px-2 py-1.5 text-sm text-gray-600 hover:text-white hover:bg-purple-950 rounded transition-colors disabled:opacity-50 disabled:cursor-wait"
                        >
                          {isNavigating ? "Đang tải..." : t("categories.samsung")}
                        </button>
                        <button
                          onClick={() =>
                            handleNavigateWithLoading("/products", {
                              list: [52, 53, 54],
                              brand: "Xiaomi",
                            })
                          }
                          disabled={isNavigating}
                          className="block w-full text-left px-2 py-1.5 text-sm text-gray-600 hover:text-white hover:bg-purple-950 rounded transition-colors disabled:opacity-50 disabled:cursor-wait"
                        >
                          {isNavigating ? "Đang tải..." : t("categories.xiaomi")}
                        </button>
                        <button
                          onClick={() =>
                            handleNavigateWithLoading("/products", { list: [44] })
                          }
                          disabled={isNavigating}
                          className="block w-full text-left px-2 py-1.5 text-sm text-gray-600 hover:text-white hover:bg-purple-950 rounded transition-colors disabled:opacity-50 disabled:cursor-wait"
                        >
                          {isNavigating ? "Đang tải..." : t("categories.ipad")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              {/* Deals */}
              <li>
                <Link
                  to="/deals"
                  className="hover:text-purple-300 transition-colors relative"
                >
                  {t("nav.deals")}
                  <span className="absolute -top-1 -right-6 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    {t("nav.hotBadge")}
                  </span>
                </Link>
              </li>

              {/* New Arrivals - hidden as per request */}
              {/* <li className="group relative">
              <Link to="/new-arrivals" className="flex items-center gap-1.5 hover:text-purple-400 transition-all duration-300">
                <span className="relative whitespace-nowrap">
                  {t('nav.new')}
                  <span className="absolute -top-2 -right-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">{t('nav.newBadge')}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
            </li> */}

              {/* Brands Dropdown - hidden as per request */}
              {/* <li className="relative group"> ... </li> */}

              {/* Blog */}
              <li>
                <Link
                  to="/blog"
                  className="hover:text-purple-300 transition-colors"
                >
                  {t("nav.blog")}
                </Link>
              </li>

              {/* Support Dropdown - Simplified */}
              <li className="relative group">
                <div className="flex items-center gap-1 hover:text-purple-300 cursor-pointer transition-colors">
                  <span>{t("nav.support")}</span>
                  <FaChevronDown
                    size={12}
                    className="transition-transform group-hover:rotate-180"
                  />
                </div>

                {/* Support Dropdown Menu - Simplified */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[240px] z-20 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
                    <h3 className="text-gray-900 font-semibold text-sm mb-2">
                      {t("support.helpCenter")}
                    </h3>
                    <div className="space-y-1">
                      <Link
                        to="/track-order"
                        className="block px-2 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors"
                      >
                        {t("support.trackOrder")}
                      </Link>
                      <Link
                        to="/faq"
                        className="block px-2 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors"
                      >
                        {t("support.faq")}
                      </Link>
                      <Link
                        to="/contact"
                        className="block px-2 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors"
                      >
                        {t("support.contactUs")}
                      </Link>
                      <Link
                        to="/warranty"
                        className="block px-2 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors"
                      >
                        {t("support.warranty")}
                      </Link>
                      <Link
                        to="/returns"
                        className="block px-2 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors"
                      >
                        {t("support.returns")}
                      </Link>
                      {isCustomerService && (
                        <>
                          <div className="border-t border-gray-200 my-1"></div>
                          <Link
                            to="/customer-service"
                            className="block px-2 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors"
                          >
                            {t("support.customerService")}
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </nav>

          {/* RIGHT: Icons - Simplified */}
          <div className="flex items-center justify-end gap-3">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Shopping Cart - Simplified */}
            <div
              className="relative"
              ref={cartDropdownRef}
              onMouseEnter={handleCartMouseEnter}
              onMouseLeave={handleCartMouseLeave}
            >
              <button
                className="relative w-9 h-9 flex items-center justify-center text-white hover:text-purple-300 transition-colors"
                onClick={handleClickCart}
              >
                <FaShoppingCart className="text-lg" />
                {cartQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartQuantity}
                  </span>
                )}
              </button>
              <CartDropdown
                isOpen={showCartDropdown}
                onClose={() => setShowCartDropdown(false)}
              />
            </div>

            {/* User Account - Simplified */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="w-9 h-9 flex items-center justify-center text-white hover:text-purple-300 transition-colors"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <IoPersonCircle className="text-2xl" />
              </button>

              {showDropdown && (
                <div className="absolute right-0 w-64 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {/* User Header - Simplified */}
                  <div className="p-4 bg-gradient-to-r from-black via-gray-900 to-purple-950 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-xl">
                        {user ? "👤" : "🔐"}
                      </div>
                      <div>
                        <p className="text-sm text-white font-semibold">
                          {user
                            ? `${t("header.hello")}, ${user.fullName}`
                            : t("header.welcomeBack")}
                        </p>
                        <p className="text-xs text-white/80">
                          {user
                            ? t("header.manageAccount")
                            : t("header.pleaseLogin")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <ul className="py-2">
                    {user ? (
                      <>
                        {/* Show profile link for customers */}
                        {isCustomer && (
                          <li onClick={() => handleMenuItemClick("profile")}>
                            <Link
                              to="/userProfile"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              {t("account.myAccount")}
                            </Link>
                          </li>
                        )}
                        {/* Show admin link for admins */}
                        {isAdmin && (
                          <li onClick={() => handleMenuItemClick("admin")}>
                            <Link
                              to="/admin"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              {t("account.manage")}
                            </Link>
                          </li>
                        )}
                        {/* Show customer service link for customer service staff */}
                        {isCustomerService && (
                          <li onClick={() => handleMenuItemClick("employee")}>
                            <Link
                              to="/customer-service"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              {t("account.staff")}
                            </Link>
                          </li>
                        )}
                        <li onClick={() => handleMenuItemClick("orders")}>
                          <Link
                            to="/orders"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            {t("account.orders")}
                          </Link>
                        </li>

                        {/* Favorites */}
                        <li onClick={() => handleMenuItemClick("favorites")}>
                          <Link
                            to="/favorites"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            Yêu thích
                          </Link>
                        </li>
                        {/* Divider */}
                        <div className="my-1 border-t border-gray-200"></div>
                        {/* Sign Out */}
                        <li onClick={handleLogoutConfirm}>
                          <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                            {t("account.signOut")}
                          </button>
                        </li>
                      </>
                    ) : (
                      <li onClick={() => handleMenuItemClick("login")}>
                        <Link
                          to="/login"
                          onClick={() =>
                            window.scrollTo({ top: 0, behavior: "smooth" })
                          }
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                        >
                          {t("account.loginRegister")}
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;



// Updated: 2025-10-12T16:09:08.637Z