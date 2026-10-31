// Helper: parse price từ string VN format sang number
export const parseVietnamesePrice = (priceString) => {
  if (!priceString) return 0;

  // Chuyển đổi sang string và xóa ký tự ₫
  const cleanPrice = String(priceString).replace('₫', '').trim();

  // Xóa tất cả các dấu chấm (thousands separator)
  const priceWithoutThousandsSeparator = cleanPrice.replace(/\./g, '');

  // Chuyển đổi sang số nguyên
  return parseInt(priceWithoutThousandsSeparator, 10) || 0;
};
