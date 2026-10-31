import axiosInstance from "../custom/axios";

const DISCOUNT_API = "/discounts";

// Get all discounts
export const getAllDiscounts = async () => {
  const response = await axiosInstance.get(DISCOUNT_API);
  return response.data;
};

// Get active discounts
export const getActiveDiscounts = async () => {
  try {
    const response = await axiosInstance.get(`${DISCOUNT_API}/active`);
    return response.data;
  } catch (error) {
    console.error("Error fetching active discounts:", error);
    return [];
  }
};

// Get top 10 products with highest discount
export const getTop10ProductsWithHighestDiscount = async () => {
  try {
    const response = await axiosInstance.get(`${DISCOUNT_API}/top10-products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching top 10 products:", error);
    return [];
  }
};

// Get top products by category
export const getTopProductsByCategory = async (category) => {
  try {
    const response = await axiosInstance.get(`${DISCOUNT_API}/top10-products/category/${category}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching top products by category:", error);
    return [];
  }
};

// Get best active discounts
export const getBestActiveDiscounts = async () => {
  try {
    const response = await axiosInstance.get(`${DISCOUNT_API}/best`);
    return response.data;
  } catch (error) {
    console.error("Error fetching best active discounts:", error);
    return [];
  }
};

// Get discounts by category
export const getDiscountsByCategory = async (categoryId) => {
  try {
    const response = await axiosInstance.get(`${DISCOUNT_API}/category/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching discounts by category:", error);
    return [];
  }
};

// Get discounts by rate range
export const getDiscountsByRateRange = async (minRate, maxRate) => {
  try {
    const response = await axiosInstance.get(`${DISCOUNT_API}/rate-range`, {
      params: { minRate, maxRate }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching discounts by rate range:", error);
    return [];
  }
};


export const exchangePoint = async (userId, point, idDisCount) => {

  console.log(userId, point, idDisCount)

  try {
    const response = await axiosInstance.post(
      `/user-discounts/user/${userId}/exchange-point`,
      null, {
      params: {
        point,
        idDisCount,
      },
    }
    );
    return response.data;
  } catch (error) {
    console.error("Error exchanging points:", error);
    throw error;
  }
};


export const getAllDiscountExchangePoint = async () => {
  try {
    const response = await axiosInstance.get(`/discounts/exchange-point`);
    console.log("NGUYEN TRONG NGHIA ", response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching discounts by category:", error);
    return [];
  }
};
export const updatePointAccumulate = async (userId, points) => {
  try {
    const response = await axiosInstance.patch(`/users/${userId}/points`, null, {
      params: { points },
    });
    console.log("✅ Cập nhật điểm thành công:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật điểm:", error);
    return null;
  }
};

export const findTopCustomersByPoints = async () => {
  try {
    const response = await axiosInstance.get(`/users/top-customers?limit=10`);
    // console.log("✅ Cập nhật điểm thành công:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật điểm:", error);
    return null;
  }
};