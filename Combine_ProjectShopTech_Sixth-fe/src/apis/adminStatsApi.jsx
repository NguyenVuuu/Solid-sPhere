import axiosInstance from "../custom/axios";

// Use Vite proxy base (/api) from axiosInstance; only append service path
const prefix = "/statistics";

export const fetchOverview = () => axiosInstance.get(`${prefix}/overview`).then(r => r.data);
export const fetchUsersStats = () => axiosInstance.get(`${prefix}/users`).then(r => r.data);
export const fetchProductsStats = () => axiosInstance.get(`${prefix}/products`).then(r => r.data);
export const fetchOrdersStats = () => axiosInstance.get(`${prefix}/orders`).then(r => r.data);

export const fetchRevenue = (startDate, endDate) =>
  axiosInstance.get(`${prefix}/revenue`, { params: { startDate, endDate } }).then(r => r.data);

export const fetchReviewsStats = () => axiosInstance.get(`${prefix}/reviews`).then(r => r.data);
export const fetchDiscountsStats = () => axiosInstance.get(`${prefix}/discounts`).then(r => r.data);
export const fetchAppointmentsStats = () => axiosInstance.get(`${prefix}/appointments`).then(r => r.data);
export const fetchChatsStats = () => axiosInstance.get(`${prefix}/chats`).then(r => r.data);

export const fetchTopProducts = (limit = 10) => axiosInstance.get(`${prefix}/top-products`, { params: { limit } }).then(r => r.data);
export const fetchSalesByCategory = () => axiosInstance.get(`${prefix}/sales-by-category`).then(r => r.data);
export const fetchTopCustomers = (limit = 10) => axiosInstance.get(`${prefix}/top-customers`, { params: { limit } }).then(r => r.data);

export const fetchRevenueByDay = (startDate, endDate) => axiosInstance.get(`${prefix}/revenue-by-day`, { params: { startDate, endDate } }).then(r => r.data);
export const fetchRevenueByMonth = (startYear, endYear) => axiosInstance.get(`${prefix}/revenue-by-month`, { params: { startYear, endYear } }).then(r => r.data);
export const fetchRevenueByQuarter = (startYear, endYear) => axiosInstance.get(`${prefix}/revenue-by-quarter`, { params: { startYear, endYear } }).then(r => r.data);
export const fetchRevenueByYear = (startYear, endYear) => axiosInstance.get(`${prefix}/revenue-by-year`, { params: { startYear, endYear } }).then(r => r.data);
export const fetchOrdersTrend = (startDate, endDate) => axiosInstance.get(`${prefix}/orders-trend`, { params: { startDate, endDate } }).then(r => r.data);
export const fetchLowStockProducts = (threshold = 10, limit = 10) => axiosInstance.get(`${prefix}/low-stock-products`, { params: { threshold, limit } }).then(r => r.data);
export const fetchTopCategories = (limit = 5, startDate, endDate) => axiosInstance.get(`${prefix}/top-categories`, { params: { limit, startDate, endDate } }).then(r => r.data);
export const fetchReturningCustomers = (limit = 10) => axiosInstance.get(`${prefix}/returning-customers`, { params: { limit } }).then(r => r.data);
export const fetchPaymentMethodDistribution = (startDate, endDate) =>
  axiosInstance.get(`${prefix}/payment-method-distribution`, { params: { startDate, endDate } }).then(r => r.data);

// Advanced analytics
export const fetchRfm = (startDate, endDate, topN = 20) =>
  axiosInstance.get(`/statistics/rfm`, { params: { startDate, endDate, topN } }).then(r => r.data);

export const fetchCohortRetention = (startDate, endDate) =>
  axiosInstance.get(`/statistics/cohort-retention`, { params: { startDate, endDate } }).then(r => r.data);

export const fetchAbcInventory = (startDate, endDate) =>
  axiosInstance.get(`/statistics/abc-inventory`, { params: { startDate, endDate } }).then(r => r.data);

export const fetchFrequentlyBoughtTogether = (productId, limit = 10) =>
  axiosInstance.get(`${prefix}/frequently-bought-together/${productId}`, { params: { limit } }).then(r => r.data);

export const fetchRetentionRate = (startDate, endDate) =>
  axiosInstance.get(`${prefix}/retention-rate`, { params: { startDate, endDate } }).then(r => r.data);

export const fetchStockoutRisk = (threshold = 10) =>
  axiosInstance.get(`${prefix}/stockout-risk`, { params: { threshold } }).then(r => r.data);

export const fetchCustomerLtv = (startDate, endDate) =>
  axiosInstance.get(`${prefix}/customer-ltv`, { params: { startDate, endDate } }).then(r => r.data);

export const fetchWeekdayRevenue = (startDate, endDate) =>
  axiosInstance.get(`${prefix}/weekday-revenue`, { params: { startDate, endDate } }).then(r => r.data);

export const fetchProductRatingDistribution = (productId) =>
  axiosInstance.get(`${prefix}/product-rating-distribution/${productId}`).then(r => r.data);

export const fetchTopRatedProducts = (limit = 10) =>
  axiosInstance.get(`/reviews/top-rated-products`, { params: { limit } }).then(r => r.data);

export const fetchMostFavoritedProducts = (limit = 10) =>
  axiosInstance.get(`/favorites/most-favorited`, { params: { limit } }).then(r => r.data);


