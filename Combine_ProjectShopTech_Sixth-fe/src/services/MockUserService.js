// Mock User Service - Thay thế các API calls bằng mock data
import { mockUsers } from '../mockData/users';
import { useTranslation } from 'react-i18next';

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Hàm lấy thông tin tài khoản người dùng
 * @returns {Promise<Object>} Dữ liệu tài khoản người dùng hoặc lỗi
 */
export const getUserAccount = async () => {
  await delay();
  
  try {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      return null;
    }
    
    // Parse user ID from mock token
    const parts = token.split('_');
    if (parts.length >= 3) {
      const userId = parseInt(parts[2]);
      const user = mockUsers.find(u => u.customerID === userId);
      
      if (user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching user account:", error);
    return null;
  }
};

/**
 * Hàm lấy thông tin người dùng theo email và password
 * @param {string} email Email người dùng
 * @param {string} password Mật khẩu người dùng
 * @returns {Promise<Object>} Dữ liệu người dùng hoặc lỗi
 */
export const getUserByEmailAndPassword = async (email, password) => {
  await delay();
  
  try {
    const user = mockUsers.find(
      u => u.email === email && u.password === password
    );
    
    if (user) {
      const { password: pwd, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching user by email and password:", error);
    return null;
  }
};

/**
 * Hàm cập nhật thông tin người dùng
 * @param {Object} userData - Dữ liệu cập nhật
 * @returns {Promise<Object>} Kết quả cập nhật
 */
export const updateUserInfo = async (userData) => {
  await delay();
  
  try {
    const userIndex = mockUsers.findIndex(
      u => u.customerID === userData.customerID
    );
    
    if (userIndex !== -1) {
      // Cập nhật thông tin user
      mockUsers[userIndex] = {
        ...mockUsers[userIndex],
        ...userData
      };
      
      // Cập nhật localStorage nếu đang đăng nhập
      const token = localStorage.getItem('authToken');
      if (token) {
        const parts = token.split('_');
        if (parts.length >= 3) {
          const userId = parseInt(parts[2]);
          if (userId === userData.customerID) {
            const { password, ...userWithoutPassword } = mockUsers[userIndex];
            localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          }
        }
      }
      
      return {
        EC: 1,
        EM: 'Cập nhật thông tin thành công'
      };
    }
    
    return {
      EC: 0,
      EM: 'Không tìm thấy người dùng'
    };
  } catch (error) {
    console.error("Error updating user info:", error);
    return {
      EC: 0,
      EM: 'Có lỗi xảy ra khi cập nhật thông tin'
    };
  }
};

/**
 * Hàm đổi mật khẩu
 * @param {Object} passwordData - Dữ liệu đổi mật khẩu
 * @returns {Promise<Object>} Kết quả đổi mật khẩu
 */
export const changePassword = async (passwordData) => {
  await delay();
  
  try {
    const { customerID, currentPassword, newPassword } = passwordData;
    
    const userIndex = mockUsers.findIndex(u => u.customerID === customerID);
    
    if (userIndex !== -1) {
      const user = mockUsers[userIndex];
      
      // Kiểm tra mật khẩu hiện tại
      if (user.password !== currentPassword) {
        return {
          EC: 0,
          EM: 'Mật khẩu hiện tại không đúng'
        };
      }
      
      // Cập nhật mật khẩu mới
      mockUsers[userIndex].password = newPassword;
      
      return {
        EC: 1,
        EM: 'Đổi mật khẩu thành công'
      };
    }
    
    return {
      EC: 0,
      EM: 'Không tìm thấy người dùng'
    };
  } catch (error) {
    console.error("Error changing password:", error);
    return {
      EC: 0,
      EM: 'Có lỗi xảy ra khi đổi mật khẩu'
    };
  }
};

// Updated: 2025-10-12T16:06:25.673Z

// Updated: 2025-10-12T16:09:08.356Z
