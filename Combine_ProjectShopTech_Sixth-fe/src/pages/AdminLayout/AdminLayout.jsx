import { useState, useEffect, useContext } from "react";

import {
  FaChartPie,
  FaDesktop,
  FaCogs,
  FaHeadphones,
  FaRegSquare,
  FaMicrochip,
  FaMemory,
  FaHdd,
  FaShoppingCart,
  FaTruck,
  FaUsers,
  FaUserCircle,
  FaSun,
  FaMoon,
  FaEllipsisH,
  FaSearch,
  FaArrowUp,
  FaArrowDown,
  FaLaptop,
  FaMobile,
  FaMouse,
  FaKeyboard,
  FaServer,
  FaProjectDiagram,
  FaPlug,
  FaTabletAlt,
  FaGamepad,
  FaCalendar,
  FaStar,
  FaComment,
  FaTicketAlt,
  FaUserShield,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import LaptopTable from "./LaptopTable";
import CustomerTable from "./CustomerTable";
import ReviewsTable from "./ReviewsTable";
import DiscountsTable from "./DiscountsTable";
import OrderTable from "./OrderTable";
import AdminShippedOrders from "./AdminShippedOrders";
import PhoneTable from "./PhoneTable";
import MouseTable from "./MouseTable";
import KeyboardTable from "./KeyboardTable";
import MonitorsTable from "./MonitorsTable";
import ProcessorsTable from "./ProcessorsTable";
import Ram from "./Ram";
import Mainboard from "./Mainboard";
import Psus from "./Psus";
import Pc from "./Pc";
import Headphone from "./Headphone";
import Mousepad from "./Mousepad";
import Storage from "./Storage";
import Cases from "./Cases";
import TabletTable from "./TabletTable";
import GamingGearTable from "./GamingGearTable";
import { useNavigate } from "react-router-dom"; // Add this
import {
  fetchSalesByCategory,
  fetchUsersStats,
  fetchProductsStats,
  fetchOrdersStats,
  fetchLowStockProducts,
  fetchTopProducts,
  fetchTopCustomers,
  fetchReviewsStats,
  fetchDiscountsStats,
  fetchAppointmentsStats,
  fetchChatsStats,
  fetchPaymentMethodDistribution,
  fetchOrdersTrend,
  fetchRevenueByDay,
  fetchRevenueByMonth,
  fetchRevenueByQuarter,
  fetchRevenueByYear,
  fetchTopCategories,
  fetchReturningCustomers,
  fetchRfm,
  fetchAbcInventory,
  fetchFrequentlyBoughtTogether,
  fetchRetentionRate,
  fetchCustomerLtv,
  fetchWeekdayRevenue,
  fetchProductRatingDistribution,
  fetchTopRatedProducts,
  fetchMostFavoritedProducts,
} from "../../apis/adminStatsApi";
const API_URL = import.meta.env.VITE_API_URL || "/api";

// Định nghĩa danh sách categoryID cho từng danh mục
const CATEGORY_IDS = {
  laptop: [45, 46, 47, 48, 49, 50, 51],
  mouse: [6, 7, 8, 9, 10],
  keyboard: [1, 2, 3, 4, 5],
  phone: [52, 53, 54],
  computers: [36, 37, 38, 39],
  tablet: [44],
  gamingGear: [14, 15, 16],
  processors: [18, 19],
  ram: [30, 31, 32],
  storage: [27, 28, 29],
  case: [17],
  mainboard: [20, 21, 22],
  psu: [23, 24, 25, 26],
  pc: [40, 41],
  headphone: [42, 43],
  mousepad: [11, 12, 13],
};

// Định nghĩa ánh xạ danh mục tới state
const CATEGORY_STATE_MAP = {
  laptop: "computers",
  mouse: "mouses",
  keyboard: "keyboards",
  phone: "phones",
  computers: "monitors",
  tablet: "tablets",
  gamingGear: "gamingGear",
  processors: "processors",
  ram: "ram",
  storage: "storage",
  case: "cases",
  mainboard: "mainboards",
  psu: "psus",
  pc: "pcs",
  headphone: "headphones",
  mousepad: "mousepads",
};
import { UserContext } from "../../context/UserContext";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import UpdateShippedDate from "../../components/Admin/UpdateShippedDate";
export default function ComputerStoreAdminLayout() {
  const { t } = useTranslation("translation");
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("adminDarkMode");
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [dashboardStats] = useState(null);
  // const [overview, setOverview] = useState(null);
  const [usersStats, setUsersStats] = useState(null);
  const [productsStats, setProductsStats] = useState(null);
  const [ordersStats, setOrdersStats] = useState(null);
  const [_paymentMethods] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [ordersTrend, setOrdersTrend] = useState([]);
  const [revenueByDay, setRevenueByDay] = useState([]);
  const [revenueByMonth, setRevenueByMonth] = useState([]);
  const [revenueByQuarter, setRevenueByQuarter] = useState([]);
  const [revenueByYear, setRevenueByYear] = useState([]);
  const [returningCustomers, setReturningCustomers] = useState([]);
  const [rfm, setRfm] = useState([]);
  const [abcInventory, setAbcInventory] = useState([]);
  const [frequentlyBought, setFrequentlyBought] = useState([]);
  const [retentionRate, setRetentionRate] = useState([]);
  const [customerLtv, setCustomerLtv] = useState([]);
  const [weekdayRevenue, setWeekdayRevenue] = useState([]);
  const [ratingDistribution, setRatingDistribution] = useState([]);
  const [productIdForRating] = useState(1);
  const [topRatedProducts, setTopRatedProducts] = useState([]);
  const [mostFavoritedProducts, setMostFavoritedProducts] = useState([]);
  const [lowStockList, setLowStockList] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [categorySales, setCategorySales] = useState([]);
  const [recentOrdersWithDetails, setRecentOrdersWithDetails] = useState([]);
  const [computers, setComputers] = useState([]);
  const [phones, setPhones] = useState([]);
  const [mouses, setMouses] = useState([]);
  const [keyboards, setKeyboards] = useState([]);
  const [monitors, setMonitors] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [ram, setRam] = useState([]);
  const [storage, setStorage] = useState([]);
  const [cases, setCases] = useState([]);
  const [mainboards, setMainboards] = useState([]);
  const [psus, setPsus] = useState([]);
  const [pcs, setPcs] = useState([]);
  const [headphones, setHeadphones] = useState([]);
  const [mousepads, setMousepads] = useState([]);
  const [tablets, setTablets] = useState([]);
  const [gamingGear, setGamingGear] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [timeframe, setTimeframe] = useState("last7days");
  const [showModal, setShowModal] = useState(false);
  const [topSpenders, setTopSpenders] = useState([]);
  const [spendersTimeframe, setSpendersTimeframe] = useState("last7days");
  const [dateRange, setDateRange] = useState(() => {
    // Align with seeded orders range in data-complete.sql (Jan-Feb 2025)
    return { start: "2025-01-01", end: "2025-02-28" };
  });
  const [allImages, setAllImages] = useState({});
  const [insightTab, setInsightTab] = useState("orders"); // 'orders' | 'revenue'
  const [showAdvanced] = useState(false);
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("adminDarkMode", JSON.stringify(newMode));
  };

  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  // Normalize object maps from BE to array of {name, value} for charts/lists
  const toPairs = obj => {
    if (!obj || typeof obj !== "object") return [];
    return Object.entries(obj).map(([name, value]) => ({ name, value }));
  };

  const handleLogoutConfirm = () => {
    logout(); // Call logout from UserContext
    localStorage.removeItem("authToken");
    navigate("/login");
    setShowModal(false);
  };

  // Hàm chung để xử lý CRUD cho các danh mục
  const performProductOperation = async (
    operation,
    category,
    productData,
    productId
  ) => {
    const validCategoryIds = CATEGORY_IDS[category];
    if (!validCategoryIds) {
      throw new Error(`Invalid category: ${category}`);
    }

    // Kiểm tra categoryID cho create và update
    if (
      (operation === "create" || operation === "update") &&
      productData.categoryID
    ) {
      if (!validCategoryIds.includes(productData.categoryID)) {
        throw new Error(
          `categoryID ${productData.categoryID} is not valid for ${category}`
        );
      }
    }

    const stateSetter = {
      computers: setComputers,
      mouses: setMouses,
      keyboards: setKeyboards,
      phones: setPhones,
      monitors: setMonitors,
      processors: setProcessors,
      ram: setRam,
      storage: setStorage,
      cases: setCases,
      mainboards: setMainboards,
      psus: setPsus,
      pcs: setPcs,
      headphones: setHeadphones,
      mousepads: setMousepads,
      tablets: setTablets,
      gamingGear: setGamingGear,
    }[CATEGORY_STATE_MAP[category]];

    try {
      let response;
      if (operation === "create") {
        response = await fetch(`${API_URL}/products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(productData),
        });
      } else if (operation === "update") {
        response = await fetch(`${API_URL}/products/${productId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(productData),
        });
      } else if (operation === "delete") {
        response = await fetch(`${API_URL}/products/${productId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
      }

      const responseText = await response.text();
      if (!response.ok) {
        // Xử lý validation errors từ backend
        let errorMessage = `Failed to ${operation} product`;
        let validationErrors = {};

        try {
          const errorData = JSON.parse(responseText);
          // Kiểm tra nếu response có format ApiResponse với result chứa validation errors
          if (errorData.result && typeof errorData.result === "object") {
            validationErrors = errorData.result;
            // Tạo message từ các validation errors
            const errorMessages = Object.entries(validationErrors)
              .map(([field, msg]) => `${field}: ${msg}`)
              .join(", ");
            errorMessage = errorData.message || errorMessages;

            // Hiển thị warning cho từng validation error
            Object.entries(validationErrors).forEach(([field, msg]) => {
              // Sử dụng window event để trigger toast notification
              window.dispatchEvent(
                new CustomEvent("app:notify", {
                  detail: {
                    type: "warning",
                    message: `${field}: ${msg}`,
                    duration: 5000,
                    position: "top-right",
                  },
                })
              );
            });
          } else if (errorData.message) {
            errorMessage = errorData.message;
            // Hiển thị error message
            window.dispatchEvent(
              new CustomEvent("app:notify", {
                detail: {
                  type: "error",
                  message: errorMessage,
                  duration: 5000,
                  position: "top-right",
                },
              })
            );
          }
        } catch (parseError) {
          // Nếu không parse được JSON, sử dụng responseText trực tiếp
          errorMessage = responseText || errorMessage;
          window.dispatchEvent(
            new CustomEvent("app:notify", {
              detail: {
                type: "error",
                message: errorMessage,
                duration: 5000,
                position: "top-right",
              },
            })
          );
        }

        const validationError = new Error(errorMessage);
        validationError.validationErrors = validationErrors;
        throw validationError;
      }

      if (operation === "create") {
        const newProduct = JSON.parse(responseText);
        stateSetter(prev => [...prev, newProduct]);
        // Hiển thị success message
        window.dispatchEvent(
          new CustomEvent("app:notify", {
            detail: {
              type: "success",
              message: "Sản phẩm đã được tạo thành công!",
              duration: 3000,
              position: "top-right",
            },
          })
        );
        return newProduct;
      } else if (operation === "update") {
        const updatedProduct = JSON.parse(responseText);
        stateSetter(prev =>
          prev.map(product =>
            product.id === productId ? updatedProduct : product
          )
        );
        // Hiển thị success message
        window.dispatchEvent(
          new CustomEvent("app:notify", {
            detail: {
              type: "success",
              message: "Sản phẩm đã được cập nhật thành công!",
              duration: 3000,
              position: "top-right",
            },
          })
        );
        return updatedProduct;
      } else if (operation === "delete") {
        stateSetter(prev => prev.filter(product => product.id !== productId));
        // Hiển thị success message
        window.dispatchEvent(
          new CustomEvent("app:notify", {
            detail: {
              type: "success",
              message: "Sản phẩm đã được xóa thành công!",
              duration: 3000,
              position: "top-right",
            },
          })
        );
        return true;
      }
    } catch (error) {
      console.error(`Error performing ${operation} on ${category}:`, error);
      // Nếu error không có validation errors, hiển thị error message chung
      if (!error.validationErrors) {
        window.dispatchEvent(
          new CustomEvent("app:notify", {
            detail: {
              type: "error",
              message:
                error.message ||
                `Lỗi khi ${
                  operation === "create"
                    ? "tạo"
                    : operation === "update"
                    ? "cập nhật"
                    : "xóa"
                } sản phẩm`,
              duration: 5000,
              position: "top-right",
            },
          })
        );
      }
      throw error;
    }
  };

  // Hàm CRUD cho từng danh mục
  const createProduct = async (category, productData) => {
    return performProductOperation("create", category, productData);
  };

  const updateProduct = async (category, productId, productData) => {
    return performProductOperation("update", category, productData, productId);
  };

  const deleteProduct = async (category, productId) => {
    return performProductOperation("delete", category, null, productId);
  };

  const getProductById = async productId => {
    try {
      const response = await fetch(`${API_URL}/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to get product");
      return await response.json();
    } catch (error) {
      console.error(`Error getting product with ID ${productId}:`, error);
      throw error;
    }
  };

  const getOrderById = async orderId => {
    try {
      const response = await fetch(`${API_URL}/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to get order");
      return await response.json();
    } catch (error) {
      console.error(`Error getting order with ID ${orderId}:`, error);
      throw error;
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error("Failed to update order status");

      const updatedOrder = await response.json();
      console.log("Updated order from API:", updatedOrder);

      // Re-fetch toàn bộ danh sách orders để đảm bảo đồng bộ
      const ordersResponse = await fetch(`${API_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (!ordersResponse.ok) throw new Error("Failed to fetch updated orders");
      const ordersData = await ordersResponse.json();
      setOrders(ordersData);
      return updatedOrder;
    } catch (error) {
      console.error(`Error updating order status for ID ${orderId}:`, error);
      throw error;
    }
  };

  // Fetch dashboard data (giữ nguyên logic hiện tại)
  // Define fetchDashboardData at component level so it can be accessed by CustomerTable
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // skip admin dashboard stats when endpoint is absent

      // Fetch statistics from Spring controllers in parallel
      console.log("🚀 Starting API fetch for statistics...");
      const [
        us,
        ps,
        os,
        rv,
        dc,
        ap,
        ch,
        cs,
        tp,
        tc,
        ls,
        _pm,
        ot,
        rbd,
        rbm,
        rbq,
        rby,
        ,
        rcus,
        rfmData,
        abc,
        frq,
        rr,
        ltv,
        wdr,
        rating,
        topRated,
        mostFavorited,
      ] = await Promise.all([
        fetchUsersStats(),
        fetchProductsStats(),
        fetchOrdersStats(),
        fetchReviewsStats(),
        fetchDiscountsStats(),
        fetchAppointmentsStats(),
        fetchChatsStats(),
        fetchSalesByCategory(),
        fetchTopProducts(10),
        fetchTopCustomers(10),
        fetchLowStockProducts(10, 10),
        fetchPaymentMethodDistribution(dateRange.start, dateRange.end),
        fetchOrdersTrend(dateRange.start, dateRange.end),
        fetchRevenueByDay(dateRange.start, dateRange.end),
        fetchRevenueByMonth(
          new Date(dateRange.start).getFullYear(),
          new Date(dateRange.end).getFullYear()
        ),
        fetchRevenueByQuarter(
          new Date(dateRange.start).getFullYear(),
          new Date(dateRange.end).getFullYear()
        ),
        fetchRevenueByYear(
          new Date(dateRange.start).getFullYear(),
          new Date(dateRange.end).getFullYear()
        ),
        fetchTopCategories(5, dateRange.start, dateRange.end),
        fetchReturningCustomers(10),
        fetchRfm(dateRange.start, dateRange.end, 20),
        fetchAbcInventory(dateRange.start, dateRange.end),
        fetchFrequentlyBoughtTogether(productIdForRating, 10).catch(err => {
          console.error("Error fetching frequently bought together:", err);
          return null;
        }),
        fetchRetentionRate(dateRange.start, dateRange.end).catch(err => {
          console.error("Error fetching retention rate:", err);
          return null;
        }),
        fetchCustomerLtv(dateRange.start, dateRange.end).catch(err => {
          console.error("Error fetching customer LTV:", err);
          return null;
        }),
        fetchWeekdayRevenue(dateRange.start, dateRange.end).catch(err => {
          console.error("Error fetching weekday revenue:", err);
          return null;
        }),
        fetchProductRatingDistribution(productIdForRating).catch(err => {
          console.error("Error fetching product rating distribution:", err);
          return null;
        }),
        fetchTopRatedProducts(10).catch(err => {
          console.error("Error fetching top rated products:", err);
          return null;
        }),
        fetchMostFavoritedProducts(10).catch(err => {
          console.error("Error fetching most favorited products:", err);
          return null;
        }),
      ]);
      console.log("✅ API fetch completed!");
      console.log("📦 All API responses:", {
        us,
        ps,
        os,
        rv,
        dc,
        ap,
        ch,
        cs,
        tp,
        tc,
        ls,
        _pm,
        ot,
        rbd,
        rbm,
        rbq,
        rby,
        rcus,
        rfmData,
        abc,
        frq,
        rr,
        ltv,
        wdr,
        rating,
      });
      setUsersStats(us);
      setProductsStats(ps);
      setOrdersStats(os);
      setCategorySales(
        cs && cs.categorySales
          ? toPairs(cs.categorySales)
          : Array.isArray(cs)
          ? cs
          : []
      );
      setTopProducts(
        tp && tp.topProducts ? tp.topProducts : Array.isArray(tp) ? tp : []
      );
      const sortedTopCustomers =
        tc && tc.topCustomers ? tc.topCustomers : Array.isArray(tc) ? tc : [];
      setTopCustomers(
        sortedTopCustomers.sort(
          (a, b) =>
            (b.totalRevenue || b.totalSpent || b.revenue || 0) -
            (a.totalRevenue || a.totalSpent || a.revenue || 0)
        )
      );
      setLowStockList(ls && ls.items ? ls.items : Array.isArray(ls) ? ls : []);
      // setPaymentMethods(pm && pm.distribution ? toPairs(pm.distribution) : (Array.isArray(pm) ? pm : []));
      setOrdersTrend(
        ot && ot.ordersByDay
          ? toPairs(ot.ordersByDay)
          : Array.isArray(ot)
          ? ot
          : []
      );
      setRevenueByDay(
        rbd && rbd.revenueByDay
          ? toPairs(rbd.revenueByDay)
          : Array.isArray(rbd)
          ? rbd
          : []
      );

      setRevenueByMonth(
        rbm && rbm.revenueByMonth
          ? toPairs(rbm.revenueByMonth)
          : Array.isArray(rbm)
          ? rbm
          : []
      );
      setRevenueByQuarter(
        rbq && rbq.revenueByQuarter
          ? toPairs(rbq.revenueByQuarter)
          : Array.isArray(rbq)
          ? rbq
          : []
      );
      setRevenueByYear(
        rby && rby.revenueByYear
          ? toPairs(rby.revenueByYear)
          : Array.isArray(rby)
          ? rby
          : []
      );

      console.log("Returning Customers Raw Data:", rcus);
      console.log(
        "Returning Customers Array:",
        rcus && rcus.returningCustomers
      );

      // Xử lý Returning Customers data với format mới từ backend
      const processedReturningCustomers =
        rcus && rcus.returningCustomers
          ? rcus.returningCustomers.map(item => {
              return {
                customerId: item.userId,
                customerName:
                  item.userName || `${t("admin.customer")} ${item.userId}`,
                name: item.userName || `${t("admin.customer")} ${item.userId}`,
                fullName:
                  item.userName || `${t("admin.customer")} ${item.userId}`,
                totalOrders: item.orderCount,
                orders: item.orderCount,
                count: item.orderCount,
              };
            })
          : [];

      console.log(
        "Returning Customers Processed:",
        processedReturningCustomers
      );
      setReturningCustomers(processedReturningCustomers);
      // Transform RFM data for TrendChart - sử dụng dữ liệu mới từ backend
      console.log("RFM Raw Data:", rfmData);
      let rfmDataTransformed = [];
      if (rfmData && rfmData.rfmTop && Array.isArray(rfmData.rfmTop)) {
        // Backend đã trả về userName, không cần fetch thêm
        rfmDataTransformed = rfmData.rfmTop.map(item => ({
          userId: item.userId,
          name: item.userName || `User ${item.userId}`,
          value: item.r + item.f + item.m, // Total RFM score
          r: item.r,
          f: item.f,
          m: item.m,
          segment:
            item.r >= 4 && item.f >= 4 && item.m >= 4
              ? "Champions"
              : item.r >= 3 && item.f >= 3 && item.m >= 3
              ? "Loyal Customers"
              : item.r >= 2 && item.f >= 2 && item.m >= 2
              ? "Potential Loyalists"
              : "At Risk",
        }));
      }
      console.log("RFM Transformed:", rfmDataTransformed);
      setRfm(rfmDataTransformed);
      // Transform ABC data for GenericBarChart
      console.log("ABC Raw Data:", abc);
      let abcDataTransformed = [];
      if (abc && abc.abcGroups && typeof abc.abcGroups === "object") {
        // Fetch product names for ABC groups
        const productIds = Object.keys(abc.abcGroups).map(id => parseInt(id));
        try {
          const productNamesResponse = await Promise.all(
            productIds.map(async productId => {
              try {
                const response = await fetch(`/api/products/${productId}`, {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                      "authToken"
                    )}`,
                  },
                });
                if (response.ok) {
                  const product = await response.json();
                  return {
                    id: productId,
                    name: product.name || `Product ${productId}`,
                  };
                }
              } catch (error) {
                console.warn(`Failed to fetch product ${productId}:`, error);
              }
              return { id: productId, name: `Product ${productId}` };
            })
          );

          const productNamesMap = productNamesResponse.reduce((acc, item) => {
            acc[item.id] = item.name;
            return acc;
          }, {});

          abcDataTransformed = Object.entries(abc.abcGroups).map(
            ([productId, group]) => ({
              productId: parseInt(productId) || 0,
              name:
                productNamesMap[parseInt(productId)] ||
                `Product ${productId || "Unknown"}`,
              group: group || "Unknown",
              value: group === "A" ? 100 : group === "B" ? 50 : 10, // Mock values for display
              category: group || "Unknown",
            })
          );
        } catch (error) {
          console.error("Error fetching product names for ABC:", error);
          // Fallback to original logic
          abcDataTransformed = Object.entries(abc.abcGroups).map(
            ([productId, group]) => ({
              productId: parseInt(productId) || 0,
              name: `Product ${productId || "Unknown"}`,
              group: group || "Unknown",
              value: group === "A" ? 100 : group === "B" ? 50 : 10,
              category: group || "Unknown",
            })
          );
        }
      }
      console.log("ABC Transformed:", abcDataTransformed);
      setAbcInventory(abcDataTransformed);
      // Set frequently bought together data - fix format
      console.log("Raw frequently bought data:", frq);
      if (
        frq &&
        frq.frequentlyBoughtTogether &&
        typeof frq.frequentlyBoughtTogether === "object"
      ) {
        // Convert object to array format
        const frequentlyBoughtArray = Object.entries(
          frq.frequentlyBoughtTogether
        ).map(([productId, count]) => ({
          name: `Product ${productId}`,
          score: count * 10, // Convert count to score
          count: count,
          productId: parseInt(productId),
        }));
        console.log(
          "Frequently bought transformed from object:",
          frequentlyBoughtArray
        );
        setFrequentlyBought(frequentlyBoughtArray);
      } else if (Array.isArray(frq) && frq.length > 0) {
        console.log("Frequently bought transformed from array:", frq);
        setFrequentlyBought(frq);
      } else {
        console.log(
          "Frequently bought: No data available, setting empty array"
        );
        setFrequentlyBought([]);
      }

      // Set retention rate data - fix format
      if (rr && rr.retentionRate !== undefined) {
        // Create array with retention rate data
        const retentionArray = [
          {
            name: t("admin.retention_rate"),
            value: Math.round(rr.retentionRate * 100),
          },
        ];
        setRetentionRate(retentionArray);
      } else if (Array.isArray(rr) && rr.length > 0) {
        setRetentionRate(rr);
      } else {
        setRetentionRate([]);
      }

      // Set customer LTV data - fix format
      if (ltv && ltv.aovByUser && typeof ltv.aovByUser === "object") {
        // Convert AOV data to array format
        const ltvArray = Object.entries(ltv.aovByUser)
          .slice(0, 5)
          .map(([userId, aov]) => ({
            name: `User ${userId}`,
            value: aov,
          }));
        setCustomerLtv(ltvArray);
      } else if (Array.isArray(ltv) && ltv.length > 0) {
        setCustomerLtv(ltv);
      } else {
        setCustomerLtv([]);
      }

      setWeekdayRevenue(
        wdr && wdr.weekdayRevenue
          ? toPairs(wdr.weekdayRevenue)
          : Array.isArray(wdr)
          ? wdr
          : []
      );

      // Set rating distribution data - fix format
      if (
        rating &&
        rating.ratingDistribution &&
        typeof rating.ratingDistribution === "object"
      ) {
        // Convert object to array format
        const ratingArray = Object.entries(rating.ratingDistribution).map(
          ([star, count]) => ({
            name: `${star} sao`,
            value: count,
            count: count,
          })
        );
        setRatingDistribution(ratingArray);
      } else if (Array.isArray(rating) && rating.length > 0) {
        setRatingDistribution(rating);
      } else {
        setRatingDistribution([]);
      }

      // Debug logs for troubleshooting
      // Set top rated products
      if (topRated && Array.isArray(topRated) && topRated.length > 0) {
        console.log("Top Rated Products Raw:", topRated);
        setTopRatedProducts(topRated);
      } else {
        setTopRatedProducts([]);
      }

      // Set most favorited products
      if (
        mostFavorited &&
        Array.isArray(mostFavorited) &&
        mostFavorited.length > 0
      ) {
        console.log("Most Favorited Products Raw:", mostFavorited);
        setMostFavoritedProducts(mostFavorited);
      } else {
        setMostFavoritedProducts([]);
      }

      console.log("🔍 === API RESPONSE DEBUG ===");
      console.log("🛒 Frequently Bought Raw API Response:", frq);
      console.log("📊 Retention Rate Raw API Response:", rr);
      console.log("💰 Customer LTV Raw API Response:", ltv);
      console.log("📅 Weekday Revenue Raw API Response:", wdr);
      console.log("⭐ Rating Distribution Raw API Response:", rating);
      console.log("🌟 Top Rated Products Raw API Response:", topRated);
      console.log(
        "❤️ Most Favorited Products Raw API Response:",
        mostFavorited
      );
      console.log("🔍 === END DEBUG ===");

      // Log transformed data after setting states
      setTimeout(() => {
        console.log("🔄 === TRANSFORMED DATA DEBUG ===");
        console.log("🛒 Frequently Bought Transformed:", frequentlyBought);
        console.log("📊 Retention Rate Transformed:", retentionRate);
        console.log("💰 Customer LTV Transformed:", customerLtv);
        console.log("⭐ Rating Distribution Transformed:", ratingDistribution);
        console.log("🔄 === END TRANSFORMED DEBUG ===");
      }, 100);

      // Fetch sales performance data from revenue statistics
      try {
        const revenueResponse = await fetch(
          `/api/statistics/revenue?startDate=${dateRange.start}&endDate=${dateRange.end}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        if (revenueResponse.ok) {
          const revenueData = await revenueResponse.json();
          const salesPerformanceData = {
            totalRevenue: revenueData.totalRevenue || 0,
            totalOrders: revenueData.totalOrders || 0,
            averageOrderValue: revenueData.averageOrderValue || 0,
            timeframe: timeframe,
          };
          setSalesData(salesPerformanceData);
        }
      } catch (error) {
        console.log("Error fetching sales performance:", error);
      }

      try {
        const categoryResponse = await fetch(`/api/statistics/category-sales`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        if (categoryResponse.ok) {
          const categoryData = await categoryResponse.json();
          setCategorySales(categoryData);
        }
      } catch (error) {
        console.log("Error fetching optional data:", error);
      }

      try {
        const ordersResponse = await fetch(`/api/orders/recent?limit=10`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (ordersResponse.ok) {
          const ordersData = await ordersResponse.json();
          console.log("Raw Recent Orders API Response:", ordersData);
          const ordersArray = Array.isArray(ordersData)
            ? ordersData
            : [ordersData];
          console.log("Orders Array:", ordersArray);

          // Fetch order details to get actual products
          const enhancedOrders = await Promise.all(
            ordersArray.map(async order => {
              try {
                console.log(`Processing Order ${order.id}:`, {
                  id: order.id,
                  totalPrice: order.totalPrice,
                  status: order.status,
                  userId: order.userId,
                });
                // Fetch order details to get actual products
                const orderDetailsResponse = await fetch(
                  `/api/order-details/order/${order.id}`,
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem(
                        "authToken"
                      )}`,
                    },
                  }
                );

                let productInfo = "No products";
                console.log(
                  `Order ${order.id} - OrderDetails API Status:`,
                  orderDetailsResponse.status
                );
                if (orderDetailsResponse.ok) {
                  const orderDetails = await orderDetailsResponse.json();
                  console.log(`Order ${order.id} details:`, orderDetails);
                  console.log(
                    `Order ${order.id} details length:`,
                    orderDetails.length
                  );

                  if (orderDetails && orderDetails.length > 0) {
                    // Get product names for each item
                    const productPromises = orderDetails.map(async detail => {
                      try {
                        const productResponse = await fetch(
                          `/api/products/${detail.productId}`,
                          {
                            headers: {
                              Authorization: `Bearer ${localStorage.getItem(
                                "authToken"
                              )}`,
                            },
                          }
                        );
                        if (productResponse.ok) {
                          const productData = await productResponse.json();
                          console.log(
                            `Product ${detail.productId}:`,
                            productData
                          );
                          return `${productData.name} (x${detail.amount})`;
                        } else {
                          console.log(
                            `Failed to fetch product ${detail.productId}`
                          );
                          return `Product #${detail.productId} (x${detail.amount})`;
                        }
                      } catch (error) {
                        console.log(
                          `Error fetching product ${detail.productId}:`,
                          error
                        );
                        return `Product #${detail.productId} (x${detail.amount})`;
                      }
                    });

                    const productNames = await Promise.all(productPromises);
                    productInfo = productNames.join(", ");
                    console.log(
                      `Order ${order.id} productNames:`,
                      productNames
                    );
                    console.log(
                      `Order ${order.id} final productInfo:`,
                      productInfo
                    );

                    // Truncate if too long
                    if (productInfo.length > 100) {
                      productInfo = productInfo.substring(0, 97) + "...";
                      console.log(
                        `Order ${order.id} truncated productInfo:`,
                        productInfo
                      );
                    }
                  }
                } else {
                  const errorText = await orderDetailsResponse.text();
                  console.log(
                    `Failed to fetch order details for order ${order.id}:`,
                    orderDetailsResponse.status,
                    errorText
                  );
                }

                return {
                  ...order,
                  productInfo,
                  paymentMethodText:
                    order.paymentMethod === "CASH_ON_DELIVERY"
                      ? "COD"
                      : order.paymentMethod === "ONLINE_BANKING"
                      ? "Online Banking"
                      : order.paymentMethod || "Unknown",
                  // Add additional info from available data
                  hasNotes: order.notes ? "📝" : "",
                  usedPoints:
                    order.usedPoint > 0 ? `${order.usedPoint} pts` : "",
                };
              } catch (error) {
                console.log(
                  `Error fetching products for order ${order.id}:`,
                  error
                );
                return {
                  ...order,
                  productInfo: "Multiple Products",
                  paymentMethodText:
                    order.paymentMethod === "CASH_ON_DELIVERY"
                      ? "COD"
                      : order.paymentMethod === "ONLINE_BANKING"
                      ? "Online Banking"
                      : order.paymentMethod || "Unknown",
                  hasNotes: order.notes ? "📝" : "",
                  usedPoints:
                    order.usedPoint > 0 ? `${order.usedPoint} pts` : "",
                };
              }
            })
          );

          console.log("Enhanced Recent Orders:", enhancedOrders);
          setRecentOrdersWithDetails(enhancedOrders);
        } else {
          console.error("Recent Orders API Error:", ordersResponse.status);
          setRecentOrdersWithDetails([]);
        }
      } catch (error) {
        console.log("Error fetching recent orders:", error);
        setRecentOrdersWithDetails([]);
      }

      // Fetch data cho từng danh mục - commented out as not used
      // const fetchCategoryData = async (categoryId, setter) => {
      //   try {
      //     const response = await fetch(`/api/products/category/${categoryId}`, {
      //     headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      //   });
      //     if (response.ok) {
      //   const data = await response.json();
      //   setter(data);
      //     }
      //   } catch (error) {
      //   console.log('Error fetching optional data:', error);
      // }
      // };

      // Fetch all products and filter by category
      try {
        const allProductsResponse = await fetch(`/api/products`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        if (allProductsResponse.ok) {
          const allProducts = await allProductsResponse.json();
          console.log("All products loaded:", allProducts.length);

          // Filter products by category
          setComputers(
            allProducts.filter(p =>
              [45, 46, 47, 48, 49, 50, 51].includes(p.categoryId)
            )
          );
          setPhones(
            allProducts.filter(p => [52, 53, 54].includes(p.categoryId))
          );
          setMouses(
            allProducts.filter(p => [6, 7, 8, 9, 10].includes(p.categoryId))
          );
          setKeyboards(
            allProducts.filter(p => [1, 2, 3, 4, 5].includes(p.categoryId))
          );
          setMonitors(
            allProducts.filter(p => [36, 37, 38, 39].includes(p.categoryId))
          );
          setProcessors(
            allProducts.filter(p => [18, 19].includes(p.categoryId))
          );
          setRam(allProducts.filter(p => [30, 31, 32].includes(p.categoryId)));
          setStorage(
            allProducts.filter(p => [27, 28, 29].includes(p.categoryId))
          );
          setCases(allProducts.filter(p => [17].includes(p.categoryId)));
          setMainboards(
            allProducts.filter(p => [20, 21, 22].includes(p.categoryId))
          );
          setPsus(
            allProducts.filter(p => [23, 24, 25, 26].includes(p.categoryId))
          );
          setPcs(allProducts.filter(p => [40, 41].includes(p.categoryId)));
          setHeadphones(
            allProducts.filter(p => [42, 43].includes(p.categoryId))
          );
          setMousepads(
            allProducts.filter(p => [11, 12, 13].includes(p.categoryId))
          );
          setTablets(allProducts.filter(p => [44].includes(p.categoryId)));
          setGamingGear(
            allProducts.filter(p => [14, 15, 16].includes(p.categoryId))
          );
        }
      } catch (error) {
        console.log("Error fetching all products:", error);
      }

      try {
        const customerResponse = await fetch(`/api/users/customers`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        if (customerResponse.ok) {
          const customerData = await customerResponse.json();
          setCustomers(customerData);
        }
      } catch (error) {
        console.log("Error fetching optional data:", error);
      }

      try {
        const orders1Response = await fetch(`/api/orders`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        if (orders1Response.ok) {
          const orders1Data = await orders1Response.json();
          console.log("Orders data from API:", orders1Data);
          setOrders(orders1Data);
        }
      } catch (error) {
        console.log("Error fetching optional data:", error);
      }

      try {
        const topSpendersResponse = await fetch(
          `/api/statistics/top-customers?limit=10`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        if (topSpendersResponse.ok) {
          const topSpendersData = await topSpendersResponse.json();
          // Transform data to match expected format
          const transformedData = topSpendersData.topCustomers
            ? topSpendersData.topCustomers.map(customer => ({
                fullName: customer.customerName,
                totalSpent: customer.totalRevenue || 0,
              }))
            : [];
          setTopSpenders(transformedData);
        }
      } catch (error) {
        console.log("Error fetching top spenders data:", error);
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    timeframe,
    spendersTimeframe,
    dateRange.start,
    dateRange.end,
    productIdForRating,
  ]);

  const handleTimeframeChange = event => setTimeframe(event.target.value);
  const handleSpendersTimeframeChange = async event => {
    const newTimeframe = event.target.value;
    setSpendersTimeframe(newTimeframe);

    // Fetch new data for top spenders
    try {
      const topSpendersResponse = await fetch(
        `/api/statistics/top-customers?limit=10`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (topSpendersResponse.ok) {
        const topSpendersData = await topSpendersResponse.json();
        // Transform data to match expected format
        const transformedData = topSpendersData.topCustomers
          ? topSpendersData.topCustomers.map(customer => ({
              fullName: customer.customerName,
              totalSpent: customer.totalRevenue || 0,
            }))
          : [];
        setTopSpenders(transformedData);
      }
    } catch (error) {
      console.log("Error fetching top spenders data:", error);
    }
  };

  const mainBg = darkMode ? "bg-gray-900" : "bg-gray-50";
  const sidebarBg = darkMode ? "bg-gray-900" : "bg-white";
  const cardBg = darkMode ? "bg-gray-800" : "bg-white";
  const textColor = darkMode ? "text-gray-200" : "text-gray-800";
  const secondaryTextColor = darkMode ? "text-gray-400" : "text-gray-500";
  const borderColor = darkMode ? "border-gray-700" : "border-gray-200";
  const activeMenuBg = darkMode ? "bg-gray-700" : "bg-blue-500";
  const activeMenuText = "text-white";
  const hoverMenuBg = "";

  if (loading && !dashboardStats) {
    return (
      <div
        className={`flex h-screen w-full ${mainBg} ${textColor} items-center justify-center`}
      >
        <div className="text-center">
          <p className="text-xl mb-2">{t("admin.loading_dashboard_data")}</p>
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex h-screen w-full ${mainBg} ${textColor} items-center justify-center`}
      >
        <div className="text-center">
          <p className="text-xl mb-2 text-red-500">
            {t("admin.error_loading_dashboard")}
          </p>
          <p>{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => window.location.reload()}
          >
            {t("common.retry")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex h-screen w-full ${mainBg} ${textColor}`}>
      <div
        className={`w-64 h-full ${sidebarBg} border-r ${borderColor} flex flex-col`}
      >
        <div className="p-4 flex items-center">
          <div className="bg-blue-500 rounded-lg p-1 mr-2">
            <FaDesktop className="text-white" size={20} />
          </div>
          <span className="text-xl font-semibold">{t("admin.techstore")}</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="px-4 py-2">
            <ul className="space-y-1">
              {[
                { name: "Dashboard", icon: FaChartPie, key: "menu_dashboard" },
                { name: "Computers", icon: FaDesktop, key: "menu_computers" },
                {
                  name: "Processors",
                  icon: FaMicrochip,
                  key: "menu_processors",
                },
                { name: "RAM", icon: FaMemory, key: "menu_ram" },
                { name: "Storage", icon: FaHdd, key: "menu_storage" },
                { name: "Case", icon: FaServer, key: "menu_case" },
                {
                  name: "Mainboard",
                  icon: FaProjectDiagram,
                  key: "menu_mainboard",
                },
                { name: "Psu", icon: FaPlug, key: "menu_psu" },
                { name: "PC", icon: FaCogs, key: "menu_pc" },
                {
                  name: "Headphone",
                  icon: FaHeadphones,
                  key: "menu_headphone",
                },
                { name: "Mousepad", icon: FaRegSquare, key: "menu_mousepad" },
                {
                  name: "GamingGear",
                  icon: FaGamepad,
                  key: "menu_gaming_gear",
                },
                { name: "Tablet", icon: FaTabletAlt, key: "menu_tablet" },
                { name: "Laptops", icon: FaLaptop, key: "menu_laptops" },
                { name: "Phone", icon: FaMobile, key: "menu_phone" },
                { name: "Mouse", icon: FaMouse, key: "menu_mouse" },
                { name: "KeyBoard", icon: FaKeyboard, key: "menu_keyboard" },
                { name: "Orders", icon: FaShoppingCart, key: "menu_orders" },
                {
                  name: "ShippedOrders",
                  icon: FaTruck,
                  key: "menu_shipped_orders",
                },

                { name: "Customers", icon: FaUsers, key: "menu_customers" },
                { name: "Reviews", icon: FaStar, key: "menu_reviews" },
                { name: "Discounts", icon: FaTicketAlt, key: "menu_discounts" },
              ].map(menu => (
                <li key={menu.name}>
                  <button
                    onClick={() => {
                      setActiveMenu(menu.name);
                    }}
                    className={`flex items-center p-3 rounded-lg w-full text-left ${
                      activeMenu === menu.name
                        ? `${activeMenuBg} ${activeMenuText}`
                        : `${hoverMenuBg}`
                    }`}
                  >
                    <menu.icon className="mr-3" size={18} />
                    <span>{t(`admin.${menu.key}`)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={`p-4 flex items-center border-t ${borderColor}`}>
          <div className="mr-3">
            <FaUserCircle size={24} className="text-gray-400" />
          </div>
          <div>
            <div className="text-center"></div>
            <div className="font-medium">
              {user ? user.fullName : t("admin.admin_user")}
            </div>

            <div
              onClick={() => setShowModal(true)}
              className={`text-xs ${secondaryTextColor} cursor-pointer`}
            >
              {t("admin.logout")}
            </div>
          </div>
        </div>
        {showModal && (
          <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-[9999]">
            <div className="bg-white text-amber-500 p-6 rounded-xl shadow-lg text-center w-80">
              <h2 className="text-lg font-semibold mb-4">
                {t("admin.bn_c_chc_mun")}
              </h2>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleLogoutConfirm}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  {t("common.yes")}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
                >
                  {t("common.no")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header
          className={`flex items-center justify-between p-4 border-b ${borderColor}`}
        >
          <div className="flex items-center">
            <div className="flex items-center px-2">
              <button className="mr-2">
                <FaEllipsisH size={16} />
              </button>
              <div className="text-sm breadcrumbs">
                <span>
                  {activeMenu === "Dashboard"
                    ? t("admin.menu_dashboard")
                    : activeMenu === "Computers"
                    ? t("admin.menu_computers")
                    : activeMenu === "Processors"
                    ? t("admin.menu_processors")
                    : activeMenu === "RAM"
                    ? t("admin.menu_ram")
                    : activeMenu === "Storage"
                    ? t("admin.menu_storage")
                    : activeMenu === "Case"
                    ? t("admin.menu_case")
                    : activeMenu === "Mainboard"
                    ? t("admin.menu_mainboard")
                    : activeMenu === "Psu"
                    ? t("admin.menu_psu")
                    : activeMenu === "PC"
                    ? t("admin.menu_pc")
                    : activeMenu === "Headphone"
                    ? t("admin.menu_headphone")
                    : activeMenu === "Mousepad"
                    ? t("admin.menu_mousepad")
                    : activeMenu === "GamingGear"
                    ? t("admin.menu_gaming_gear")
                    : activeMenu === "Tablet"
                    ? t("admin.menu_tablet")
                    : activeMenu === "Laptops"
                    ? t("admin.menu_laptops")
                    : activeMenu === "Phone"
                    ? t("admin.menu_phone")
                    : activeMenu === "Mouse"
                    ? t("admin.menu_mouse")
                    : activeMenu === "KeyBoard"
                    ? t("admin.menu_keyboard")
                    : activeMenu === "Orders"
                    ? t("admin.menu_orders")
                    : activeMenu === "ShippedOrders"
                    ? t("admin.menu_shipped_orders")
                    : activeMenu === "Customers"
                    ? t("admin.menu_customers")
                    : activeMenu === "Reviews"
                    ? t("admin.menu_reviews")
                    : activeMenu === "Discounts"
                    ? t("admin.menu_discounts")
                    : activeMenu}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/admin/calendar")}
              className="p-2 rounded-full"
              title={t("admin.view_calendar")}
            >
              <FaCalendar size={18} />
            </button>
            <LanguageSwitcher />
            <button onClick={toggleDarkMode} className="p-2 rounded-full">
              {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-6">
          {activeMenu === "Dashboard" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div
                  className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">
                      {t("admin.total_products")}
                    </h3>
                    <span
                      className={
                        (productsStats?.activeProducts ?? 0) >= 0
                          ? "text-green-500 flex items-center"
                          : "text-red-500 flex items-center"
                      }
                    >
                      <FaArrowUp className="mr-1" size={14} />
                    </span>
                  </div>
                  <p className="text-3xl font-bold">
                    {productsStats?.totalProducts
                      ? productsStats.totalProducts.toLocaleString()
                      : "-"}
                  </p>
                  <p className={`text-xs mt-2 ${secondaryTextColor}`}>
                    {t("admin.active")}: {productsStats?.activeProducts ?? 0} •{" "}
                    {t("admin.out_of_stock")}:{" "}
                    {productsStats?.outOfStockProducts ?? 0}
                  </p>
                </div>
                <div
                  className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">
                      {t("admin.total_orders")}
                    </h3>
                    <span
                      className={
                        (ordersStats?.totalOrders ?? 0) >= 0
                          ? "text-green-500 flex items-center"
                          : "text-red-500 flex items-center"
                      }
                    >
                      <FaArrowUp className="mr-1" size={14} />
                    </span>
                  </div>
                  <p className="text-3xl font-bold">
                    {ordersStats?.totalOrders
                      ? ordersStats.totalOrders.toLocaleString()
                      : "-"}
                  </p>
                  <p className={`text-xs mt-2 ${secondaryTextColor}`}>
                    {t("admin.pending")}: {ordersStats?.pendingOrders ?? 0} •{" "}
                    {t("admin.processing")}:{" "}
                    {ordersStats?.processingOrders ?? 0}
                  </p>
                </div>
                <div
                  className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">
                      {t("common.total_users")}
                    </h3>
                    <span
                      className={
                        (usersStats?.totalUsers ?? 0) >= 0
                          ? "text-green-500 flex items-center"
                          : "text-red-500 flex items-center"
                      }
                    >
                      <FaArrowUp className="mr-1" size={14} />
                    </span>
                  </div>
                  <p className="text-3xl font-bold">
                    {usersStats?.totalUsers
                      ? usersStats.totalUsers.toLocaleString()
                      : "-"}
                  </p>
                  <p className={`text-xs mt-2 ${secondaryTextColor}`}>
                    {t("admin.active")}: {usersStats?.activeUsers ?? 0} •{" "}
                    {t("admin.inactive")}: {usersStats?.inactiveUsers ?? 0}
                  </p>
                </div>
                <div
                  className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">
                      {t("admin.low_stock")}
                    </h3>
                    <span className="text-red-500 flex items-center">
                      <FaArrowDown className="mr-1" size={14} />
                    </span>
                  </div>
                  <p className="text-3xl font-bold">
                    {lowStockList?.length
                      ? lowStockList.length.toLocaleString()
                      : "-"}
                  </p>
                  <p className={`text-xs mt-2 ${secondaryTextColor}`}>
                    {t("admin.out_of_stock")}:{" "}
                    {productsStats?.outOfStockProducts ?? 0}
                  </p>
                </div>
              </div>
              <div
                className={`p-6 rounded-lg ${cardBg} border ${borderColor} mb-6`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex space-x-4">
                    <button className="text-blue-500 border-b-2 border-blue-500 pb-2">
                      {t("admin.sales_performance")}
                    </button>
                  </div>
                  <div className="flex items-center">
                    <select
                      className={`mr-2 ${cardBg} border ${borderColor} rounded px-2 py-1`}
                      value={timeframe}
                      onChange={handleTimeframeChange}
                    >
                      <option value="last7days">
                        {t("admin.last_7_days")}
                      </option>
                      <option value="last30days">
                        {t("admin.last_30_days")}
                      </option>
                      <option value="lastQuarter">
                        {t("admin.last_quarter")}
                      </option>
                      <option value="lastYear">{t("admin.last_year")}</option>
                    </select>
                    <div className="flex items-center ml-2 text-xs">
                      <span className={`mr-1 ${secondaryTextColor}`}>
                        {t("remaining.from")}
                      </span>
                      <input
                        type="date"
                        className={`${cardBg} border ${borderColor} rounded px-2 py-1 mr-2`}
                        value={dateRange.start}
                        onChange={e =>
                          setDateRange(r => ({ ...r, start: e.target.value }))
                        }
                      />
                      <span className={`mr-1 ${secondaryTextColor}`}>
                        {t("remaining.to")}
                      </span>
                      <input
                        type="date"
                        className={`${cardBg} border ${borderColor} rounded px-2 py-1`}
                        value={dateRange.end}
                        onChange={e =>
                          setDateRange(r => ({ ...r, end: e.target.value }))
                        }
                      />
                    </div>
                    <button>
                      <FaEllipsisH size={16} />
                    </button>
                  </div>
                </div>
                <div className="h-80 w-full">
                  {salesData && salesData.totalRevenue > 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="text-6xl font-bold text-green-600 mb-4">
                          {salesData.totalRevenue?.toLocaleString() || 0} VND
                        </div>
                        <div className="text-2xl text-gray-600 mb-3">
                          {t("admin.total_revenue")}
                        </div>
                        <div className="text-lg text-gray-500">
                          {salesData.totalOrders || 0} {t("header.orders")} •
                          {t("admin.aov_label")}:{" "}
                          {salesData.averageOrderValue || 0} VND
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-xl">
                        {t("admin.no_sales_data_available")}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div
                className={`p-6 rounded-lg ${cardBg} border ${borderColor} mb-6`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setInsightTab("orders")}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                        insightTab === "orders"
                          ? "bg-blue-600 text-white shadow-lg"
                          : `${cardBg} border ${borderColor}`
                      }`}
                    >
                      {t("remaining.orders_trend")}
                    </button>
                    <button
                      onClick={() => setInsightTab("revenue")}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                        insightTab === "revenue"
                          ? "bg-blue-600 text-white shadow-lg"
                          : `${cardBg} border ${borderColor}`
                      }`}
                    >
                      {t("remaining.revenue_by_day")}
                    </button>
                    <button
                      onClick={() => setInsightTab("revenue-month")}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                        insightTab === "revenue-month"
                          ? "bg-blue-600 text-white shadow-lg"
                          : `${cardBg} border ${borderColor}`
                      }`}
                    >
                      {t("remaining.revenue_by_month")}
                    </button>
                    <button
                      onClick={() => setInsightTab("revenue-quarter")}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                        insightTab === "revenue-quarter"
                          ? "bg-blue-600 text-white shadow-lg"
                          : `${cardBg} border ${borderColor}`
                      }`}
                    >
                      {t("remaining.revenue_by_quarter")}
                    </button>
                    <button
                      onClick={() => setInsightTab("weekday-revenue")}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                        insightTab === "weekday-revenue"
                          ? "bg-blue-600 text-white shadow-lg"
                          : `${cardBg} border ${borderColor}`
                      }`}
                    >
                      {t("remaining.weekday_revenue")}
                    </button>
                    <button
                      onClick={() => setInsightTab("top-products")}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                        insightTab === "top-products"
                          ? "bg-blue-600 text-white shadow-lg"
                          : `${cardBg} border ${borderColor}`
                      }`}
                    >
                      {t("remaining.top_products_tab")}
                    </button>
                    <button
                      onClick={() => setInsightTab("top-customers")}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                        insightTab === "top-customers"
                          ? "bg-blue-600 text-white shadow-lg"
                          : `${cardBg} border ${borderColor}`
                      }`}
                    >
                      {t("customer.vip_customers")}
                    </button>
                  </div>
                </div>
                <div className="h-[600px] w-full">
                  {insightTab === "orders" ? (
                    ordersTrend && ordersTrend.length > 0 ? (
                      <TrendChart
                        data={ordersTrend}
                        title={t("remaining.orders_trend")}
                        darkMode={darkMode}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p>{t("admin.no_data_available")}</p>
                      </div>
                    )
                  ) : insightTab === "revenue" ? (
                    revenueByDay && revenueByDay.length > 0 ? (
                      <TrendChart
                        data={revenueByDay}
                        title={t("remaining.revenue_by_day")}
                        darkMode={darkMode}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p>{t("admin.no_data_available")}</p>
                      </div>
                    )
                  ) : insightTab === "revenue-month" ? (
                    revenueByMonth && revenueByMonth.length > 0 ? (
                      <TrendChart
                        data={revenueByMonth}
                        title={t("remaining.revenue_by_month")}
                        darkMode={darkMode}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p>{t("admin.no_data_available")}</p>
                      </div>
                    )
                  ) : insightTab === "revenue-quarter" ? (
                    revenueByQuarter && revenueByQuarter.length > 0 ? (
                      <TrendChart
                        data={revenueByQuarter}
                        title={t("remaining.revenue_by_quarter")}
                        darkMode={darkMode}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p>{t("admin.no_data_available")}</p>
                      </div>
                    )
                  ) : insightTab === "weekday-revenue" ? (
                    weekdayRevenue && weekdayRevenue.length > 0 ? (
                      <TrendChart
                        data={weekdayRevenue}
                        title={t("admin.weekday_revenue_title")}
                        darkMode={darkMode}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p>{t("admin.no_data_available")}</p>
                      </div>
                    )
                  ) : insightTab === "top-products" ? (
                    topProducts && topProducts.length > 0 ? (
                      <div className="w-full h-full p-8">
                        <div className="text-center mb-8">
                          <h3
                            className={`text-2xl font-bold ${
                              darkMode ? "text-gray-200" : "text-gray-800"
                            }`}
                          >
                            {t("remaining.top_products_tab")}
                          </h3>
                        </div>
                        <div className="space-y-6 max-h-[500px] overflow-y-auto">
                          {topProducts.map((product, index) => (
                            <div
                              key={index}
                              className={`flex items-center justify-between p-6 rounded-xl border ${
                                darkMode
                                  ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                                  : "bg-white border-gray-200 hover:bg-gray-100"
                              } transition-all duration-200 shadow-sm`}
                            >
                              <div className="flex items-center space-x-6">
                                <div
                                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                                    index === 0
                                      ? "bg-yellow-500"
                                      : index === 1
                                      ? "bg-gray-400"
                                      : index === 2
                                      ? "bg-orange-500"
                                      : "bg-blue-500"
                                  }`}
                                >
                                  {index + 1}
                                </div>
                                <div>
                                  <h4
                                    className={`text-lg font-semibold ${
                                      darkMode
                                        ? "text-gray-200"
                                        : "text-gray-800"
                                    }`}
                                  >
                                    {product.productName || product.name || "-"}
                                  </h4>
                                  <p
                                    className={`text-base ${
                                      darkMode
                                        ? "text-gray-400"
                                        : "text-gray-600"
                                    }`}
                                  >
                                    ID: {product.productId || "-"}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div
                                  className={`text-2xl font-bold ${
                                    darkMode
                                      ? "text-green-400"
                                      : "text-green-600"
                                  }`}
                                >
                                  {(
                                    product.totalSold ||
                                    product.revenue ||
                                    product.totalRevenue ||
                                    0
                                  ).toLocaleString()}
                                </div>
                                <div
                                  className={`text-sm ${
                                    darkMode ? "text-gray-400" : "text-gray-500"
                                  }`}
                                >
                                  {t("admin.sold")}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p>{t("admin.no_data_available")}</p>
                      </div>
                    )
                  ) : insightTab === "top-customers" ? (
                    topCustomers && topCustomers.length > 0 ? (
                      (() => {
                        const normalized = Array.isArray(topCustomers)
                          ? topCustomers
                          : [topCustomers];
                        const entries = normalized.slice(0, 8); // Show up to 8 items
                        const total = entries.reduce(
                          (sum, e) =>
                            sum + Number(e.totalRevenue || e.totalOrders || 0),
                          0
                        );

                        if (total === 0) {
                          return (
                            <div className="w-full h-full flex items-center justify-center">
                              <p
                                className={`text-lg ${
                                  darkMode ? "text-gray-400" : "text-gray-500"
                                }`}
                              >
                                {t("admin.no_data")}
                              </p>
                            </div>
                          );
                        }

                        const colors = [
                          "#3B82F6",
                          "#10B981",
                          "#8B5CF6",
                          "#F59E0B",
                          "#EF4444",
                          "#06B6D4",
                          "#84CC16",
                          "#F97316",
                        ];

                        let currentAngle = 0;
                        const segments = entries.map((e, i) => {
                          const value = Number(
                            e.totalRevenue || e.totalOrders || 0
                          );
                          const percentage = (value / total) * 100;
                          const angle = (value / total) * 360;

                          const segment = {
                            ...e,
                            value: value, // Đảm bảo value được set đúng
                            percentage: percentage,
                            angle: angle,
                            startAngle: currentAngle,
                            endAngle: currentAngle + angle,
                            color: colors[i % colors.length],
                            index: i,
                          };

                          currentAngle += angle;
                          return segment;
                        });

                        const radius = 150;
                        const centerX = 200;
                        const centerY = 200;

                        return (
                          <div className="w-full h-full p-8">
                            <div className="text-center mb-8">
                              <h3
                                className={`text-2xl font-bold ${
                                  darkMode ? "text-gray-200" : "text-gray-800"
                                }`}
                              >
                                {t("customer.vip_customers")}
                              </h3>
                            </div>
                            <div className="flex items-center justify-between h-[500px]">
                              {/* Pie Chart */}
                              <div className="flex-1 flex items-center justify-center">
                                <svg
                                  width="400"
                                  height="400"
                                  className="transform -rotate-90"
                                >
                                  {segments.map((segment, i) => {
                                    const startAngleRad =
                                      (segment.startAngle * Math.PI) / 180;
                                    const endAngleRad =
                                      (segment.endAngle * Math.PI) / 180;

                                    const x1 =
                                      centerX +
                                      radius * Math.cos(startAngleRad);
                                    const y1 =
                                      centerY +
                                      radius * Math.sin(startAngleRad);
                                    const x2 =
                                      centerX + radius * Math.cos(endAngleRad);
                                    const y2 =
                                      centerY + radius * Math.sin(endAngleRad);

                                    const largeArcFlag =
                                      segment.angle > 180 ? 1 : 0;

                                    const pathData = [
                                      `M ${centerX} ${centerY}`,
                                      `L ${x1} ${y1}`,
                                      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                                      "Z",
                                    ].join(" ");

                                    return (
                                      <path
                                        key={i}
                                        d={pathData}
                                        fill={segment.color}
                                        stroke={
                                          darkMode ? "#1F2937" : "#FFFFFF"
                                        }
                                        strokeWidth="3"
                                        className="hover:opacity-80 transition-opacity cursor-pointer"
                                        title={`${
                                          segment.customerName || segment.name
                                        }: ${(
                                          segment.value || 0
                                        ).toLocaleString()} VNĐ (${segment.percentage.toFixed(
                                          1
                                        )}%)`}
                                      />
                                    );
                                  })}

                                  {/* Center circle */}
                                  <circle
                                    cx={centerX}
                                    cy={centerY}
                                    r="80"
                                    fill={darkMode ? "#1F2937" : "#FFFFFF"}
                                    stroke={darkMode ? "#374151" : "#E5E7EB"}
                                    strokeWidth="3"
                                  />

                                  {/* Total in center */}
                                  <text
                                    x={centerX}
                                    y={centerY - 10}
                                    textAnchor="middle"
                                    className={`text-xl font-bold ${
                                      darkMode
                                        ? "text-gray-200"
                                        : "text-gray-800"
                                    }`}
                                    transform="rotate(90 200 200)"
                                  >
                                    {total.toLocaleString()}
                                  </text>
                                  <text
                                    x={centerX}
                                    y={centerY + 20}
                                    textAnchor="middle"
                                    className={`text-base ${
                                      darkMode
                                        ? "text-gray-400"
                                        : "text-gray-600"
                                    }`}
                                    transform="rotate(90 200 200)"
                                  >
                                    Total
                                  </text>
                                </svg>
                              </div>

                              {/* Legend with details */}
                              <div className="flex-1 pl-12">
                                <div className="space-y-4 max-h-[450px] overflow-y-auto">
                                  {segments.map((segment, i) => (
                                    <div
                                      key={i}
                                      className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                      style={{ cursor: "default" }}
                                    >
                                      <div className="flex items-center space-x-4">
                                        <div
                                          className="w-6 h-6 rounded-full"
                                          style={{
                                            backgroundColor: segment.color,
                                          }}
                                        />
                                        <div>
                                          <div
                                            className={`text-lg font-semibold ${
                                              darkMode
                                                ? "text-gray-200"
                                                : "text-gray-800"
                                            }`}
                                          >
                                            {segment.customerName ||
                                              segment.name}
                                          </div>
                                          <div
                                            className={`text-base ${
                                              darkMode
                                                ? "text-gray-400"
                                                : "text-gray-600"
                                            }`}
                                          >
                                            {segment.percentage.toFixed(1)}% •{" "}
                                            {(
                                              segment.value || 0
                                            ).toLocaleString()}{" "}
                                            VNĐ
                                          </div>
                                          {/* Additional details based on data type */}
                                          {(segment.totalOrders ||
                                            segment.orders) && (
                                            <div
                                              className={`text-sm ${
                                                darkMode
                                                  ? "text-gray-500"
                                                  : "text-gray-500"
                                              }`}
                                            >
                                              {segment.totalOrders ||
                                                segment.orders}{" "}
                                              {t("admin.orders")}
                                            </div>
                                          )}
                                          {segment.totalRevenue &&
                                            segment.totalRevenue !==
                                              segment.value && (
                                              <div
                                                className={`text-sm ${
                                                  darkMode
                                                    ? "text-gray-500"
                                                    : "text-gray-500"
                                                }`}
                                              >
                                                {t("admin.revenue")}:{" "}
                                                {(
                                                  segment.totalRevenue || 0
                                                ).toLocaleString()}{" "}
                                                VND
                                              </div>
                                            )}
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <div
                                          className={`text-xl font-bold ${
                                            darkMode
                                              ? "text-gray-300"
                                              : "text-gray-700"
                                          }`}
                                        >
                                          {segment.percentage.toFixed(1)}%
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })()
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p>{t("admin.no_data_available")}</p>
                      </div>
                    )
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p>{t("admin.no_data_available")}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div
                  className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">
                      {t("remaining.top_products")}
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-base">
                      <thead>
                        <tr className={`border-b ${borderColor}`}>
                          <th className="pb-3 pt-2 text-left text-lg font-bold">
                            #
                          </th>
                          <th className="pb-3 pt-2 text-left text-lg font-bold">
                            {t("admin.product")}
                          </th>
                          <th className="pb-3 pt-2 text-right text-lg font-bold">
                            {t("admin.sold")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {(topProducts || []).map((p, idx) => (
                          <tr key={idx} className={`border-b ${borderColor}`}>
                            <td className="py-4 text-lg font-semibold">
                              {idx + 1}
                            </td>
                            <td className="py-4 text-lg">
                              {p.productName || p.name || "-"}
                            </td>
                            <td className="py-4 text-right text-lg font-bold text-blue-600 dark:text-blue-400">
                              {(
                                p.totalSold ||
                                p.revenue ||
                                p.totalRevenue ||
                                0
                              ).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div
                  className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">
                      {t("customer.vip_customers")}
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-base">
                      <thead>
                        <tr className={`border-b ${borderColor}`}>
                          <th className="pb-3 pt-2 text-left text-lg font-bold">
                            #
                          </th>
                          <th className="pb-3 pt-2 text-left text-lg font-bold">
                            {t("admin.customer")}
                          </th>
                          <th className="pb-3 pt-2 text-right text-lg font-bold">
                            {t("admin.amount")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {console.log("Top Customers Table Data:", topCustomers)}
                        {(topCustomers || []).map((c, idx) => (
                          <tr
                            key={idx}
                            className={`border-b ${borderColor}`}
                            style={{ cursor: "default" }}
                          >
                            <td className="py-4 text-lg font-semibold">
                              {idx + 1}
                            </td>
                            <td className="py-4 text-lg">
                              {c.customerName || c.fullName || c.name || "-"}
                            </td>
                            <td className="py-4 text-right text-lg font-bold text-green-600 dark:text-green-400">
                              {(
                                c.totalRevenue ||
                                c.totalSpent ||
                                c.revenue ||
                                0
                              ).toLocaleString()}{" "}
                              VNĐ
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {showAdvanced && (
                <>
                  {/* Advanced blocks already below will be visible when toggled */}
                </>
              )}
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-8">
                <div
                  className={`p-8 rounded-xl ${cardBg} border-2 ${borderColor} lg:col-span-2`}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold">
                      {t("admin.revenue_by_month")}
                    </h3>
                  </div>
                  <div className="h-80">
                    {console.log("Revenue By Month Data:", revenueByMonth)}
                    <RevenueChart
                      data={revenueByMonth || []}
                      darkMode={darkMode}
                      title={t("admin.revenue_by_month")}
                    />
                  </div>
                </div>
                <div
                  className={`p-8 rounded-xl ${cardBg} border-2 ${borderColor}`}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold">
                      {t("admin.revenue_by_quarter")}
                    </h3>
                  </div>
                  <div className="h-80">
                    {console.log("Revenue By Quarter Data:", revenueByQuarter)}
                    <RevenueChart
                      data={revenueByQuarter || []}
                      darkMode={darkMode}
                      title={t("admin.revenue_by_quarter")}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-8">
                <div
                  className={`p-8 rounded-xl ${cardBg} border-2 ${borderColor}`}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold">
                      {t("admin.revenue_by_year_title")}
                    </h3>
                  </div>
                  <div className="h-80">
                    {console.log("Revenue By Year Data:", revenueByYear)}
                    {revenueByYear && revenueByYear.length > 0 ? (
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="text-center mb-8">
                          <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                            {(revenueByYear[0]?.value || 0).toLocaleString()}{" "}
                            VNĐ
                          </div>
                          <div className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                            {t("admin.revenue_of_year")}{" "}
                            {revenueByYear[0]?.name || "2025"}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-400 mb-2">
                            {t("admin.no_data")}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className={`p-8 rounded-xl ${cardBg} border-2 ${borderColor}`}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold">
                      {t("remaining.returning_customers")}
                    </h3>
                  </div>
                  <div className="h-80 overflow-y-auto">
                    {console.log(
                      "Returning Customers Table Data:",
                      returningCustomers
                    )}
                    <table className="w-full text-lg">
                      <thead>
                        <tr className={`border-b-2 ${borderColor}`}>
                          <th className="pb-3 pt-2 text-left text-xl font-bold">
                            #
                          </th>
                          <th className="pb-3 pt-2 text-left text-xl font-bold">
                            {t("admin.customer")}
                          </th>
                          <th className="pb-3 pt-2 text-right text-xl font-bold">
                            {t("remaining.orders_label")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {(returningCustomers || []).map((customer, idx) => (
                          <tr key={idx} className={`border-b ${borderColor}`}>
                            <td className="py-4 text-lg font-semibold">
                              {idx + 1}
                            </td>
                            <td className="py-4 text-lg">
                              {customer.customerName ||
                                customer.name ||
                                customer.fullName ||
                                "-"}
                            </td>
                            <td className="py-4 text-right text-lg font-bold">
                              {customer.totalOrders ||
                                customer.orders ||
                                customer.count ||
                                0}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div
                className={`p-6 rounded-xl ${cardBg} border-2 ${borderColor} mb-8`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">
                    {t("remaining.rfm_analysis")}
                  </h3>
                </div>
                <div className="h-[400px]">
                  {console.log("RFM Analysis Data:", rfm)}
                  {rfm && rfm.length > 0 ? (
                    <RFMBarChart
                      data={rfm || []}
                      darkMode={darkMode}
                      title={t("remaining.rfm_analysis")}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-400 mb-2">
                          {t("admin.rfm_analysis")}
                        </div>
                        <div className="text-lg text-gray-500">
                          {t("admin.no_rfm_data")}
                        </div>
                        <div className="text-sm text-gray-600 mt-2">
                          Try adjusting the date range
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-8 mb-8">
                <div
                  className={`p-6 rounded-xl ${cardBg} border-2 ${borderColor}`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">
                      {t("remaining.abc_inventory")}
                    </h3>
                  </div>
                  <div className="h-[400px]">
                    {console.log("ABC Inventory Data:", abcInventory)}
                    {abcInventory && abcInventory.length > 0 ? (
                      <GenericBarChart
                        data={abcInventory || []}
                        darkMode={darkMode}
                        title={t("remaining.abc_inventory")}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <div className="text-lg text-gray-500">
                            No ABC inventory data available
                          </div>
                          <div className="text-sm text-gray-600 mt-2">
                            Try adjusting the date range
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-8">
                <div
                  className={`p-8 rounded-xl ${cardBg} border-2 ${borderColor}`}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold">
                      {t("remaining.top_rated_products")}
                    </h3>
                  </div>
                  {loading ? (
                    <div className="flex items-center justify-center h-80">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                        <div className="text-lg text-gray-500">
                          {t("admin.loading_text")}
                        </div>
                      </div>
                    </div>
                  ) : topRatedProducts && topRatedProducts.length > 0 ? (
                    <TopRatedProductsChart
                      data={topRatedProducts || []}
                      darkMode={darkMode}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-80">
                      <div className="text-center">
                        <div className="text-lg text-gray-500">
                          {t("admin.no_top_rated_data")}
                        </div>
                        <div className="text-sm text-gray-600 mt-2">
                          {t("admin.no_top_rated_message")}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div
                  className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">
                      {t("admin.retention_rate")}
                    </h3>
                  </div>
                  <div className="h-48">
                    {loading ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                      </div>
                    ) : retentionRate && retentionRate.length > 0 ? (
                      <RetentionRateChart
                        data={retentionRate || []}
                        darkMode={darkMode}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center text-gray-500">
                          No retention data
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">
                      {t("admin.customer_ltv")}
                    </h3>
                  </div>
                  <div className="h-48">
                    {loading ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                      </div>
                    ) : customerLtv && customerLtv.length > 0 ? (
                      <CustomerLtvChart
                        data={customerLtv || []}
                        darkMode={darkMode}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center text-gray-500">
                          No LTV data
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">
                      {t("admin.weekday_revenue")}
                    </h3>
                  </div>
                  <div className="h-48">
                    {console.log("Weekday Revenue Data:", weekdayRevenue)}
                    {loading ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                      </div>
                    ) : weekdayRevenue && weekdayRevenue.length > 0 ? (
                      <WeekdayRevenueChart
                        data={weekdayRevenue || []}
                        darkMode={darkMode}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center text-gray-500">
                          No revenue data
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Product Category Sales - Full Width Below */}
              <div
                className={`p-6 rounded-lg ${cardBg} border ${borderColor} mb-6`}
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-medium text-green-500">
                      {t("admin.product_category_sales")}
                    </h3>
                    <div className="group relative">
                      <div className="text-gray-400 hover:text-gray-600 cursor-help text-sm">
                        ℹ️
                      </div>
                      <div className="absolute top-full left-0 mt-2 hidden group-hover:block z-10 w-72">
                        <div className="bg-gray-800 text-white text-xs rounded-lg py-2 px-3 shadow-lg">
                          <div className="font-medium mb-1">
                            Phân tích doanh thu theo danh mục
                          </div>
                          <div className="text-gray-300 leading-relaxed">
                            Hiển thị tất cả danh mục sản phẩm, sắp xếp theo
                            doanh thu từ cao đến thấp để xác định danh mục đóng
                            góp nhiều nhất.
                          </div>
                        </div>
                        <div className="absolute bottom-full left-4 border-4 border-transparent border-b-gray-800"></div>
                      </div>
                    </div>
                  </div>
                  <button>
                    <FaEllipsisH size={16} />
                  </button>
                </div>
                <div className="h-96 overflow-y-auto">
                  <CategorySalesChart
                    data={categorySales}
                    darkMode={darkMode}
                  />
                </div>
              </div>
              <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-blue-500">
                    {t("admin.recent_orders")}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {recentOrdersWithDetails?.length || 0}{" "}
                    {t("admin.orders_count_label")}
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed">
                    <thead>
                      <tr className={`border-b ${borderColor}`}>
                        <th className="pb-3 text-left w-20">
                          {t("admin.order_id")}
                        </th>
                        <th className="pb-3 text-left w-80">
                          {t("admin.product")}
                        </th>
                        <th className="pb-3 text-left w-24">
                          {t("admin.date")}
                        </th>
                        <th className="pb-3 text-right w-32">
                          {t("admin.amount")}
                        </th>
                        <th className="pb-3 text-left w-28">
                          {t("admin.payment_label")}
                        </th>
                        <th className="pb-3 text-left w-24">
                          {t("admin.status")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrdersWithDetails &&
                        Array.isArray(recentOrdersWithDetails) &&
                        recentOrdersWithDetails.map(order => {
                          let statusColor;
                          switch (order.status) {
                            case "PENDING":
                            case "PROCESSING":
                              statusColor = "blue";
                              break;
                            case "SHIPPING":
                            case "SHIPPED":
                              statusColor = "green";
                              break;
                            case "COMPLETED":
                            case "DELIVERED":
                              statusColor = "purple";
                              break;
                            case "CANCELED":
                            case "CANCELLED":
                              statusColor = "red";
                              break;
                            default:
                              statusColor = "gray";
                          }
                          return (
                            <tr
                              key={order.id}
                              className={`border-b ${borderColor}`}
                            >
                              <td className="py-3">
                                <div className="flex items-center space-x-1">
                                  <span className="font-semibold">
                                    #{order.id}
                                  </span>
                                  {order.hasNotes && (
                                    <span
                                      title={order.notes}
                                      className="text-yellow-500"
                                    >
                                      {order.hasNotes}
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="py-3">
                                <div
                                  className="w-80 max-h-24 overflow-y-auto pr-2"
                                  style={{
                                    scrollbarWidth: "thin",
                                    scrollbarColor: "#6b7280 #374151",
                                    WebkitScrollbar: {
                                      width: "6px",
                                    },
                                    WebkitScrollbarTrack: {
                                      background: "#374151",
                                    },
                                    WebkitScrollbarThumb: {
                                      background: "#6b7280",
                                      borderRadius: "3px",
                                    },
                                  }}
                                >
                                  <div
                                    className="font-medium text-sm leading-relaxed text-white break-words cursor-help"
                                    title={
                                      order.productInfo &&
                                      order.productInfo.length > 100
                                        ? order.productInfo
                                        : undefined
                                    }
                                  >
                                    {order.productInfo &&
                                    order.productInfo !== "Multiple Products"
                                      ? order.productInfo
                                      : "Multiple Products"}
                                  </div>
                                  {order.usedPoints && (
                                    <div className="text-xs text-gray-400 mt-1">
                                      {order.usedPoints}
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td className="py-3 text-white">
                                {order.createdDate}
                              </td>
                              <td className="py-3 text-right">
                                <div>
                                  <div className="font-semibold text-white">
                                    {(order.totalPrice || 0).toLocaleString()}{" "}
                                    VND
                                  </div>
                                  {order.paymentFee > 0 && (
                                    <div className="text-xs text-gray-400">
                                      +
                                      {(order.paymentFee || 0).toLocaleString()}{" "}
                                      fee
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td className="py-3">
                                <span
                                  className={`inline-block px-2 py-1 text-xs rounded-full ${
                                    order.paymentMethod === "CASH_ON_DELIVERY"
                                      ? "bg-orange-100 text-orange-800"
                                      : order.paymentMethod === "ONLINE_BANKING"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {order.paymentMethodText ||
                                    order.paymentMethod ||
                                    "Unknown"}
                                </span>
                              </td>
                              <td className="py-3">
                                <span
                                  className={`inline-block px-2 py-1 text-xs rounded-full bg-${statusColor}-100 text-${statusColor}-800`}
                                >
                                  {order.status}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      {(!recentOrdersWithDetails ||
                        recentOrdersWithDetails.length === 0) && (
                        <tr>
                          <td
                            colSpan="6"
                            className="py-8 text-center text-gray-500"
                          >
                            {loading
                              ? t("admin.loading_text")
                              : t("admin.no_recent_orders_found")}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                className={`mt-5 p-6 rounded-lg ${cardBg} border ${borderColor}`}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-green-500">
                    {t("admin.top_spenders")}
                  </h3>
                  <div className="flex items-center">
                    <select
                      className={`mr-2 ${cardBg} border ${borderColor} rounded px-2 py-1`}
                      value={spendersTimeframe}
                      onChange={handleSpendersTimeframeChange}
                    >
                      <option value="last7days">
                        {t("admin.last_7_days")}
                      </option>
                      <option value="last30days">
                        {t("admin.last_30_days")}
                      </option>
                      <option value="lastYear">{t("admin.last_year")}</option>
                    </select>
                    <button>
                      <FaEllipsisH size={16} />
                    </button>
                  </div>
                </div>
                <div className="h-64 w-full">
                  {topSpenders && topSpenders.length > 0 ? (
                    <TopSpendersChart data={topSpenders} darkMode={darkMode} />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p>{t("admin.no_top_spenders_data")}</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          {activeMenu === "Computers" && (
            <div className="p-6">
              <MonitorsTable
                activeMenu="Computers"
                monitors={monitors}
                theme={darkMode ? "dark" : "light"}
                createProduct={productData =>
                  createProduct("computers", productData)
                }
                updateProduct={(productId, productData) =>
                  updateProduct("computers", productId, productData)
                }
                deleteProduct={productId =>
                  deleteProduct("computers", productId)
                }
                getProductById={getProductById}
                validCategoryIds={CATEGORY_IDS.computers}
                images={[
                  ...(allImages.monitor || []),
                  ...(allImages.monitors_asus || []),
                  ...(allImages.monitors_acer || []),
                  ...(allImages.monitors_lg || []),
                  ...(allImages.monitors_msi || []),
                ]} // Combine all monitor-related images
              />
            </div>
          )}
          {activeMenu === "Processors" && (
            <div className="p-6">
              <ProcessorsTable
                activeMenu="Processors"
                processors={processors}
                theme={darkMode ? "dark" : "light"}
                createProduct={productData =>
                  createProduct("processors", productData)
                }
                updateProduct={(productId, productData) =>
                  updateProduct("processors", productId, productData)
                }
                deleteProduct={productId =>
                  deleteProduct("processors", productId)
                }
                getProductById={getProductById}
                validCategoryIds={CATEGORY_IDS.processors}
                images={[
                  ...(allImages.cpu || []),
                  ...(allImages.processors_amd || []),
                  ...(allImages.processors_intel || []),
                ]} // Combine all processor-related images
              />
            </div>
          )}
          {activeMenu === "RAM" && (
            <div className="p-6">
              <Ram
                activeMenu="RAM"
                ram={ram}
                theme={darkMode ? "dark" : "light"}
                createProduct={productData => createProduct("ram", productData)}
                updateProduct={(productId, productData) =>
                  updateProduct("ram", productId, productData)
                }
                deleteProduct={productId => deleteProduct("ram", productId)}
                getProductById={getProductById}
                validCategoryIds={CATEGORY_IDS.ram}
                images={[
                  ...(allImages.ram || []),
                  ...(allImages.ram_kingston || []),
                  ...(allImages.ram_corsair || []),
                  ...(allImages.ram_pny || []),
                ]} // Combine all RAM-related images
              />
            </div>
          )}
          {activeMenu === "Storage" && (
            <div className="p-6">
              <Storage
                activeMenu="Storage"
                storage={storage}
                theme={darkMode ? "dark" : "light"}
                createProduct={productData =>
                  createProduct("storage", productData)
                }
                updateProduct={(productId, productData) =>
                  updateProduct("storage", productId, productData)
                }
                deleteProduct={productId => deleteProduct("storage", productId)}
                getProductById={getProductById}
                validCategoryIds={CATEGORY_IDS.storage}
                images={[
                  ...(allImages.storage || []),
                  ...(allImages.storage_kingston || []),
                  ...(allImages.storage_samsung || []),
                  ...(allImages.storage_western_digital || []),
                ]} // Combine all storage-related images
              />
            </div>
          )}
          {activeMenu === "Case" && (
            <div className="p-6">
              <Cases
                activeMenu="Case"
                cases={cases}
                theme={darkMode ? "dark" : "light"}
                createProduct={productData =>
                  createProduct("case", productData)
                }
                updateProduct={(productId, productData) =>
                  updateProduct("case", productId, productData)
                }
                deleteProduct={productId => deleteProduct("case", productId)}
                getProductById={getProductById}
                validCategoryIds={CATEGORY_IDS.case}
                images={[
                  ...(allImages.case || []),
                  ...(allImages.case_xigmatek || []),
                  ...(allImages.case_cougar || []),
                  ...(allImages.case_corsair || []),
                  ...(allImages.case_cooler_master || []),
                  ...(allImages.case_nzxt || []),
                  ...(allImages.case_thermaltake || []),
                ]} // Gộp tất cả hình ảnh liên quan đến case
              />
            </div>
          )}
          {activeMenu === "Mainboard" && (
            <div className="p-6">
              <Mainboard
                activeMenu="Mainboard"
                mainboards={mainboards}
                theme={darkMode ? "dark" : "light"}
                createProduct={productData =>
                  createProduct("mainboard", productData)
                }
                updateProduct={(productId, productData) =>
                  updateProduct("mainboard", productId, productData)
                }
                deleteProduct={productId =>
                  deleteProduct("mainboard", productId)
                }
                getProductById={getProductById}
                validCategoryIds={CATEGORY_IDS.mainboard}
                images={[
                  ...(allImages.motherboard || []),
                  ...(allImages.mainboard_asus || []),
                  ...(allImages.mainboard_gigabyte || []),
                  ...(allImages.mainboard_msi || []),
                ]} // Gộp tất cả hình ảnh liên quan đến mainboard
              />
            </div>
          )}
          {activeMenu === "Psu" && (
            <div className="p-6">
              <Psus
                activeMenu="Psu"
                psus={psus}
                theme={darkMode ? "dark" : "light"}
                createProduct={productData => createProduct("psu", productData)}
                updateProduct={(productId, productData) =>
                  updateProduct("psu", productId, productData)
                }
                deleteProduct={productId => deleteProduct("psu", productId)}
                getProductById={getProductById}
                validCategoryIds={CATEGORY_IDS.psu}
                images={[
                  ...(allImages.power_supply || []),
                  ...(allImages.psu_asus || []),
                  ...(allImages.psu_corsair || []),
                  ...(allImages.psu_deepcool || []),
                  ...(allImages.psu_msi || []),
                ]} // Gộp tất cả hình ảnh liên quan đến PSU
              />
            </div>
          )}
          {activeMenu === "PC" && (
            <div className="p-6">
              <Pc
                activeMenu="PC"
                pcs={pcs}
                theme={darkMode ? "dark" : "light"}
                createProduct={productData => createProduct("pc", productData)}
                updateProduct={(productId, productData) =>
                  updateProduct("pc", productId, productData)
                }
                deleteProduct={productId => deleteProduct("pc", productId)}
                getProductById={getProductById}
                validCategoryIds={CATEGORY_IDS.pc}
                images={[
                  ...(allImages.pc || []),
                  ...(allImages.pc_msi || []),
                  ...(allImages.pc_asus || []),
                ]} // Gộp tất cả hình ảnh liên quan đến PC
              />
            </div>
          )}
          {activeMenu === "Headphone" && (
            <div className="p-6">
              <Headphone
                activeMenu="Headphone"
                headphones={headphones}
                theme={darkMode ? "dark" : "light"}
                createProduct={productData =>
                  createProduct("headphone", productData)
                }
                updateProduct={(productId, productData) =>
                  updateProduct("headphone", productId, productData)
                }
                deleteProduct={productId =>
                  deleteProduct("headphone", productId)
                }
                getProductById={getProductById}
                validCategoryIds={CATEGORY_IDS.headphone}
                images={[
                  ...(allImages.headphone || []),
                  ...(allImages.headphone_asus || []),
                  ...(allImages.headphone_razer || []),
                ]} // Gộp tất cả hình ảnh liên quan đến Headphone
              />
            </div>
          )}
          {activeMenu === "Mousepad" && (
            <div className="p-6">
              <Mousepad
                activeMenu="Mousepad"
                mousepads={mousepads}
                theme={darkMode ? "dark" : "light"}
                createProduct={productData =>
                  createProduct("mousepad", productData)
                }
                updateProduct={(productId, productData) =>
                  updateProduct("mousepad", productId, productData)
                }
                deleteProduct={productId =>
                  deleteProduct("mousepad", productId)
                }
                getProductById={getProductById}
                validCategoryIds={CATEGORY_IDS.mousepad}
                images={[
                  ...(allImages.mousepad || []),
                  ...(allImages.mousepad_daeru || []),
                  ...(allImages.mousepad_asus || []),
                  ...(allImages.mousepad_razer || []),
                ]} // Gộp tất cả hình ảnh liên quan đến Mousepad
              />
            </div>
          )}
          {activeMenu === "Tablet" && (
            <div className="p-6">
              <TabletTable
                activeMenu="Tablet"
                tablets={tablets}
                theme={darkMode ? "dark" : "light"}
                createProduct={productData =>
                  createProduct("tablet", productData)
                }
                updateProduct={(productId, productData) =>
                  updateProduct("tablet", productId, productData)
                }
                deleteProduct={productId => deleteProduct("tablet", productId)}
                getProductById={getProductById}
                validCategoryIds={CATEGORY_IDS.tablet}
                images={[
                  ...(allImages.ipad || []),
                  ...(allImages.tablet_apple || []),
                ]} // Gộp tất cả hình ảnh liên quan đến Tablet
              />
            </div>
          )}
          {activeMenu === "GamingGear" && (
            <div className="p-6">
              <GamingGearTable
                activeMenu="GamingGear"
                gamingGear={gamingGear}
                theme={darkMode ? "dark" : "light"}
                createProduct={productData =>
                  createProduct("gamingGear", productData)
                }
                updateProduct={(productId, productData) =>
                  updateProduct("gamingGear", productId, productData)
                }
                deleteProduct={productId =>
                  deleteProduct("gamingGear", productId)
                }
                getProductById={getProductById}
                validCategoryIds={CATEGORY_IDS.gamingGear}
                images={[
                  ...(allImages.gaming_gear || []),
                  ...(allImages.gamingGear_sony || []),
                  ...(allImages.gamingGear_lenovo || []),
                  ...(allImages.gamingGear_daeru || []),
                ]} // Gộp tất cả hình ảnh liên quan đến Gaming Gear
              />
            </div>
          )}
          {activeMenu === "Laptops" && (
            <div className="p-6">
              <LaptopTable
                activeMenu="Laptops"
                computers={computers}
                theme={darkMode ? "dark" : "light"}
                createProduct={productData =>
                  createProduct("laptop", productData)
                }
                updateProduct={(productId, productData) =>
                  updateProduct("laptop", productId, productData)
                }
                deleteProduct={productId => deleteProduct("laptop", productId)}
                getProductById={getProductById}
                validCategoryIds={CATEGORY_IDS.laptop}
                images={[
                  ...(allImages.laptop || []),
                  ...(allImages.laptop_acer || []),
                  ...(allImages.laptop_asus || []),
                  ...(allImages.laptop_dell || []),
                  ...(allImages.laptop_gigabyte || []),
                  ...(allImages.laptop_lenovo || []),
                  ...(allImages.laptop_mac || []),
                  ...(allImages.laptop_msi || []),
                ]} // Combine all laptop-related images
              />
            </div>
          )}
          {activeMenu === "Phone" && (
            <div className="p-6">
              <PhoneTable
                activeMenu="Phone"
                phones={phones}
                theme={darkMode ? "dark" : "light"}
                createProduct={productData =>
                  createProduct("phone", productData)
                }
                updateProduct={(productId, productData) =>
                  updateProduct("phone", productId, productData)
                }
                deleteProduct={productId => deleteProduct("phone", productId)}
                getProductById={getProductById}
                validCategoryIds={CATEGORY_IDS.phone}
                images={[
                  ...(allImages.phone || []),
                  ...(allImages.phone_iphone || []),
                  ...(allImages.phone_samsung || []),
                  ...(allImages.phone_xiaomi || []),
                ]} // Gộp tất cả hình ảnh liên quan đến Phone
              />
            </div>
          )}
          {activeMenu === "Mouse" && (
            <div className="p-6">
              <MouseTable
                activeMenu="Mouse"
                mouses={mouses}
                theme={darkMode ? "dark" : "light"}
                createProduct={productData =>
                  createProduct("mouse", productData)
                }
                updateProduct={(productId, productData) =>
                  updateProduct("mouse", productId, productData)
                }
                deleteProduct={productId => deleteProduct("mouse", productId)}
                getProductById={getProductById}
                validCategoryIds={CATEGORY_IDS.mouse}
                images={[
                  ...(allImages.mouse || []),
                  ...(allImages.mouse_dareu || []),
                  ...(allImages.mouse_msi || []),
                  ...(allImages.mouse_logitech || []),
                  ...(allImages.mouse_rapoo || []),
                  ...(allImages.mouse_razer || []),
                ]} // Gộp tất cả hình ảnh liên quan đến Mouse
              />
            </div>
          )}
          {activeMenu === "KeyBoard" && (
            <div className="p-6">
              <KeyboardTable
                activeMenu="KeyBoard"
                keyboards={keyboards}
                theme={darkMode ? "dark" : "light"}
                createProduct={productData =>
                  createProduct("keyboard", productData)
                }
                updateProduct={(productId, productData) =>
                  updateProduct("keyboard", productId, productData)
                }
                deleteProduct={productId =>
                  deleteProduct("keyboard", productId)
                }
                getProductById={getProductById}
                validCategoryIds={CATEGORY_IDS.keyboard}
                images={[
                  ...(allImages.keyboard || []),
                  ...(allImages.keyboard_logitech || []),
                  ...(allImages.keyboard_aula || []),
                  ...(allImages.keyboard_rapoo || []),
                  ...(allImages.keyboard_asus || []),
                ]} // Gộp tất cả hình ảnh liên quan đến Keyboard
              />
            </div>
          )}
          {activeMenu === "Orders" && (
            <div className="p-6">
              <OrderTable
                orders={orders}
                theme={darkMode ? "dark" : "light"}
                getOrderById={getOrderById}
                updateOrderStatus={updateOrderStatus}
              />
            </div>
          )}
          {activeMenu === "ShippedOrders" && (
            <div className="p-6">
              <AdminShippedOrders />
            </div>
          )}
          {activeMenu === "Orders" && (
            <div className="p-6">
              <UpdateShippedDate theme={darkMode ? "dark" : "light"} />
            </div>
          )}
          {activeMenu === "Customers" && (
            <div className="p-6">
              <CustomerTable
                activeMenu="Customers"
                customers={customers}
                theme={darkMode ? "dark" : "light"}
                onCustomerUpdate={fetchDashboardData}
              />
            </div>
          )}
          {activeMenu === "Reviews" && (
            <div className="p-6">
              <ReviewsTable
                activeMenu="Reviews"
                theme={darkMode ? "dark" : "light"}
              />
            </div>
          )}
          {activeMenu === "Discounts" && (
            <div className="p-6">
              <DiscountsTable theme={darkMode ? "dark" : "light"} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Các component biểu đồ (giữ nguyên từ mã gốc)
function SalesChart({ data, timeframe, darkMode }) {
  const { t } = useTranslation("translation");
  if (!data || data.length === 0)
    return <div>{t("admin.no_data_available")}</div>;
  const chartData = data.map(item => ({
    name:
      timeframe === "last7days" || timeframe === "last30days"
        ? item.date
        : `Tháng ${item.month}`,
    revenue: Number(item.revenue),
  }));
  const lineColor = darkMode ? "#3b82f6" : "#2563eb";
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={darkMode ? "#374151" : "#e5e7eb"}
        />
        <XAxis
          dataKey="name"
          tick={{ fill: darkMode ? "#9ca3af" : "#4b5563" }}
          axisLine={{ stroke: darkMode ? "#4b5563" : "#d1d5db" }}
        />
        <YAxis
          tick={{ fill: darkMode ? "#9ca3af" : "#4b5563" }}
          axisLine={{ stroke: darkMode ? "#4b5563" : "#d1d5db" }}
          tickFormatter={value => `$${value.toLocaleString()}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: darkMode ? "#1f2937" : "#ffffff",
            borderColor: darkMode ? "#374151" : "#e5e7eb",
            color: darkMode ? "#f3f4f6" : "#111827",
          }}
          formatter={value => [
            `$${value.toLocaleString()}`,
            t("admin.revenue"),
          ]}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke={lineColor}
          strokeWidth={2}
          name={t("admin.revenue")}
          dot={{ fill: lineColor, strokeWidth: 1, r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

function CategorySalesChart({ data }) {
  const { t } = useTranslation("translation");
  console.log("CategorySalesChart received data:", data);

  // Handle different data formats
  let normalizedData = [];
  if (Array.isArray(data)) {
    normalizedData = data;
  } else if (data && typeof data === "object") {
    // Priority: use categoryData from backend (with percentage), fallback to other formats
    normalizedData =
      data.categoryData ||
      data.categories ||
      data.categorySales ||
      Object.values(data) ||
      [];
  }

  const chartData = normalizedData
    .filter(item => {
      // Filter out empty objects and items without valid data
      const hasName = item.categoryName || item.name || item.category;
      const hasValue =
        item.value || item.revenue || item.totalRevenue || item.amount;
      return hasName && hasValue && hasValue > 0;
    })
    .map((item, index) => {
      // Handle different property names
      const name =
        item.categoryName ||
        item.name ||
        item.category ||
        `Category ${index + 1}`;

      // Backend now provides percentage in categoryData format
      const value =
        item.value || item.revenue || item.totalRevenue || item.amount || 0;
      const percentage = item.percentage || item.percent || 0;

      // Use percentage from backend if available, otherwise calculate from value
      let finalPercentage = percentage;
      if (percentage === 0 && value > 0) {
        // Fallback: calculate percentage from value if backend doesn't provide it
        const totalValue = normalizedData.reduce(
          (sum, item) => sum + Number(item.value || 0),
          0
        );
        finalPercentage =
          totalValue > 0 ? (Number(value) / totalValue) * 100 : 0;
      }

      return {
        name: name.substring(0, 30), // Increased name length limit
        percentage: Math.max(0.1, Math.round(finalPercentage * 10) / 10), // Round to 1 decimal, minimum 0.1%
        revenue: Math.round(Number(value)),
      };
    })
    .sort((a, b) => b.revenue - a.revenue); // Sort by revenue descending

  console.log("CategorySalesChart chartData:", chartData);
  console.log("First few items:", chartData.slice(0, 3));

  // Soft colors to avoid eye strain
  const COLORS = [
    "#6366f1", // Indigo
    "#059669", // Emerald
    "#d97706", // Amber
    "#dc2626", // Red
    "#7c3aed", // Violet
    "#0891b2", // Cyan
    "#be185d", // Pink
    "#16a34a", // Green
  ];

  if (!chartData.length) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-gray-500 mb-2">📊</div>
          <p className="text-gray-500 text-sm">{t("admin.no_data")}</p>
          <p className="text-gray-400 text-xs mt-1">
            Debug: ChartData length = {chartData.length}
          </p>
        </div>
      </div>
    );
  }

  // Show all valid categories (no limit)
  const allCategories = chartData;

  return (
    <div className="space-y-3 p-4">
      {/* Header with explanation */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-start space-x-2">
          <div className="text-blue-600 dark:text-blue-400 mt-0.5"></div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">
              Phân tích doanh thu theo danh mục
            </h4>
            <p className="text-xs text-blue-600 dark:text-blue-400 leading-relaxed">
              Hiển thị {allCategories.length} danh mục sản phẩm được sắp xếp
              theo doanh thu từ cao đến thấp. Giúp xác định danh mục nào đóng
              góp nhiều nhất vào tổng doanh thu.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center">
          <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
            {allCategories.length}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Danh mục
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center">
          <div className="text-lg font-bold text-green-600 dark:text-green-400">
            {(
              allCategories.reduce((sum, item) => sum + item.revenue, 0) /
              1000000000
            ).toFixed(1)}
            B
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {t("admin.total_revenue")}
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center">
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {allCategories.length > 0
              ? allCategories[0].name.substring(0, 15) + "..."
              : "N/A"}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Top performer
          </div>
        </div>
      </div>

      {/* Categories list */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
          <span>{t("admin.category")}</span>
          <span>{t("admin.rate_and_revenue")}</span>
        </div>
        {allCategories.map((item, index) => {
          const percentage = item.percentage || 0;
          const revenue = item.revenue || 0;

          return (
            <div key={index} className="flex items-center space-x-3">
              {/* Category name */}
              <div
                className="w-40 text-sm font-medium truncate"
                title={item.name}
              >
                {item.name}
              </div>

              {/* Progress bar */}
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-5 relative overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${Math.min(percentage, 100)}%`,
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium text-white mix-blend-difference">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Revenue */}
              <div className="w-20 text-right text-sm text-gray-600 dark:text-gray-300">
                {(revenue / 1000000).toFixed(1)}M
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TopSpendersChart({ data, darkMode }) {
  const { t } = useTranslation("translation");
  if (!data || data.length === 0)
    return <div>{t("admin.no_data_available")}</div>;

  // Sort data by totalSpent descending and take top 10
  const sortedData = data
    .sort((a, b) => Number(b.totalSpent) - Number(a.totalSpent))
    .slice(0, 10);

  const chartData = sortedData.map(item => ({
    name:
      item.fullName.length > 15
        ? item.fullName.substring(0, 15) + "..."
        : item.fullName,
    totalSpent: Number(item.totalSpent),
    fullName: item.fullName, // Keep full name for tooltip
  }));

  const maxValue = Math.max(...chartData.map(item => item.totalSpent));
  const barColor = darkMode ? "#10b981" : "#059669";

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        data={chartData}
        margin={{ top: 5, right: 20, left: 60, bottom: 5 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={darkMode ? "#374151" : "#e5e7eb"}
        />
        <XAxis
          dataKey="name"
          tick={{ fill: darkMode ? "#9ca3af" : "#4b5563", fontSize: 12 }}
          axisLine={{ stroke: darkMode ? "#4b5563" : "#d1d5db" }}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis
          tick={{ fill: darkMode ? "#9ca3af" : "#4b5563", fontSize: 12 }}
          axisLine={{ stroke: darkMode ? "#4b5563" : "#d1d5db" }}
          tickFormatter={value => `${(value / 1000000).toFixed(0)}M`}
          domain={[0, maxValue * 1.1]}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: darkMode ? "#1f2937" : "#ffffff",
            borderColor: darkMode ? "#374151" : "#e5e7eb",
            color: darkMode ? "#f3f4f6" : "#111827",
          }}
          formatter={value => [
            `${Number(value).toLocaleString()} VND`,
            t("admin.total_spent"),
          ]}
          labelFormatter={(label, payload) => {
            if (payload && payload[0] && payload[0].payload) {
              return payload[0].payload.fullName;
            }
            return label;
          }}
        />
        <Legend />
        <Bar
          dataKey="totalSpent"
          fill={barColor}
          name={t("admin.total_spent")}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

// RFM Analysis Bar Chart component
function RFMBarChart({ data, darkMode, title }) {
  const { t } = useTranslation("translation");
  const [tooltip, setTooltip] = useState(null);
  const normalized = Array.isArray(data) ? data : [data];
  const entries = normalized;
  const maxVal = Math.max(
    1,
    ...entries.map(e =>
      Number(e.value || e.revenue || e.count || e.percentage || e.total || 0)
    )
  );

  // Create bar chart
  const barWidth = 60;
  const chartHeight = 300;
  const chartWidth = entries.length * (barWidth + 10) + 40;

  return (
    <div className="w-full h-full p-4 relative">
      <div className="text-center mb-4">
        <h3
          className={`text-lg font-semibold ${
            darkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          {title}
        </h3>
      </div>
      <div className="relative w-full h-full overflow-x-auto">
        <svg
          width={chartWidth}
          height="100%"
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="overflow-visible"
        >
          <defs>
            <linearGradient
              id="rfmBarGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor={darkMode ? "#60A5FA" : "#3B82F6"} />
              <stop
                offset="100%"
                stopColor={darkMode ? "#1E40AF" : "#1D4ED8"}
              />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {Array.from({ length: 6 }, (_, i) => i * 60).map((y, i) => (
            <line
              key={i}
              x1="40"
              y1={chartHeight - y}
              x2={chartWidth - 20}
              y2={chartHeight - y}
              stroke={darkMode ? "#4B5563" : "#D1D5DB"}
              strokeWidth="1"
              opacity="0.5"
            />
          ))}

          {/* Bars */}
          {entries.map((e, i) => {
            const value = Number(
              e.value || e.revenue || e.count || e.percentage || e.total || 0
            );
            const height = (value / maxVal) * (chartHeight - 60);
            const x = 50 + i * (barWidth + 10);
            const y = chartHeight - height - 20;

            return (
              <g key={i}>
                {/* Bar */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={height}
                  fill="url(#rfmBarGradient)"
                  rx="4"
                  ry="4"
                  className="transition-all duration-300 hover:opacity-80"
                  onMouseEnter={event => {
                    const rect = event.target.getBoundingClientRect();
                    setTooltip({
                      x: rect.left + rect.width / 2,
                      y: rect.top - 10,
                      name: e.name || e.label || e.category || "",
                      value: value,
                    });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                  style={{ cursor: "pointer" }}
                />

                {/* Value label on top */}
                <text
                  x={x + barWidth / 2}
                  y={y - 8}
                  textAnchor="middle"
                  className="text-sm font-normal"
                  fill="#FFFFFF"
                >
                  {value.toFixed(1)}
                </text>

                {/* Customer name */}
                <text
                  x={x + barWidth / 2}
                  y={chartHeight - 5}
                  textAnchor="middle"
                  className="text-xs font-normal"
                  fill="#FFFFFF"
                >
                  {(e.name || e.label || e.category || "").substring(0, 6)}..
                </text>
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {tooltip && (
          <div
            className={`fixed z-[9999] px-4 py-3 rounded-xl shadow-2xl border backdrop-blur-sm ${
              darkMode
                ? "bg-gray-800/90 text-gray-100 border-gray-600/50"
                : "bg-white/90 text-gray-800 border-gray-300/50"
            }`}
            style={{
              left: tooltip.x - 60,
              top: tooltip.y - 60,
              pointerEvents: "none",
              transform: "translateY(-10px)",
              transition: "all 0.3s ease-in-out",
            }}
          >
            <div className="text-sm font-bold mb-1">{tooltip.name}</div>
            <div className="text-xs opacity-80">
              {t("remaining.rfm_score_label")}:{" "}
              <span className="font-semibold text-blue-400">
                {tooltip.value.toFixed(1)}
              </span>
            </div>
          </div>
        )}

        {/* Y-axis title */}
        <div className="absolute left-2 top-1/2 transform -rotate-90 -translate-y-1/2">
          <span className="text-sm font-normal text-white">
            {t("remaining.rfm_score_label")}
          </span>
        </div>

        {/* Y-axis labels - Hidden */}
        {/* <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs" style={{ paddingTop: '20px', paddingBottom: '20px', left: '10px', width: '30px' }}>
          {Array.from({ length: 6 }, (_, i) => Math.round(maxVal * (5 - i) / 5)).map((val, i) => (
            <span key={i} className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} font-bold text-right`} style={{ lineHeight: '1' }}>
              {val}
            </span>
          ))}
        </div> */}

        {/* X-axis title */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
          <span className="text-sm font-normal text-white">
            {t("admin.customer")}
          </span>
        </div>
      </div>
    </div>
  );
}

// Revenue chart component with different formatting
function RevenueChart({ data, darkMode, title }) {
  const { t } = useTranslation("translation");
  const [tooltip, setTooltip] = useState(null);
  const normalized = Array.isArray(data) ? data : [data];
  const entries = normalized; // Show all data points
  const maxVal = Math.max(
    1,
    ...entries.map(e =>
      Number(e.value || e.revenue || e.count || e.percentage || e.total || 0)
    )
  );
  const minVal = Math.min(
    ...entries.map(e =>
      Number(e.value || e.revenue || e.count || e.percentage || e.total || 0)
    )
  );

  // Adjust Y-axis scale to fit data better
  const dataRange = maxVal - minVal;
  const paddingRange = dataRange * 0.1; // 10% padding
  const adjustedMaxVal = maxVal + paddingRange;
  const adjustedMinVal = Math.max(0, minVal - paddingRange); // Don't go below 0

  // Create SVG path for line chart - optimized dimensions
  const width = 1400;
  const height = 600;
  const padding = 80;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const points = entries
    .map((e, i) => {
      const x = padding + (i / (entries.length - 1)) * chartWidth;
      const y =
        padding +
        chartHeight -
        ((Number(
          e.value || e.revenue || e.count || e.percentage || e.total || 0
        ) -
          adjustedMinVal) /
          (adjustedMaxVal - adjustedMinVal)) *
          chartHeight;
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = `${padding},${padding + chartHeight} ${points} ${
    padding + chartWidth
  },${padding + chartHeight}`;

  return (
    <div className="w-full h-full p-4 relative">
      <div className="text-center mb-4">
        <h3
          className={`text-lg font-bold ${
            darkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          {title}
        </h3>
      </div>
      <div className="relative w-full h-full">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1400 600"
          className="overflow-visible"
        >
          {/* Grid lines */}
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop
                offset="0%"
                stopColor={darkMode ? "#3B82F6" : "#2563EB"}
                stopOpacity="0.4"
              />
              <stop
                offset="100%"
                stopColor={darkMode ? "#3B82F6" : "#2563EB"}
                stopOpacity="0.1"
              />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.5, 1].map((ratio, i) => (
            <line
              key={i}
              x1={padding}
              y1={padding + chartHeight - ratio * chartHeight}
              x2={padding + chartWidth}
              y2={padding + chartHeight - ratio * chartHeight}
              stroke={darkMode ? "#374151" : "#E5E7EB"}
              strokeWidth="2"
            />
          ))}

          {/* Vertical grid lines */}
          {entries
            .filter((_, i) => i % 3 === 0)
            .map((_, i) => {
              const x = padding + ((i * 3) / (entries.length - 1)) * chartWidth;
              return (
                <line
                  key={i}
                  x1={x}
                  y1={padding}
                  x2={x}
                  y2={padding + chartHeight}
                  stroke={darkMode ? "#374151" : "#E5E7EB"}
                  strokeWidth="1"
                />
              );
            })}

          {/* Area under curve */}
          <polygon points={areaPoints} fill="url(#areaGradient)" />

          {/* Line */}
          <polyline
            points={points}
            fill="none"
            stroke={darkMode ? "#60A5FA" : "#3B82F6"}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-pulse"
            style={{ animationDuration: "3s" }}
          />

          {/* Data points with hover */}
          {entries.map((e, i) => {
            const x = padding + (i / (entries.length - 1)) * chartWidth;
            const y =
              padding +
              chartHeight -
              ((Number(
                e.value || e.revenue || e.count || e.percentage || e.total || 0
              ) -
                adjustedMinVal) /
                (adjustedMaxVal - adjustedMinVal)) *
                chartHeight;
            const v = Number(
              e.value || e.revenue || e.count || e.percentage || e.total || 0
            );
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="6"
                fill={darkMode ? "#60A5FA" : "#3B82F6"}
                stroke={darkMode ? "#1E40AF" : "#1D4ED8"}
                strokeWidth="3"
                onMouseEnter={event => {
                  const rect = event.target.getBoundingClientRect();
                  setTooltip({
                    x: rect.left + rect.width / 2,
                    y: rect.top - 10,
                    name:
                      e.name || e.label || e.category || e.month || e.day || "",
                    value: v,
                  });
                }}
                onMouseLeave={() => setTooltip(null)}
                style={{ cursor: "pointer" }}
              />
            );
          })}
        </svg>

        {/* Tooltip */}
        {tooltip && (
          <div
            className={`fixed z-[9999] px-3 py-2 rounded-lg shadow-lg border ${
              darkMode
                ? "bg-gray-800 text-gray-100 border-gray-600"
                : "bg-white text-gray-800 border-gray-300"
            }`}
            style={{
              left: tooltip.x - 50,
              top: tooltip.y - 50,
              pointerEvents: "none",
            }}
          >
            <div className="text-sm font-semibold">{tooltip.name}</div>
            <div className="text-xs">
              {title?.includes("RFM") || title?.includes("rfm")
                ? t("admin.rfm_score_label")
                : title?.includes("orders")
                ? t("remaining.orders_label")
                : t("remaining.revenue")}
              : {tooltip.value.toLocaleString()}
            </div>
          </div>
        )}

        {/* Y-axis title */}
        <div className="absolute left-0 top-0 transform -translate-y-1/2 -translate-x-12">
          <span
            className={`text-xs font-bold ${
              darkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            {title?.includes("RFM") || title?.includes("rfm")
              ? t("admin.rfm_score_label")
              : title?.includes("orders")
              ? t("remaining.orders_label")
              : title?.includes("revenue")
              ? t("admin.revenue_vnd_label")
              : t("remaining.value_label")}
          </span>
        </div>

        {/* X-axis labels */}
        <div
          className="absolute bottom-0 left-0 right-0 flex justify-between text-xs px-2"
          style={{ paddingLeft: `${padding}px`, paddingRight: `${padding}px` }}
        >
          {entries.map((e, i) => {
            const label =
              e.name || e.label || e.category || e.month || e.day || "";
            const shortLabel =
              label.length > 6 ? label.substring(0, 4) + ".." : label;
            return (
              <span
                key={i}
                className={`${
                  darkMode ? "text-gray-100" : "text-gray-800"
                } font-medium text-center truncate max-w-[40px]`}
                title={label}
              >
                {shortLabel}
              </span>
            );
          })}
        </div>

        {/* X-axis title */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
          <span
            className={`text-sm font-bold ${
              darkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            {title?.includes("RFM") || title?.includes("rfm")
              ? t("admin.customer")
              : title?.includes("quý") || title?.includes("quarter")
              ? t("admin.time_quarter")
              : t("remaining.time_day")}
          </span>
        </div>
      </div>
    </div>
  );
}

// Beautiful trend chart component
function TrendChart({ data, darkMode, title }) {
  const { t } = useTranslation("translation");
  const [tooltip, setTooltip] = useState(null);
  const normalized = Array.isArray(data) ? data : [data];
  const entries = normalized; // Show all data points
  const maxVal = Math.max(
    1,
    ...entries.map(e =>
      Number(e.value || e.revenue || e.count || e.percentage || e.total || 0)
    )
  );
  const minVal = Math.min(
    ...entries.map(e =>
      Number(e.value || e.revenue || e.count || e.percentage || e.total || 0)
    )
  );

  // Adjust Y-axis scale to fit data better
  const dataRange = maxVal - minVal;
  const paddingRange = dataRange * 0.1; // 10% padding
  const adjustedMaxVal = maxVal + paddingRange;
  const adjustedMinVal = Math.max(0, minVal - paddingRange); // Don't go below 0

  // Create SVG path for line chart - optimized dimensions
  const width = 1600;
  const height = 700;
  const padding = 100;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const points = entries
    .map((e, i) => {
      const x = padding + (i / (entries.length - 1)) * chartWidth;
      const y =
        padding +
        chartHeight -
        ((Number(
          e.value || e.revenue || e.count || e.percentage || e.total || 0
        ) -
          adjustedMinVal) /
          (adjustedMaxVal - adjustedMinVal)) *
          chartHeight;
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = `${padding},${padding + chartHeight} ${points} ${
    padding + chartWidth
  },${padding + chartHeight}`;

  return (
    <div className="w-full h-full p-4 relative">
      <div className="text-center mb-4">
        <h3
          className={`text-lg font-bold ${
            darkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          {title}
        </h3>
      </div>
      <div className="relative w-full h-full">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1600 700"
          className="overflow-visible"
        >
          {/* Grid lines */}
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop
                offset="0%"
                stopColor={darkMode ? "#3B82F6" : "#2563EB"}
                stopOpacity="0.4"
              />
              <stop
                offset="100%"
                stopColor={darkMode ? "#3B82F6" : "#2563EB"}
                stopOpacity="0.1"
              />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.5, 1].map((ratio, i) => (
            <line
              key={i}
              x1={padding}
              y1={padding + chartHeight - ratio * chartHeight}
              x2={padding + chartWidth}
              y2={padding + chartHeight - ratio * chartHeight}
              stroke={darkMode ? "#374151" : "#E5E7EB"}
              strokeWidth="2"
            />
          ))}

          {/* Vertical grid lines */}
          {entries
            .filter((_, i) => i % 3 === 0)
            .map((_, i) => {
              const x = padding + ((i * 3) / (entries.length - 1)) * chartWidth;
              return (
                <line
                  key={i}
                  x1={x}
                  y1={padding}
                  x2={x}
                  y2={padding + chartHeight}
                  stroke={darkMode ? "#374151" : "#E5E7EB"}
                  strokeWidth="1"
                />
              );
            })}

          {/* Area under curve */}
          <polygon points={areaPoints} fill="url(#areaGradient)" />

          {/* Line */}
          <polyline
            points={points}
            fill="none"
            stroke={darkMode ? "#60A5FA" : "#3B82F6"}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-pulse"
            style={{ animationDuration: "3s" }}
          />

          {/* Data points with hover */}
          {entries.map((e, i) => {
            const x = padding + (i / (entries.length - 1)) * chartWidth;
            const y =
              padding +
              chartHeight -
              ((Number(
                e.value || e.revenue || e.count || e.percentage || e.total || 0
              ) -
                adjustedMinVal) /
                (adjustedMaxVal - adjustedMinVal)) *
                chartHeight;
            const v = Number(
              e.value || e.revenue || e.count || e.percentage || e.total || 0
            );
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="6"
                fill={darkMode ? "#60A5FA" : "#3B82F6"}
                stroke={darkMode ? "#1E40AF" : "#1D4ED8"}
                strokeWidth="3"
                onMouseEnter={event => {
                  const rect = event.target.getBoundingClientRect();
                  setTooltip({
                    x: rect.left + rect.width / 2,
                    y: rect.top - 10,
                    name:
                      e.name || e.label || e.category || e.month || e.day || "",
                    value: v,
                  });
                }}
                onMouseLeave={() => setTooltip(null)}
                style={{ cursor: "pointer" }}
              />
            );
          })}
        </svg>

        {/* Tooltip */}
        {tooltip && (
          <div
            className={`fixed z-[9999] px-3 py-2 rounded-lg shadow-lg border ${
              darkMode
                ? "bg-gray-800 text-gray-100 border-gray-600"
                : "bg-white text-gray-800 border-gray-300"
            }`}
            style={{
              left: tooltip.x - 50,
              top: tooltip.y - 50,
              pointerEvents: "none",
            }}
          >
            <div className="text-sm font-semibold">{tooltip.name}</div>
            <div className="text-xs">
              {title?.includes("orders")
                ? t("remaining.orders_label")
                : t("remaining.revenue")}
              : {tooltip.value.toLocaleString()}
            </div>
          </div>
        )}

        {/* Y-axis labels with description */}
        <div
          className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs"
          style={{
            paddingTop: `${padding}px`,
            paddingBottom: `${padding}px`,
            left: "-80px",
            width: "100px",
          }}
        >
          {[
            adjustedMaxVal,
            (adjustedMaxVal + adjustedMinVal) / 2,
            adjustedMinVal,
          ].map((val, i) => (
            <span
              key={i}
              className={`${
                darkMode ? "text-gray-100" : "text-gray-800"
              } font-medium text-right`}
              style={{ lineHeight: "1" }}
            >
              {Math.round(val).toLocaleString()}
            </span>
          ))}
        </div>

        {/* Y-axis title */}
        <div className="absolute left-0 top-0 transform -translate-y-1/2 -translate-x-6">
          <span
            className={`text-xs font-medium ${
              darkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            {title?.includes("RFM") || title?.includes("rfm")
              ? t("admin.rfm_score_label")
              : title?.includes("orders")
              ? t("remaining.orders_label")
              : title?.includes("revenue")
              ? t("admin.revenue_vnd_label")
              : t("remaining.value_label")}
          </span>
        </div>

        {/* X-axis labels */}
        <div
          className="absolute bottom-8 left-0 right-0 flex justify-between text-xs px-2"
          style={{
            paddingLeft: `${padding - 20}px`,
            paddingRight: `${padding - 20}px`,
          }}
        >
          {entries
            .filter((_, i) => i % 3 === 0)
            .map((e, i) => {
              const label =
                e.name || e.label || e.category || e.month || e.day || "";
              // Rút ngắn nhãn nếu quá dài
              const shortLabel =
                label.length > 8 ? label.substring(0, 6) + ".." : label;
              return (
                <span
                  key={i}
                  className={`${
                    darkMode ? "text-gray-100" : "text-gray-800"
                  } font-medium text-center truncate max-w-[50px]`}
                  title={label}
                >
                  {shortLabel}
                </span>
              );
            })}
        </div>

        {/* X-axis title */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <span
            className={`text-sm font-bold ${
              darkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            {title?.includes("RFM") || title?.includes("rfm")
              ? t("admin.customer")
              : title?.includes("quý") || title?.includes("quarter")
              ? t("admin.time_quarter")
              : t("remaining.time_day")}
          </span>
        </div>
      </div>
    </div>
  );
}

// Beautiful Pie Chart with detailed information
function PieChartWithDetails({ data, darkMode, title }) {
  const { t } = useTranslation("translation");
  const [tooltip, setTooltip] = useState(null);
  const normalized = Array.isArray(data) ? data : [data];
  const entries = normalized.slice(0, 8); // Show up to 8 items
  const total = entries.reduce(
    (sum, e) => sum + Number(e.totalRevenue || e.totalOrders || e.value || 0),
    0
  );

  if (total === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p
          className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          {t("admin.no_data")}
        </p>
      </div>
    );
  }

  const colors = [
    "#3B82F6",
    "#10B981",
    "#8B5CF6",
    "#F59E0B",
    "#EF4444",
    "#06B6D4",
    "#84CC16",
    "#F97316",
  ];

  let currentAngle = 0;
  const segments = entries.map((e, i) => {
    const value = Number(e.totalRevenue || e.totalOrders || e.value || 0);
    const percentage = (value / total) * 100;
    const angle = (value / total) * 360;

    const segment = {
      ...e,
      value: value, // Đảm bảo value được set đúng
      percentage: percentage,
      angle: angle,
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
      color: colors[i % colors.length],
      index: i,
    };

    currentAngle += angle;
    return segment;
  });

  const radius = 120;
  const centerX = 150;
  const centerY = 150;

  return (
    <div className="w-full h-full p-6">
      <div className="text-center mb-6">
        <h3
          className={`text-xl font-bold ${
            darkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          {title}
        </h3>
      </div>

      <div className="flex items-center justify-between h-[450px]">
        {/* Pie Chart */}
        <div className="flex-1 flex items-center justify-center">
          <svg width="300" height="300" className="transform -rotate-90">
            {segments.map((segment, i) => {
              const startAngleRad = (segment.startAngle * Math.PI) / 180;
              const endAngleRad = (segment.endAngle * Math.PI) / 180;

              const x1 = centerX + radius * Math.cos(startAngleRad);
              const y1 = centerY + radius * Math.sin(startAngleRad);
              const x2 = centerX + radius * Math.cos(endAngleRad);
              const y2 = centerY + radius * Math.sin(endAngleRad);

              const largeArcFlag = segment.angle > 180 ? 1 : 0;

              const pathData = [
                `M ${centerX} ${centerY}`,
                `L ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                "Z",
              ].join(" ");

              return (
                <path
                  key={i}
                  d={pathData}
                  fill={segment.color}
                  stroke={darkMode ? "#1F2937" : "#FFFFFF"}
                  strokeWidth="2"
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                  onMouseEnter={event => {
                    const rect = event.target.getBoundingClientRect();
                    setTooltip({
                      x: rect.left + rect.width / 2,
                      y: rect.top - 10,
                      name: segment.customerName || segment.name,
                      value: segment.value,
                      percentage: segment.percentage,
                      totalOrders: segment.totalOrders || segment.orders,
                      revenue: segment.totalRevenue || segment.revenue,
                    });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              );
            })}

            {/* Center circle */}
            <circle
              cx={centerX}
              cy={centerY}
              r="60"
              fill={darkMode ? "#1F2937" : "#FFFFFF"}
              stroke={darkMode ? "#374151" : "#E5E7EB"}
              strokeWidth="2"
            />

            {/* Total in center */}
            <text
              x={centerX}
              y={centerY - 5}
              textAnchor="middle"
              className={`text-lg font-bold ${
                darkMode ? "text-gray-200" : "text-gray-800"
              }`}
              transform="rotate(90 150 150)"
            >
              {total.toLocaleString()}
            </text>
            <text
              x={centerX}
              y={centerY + 15}
              textAnchor="middle"
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
              transform="rotate(90 150 150)"
            >
              {t("remaining.total")}
            </text>
          </svg>

          {/* Tooltip */}
          {tooltip && (
            <div
              className={`absolute z-50 px-4 py-3 rounded-xl shadow-xl border-2 ${
                darkMode
                  ? "bg-gray-800 text-gray-100 border-gray-600"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
              style={{
                left: tooltip.x - 100,
                top: tooltip.y - 80,
                pointerEvents: "none",
                minWidth: "200px",
              }}
            >
              <div className="text-center">
                <div className="text-lg font-bold mb-2">{tooltip.name}</div>
                <div className="space-y-1">
                  <div className="text-sm">
                    <span className="font-semibold">
                      {t("remaining.value_label")}:
                    </span>{" "}
                    {(tooltip.value || 0).toLocaleString()} VND
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">
                      {t("admin.percentage_label")}:
                    </span>{" "}
                    {tooltip.percentage.toFixed(1)}%
                  </div>
                  {tooltip.totalOrders && (
                    <div className="text-sm">
                      <span className="font-semibold">
                        {t("remaining.orders_label")}:
                      </span>{" "}
                      {tooltip.totalOrders}
                    </div>
                  )}
                  {tooltip.revenue && tooltip.revenue !== tooltip.value && (
                    <div className="text-sm">
                      <span className="font-semibold">
                        {t("admin.revenue")}:
                      </span>{" "}
                      {(tooltip.revenue || 0).toLocaleString()} VND
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Legend with details */}
        <div className="flex-1 pl-8">
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {segments.map((segment, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: segment.color }}
                  />
                  <div>
                    <div
                      className={`font-semibold ${
                        darkMode ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      {segment.customerName || segment.name}
                    </div>
                    <div
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {segment.percentage.toFixed(1)}% •{" "}
                      {(segment.value || 0).toLocaleString()} VNĐ
                    </div>
                    {/* Additional details based on data type */}
                    {(segment.totalOrders || segment.orders) && (
                      <div
                        className={`text-xs ${
                          darkMode ? "text-gray-500" : "text-gray-500"
                        }`}
                      >
                        {segment.totalOrders || segment.orders}{" "}
                        {t("admin.orders")}
                      </div>
                    )}
                    {segment.totalRevenue &&
                      segment.totalRevenue !== segment.value && (
                        <div
                          className={`text-xs ${
                            darkMode ? "text-gray-500" : "text-gray-500"
                          }`}
                        >
                          {t("admin.revenue")}:{" "}
                          {(segment.totalRevenue || 0).toLocaleString()} VND
                        </div>
                      )}
                  </div>
                </div>
                <div
                  className={`text-right ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <div className="font-bold">
                    {segment.percentage.toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Specialized chart components for different data types
function RetentionRateChart({ data, darkMode }) {
  const { t } = useTranslation("translation");
  const normalized = Array.isArray(data) ? data : [data];
  const entries = normalized.slice(0, 1); // Only show one value for retention rate

  return (
    <div className="w-full h-full flex flex-col justify-center p-2">
      <div className="text-center mb-4 flex-shrink-0">
        <div
          className={`text-4xl font-bold ${
            darkMode ? "text-blue-400" : "text-blue-600"
          }`}
        >
          {entries[0]?.value || 0}%
        </div>
        <div
          className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          {t("admin.retention_rate_title")}
        </div>
      </div>

      {/* Full-width progress bar */}
      <div className="w-full flex-grow flex items-center">
        <div
          className={`w-full h-6 rounded-full ${
            darkMode ? "bg-gray-700" : "bg-gray-200"
          }`}
        >
          <div
            className="h-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-1000"
            style={{ width: `${Math.min(100, entries[0]?.value || 0)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

function CustomerLtvChart({ data, darkMode }) {
  const { t } = useTranslation("translation");
  const normalized = Array.isArray(data) ? data : [data];
  const entries = normalized.slice(0, 1); // Show main LTV value

  return (
    <div className="w-full h-full flex flex-col justify-center p-2">
      <div className="text-center mb-4 flex-shrink-0">
        <div
          className={`text-3xl font-bold ${
            darkMode ? "text-green-400" : "text-green-600"
          }`}
        >
          {(entries[0]?.value || 0).toLocaleString()} VNĐ
        </div>
        <div
          className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          {t("admin.customer_ltv")}
        </div>
      </div>

      {/* Full-width progress bar */}
      <div className="w-full flex-grow flex items-center">
        <div
          className={`w-full h-6 rounded-full ${
            darkMode ? "bg-gray-700" : "bg-gray-200"
          }`}
        >
          <div
            className="h-6 rounded-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-1000"
            style={{
              width: `${Math.min(
                100,
                ((entries[0]?.value || 0) / 50000000) * 100
              )}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

function RatingDistributionChart({ data, darkMode, productId }) {
  const { t } = useTranslation("translation");
  const normalized = Array.isArray(data) ? data : [data];
  const entries = normalized.slice(0, 5); // Show up to 5 rating levels
  const maxVal = Math.max(1, ...entries.map(e => Number(e.value || 0)));

  const colors = [
    "bg-gradient-to-t from-red-600 to-red-400",
    "bg-gradient-to-t from-orange-600 to-orange-400",
    "bg-gradient-to-t from-yellow-600 to-yellow-400",
    "bg-gradient-to-t from-green-600 to-green-400",
    "bg-gradient-to-t from-blue-600 to-blue-400",
  ];

  return (
    <div className="w-full h-full flex flex-col p-2">
      <div className="text-center mb-2 flex-shrink-0">
        <div
          className={`text-sm font-semibold ${
            darkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          {t("admin.product_rating_distribution")}
        </div>
        <div
          className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          {t("admin.product_label")}: {productId || 1}
        </div>
      </div>

      <div className="flex-grow flex items-end justify-center gap-2 px-4">
        {entries.map((e, i) => {
          const value = Number(e.value || 0);
          const height = Math.max(20, Math.round((value / maxVal) * 80));
          const color = colors[i % colors.length];

          return (
            <div key={i} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 ${color} rounded-t transition-all duration-500 cursor-pointer hover:opacity-80`}
                style={{ height: `${height}px` }}
                title={`${e.name}: ${value} đánh giá cho sản phẩm ID ${
                  productId || 1
                }`}
              ></div>
              <div
                className={`text-xs mt-1 text-center ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {e.name}
              </div>
              <div
                className={`text-xs font-bold ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                {value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional info */}
      <div className="mt-2 text-center flex-shrink-0">
        <div
          className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          {t("admin.total_reviews")}:{" "}
          {entries.reduce((sum, e) => sum + Number(e.value || 0), 0)}{" "}
          {t("admin.reviews_label")}
        </div>
      </div>
    </div>
  );
}

function FrequentlyBoughtChart({ data, darkMode, productId }) {
  const { t } = useTranslation("translation");
  console.log("FrequentlyBoughtChart received data:", data);
  const normalized = Array.isArray(data) ? data : [data];
  const entries = normalized.slice(0, 8); // Show up to 8 items
  console.log("FrequentlyBoughtChart entries:", entries);

  // Function to get product name from ID
  const getProductName = productId => {
    const productNames = {
      1: "Laptop Gaming ASUS ROG",
      2: "Chuột không dây Logitech",
      3: "Bàn phím cơ Keychron",
      4: "Tai nghe Sony WH-1000XM4",
      5: 'Màn hình Samsung 27"',
      19: "Laptop Gaming MSI",
      22: "Chuột Gaming Razer",
      30: "Bàn phím cơ Corsair",
      40: "Tai nghe Gaming SteelSeries",
      64: 'Màn hình Dell 24"',
      95: "Webcam Logitech",
      97: "Loa JBL",
      126: "Bàn gaming",
    };
    return productNames[productId] || `Sản phẩm ${productId}`;
  };

  return (
    <div className="w-full h-full flex flex-col p-2">
      <div className="text-center mb-2 flex-shrink-0">
        <div
          className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          {t("admin.product_frequently_bought")}:{" "}
          {getProductName(productId || 1)} ({t("remaining.product_id_label")}:{" "}
          {productId || 1})
        </div>
      </div>

      <div className="flex-grow space-y-1 overflow-y-auto">
        {entries.length > 0 ? (
          entries.map((e, i) => {
            const itemProductId =
              e.productId || parseInt(e.name.replace("Product ", ""));
            const productName = getProductName(itemProductId);

            return (
              <div
                key={i}
                className={`flex items-center justify-between p-2 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <div className="flex items-center flex-1">
                  <div
                    className={`w-3 h-3 rounded-full mr-3 flex-shrink-0 ${
                      i === 0
                        ? "bg-yellow-500"
                        : i === 1
                        ? "bg-gray-400"
                        : i === 2
                        ? "bg-orange-600"
                        : "bg-blue-500"
                    }`}
                  ></div>
                  <div className="flex flex-col">
                    <span
                      className={`text-sm font-medium ${
                        darkMode ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      {productName}
                    </span>
                    <span
                      className={`text-xs ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {t("remaining.product_id_label")}: {itemProductId}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div
                    className={`text-sm font-bold ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    {e.score}
                  </div>
                  <div
                    className={`text-xs ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {t("admin.favorite_count")}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {t("admin.no_frequently_bought_data")}
              </div>
              <div
                className={`text-xs ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                }`}
              >
                {t("admin.backend_no_data")}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Most Favorited Products Chart Component
function MostFavoritedProductsChart({ data, darkMode }) {
  const { t } = useTranslation("translation");
  const normalized = Array.isArray(data) ? data : [data];
  const entries = normalized.slice(0, 8); // Show top 8 products

  return (
    <div className="w-full h-full flex flex-col p-2">
      <div className="flex-grow space-y-1 overflow-y-auto">
        {entries.length > 0 ? (
          entries.map((item, i) => {
            // Data format: [productId, productName, favoriteCount]
            const productId = Array.isArray(item)
              ? item[0]
              : item.productId || 0;
            const productName = Array.isArray(item)
              ? item[1]
              : item.productName || t("admin.unknown");
            const favoriteCount = Array.isArray(item)
              ? item[2]
              : item.favoriteCount || item.count || 0;

            return (
              <div
                key={i}
                className={`flex items-center justify-between p-3 rounded-lg transition-all hover:shadow-md ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <div className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white mr-3 flex-shrink-0 ${
                      i === 0
                        ? "bg-pink-500"
                        : i === 1
                        ? "bg-purple-400"
                        : i === 2
                        ? "bg-red-600"
                        : "bg-indigo-500"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span
                      className={`text-sm font-medium truncate ${
                        darkMode ? "text-gray-200" : "text-gray-800"
                      }`}
                      title={productName}
                    >
                      {productName}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-xs ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        ❤️ {favoriteCount} {t("admin.favorite_count")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-3">
                  <div
                    className={`text-xs ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {t("remaining.product_id_label")}: {productId}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {t("admin.no_data_text")}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Top Rated Products Chart Component
function TopRatedProductsChart({ data, darkMode }) {
  const { t } = useTranslation("translation");
  const normalized = Array.isArray(data) ? data : [data];
  const entries = normalized.slice(0, 8); // Show top 8 products

  return (
    <div className="w-full h-full flex flex-col p-2">
      <div className="flex-grow space-y-1 overflow-y-auto">
        {entries.length > 0 ? (
          entries.map((item, i) => {
            // Data format: [productId, productName, avgRating, reviewCount]
            const productId = Array.isArray(item)
              ? item[0]
              : item.productId || 0;
            const productName = Array.isArray(item)
              ? item[1]
              : item.productName || t("admin.unknown");
            const avgRating = Array.isArray(item)
              ? item[2]
              : item.avgRating || item.averageRating || 0;
            const reviewCount = Array.isArray(item)
              ? item[3]
              : item.reviewCount || item.count || 0;

            return (
              <div
                key={i}
                className={`flex items-center justify-between p-3 rounded-lg transition-all hover:shadow-md ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <div className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white mr-3 flex-shrink-0 ${
                      i === 0
                        ? "bg-yellow-500"
                        : i === 1
                        ? "bg-gray-400"
                        : i === 2
                        ? "bg-orange-600"
                        : "bg-blue-500"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span
                      className={`text-sm font-medium truncate ${
                        darkMode ? "text-gray-200" : "text-gray-800"
                      }`}
                      title={productName}
                    >
                      {productName}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, star) => (
                          <span
                            key={star}
                            className={`text-xs ${
                              star < Math.floor(avgRating)
                                ? "text-yellow-400"
                                : "text-gray-400"
                            }`}
                          >
                            ⭐
                          </span>
                        ))}
                        <span
                          className={`text-xs font-bold ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {avgRating.toFixed(1)}
                        </span>
                      </div>
                      <span
                        className={`text-xs ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        ({reviewCount} {t("remaining.rating_text")})
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-3">
                  <div
                    className={`text-xs ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {t("remaining.product_id_label")}: {productId}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {t("admin.no_data_text")}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function WeekdayRevenueChart({ data, darkMode }) {
  const { t } = useTranslation("translation");
  const normalized = Array.isArray(data) ? data : [data];
  const entries = normalized.slice(0, 7); // Show up to 7 days
  const maxVal = Math.max(1, ...entries.map(e => Number(e.value || 0)));

  const dayNames = [
    t("admin.day_mon"),
    t("admin.day_tue"),
    t("admin.day_wed"),
    t("admin.day_thu"),
    t("admin.day_fri"),
    t("admin.day_sat"),
    t("admin.day_sun"),
  ];
  const dayNamesFull = [
    t("admin.day_mon_full"),
    t("admin.day_tue_full"),
    t("admin.day_wed_full"),
    t("admin.day_thu_full"),
    t("admin.day_fri_full"),
    t("admin.day_sat_full"),
    t("admin.day_sun_full"),
  ];

  return (
    <div className="w-full h-full flex flex-col p-2">
      <div className="text-center mb-2 flex-shrink-0">
        <div
          className={`text-sm font-semibold ${
            darkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          {t("admin.weekday_revenue")}
        </div>
        <div
          className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          {t("admin.revenue_total")}:{" "}
          {(
            entries.reduce((sum, e) => sum + Number(e.value || 0), 0) / 1000000
          ).toFixed(1)}
          M VNĐ
        </div>
      </div>

      <div className="flex-grow flex items-end justify-center gap-1 px-2">
        {entries.map((e, i) => {
          const value = Number(e.value || 0);
          const height = Math.max(20, Math.round((value / maxVal) * 80));
          const dayName =
            dayNames[i] ||
            e.name?.substring(0, 3).toUpperCase() ||
            `Day ${i + 1}`;
          const dayNameFull = dayNamesFull[i] || dayName;

          return (
            <div key={i} className="flex flex-col items-center flex-1">
              <div
                className="w-6 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t transition-all duration-500 cursor-pointer hover:opacity-80"
                style={{ height: `${height}px` }}
                title={`${dayNameFull}: ${value.toLocaleString()} VNĐ`}
              ></div>
              <div
                className={`text-xs mt-1 text-center ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {dayName}
              </div>
              <div
                className={`text-xs font-bold ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                {(value / 1000000).toFixed(1)}M
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Generic tiny components to render quick charts/lists without extra deps
function GenericBarChart({ data, darkMode, title }) {
  const { t } = useTranslation("translation");
  const [tooltip, setTooltip] = useState(null);
  const normalized = Array.isArray(data) ? data : [data];
  const entries = normalized.slice(0, 15); // Show up to 15 items
  const maxVal = Math.max(
    1,
    ...entries.map(e =>
      Number(e.value || e.revenue || e.count || e.percentage || e.total || 0)
    )
  );

  return (
    <div className="w-full h-full p-4 relative">
      <div className="text-center mb-4">
        <h3
          className={`text-lg font-semibold ${
            darkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-xs font-medium mt-2 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {t("remaining.abc_inventory")}
        </p>

        {/* ABC Explanation Tooltip */}
        <div className="absolute top-2 right-2 group">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            } transition-colors`}
          >
            <span
              className={`text-xs font-bold ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              ?
            </span>
          </div>

          {/* Tooltip content */}
          <div
            className={`absolute top-8 right-0 w-64 p-3 rounded-lg shadow-xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-white"
                : "bg-white border-gray-200 text-gray-800"
            }`}
          >
            <div className="text-sm">
              <div className="font-semibold mb-2">{t("admin.abc_what_is")}</div>
              <div className="space-y-1 text-xs">
                <div>
                  <span className="font-medium text-green-400">
                    {t("admin.abc_category_a")}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-yellow-400">
                    {t("admin.abc_category_b")}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-red-400">
                    {t("admin.abc_category_c")}
                  </span>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-400">
                {t("admin.abc_help")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[350px] flex items-end justify-center gap-2 overflow-x-auto px-2 relative">
        {/* Y-axis label */}
        <div className="absolute left-2 top-1/2 transform -rotate-90 -translate-y-1/2 z-10">
          <span
            className={`text-xs font-medium ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {t("remaining.abc_value_label")}
          </span>
        </div>

        {/* Chart area with margin for Y-axis label */}
        <div className="ml-12 flex items-end justify-center gap-2 w-full">
          {entries.map((e, i) => {
            const v = Number(
              e.value || e.revenue || e.count || e.percentage || e.total || 0
            );
            const height = Math.max(35, Math.round((v / maxVal) * 280)); // Min 35px, max 280px
            const colors = [
              "bg-gradient-to-t from-blue-600 to-blue-400",
              "bg-gradient-to-t from-green-600 to-green-400",
              "bg-gradient-to-t from-purple-600 to-purple-400",
              "bg-gradient-to-t from-orange-600 to-orange-400",
              "bg-gradient-to-t from-red-600 to-red-400",
              "bg-gradient-to-t from-indigo-600 to-indigo-400",
              "bg-gradient-to-t from-pink-600 to-pink-400",
              "bg-gradient-to-t from-teal-600 to-teal-400",
              "bg-gradient-to-t from-yellow-600 to-yellow-400",
              "bg-gradient-to-t from-cyan-600 to-cyan-400",
              "bg-gradient-to-t from-lime-600 to-lime-400",
              "bg-gradient-to-t from-amber-600 to-amber-400",
              "bg-gradient-to-t from-emerald-600 to-emerald-400",
              "bg-gradient-to-t from-violet-600 to-violet-400",
              "bg-gradient-to-t from-rose-600 to-rose-400",
            ];
            const color = colors[i % colors.length];

            return (
              <div
                key={i}
                className="flex-shrink-0 flex flex-col items-center justify-end min-w-[50px] group"
              >
                {/* Value label on top */}
                <div
                  className={`mb-1 text-xs font-bold ${
                    darkMode ? "text-gray-200" : "text-gray-800"
                  } opacity-0 group-hover:opacity-100 transition-opacity`}
                >
                  {v.toLocaleString()}
                </div>

                {/* Bar */}
                <div
                  className={`${color} w-10 rounded-t-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
                  style={{
                    height: `${height}px`,
                  }}
                  onMouseEnter={event => {
                    const rect = event.target.getBoundingClientRect();
                    setTooltip({
                      x: rect.left + rect.width / 2,
                      y: rect.top - 10,
                      data: e,
                      value: v,
                      group: e.group || e.category || "N/A",
                    });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />

                {/* Name label */}
                <div
                  className={`mt-2 text-xs font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } text-center max-w-[70px] leading-tight break-words`}
                >
                  {e.name || e.label || e.category || e.month || e.day || ""}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Enhanced Tooltip */}
      {tooltip && (
        <div
          className={`fixed z-[9999] px-4 py-3 rounded-lg shadow-xl border-2 ${
            darkMode
              ? "bg-gray-800 border-gray-600 text-white"
              : "bg-white border-gray-200 text-gray-800"
          }`}
          style={{
            left: `${tooltip.x - 100}px`,
            top: `${tooltip.y - 80}px`,
            transform: "translateX(-50%)",
          }}
        >
          <div className="text-center">
            <div className="text-lg font-bold mb-2">
              {tooltip.data.name || `Product ${tooltip.data.productId}`}
            </div>
            <div className="space-y-1">
              <div className="text-sm">
                <span className="font-semibold">
                  {t("remaining.value_label")}:
                </span>{" "}
                {tooltip.value.toLocaleString()}
              </div>
              <div className="text-sm">
                <span className="font-semibold">{t("admin.abc_group")}:</span>
                <span
                  className={`ml-1 px-2 py-1 rounded text-xs font-bold ${
                    tooltip.group === "A"
                      ? "bg-green-100 text-green-800"
                      : tooltip.group === "B"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {tooltip.group}
                </span>
              </div>
              {tooltip.data.productId && (
                <div className="text-sm">
                  <span className="font-semibold">ID:</span>{" "}
                  {tooltip.data.productId}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function GenericList({ data, darkMode, valueKeyHint }) {
  const items = Array.isArray(data) ? data.slice(0, 8) : [];
  return (
    <ul className="divide-y divide-gray-700/30">
      {items.map((it, idx) => (
        <li key={idx} className="py-2 flex items-center justify-between">
          <span
            className={`text-sm ${
              darkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            {it.name ||
              it.fullName ||
              it.productName ||
              it.categoryName ||
              `#${idx + 1}`}
          </span>
          <span
            className={`text-sm font-semibold ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            {it[valueKeyHint] ||
              it.revenue ||
              it.totalSpent ||
              it.count ||
              it.orders ||
              it.percentage ||
              0}
          </span>
        </li>
      ))}
      {items.length === 0 && (
        <li
          className={`py-6 text-center ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          No data
        </li>
      )}
    </ul>
  );
}
