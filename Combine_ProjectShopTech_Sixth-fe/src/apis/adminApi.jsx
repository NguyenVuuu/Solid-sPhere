import axiosInstance from "../custom/axios";

// Reviews API
export const fetchReviews = () => axiosInstance.get('/reviews').then(r => r.data);
export const createReview = (reviewData) => axiosInstance.post('/reviews', reviewData).then(r => r.data);
export const updateReview = (reviewId, reviewData) => axiosInstance.put(`/reviews/${reviewId}`, reviewData).then(r => r.data);
export const deleteReview = (reviewId) => axiosInstance.delete(`/reviews/${reviewId}`).then(r => r.data);

// Discounts API
export const fetchDiscounts = () => axiosInstance.get('/discounts').then(r => r.data);
export const createDiscount = (discountData) => axiosInstance.post('/discounts', discountData).then(r => r.data);
export const updateDiscount = (discountId, discountData) => axiosInstance.put(`/discounts/${discountId}`, discountData).then(r => r.data);
export const deleteDiscount = (discountId) => axiosInstance.delete(`/discounts/${discountId}`).then(r => r.data);
export const activateDiscount = (discountId) => axiosInstance.patch(`/discounts/${discountId}/activate`).then(r => r.data);
export const deactivateDiscount = (discountId) => axiosInstance.patch(`/discounts/${discountId}/deactivate`).then(r => r.data);

// Products API
export const fetchProducts = () => axiosInstance.get('/products').then(r => r.data);

// Advanced Discount Management APIs
export const fetchActiveDiscounts = (date) => axiosInstance.get('/discounts/active', { params: { date } }).then(r => r.data);
export const fetchExpiredDiscounts = (date) => axiosInstance.get('/discounts/expired', { params: { date } }).then(r => r.data);
export const fetchUpcomingDiscounts = (fromDate, toDate) => axiosInstance.get('/discounts/upcoming', { params: { fromDate, toDate } }).then(r => r.data);
export const fetchBestActiveDiscounts = () => axiosInstance.get('/discounts/best').then(r => r.data);
export const fetchDiscountsByRateRange = (minRate, maxRate) => axiosInstance.get('/discounts/rate-range', { params: { minRate, maxRate } }).then(r => r.data);
export const fetchDiscountsByCategory = (categoryId) => axiosInstance.get(`/discounts/category/${categoryId}`).then(r => r.data);
export const searchDiscountsByKeyword = (keyword) => axiosInstance.get('/discounts/search', { params: { keyword } }).then(r => r.data);
export const deactivateExpiredDiscounts = () => axiosInstance.post('/discounts/deactivate-expired').then(r => r.data);

// Email APIs - Gửi mã khuyến mãi tri ân khách hàng
export const sendDiscountEmail = (discountId, email, customerName) => 
  axiosInstance.post(`/discounts/${discountId}/send-email`, { email, customerName }).then(r => r.data);

export const sendBulkDiscountEmail = (discountId, emails) => 
  axiosInstance.post(`/discounts/${discountId}/send-bulk-email`, { emails }).then(r => r.data);

export const sendDiscountToAllCustomers = (discountId) => 
  axiosInstance.post(`/discounts/${discountId}/send-all-customers`).then(r => r.data);

// Users/Customers API - Lấy danh sách khách hàng
export const fetchAllCustomers = () => 
  axiosInstance.get('/users').then(r => r.data.filter(user => user.email && user.email.trim() !== ''));