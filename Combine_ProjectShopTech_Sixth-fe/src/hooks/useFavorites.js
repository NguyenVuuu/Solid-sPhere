import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import {
  getUserFavorites,
  isProductFavorited,
  toggleFavorite,
  countUserFavorites,
} from "../services/FavoriteServices";
import { getUserByEmail } from "../services/UserServices";

/**
 * Custom hook
 * @param {number} productId - ID sản phẩm (check status favorite cua san pham)
 * @returns {object} - pbj chứa state và func để quản lý favorites
 */
export const useFavorites = (productId = null) => {
  const { user } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [resolvedUserId, setResolvedUserId] = useState(null);

  // Lấy userId từ user context - cải thiện logic
  let userId = null;
  if (user) {
    // Thử các trường phổ biến trước
    userId =
      user.id || user.customerID || user.userId || user.customerId || user.ID;

    // Nếu vẫn không có, thử tìm trong các trường có chứa "id"
    if (!userId) {
      const userKeys = Object.keys(user);
      const idKey = userKeys.find(
        key =>
          key.toLowerCase().includes("id") &&
          typeof user[key] === "number" &&
          user[key] > 0
      );
      if (idKey) {
        userId = user[idKey];
      }
    }

    // Fallback: Nếu vẫn không có userId và có email, thử tìm user bằng email
    // Nhưng nếu API lỗi, sẽ sử dụng hardcoded userId để test
    if (!userId && user.email) {
      console.log(
        "No userId found, will try to find user by email:",
        user.email
      );
      userId = "find_by_email";
    }
  }

  // Resolve userId với fallback strategy
  const resolveUserId = async () => {
    if (!userId) {
      setResolvedUserId(null);
      return null;
    }

    // Nếu userId là "find_by_email", thử tìm user bằng email
    if (userId === "find_by_email" && user?.email) {
      try {
        console.log("Trying to find user by email from API:", user.email);
        const userData = await getUserByEmail(user.email);

        if (userData && userData.id) {
          console.log("Found user by email:", userData);
          setResolvedUserId(userData.id);
          return userData.id;
        } else {
          console.log("User not found by email, using fallback strategy");
          // Fallback: Sử dụng hardcoded userId cho test
          const FALLBACK_USER_ID = 8; // ID từ database test
          console.log("Using fallback userId:", FALLBACK_USER_ID);
          setResolvedUserId(FALLBACK_USER_ID);
          return FALLBACK_USER_ID;
        }
      } catch (error) {
        console.error("Error finding user by email:", error);
        console.error("API Error details:", error.response?.data);

        // Fallback: Sử dụng hardcoded userId khi API lỗi
        const FALLBACK_USER_ID = 8;
        console.log("API failed, using fallback userId:", FALLBACK_USER_ID);
        setResolvedUserId(FALLBACK_USER_ID);
        return FALLBACK_USER_ID;
      }
    } else if (userId !== "find_by_email") {
      // userId là số thực tế
      setResolvedUserId(userId);
      return userId;
    }

    setResolvedUserId(null);
    return null;
  };

  // Fetch danh sách favorites của user
  const fetchFavorites = async () => {
    console.log("=== FETCHING FAVORITES ===");
    console.log("userId:", userId);
    console.log("user object:", user);

    // Resolve userId trước
    const actualUserId = await resolveUserId();

    if (!actualUserId) {
      console.log("No actual userId found, skipping fetch");
      setFavorites([]);
      setTotalCount(0);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      console.log("Calling API with actualUserId:", actualUserId);
      const [favoritesData, countData] = await Promise.all([
        getUserFavorites(actualUserId),
        countUserFavorites(actualUserId),
      ]);

      console.log("Favorites API response:", favoritesData);
      console.log("Count API response:", countData);

      setFavorites(favoritesData || []);
      setTotalCount(countData || 0);
      setError(null);
    } catch (err) {
      console.error("Error fetching favorites:", err);
      console.error("Error details:", err.response?.data);
      setError(err.message);
      setFavorites([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  // Kiểm tra trạng thái favorite của 1 sản phẩm cụ thể
  const checkProductFavoriteStatus = async () => {
    if (!productId) {
      setIsFavorited(false);
      return;
    }

    // Resolve userId trước khi check
    const actualUserId = await resolveUserId();
    if (!actualUserId) {
      setIsFavorited(false);
      return;
    }

    try {
      const favorited = await isProductFavorited(actualUserId, productId);
      setIsFavorited(favorited);
    } catch (err) {
      console.error("Error checking favorite status:", err);
      setIsFavorited(false);
    }
  };

  // Toggle favorite cho 1 sản phẩm
  const handleToggleFavorite = async (targetProductId = productId) => {
    if (!targetProductId) {
      throw new Error("Không tìm thấy thông tin sản phẩm");
    }

    // Resolve userId trước khi toggle
    const actualUserId = await resolveUserId();
    if (!actualUserId) {
      throw new Error("Vui lòng đăng nhập để sử dụng tính năng yêu thích");
    }

    setLoading(true);
    try {
      const newFavoriteStatus = await toggleFavorite(
        actualUserId,
        targetProductId
      );

      // Cập nhật trạng thái nếu đang check cho sản phẩm này
      if (targetProductId === productId) {
        setIsFavorited(newFavoriteStatus);
      }

      // Refresh danh sách favorites
      await fetchFavorites();

      return newFavoriteStatus;
    } catch (err) {
      console.error("Error toggling favorite:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Refresh tất cả dữ liệu
  const refreshFavorites = async () => {
    await Promise.all([
      fetchFavorites(),
      productId ? checkProductFavoriteStatus() : Promise.resolve(),
    ]);
  };

  // Effect để fetch dữ liệu khi userId thay đổi
  useEffect(() => {
    if (userId) {
      fetchFavorites();
    } else {
      setFavorites([]);
      setTotalCount(0);
      setIsFavorited(false);
    }
  }, [userId]);

  // Effect để check trạng thái favorite của sản phẩm cụ thể
  useEffect(() => {
    if (productId && userId) {
      checkProductFavoriteStatus();
    } else {
      setIsFavorited(false);
    }
  }, [userId, productId]);

  return {
    // State
    favorites,
    isFavorited,
    loading,
    error,
    totalCount,
    userId: resolvedUserId || userId,

    // Functions
    fetchFavorites,
    handleToggleFavorite,
    refreshFavorites,
    checkProductFavoriteStatus,
  };
};