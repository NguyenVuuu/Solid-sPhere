// Mock data cho vouchers/discount codes
export const mockVouchers = [
  {
    voucherID: 1,
    code: "WELCOME10",
    discount: 10,
    type: "percentage",
    description: "Giảm 10% cho đơn hàng đầu tiên",
    minOrder: 0,
    maxDiscount: 500000,
    isActive: true
  },
  {
    voucherID: 2,
    code: "SAVE50K",
    discount: 50000,
    type: "fixed",
    description: "Giảm 50.000đ cho đơn từ 500.000đ",
    minOrder: 500000,
    maxDiscount: 50000,
    isActive: true
  },
  {
    voucherID: 3,
    code: "VIP20",
    discount: 20,
    type: "percentage",
    description: "Giảm 20% cho khách hàng VIP",
    minOrder: 1000000,
    maxDiscount: 1000000,
    isActive: true
  }
];

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Kiểm tra voucher code
 * @param {string} code - Mã voucher
 * @returns {Promise<Object>} Thông tin voucher
 */
export const checkVoucher = async (code) => {
  await delay();
  
  try {
    const voucher = mockVouchers.find(
      v => v.code.toUpperCase() === code.toUpperCase() && v.isActive
    );
    
    if (voucher) {
      return {
        EC: 1,
        EM: 'Voucher hợp lệ',
        DT: voucher
      };
    }
    
    return {
      EC: 0,
      EM: 'Mã voucher không hợp lệ hoặc đã hết hạn',
      DT: null
    };
  } catch (error) {
    console.error("Error checking voucher:", error);
    return {
      EC: 0,
      EM: 'Lỗi kiểm tra voucher',
      DT: null
    };
  }
};

// Updated: 2025-10-12T16:06:46.272Z

// Updated: 2025-10-12T16:08:45.600Z
