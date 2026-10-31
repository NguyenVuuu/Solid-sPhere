import axiosInstance from "../custom/axios";

/**
 * FavoriteServices
 * 
 * Service để xử lý các chức năng yêu thích sản phẩm
 * Tương tác với backend API /api/favorites
 */

// Thêm sản phẩm vào danh sách yêu thích
export const addToFavorites = async (userId, productId) => {
  try {
    const response = await axiosInstance.post('/favorites/add', null, {
      params: { userId, productId }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    throw new Error(error.response?.data?.message || 'Không thể thêm vào yêu thích');
  }
};

// Xóa sản phẩm khỏi danh sách yêu thích
export const removeFromFavorites = async (userId, productId) => {
  try {
    await axiosInstance.delete('/favorites/remove', {
      params: { userId, productId }
    });
  } catch (error) {
    console.error('Error removing from favorites:', error);
    throw new Error(error.response?.data?.message || 'Không thể xóa khỏi yêu thích');
  }
};

// Xóa yêu thích theo ID
export const removeFavoriteById = async (favoriteId) => {
  try {
    await axiosInstance.delete(`/favorites/${favoriteId}`);
  } catch (error) {
    console.error('Error removing favorite by ID:', error);
    throw new Error(error.response?.data?.message || 'Không thể xóa yêu thích');
  }
};

// Lấy danh sách sản phẩm yêu thích của user
export const getUserFavorites = async (userId) => {
  try {
    console.log('=== getUserFavorites API Call ===');
    console.log('userId:', userId);
    console.log('Full URL:', axiosInstance.defaults.baseURL + `/favorites/user/${userId}`);
    
    const response = await axiosInstance.get(`/favorites/user/${userId}`);
    
    console.log('API Response status:', response.status);
    console.log('API Response data:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('Error getting user favorites:', error);
    console.error('Error response:', error.response?.data);
    console.error('Error status:', error.response?.status);
    throw new Error(error.response?.data?.message || 'Không thể lấy danh sách yêu thích');
  }
};

// Lấy danh sách sản phẩm yêu thích với phân trang
export const getUserFavoritesWithPagination = async (userId, page = 0, size = 10) => {
  try {
    const response = await axiosInstance.get(`/favorites/user/${userId}/page`, {
      params: { page, size }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting user favorites with pagination:', error);
    throw new Error(error.response?.data?.message || 'Không thể lấy danh sách yêu thích');
  }
};

// Kiểm tra sản phẩm có được yêu thích bởi user không
export const isProductFavorited = async (userId, productId) => {
  try {
    const response = await axiosInstance.get('/favorites/check', {
      params: { userId, productId }
    });
    return response.data;
  } catch (error) {
    console.error('Error checking if product is favorited:', error);
    return false;
  }
};

// Đếm số lượng sản phẩm yêu thích của user
export const countUserFavorites = async (userId) => {
  try {
    console.log('=== countUserFavorites API Call ===');
    console.log('userId:', userId);
    
    const response = await axiosInstance.get(`/favorites/user/${userId}/count`);
    
    console.log('Count API Response:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('Error counting user favorites:', error);
    console.error('Count error response:', error.response?.data);
    return 0;
  }
};

// Lấy danh sách yêu thích gần đây của user
export const getRecentUserFavorites = async (userId, limit = 5) => {
  try {
    const response = await axiosInstance.get(`/favorites/user/${userId}/recent`, {
      params: { limit }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting recent user favorites:', error);
    throw new Error(error.response?.data?.message || 'Không thể lấy danh sách yêu thích gần đây');
  }
};

// Lấy danh sách sản phẩm được yêu thích nhiều nhất
export const getMostFavoritedProducts = async (limit = 10) => {
  try {
    const response = await axiosInstance.get('/favorites/most-favorited', {
      params: { limit }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting most favorited products:', error);
    throw new Error(error.response?.data?.message || 'Không thể lấy danh sách sản phẩm được yêu thích nhiều nhất');
  }
};

// Toggle trạng thái yêu thích (thêm nếu chưa có, xóa nếu đã có)
export const toggleFavorite = async (userId, productId) => {
  try {
    const isFavorited = await isProductFavorited(userId, productId);
    
    if (isFavorited) {
      await removeFromFavorites(userId, productId);
      return false; // Đã xóa khỏi yêu thích
    } else {
      await addToFavorites(userId, productId);
      return true; // Đã thêm vào yêu thích
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    throw error;
  }
};