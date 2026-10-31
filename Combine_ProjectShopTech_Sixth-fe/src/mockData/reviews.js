// Mock data cho reviews/testimonials
export const mockReviews = [
  {
    reviewID: 1,
    customerName: "Nguyễn Văn A",
    comment: "Sản phẩm rất tốt, chất lượng cao, giao hàng nhanh. Tôi rất hài lòng với dịch vụ của shop!",
    rating: 5,
    createdAt: "2025-01-15"
  },
  {
    reviewID: 2,
    customerName: "Trần Thị B",
    comment: "Laptop chạy mượt mà, thiết kế đẹp. Nhân viên tư vấn nhiệt tình. Rất đáng mua!",
    rating: 5,
    createdAt: "2025-01-20"
  },
  {
    reviewID: 3,
    customerName: "Lê Văn C",
    comment: "Giá cả hợp lý, sản phẩm chính hãng. Dịch vụ sau bán hàng tốt.",
    rating: 4,
    createdAt: "2025-02-05"
  },
  {
    reviewID: 4,
    customerName: "Phạm Thị D",
    comment: "PC gaming hiệu năng cao, chơi game mượt. Rất đáng tiền!",
    rating: 5,
    createdAt: "2025-02-10"
  },
  {
    reviewID: 5,
    customerName: "Hoàng Văn E",
    comment: "Màn hình đẹp, màu sắc sống động. Đóng gói cẩn thận.",
    rating: 4,
    createdAt: "2025-02-15"
  }
];

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Lấy tất cả reviews
 * @returns {Promise<Object>} Danh sách reviews
 */
export const getAllReviews = async () => {
  await delay();
  
  try {
    return {
      EC: 1,
      EM: 'Success',
      DT: mockReviews
    };
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return {
      EC: 0,
      EM: 'Error fetching reviews',
      DT: []
    };
  }
};

// Updated: 2025-10-12T16:06:33.853Z

// Updated: 2025-10-12T16:08:59.750Z
