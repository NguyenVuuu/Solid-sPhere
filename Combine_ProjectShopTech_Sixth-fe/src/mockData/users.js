// Mock data cho users
export const mockUsers = [
  {
    customerID: 1,
    fullName: "Nguyễn Văn A",
    email: "admin@test.com",
    password: "123456",
    phoneNumber: "0123456789",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    position: "Quản lý cửa hàng",
    role: "manager"
  },
  {
    customerID: 2,
    fullName: "Trần Thị B",
    email: "employee@test.com",
    password: "123456",
    phoneNumber: "0987654321",
    address: "456 Đường XYZ, Quận 2, TP.HCM",
    position: "Nhân viên",
    role: "employee"
  },
  {
    customerID: 3,
    fullName: "Lê Văn C",
    email: "user@test.com",
    password: "123456",
    phoneNumber: "0912345678",
    address: "789 Đường DEF, Quận 3, TP.HCM",
    position: "Khách hàng",
    role: "customer"
  }
];

// Token giả
export const generateMockToken = (user) => {
  return `mock_token_${user.customerID}_${Date.now()}`;
};

// Updated: 2025-10-12T16:06:41.212Z

// Updated: 2025-10-12T16:08:51.761Z
