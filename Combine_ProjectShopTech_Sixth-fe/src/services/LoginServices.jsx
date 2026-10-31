// Đảm bảo import đúng axiosInstance đã cấu hình
import axiosInstance from "../custom/axios"; // Import your axios instance
import { decodeJWT, getRoleFromToken, getEmailFromToken } from "../utils/jwtUtils";

// Helper function to extract and translate error messages
const parseErrorMessage = (error) => {
  console.log('=== PARSING ERROR MESSAGE ===');

  // Default message
  let errorMessage = 'Đăng nhập thất bại';

  // Try to get error data
  const errorData = error.response?.data;
  const status = error.response?.status;
  const contentType = error.response?.headers?.['content-type'];

  console.log('Error data:', errorData);
  console.log('Error data type:', typeof errorData);
  console.log('Status code:', status);
  console.log('Content type:', contentType);

  if (!errorData) {
    console.log('No error data, checking status code only');
    // Network error or no response
    if (!error.response) {
      return 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.';
    }

    // Use status code
    if (status === 401) return 'Email hoặc mật khẩu không chính xác';
    if (status === 404) return 'Email không tồn tại trong hệ thống';
    if (status === 403) return 'Tài khoản đã bị khóa';
    if (status === 500) return 'Lỗi hệ thống, vui lòng thử lại sau';

    return errorMessage;
  }

  // Check if response is HTML (Spring Boot might return error page)
  if (contentType && contentType.includes('text/html')) {
    console.log('Error response is HTML, using status code fallback');
    if (status === 401) return 'Email hoặc mật khẩu không chính xác';
    if (status === 404) return 'Email không tồn tại trong hệ thống';
    if (status === 403) return 'Tài khoản đã bị khóa';
    return errorMessage;
  }

  // If errorData is a string, use it directly
  if (typeof errorData === 'string') {
    console.log('Error data is string:', errorData);
    // Check if it's HTML string
    if (errorData.trim().startsWith('<')) {
      console.log('Error data is HTML string, using status code fallback');
      if (status === 401) return 'Email hoặc mật khẩu không chính xác';
      if (status === 404) return 'Email không tồn tại trong hệ thống';
      return errorMessage;
    }
    return translateErrorMessage(errorData);
  }

  // Extract message from different possible fields
  const backendMessage = errorData.message ||
    errorData.error ||
    errorData.msg ||
    errorData.detail ||
    errorData.error_description;

  console.log('Backend message extracted:', backendMessage);

  if (backendMessage) {
    errorMessage = translateErrorMessage(backendMessage);
  }

  // Check error code
  if (errorData.code) {
    console.log('Error code found:', errorData.code);
    const codeMessage = translateErrorCode(errorData.code);
    if (codeMessage) {
      errorMessage = codeMessage;
    }
  }

  // Fallback to status code translation
  if (errorMessage === 'Đăng nhập thất bại') {
    if (status === 401) errorMessage = 'Email hoặc mật khẩu không chính xác';
    if (status === 404) errorMessage = 'Email không tồn tại trong hệ thống';
    if (status === 403) errorMessage = 'Tài khoản đã bị khóa';
    if (status === 500) errorMessage = 'Lỗi hệ thống, vui lòng thử lại sau';
  }

  console.log('Final translated message:', errorMessage);
  return errorMessage;
};

// Translate error message to Vietnamese
const translateErrorMessage = (message) => {
  const messageStr = String(message).toLowerCase();

  // User not found errors
  if (messageStr.includes('user_not_existed') ||
    messageStr.includes('user not existed') ||
    messageStr.includes('user does not exist') ||
    messageStr.includes('not found') ||
    messageStr.includes('does not exist') ||
    messageStr.includes('no value present')) {
    return 'Email không tồn tại trong hệ thống';
  }

  // Bad credentials errors
  if (messageStr.includes('bad credentials') ||
    messageStr.includes('invalid credentials') ||
    messageStr.includes('wrong password') ||
    messageStr.includes('incorrect password') ||
    messageStr.includes('authentication failed')) {
    return 'Email hoặc mật khẩu không chính xác';
  }

  // Unauthorized errors
  if (messageStr.includes('unauthenticated') ||
    messageStr.includes('unauthorized') ||
    messageStr.includes('access denied')) {
    return 'Thông tin đăng nhập không hợp lệ';
  }

  // Uncategorized or generic errors - assume it's authentication issue
  if (messageStr.includes('uncategorized') ||
    messageStr.includes('authentication error') ||
    messageStr === 'error') {
    return 'Email hoặc mật khẩu không chính xác';
  }

  // Return cleaned message if no match
  return String(message)
    .replace(/^Error:\s*/i, '')
    .replace(/^Exception:\s*/i, '');
};

