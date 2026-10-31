import axiosInstance from "../custom/axios";

// Get all favorites for a user
export const getFavoritesByUser = async (userId) => {
  try {
    const response = await axiosInstance.get(`/favorites/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error;
  }
};

// Add product to favorites
export const addFavorite = async (userId, productId) => {
  try {
    const response = await axiosInstance.post("/favorites/add", null, {
      params: { userId, productId }
    });
    return response.data;
  } catch (error) {
    console.error("Error adding favorite:", error);
    throw error;
  }
};

// Remove product from favorites
export const removeFavorite = async (userId, productId) => {
  try {
    await axiosInstance.delete("/favorites/remove", {
      params: { userId, productId }
    });
  } catch (error) {
    console.error("Error removing favorite:", error);
    throw error;
  }
};

// Check if product is favorited by user
export const checkIsFavorited = async (userId, productId) => {
  try {
    const response = await axiosInstance.get("/favorites/check", {
      params: { userId, productId }
    });
    return response.data;
  } catch (error) {
    console.error("Error checking favorite status:", error);
    return false;
  }
};

// Get count of favorites by user
export const countFavoritesByUser = async (userId) => {
  try {
    const response = await axiosInstance.get(`/favorites/user/${userId}/count`);
    return response.data;
  } catch (error) {
    console.error("Error counting favorites:", error);
    return 0;
  }
};

export default {
  getFavoritesByUser,
  addFavorite,
  removeFavorite,
  checkIsFavorited,
  countFavoritesByUser
};

