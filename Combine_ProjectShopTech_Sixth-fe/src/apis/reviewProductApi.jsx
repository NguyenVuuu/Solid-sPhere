import axiosInstance from "../custom/axios";



export async function getAllReviews() {
  try {
    const response = await axiosInstance.get("/reviews");
    const data = response?.data;

    const list = Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data?.content)
      ? data.content
      : [];

    return { EC: 1, DT: list };
  } catch (error) {
    console.error("Lỗi khi lấy tất cả review:", error);
    return { EC: 0, DT: [] };
  }
}

// 🟢 Lấy review theo sản phẩm
export async function getReviewsByProduct(productId) {
  try {
    const res = await axiosInstance.get(`/reviews/product/${productId}`);
    const data = Array.isArray(res?.data) ? res.data : [];
    return { EC: 1, DT: data };
  } catch (error) {
    console.error("Lỗi khi lấy review theo sản phẩm:", error);
    return { EC: 0, DT: [] };
  }
}

// 🟢 Lấy review theo người dùng
export async function getReviewsByUser(userId) {
  try {
    const res = await axiosInstance.get(`/reviews/user/${userId}`);
    const data = Array.isArray(res?.data) ? res.data : [];
    return { EC: 1, DT: data };
  } catch (error) {
    console.error("Lỗi khi lấy review theo người dùng:", error);
    return { EC: 0, DT: [] };
  }
}
export const createReview = async (reviewData) => {
  try {
    const res = await axiosInstance.post("/reviews", reviewData); 
    return res.data;
  } catch (error) {
    console.error("Error creating review:", error.response || error);
    return { EC: 0, EM: "Error", DT: null };
  }
};



export default { getAllReviews,getReviewsByProduct ,getReviewsByUser ,createReview};