// Translate error code to Vietnamese
const translateErrorCode = (code) => {
  const errorCodeMap = {
    1001: 'Invalid key',
    1002: 'User already exists',
    1003: 'Email không tồn tại trong hệ thống',
    1004: 'Full name is required',
    1005: 'Password is required',
    1006: 'Mật khẩu xác nhận không khớp',
    1007: 'Confirm password is required',
    1008: 'Phone number is required',
    1009: 'Số điện thoại không hợp lệ',
    1010: 'Email is required',
    1011: 'Email không hợp lệ',
    1012: 'Email hoặc mật khẩu không chính xác',
    1110: 'Tài khoản của bạn đã bị vô hiệu hóa. Vui lòng tạo mới hoặc liên hệ số điện thoại 0901234567 để mở khóa.'
  };

  return errorCodeMap[code] || null;
};

// Login function - authenticate user and return user data
export const loginContext = async (credentials) => {
  try {
    console.log('=== LOGIN REQUEST ===');
    console.log('Credentials:', credentials);
    console.log('Full URL:', axiosInstance.defaults.baseURL + '/auth/login');

    // Backend expects { email, password } in LoginRequestDTO
    const loginPayload = {
      email: credentials.email,
      password: credentials.password
    };

    const response = await axiosInstance.post('/auth/login', loginPayload);

    console.log('=== LOGIN RESPONSE ===');
    console.log('Status:', response.status);
    console.log('Data:', response.data);
    console.log('Response structure:', JSON.stringify(response.data, null, 2));

    if (response.status === 200 && response.data) {
      // Backend returns ApiResponse with structure: { code, message, result }
      // result contains: { accessToken, refreshToken }
      const result = response.data.result || response.data;

      console.log('=== EXTRACTING TOKENS ===');
      console.log('result object:', result);
      console.log('accessToken:', result.accessToken);
      console.log('refreshToken:', result.refreshToken);

      // Store both accessToken and refreshToken in localStorage
      const accessToken = result.accessToken || result.token;
      const refreshToken = result.refreshToken || result.refresh_token;

      if (accessToken) {
        console.log('✅ Saving accessToken to localStorage:', accessToken.substring(0, 20) + '...');
        localStorage.setItem('authToken', accessToken);
        console.log('✅ Token saved successfully');

        // Decode JWT to get user info
        const decoded = decodeJWT(accessToken);
        console.log('=== DECODED JWT ===', decoded);

        const userRole = getRoleFromToken(accessToken);
        const userEmail = getEmailFromToken(accessToken);

        console.log('User role from token:', userRole);
        console.log('User email from token:', userEmail);

        // Create user object from JWT
        const userData = {
          email: userEmail,
          role: userRole,
          fullName: userEmail, // Will be updated if we fetch from backend
        };

        // Try to get full user details from backend
        try {
          const userResponse = await axiosInstance.get('/users/email/' + userEmail);
          const fullUserData = userResponse.data.result || userResponse.data;

          if (fullUserData) {
            console.log("✅ Full user details from backend:", fullUserData);
            // Merge backend data with decoded JWT data
            Object.assign(userData, {
            id: fullUserData.id,
              fullName: fullUserData.fullName,
              phoneNumber: fullUserData.phoneNumber,
              address: fullUserData.address,
              gender: fullUserData.gender,
              dob: fullUserData.dob,
              status: fullUserData.status,
              cumulativePoints: fullUserData.cumulativePoints,
              numberOfGamesPlayed: fullUserData.numberOfGamesPlayed,
              numberOfPlaysAllowed: fullUserData.numberOfPlaysAllowed
            });
          }
        } catch (userError) {
          console.log("⚠️ Could not fetch full user details:", userError);
        }

        // Save refreshToken before returning
        if (refreshToken) {
          console.log('✅ Saving refreshToken to localStorage:', refreshToken.substring(0, 20) + '...');
          localStorage.setItem('refreshToken', refreshToken);
        } else {
          console.warn('⚠️ No refreshToken found in response');
        }

        return userData;
      } else {
        console.error('❌ No accessToken found in response');
        console.error('Available keys in result:', Object.keys(result));
        throw new Error('Không nhận được token từ server');
      }
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    console.error('=== LOGIN ERROR ===');
    console.error('Full error object:', error);
    console.error('Error response:', error.response);
    console.error('Error response status:', error.response?.status);
    console.error('Error response data:', error.response?.data);
    console.error('Error response data type:', typeof error.response?.data);
    console.error('Error response data keys:', error.response?.data ? Object.keys(error.response.data) : 'no data');

    // Use the helper function to parse and translate error message
    const errorMessage = parseErrorMessage(error);

    console.error('Final error message:', errorMessage);
    throw new Error(errorMessage);
  }
};

// Logout function - clear user data and tokens
export const logoutContext = async () => {
  try {
    const token = localStorage.getItem('authToken');

    if (token) {
      // Backend expects token in Authorization header (handled by axios interceptor)
      // The backend logout endpoint is /api/auth/logout
      await axiosInstance.post('/auth/logout');
    }
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Always clear local storage even if server request fails
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }
};

// Register function - create new user
export const registerUser = async (userData) => {
  try {
    console.log('=== REGISTER REQUEST ===');
    console.log('User data:', userData);

    // Backend expects UserDTO with fields: fullName, email, phoneNumber, password, confirmPassword
    // The endpoint is /api/users/register
    const registerPayload = {
      fullName: userData.fullName,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      password: userData.password,
      confirmPassword: userData.confirmPassword
    };

    const response = await axiosInstance.post('/users/register', registerPayload);

    console.log('=== REGISTER RESPONSE ===');
    console.log('Status:', response.status);
    console.log('Data:', response.data);

    if (response.status === 200 && response.data) {
      // Backend returns ApiResponse with result field
      const result = response.data.result || response.data;
      return {
        success: true,
        data: result
      };
    } else {
      throw new Error('Registration failed');
    }
  } catch (error) {
    console.error('=== REGISTER ERROR ===');
    console.error('Error response:', error.response);
    console.error('Error data:', error.response?.data);

    // Backend returns ApiResponse with structure: { code, message, result }
    const errorData = error.response?.data;

    // Handle specific error messages from backend
    let errorMessage = 'Đăng ký thất bại';

    if (errorData) {
      if (errorData.message) {
        const backendMessage = errorData.message;

        // Translate specific error codes/messages to Vietnamese based on Backend ErrorCode
        if (backendMessage === 'USER_EXISTED' || backendMessage.includes('already exists')) {
          errorMessage = 'Email đã được đăng ký';
        } else if (backendMessage === 'PASSWORD_MISMATCH' || backendMessage.includes('do not match')) {
          errorMessage = 'Mật khẩu xác nhận không khớp';
        } else if (backendMessage === 'EMAIL_INVALID' || backendMessage.includes('Email format is invalid')) {
          errorMessage = 'Email không hợp lệ';
        } else if (backendMessage === 'EMAIL_REQUIRED' || backendMessage.includes('Email is required')) {
          errorMessage = 'Vui lòng nhập email';
        } else if (backendMessage === 'PASSWORD_REQUIRED' || backendMessage.includes('Password is required')) {
          errorMessage = 'Vui lòng nhập mật khẩu';
        } else if (backendMessage === 'CONFIRM_PASSWORD_REQUIRED' || backendMessage.includes('Confirm password is required')) {
          errorMessage = 'Vui lòng nhập xác nhận mật khẩu';
        } else if (backendMessage === 'FULLNAME_REQUIRED' || backendMessage.includes('Full name is required')) {
          errorMessage = 'Vui lòng nhập họ tên';
        } else if (backendMessage === 'PHONE_REQUIRED' || backendMessage.includes('Phone number is required')) {
          errorMessage = 'Vui lòng nhập số điện thoại';
        } else if (backendMessage === 'PHONE_INVALID' || backendMessage.includes('Phone number format is invalid')) {
          errorMessage = 'Số điện thoại không hợp lệ';
        } else {
          errorMessage = backendMessage;
        }
      }
    }

    throw new Error(errorMessage);
  }
};

// Verify token and get current user
export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('authToken');

    if (!token) {
      return null;
    }

    // Set auth header
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const response = await axiosInstance.get('/auth/me');

    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error('Failed to get user data');
    }
  } catch (error) {
    console.error('Get current user error:', error);
    // If token is invalid, clear it
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
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
// Updated: 2025-10-12T16:06:25.222Z

// Updated: 2025-10-12T16:09:04.451Z
