// Mock Authentication Service - Thay thế các API calls bằng mock data
import { mockUsers, generateMockToken } from '../mockData/users';
import { useTranslation } from 'react-i18next';

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Login function - authenticate user and return user data
export const loginContext = async (credentials) => {
  await delay(); // Simulate network delay
  
  try {
    const user = mockUsers.find(
      u => u.phoneNumber === credentials.phone && u.password === credentials.password
    );
    
    if (user) {
      const token = generateMockToken(user);
      
      // Store token in localStorage
      localStorage.setItem('authToken', token);
      
      // Return user data without password
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } else {
      throw new Error('Số điện thoại hoặc mật khẩu không chính xác');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(error.message || 'Invalid credentials');
  }
};

// Logout function - clear user data and tokens
export const logoutContext = async () => {
  await delay(200);
  
  try {
    // Clear local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

// Register function - create new user
export const registerUser = async (userData) => {
  await delay();
  
  try {
    // Check if phone already exists
    const existingUser = mockUsers.find(u => u.phoneNumber === userData.phone);
    
    if (existingUser) {
      throw new Error('Số điện thoại đã được sử dụng');
    }
    
    // Create new user
    const newUser = {
      customerID: mockUsers.length + 1,
      fullName: userData.fullName,
      email: '', // Keep empty for now since we're using phone
      password: userData.password,
      phoneNumber: userData.phone,
      address: '',
      position: 'Khách hàng',
      role: 'customer'
    };
    
    // Add to mock users array
    mockUsers.push(newUser);
    
    // Return success response
    return {
      success: true,
      message: 'Đăng ký thành công'
    };
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error(error.message || 'Registration failed');
  }
};

// Verify token and get current user
export const getCurrentUser = async () => {
  await delay(200);
  
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
    console.error('Get current user error:', error);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    return null;
  }
};

// Check if user has specific role
export const hasRole = (user, role) => {
  if (!user || !user.position) return false;
  return user.position.toLowerCase() === role.toLowerCase();
};

// Create authentication header with token
export const authHeader = () => {
  const token = localStorage.getItem('authToken');
  
  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
};

// Updated: 2025-10-12T16:06:32.025Z

// Updated: 2025-10-12T16:08:52.593Z
