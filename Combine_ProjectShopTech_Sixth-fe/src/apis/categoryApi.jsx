import axiosInstance from "../custom/axios";

export const searchCategoriesByName = async name => {
  try {
    const response = await axiosInstance.get(`/categories/search`, {
      params: { name },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tìm category theo tên:", error);
    throw error;
  }
};