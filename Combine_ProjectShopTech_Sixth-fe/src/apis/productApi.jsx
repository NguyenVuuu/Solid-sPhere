import axiosInstance from "../custom/axios";

// Product API wrappers (JSX extension per request)
export async function getAllProducts() {
  const response = await axiosInstance.get("/products");
  const data = response?.data;

  const list = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data?.content)
    ? data.content
    : [];

  return { EC: 1, DT: list };
}
export const getProductsByCategory = async categoryId => {
  try {
    const response = await axiosInstance.get(
      `/products/category/${categoryId}`
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm theo category:", error);
    throw error;
  }
};

export const getProductById = async productId => {
  try {
    const response = await axiosInstance.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
    throw error;
  }
};
// API lọc sản phẩm
export const filterProducts = async (filterRequest) => {
  try {
    const response = await axiosInstance.post("/products/filter", filterRequest);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lọc sản phẩm:", error);
    throw error;
  }
};

// API lấy các tùy chọn lọc (categories, price ranges, status)
export const getFilterOptions = async () => {
  try {
    const response = await axiosInstance.get("/products/filter-options");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy filter options:", error);
    throw error;
  }
};

// API lọc theo category
export const filterByCategory = async (categoryId) => {
  try {
    const response = await axiosInstance.get(`/products/filter/category/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lọc theo category:", error);
    throw error;
  }
};

// API lọc theo giá
export const filterByPrice = async (minPrice, maxPrice = null) => {
  try {
    const params = { min: minPrice };
    if (maxPrice) {
      params.max = maxPrice;
    }
    const response = await axiosInstance.get("/products/filter/price", { params });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lọc theo giá:", error);
    throw error;
  }
};


export default { getAllProducts, getProductById , filterProducts,
  getFilterOptions,
  filterByCategory,
  filterByPrice};