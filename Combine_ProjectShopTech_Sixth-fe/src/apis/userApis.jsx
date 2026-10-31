import axiosInstance from "../custom/axios";

const API_URL = "/users"; 

export async function getUserById(id) {
  try {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    const data = response?.data;

    return { EC: 1, DT: data };
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người dùng:", error);
    return { EC: 0, DT: null };
  }
}

export default { getUserById };