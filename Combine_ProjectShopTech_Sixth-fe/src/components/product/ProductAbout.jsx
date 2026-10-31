import { useEffect, useState } from "react";
import {
  AiOutlineHeart,
  AiOutlineShareAlt,
  AiOutlineMessage,
} from "react-icons/ai";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
//import dispatch từ redux
import { useDispatch } from "react-redux";
import {
  FaHeadset,
  FaUserCircle,
  FaPercentage,
  FaShoppingCart,
} from "react-icons/fa";
import zip from "../../assets/images/ProductDetail/zip.png";
import { FaPaypal } from "react-icons/fa";

// Import các dịch vụ và hooks cần thiết
import { getProductByIdWithDetails } from "../../services/MockProductService";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { addToCart } from "../../utils/redux/cartSlice.jsx";
import { getReviewsByProduct, createReview } from "../../apis/reviewProductApi.jsx";
import { getUserById } from "../../apis/userApis.jsx";
import Loading from "../Loading";
import { toast } from "react-toastify";
import logo from "../../assets/logo-text.png";
import notify from "../../utils/notify.js";
import { useFavorites } from "../../hooks/useFavorites";
// Component cải thiện cho Bộ chọn số lượng - Đơn giản và UX tốt hơn
const QuantitySelector = ({ quantity, setQuantity }) => {
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(q => q + 1);
  };

    const handleInputChange = e => {
    const val = e.target.value;
    if (val === "") {
      setQuantity(1);
      return;
    }
    const numVal = parseInt(val);
    if (!isNaN(numVal) && numVal >= 1) {
      setQuantity(numVal);
    }
  };

  return (
    <div className="inline-flex items-center border border-gray-300 rounded-md bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Decrease Button */}
      <button
        type="button"
        onClick={handleDecrease}
        disabled={quantity <= 1}
        className="px-4 py-2.5 text-gray-700 hover:bg-gray-50 active:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium text-lg leading-none border-r border-gray-300"
        aria-label="Giảm số lượng"
      >
        −
      </button>
      
      {/* Quantity Input */}
      <input
        id="quantity-selector"
        type="number"
        value={quantity}
        onChange={handleInputChange}
        min="1"
        className="w-16 text-center text-gray-900 font-medium py-2.5 px-2 border-0 focus:ring-0 focus:outline-none bg-transparent text-base"
        aria-label="Số lượng"
      />
      
      {/* Increase Button */}
      <button
        type="button"
        onClick={handleIncrease}
        className="px-4 py-2.5 text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors font-medium text-lg leading-none border-l border-gray-300"
        aria-label="Tăng số lượng"
      >
        +
      </button>
    </div>
  );
};
//define dispatch

export default function ProductDetail() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // Thêm state cho số lượng
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [validationError, setValidationError] = useState("");
  const {
    isFavorited,
    loading: favoriteLoading,
    handleToggleFavorite,
  } = useFavorites(id);

// 🟡 Lấy review khi có productId
useEffect(() => {
  async function fetchReviews() {
    if (!id) return;

    const res = await getReviewsByProduct(id);
    if (res.EC === 1 && Array.isArray(res.DT)) {
      // Gọi API lấy thông tin user cho từng review
      const reviewsWithNames = await Promise.all(
        res.DT.map(async (review) => {
          if (review.userId) {
          const userRes = await getUserById(review.userId);
if (userRes.EC === 1 && userRes.DT) {
  const user = userRes.DT;
  return {
    ...review,
    reviewerName:
      user.fullName ||
      user.name ||
      user.username ||
      user.userName ||
      user.tenNguoiDung ||
      "Người dùng",
  };
}

          }
          return { ...review, reviewerName: "Người dùng ẩn danh" };
        })
      );

      setReviews(reviewsWithNames);

      // Tính trung bình rating
      if (reviewsWithNames.length > 0) {
        const avg =
          reviewsWithNames.reduce((sum, r) => sum + (r.rating || 0), 0) /
          reviewsWithNames.length;
        setAverageRating(avg);
      }
    }
  }

  fetchReviews();
}, [id]);
const handleFavoriteClick = async e => {
  // Kiểm tra đăng nhập
  e.stopPropagation();
  const user = getCurrentUser();
  if (!user) {
    // Chuyển đến trang login nếu chưa đăng nhập

    notify.error("Vui lòng đăng nhập để thêm yêu thích");
    return;
  }

  try {
    await handleToggleFavorite();

    // Hiển thị thông báo
    // const message = isFavorited
    //   ? "Đã xóa khỏi danh sách yêu thích"
    //   : "Đã thêm vào danh sách yêu thích";
    // toast(message, { type: isFavorited ? "info" : "success" });
    if (isFavorited) {
      notify.success("Đã xóa khỏi yêu thích");
    } else {
      notify.success("Đã thêm vào yêu thích");
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    notify.error("Lỗi khi thêm/xóa yêu thích");
  }
};
// Helper function to get current user
const getCurrentUser = () => {
  try {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) return null;
    return JSON.parse(savedUser);
  } catch (e) {
    console.error("Lỗi khi đọc user từ localStorage:", e);
    return null;
  }
};

// Handle submit review
const handleSubmitReview = async () => {
  const user = getCurrentUser();
  if (!user) {
    toast.error("Bạn cần đăng nhập để đánh giá!");
    return;
  }

  if (newRating === 0 || newComment.trim() === "") {
    toast.warning("Vui lòng chọn số sao và nhập nội dung đánh giá!");
    return;
  }

  try {
    const reviewData = {
      rating: newRating,
      comment: newComment,
      productId: id,
      userId: user.id || user.customerID,
    };

    const res = await createReview(reviewData);

    // Kiểm tra nếu bình luận bị vi phạm
    if (res?.violate === true) {
      const errorMsg = `Vui lòng bình luận văn minh hơn. ${res.violationReason || "Nội dung không phù hợp"}`;
      setValidationError(errorMsg);
      toast.warning(errorMsg, {
        autoClose: 4000,
        icon: "⚠️"
      });
      return;
    }

    // ✅ Nếu không vi phạm và có ID -> thành công
    if (res?.id) {
      const newReview = {
        ...res,
        reviewerName: user.fullName || "Bạn",
      };

      setReviews((prev) => [...prev, newReview]);

      const allReviews = [...reviews, newReview];
      const avg =
        allReviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
        allReviews.length;
      setAverageRating(avg);

      setNewRating(5);
      setNewComment("");
      setValidationError(""); // Clear error on success
      toast.success("Cảm ơn bạn đã đánh giá!");
    } else {
      toast.error("Không thể gửi đánh giá, vui lòng thử lại!");
    }
  } catch (err) {
    console.error("Lỗi khi gửi review:", err.response || err);
    toast.error("Có lỗi xảy ra khi gửi đánh giá!");
  }
};

  const handleAddToCart = () => {
    // Lấy userId từ localStorage
    const getCurrentUserId = () => {
      try {
        const savedUser = localStorage.getItem("user");
        if (!savedUser) return null;
        const parsed = JSON.parse(savedUser);
        return parsed?.customerID ?? parsed?.id ?? parsed?.customerId ?? null;
      } catch (e) {
        console.error("Lỗi khi đọc user từ localStorage:", e);
        return null;
      }
    };

    const userId = getCurrentUserId();

    console.log("Adding to cart:", { userId, productId: product.productID, quantity });

    // Sử dụng addToCart với signature mới
      try {
      dispatch(
        addToCart({
          userId: userId,
          productId: product.productID,
          quantity: quantity,
          productData: {
            id: product.productID,
            name: product.productName,
            unitPrice: product.price || 0,
            imageUrl: product.image || "",
          },
        })
      );
    } catch (err) {
      console.error("Lỗi khi thêm vào giỏ hàng:", err);
    }
  };
  // Hàm mock để format tiền tệ (giả định dùng VND)
  const formatCurrency = value => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  //  Lấy sản phẩm từ Mock Data (Logic giữ nguyên)
  async function fetchProduct(id) {
    try {
      setLoading(true);
      const res = await getProductByIdWithDetails(id);
      if (res && res.DT && res.DT.length > 0) {
        // Giả định giá là một số (hoặc bạn sẽ cần parse nó)
        setProduct(res.DT[0]);
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen py-20">
        <Loading fullScreen={false} size="lg" text="Đang tải thông tin sản phẩm..." className="py-20" />
      </div>
    );
  }

  if (!product || Object.keys(product).length === 0) {
    return (
      <div className="container mx-auto p-8 text-center text-xl text-gray-500">
        {t("product.loading_or_not_found")}
      </div>
    );
  }

  // Sử dụng unitPrice trực tiếp từ API thay vì parse từ string
  const price = product.unitPrice || 0;
  const originalPrice = price * 1.25; // Giả định giá gốc cao hơn 25%

  return (
    <div className="bg-transparent">
      {/* Breadcrumb & Social Icons */}
      <div className="flex justify-between items-center text-sm mb-6">
        <div className="text-gray-600">
          <span className="hover:text-purple-600 transition cursor-pointer">
            {t("product.home")} / {product.categoryName} /{" "}
          </span>
          <span className="text-gray-400">{product.seriesName}</span>
        </div>
        <div className="flex space-x-3">
        <button
            onClick={handleFavoriteClick}
            disabled={favoriteLoading}
            className={`transition-all duration-300 transform hover:scale-110 ${
              favoriteLoading
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            } ${
              isFavorited
                ? "text-red-500 hover:text-red-600"
                : "text-gray-500 hover:text-red-500"
            }`}
          >
            {favoriteLoading ? (
              <div className="w-5 h-5 animate-spin">
                <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
            ) : isFavorited ? (
              <AiFillHeart className="w-5 h-5" />
            ) : (
              <AiOutlineHeart className="w-5 h-5" />
            )}
          </button>
          <button
            title="Chia sẻ"
            className="text-gray-500 hover:text-blue-500 transition p-2 hover:bg-gray-100 rounded-full"
          >
            <AiOutlineShareAlt className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Product Layout - Cleaner Design */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white p-6 rounded-lg border border-gray-100">
          {/* Column 1: Product Image & Gallery */}
          <div className="col-span-1 lg:col-span-1">
            <div className="relative rounded-lg p-6 bg-gray-50 border border-gray-200 hover:border-gray-300 transition">
              <img
                src={product.image}
                alt={product.productName}
                className="w-full h-auto object-contain rounded-lg max-h-96 mx-auto"
              />
            </div>
            {/* Gallery Thumbnails */}
            <div className="flex space-x-2 mt-4 overflow-x-auto justify-center">
              <div className="w-16 h-16 border-2 border-purple-500 rounded-lg cursor-pointer bg-gray-100 hover:border-purple-600 transition"></div>
              <div className="w-16 h-16 border border-gray-300 rounded-lg cursor-pointer bg-gray-200 hover:border-purple-400 transition"></div>
              <div className="w-16 h-16 border border-gray-300 rounded-lg cursor-pointer bg-gray-200 hover:border-purple-400 transition"></div>
            </div>
          </div>

          {/* Column 2: Product Details & Options */}
          <div className="col-span-1 lg:col-span-1 border-r border-gray-100 pr-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              {product.productName}
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              SKU: {product.productID || "N/A"} | {t("product.in_stock")}
            </p>

            {/* Price Section - Simplified */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-baseline space-x-3 mb-2">
                <p className="text-gray-400 line-through text-base">
                  {formatCurrency(originalPrice)}
                </p>
                <p className="text-3xl lg:text-4xl font-bold text-red-600">
                  {formatCurrency(price)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-red-50 text-red-600 text-xs font-semibold px-2.5 py-1 rounded-full border border-red-200">
                  -25%
                </span>
                <p className="text-sm text-green-600 font-medium">
                  Khuyến mãi đặc biệt
                </p>
              </div>
            </div>

            {/* Options Selector */}
            <div className="space-y-5 mb-6">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Màu sắc:{" "}
                  <span className="font-normal text-purple-600">Xanh dương</span>
                </p>
                <div className="flex space-x-3">
                  <div
                    className="w-10 h-10 rounded-full bg-blue-900 border-2 border-purple-500 cursor-pointer ring-2 ring-purple-200 shadow-sm"
                    title="Blue"
                  ></div>
                  <div
                    className="w-10 h-10 rounded-full bg-red-600 border-2 border-gray-300 hover:border-purple-400 cursor-pointer transition"
                    title="Red"
                  ></div>
                  <div
                    className="w-10 h-10 rounded-full bg-gray-700 border-2 border-gray-300 hover:border-purple-400 cursor-pointer transition"
                    title="Gray"
                  ></div>
                </div>
              </div>
            </div>

            {/* Product Description - Cleaner */}
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-3">
                Thông tin sản phẩm
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-gray-700 leading-relaxed text-sm">
                  {product.description || "Laptop cao cấp với hiệu năng mạnh mẽ, thiết kế sang trọng và công nghệ tiên tiến nhất."}
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: Buy Box & Service/Payment Info */}
          <div className="col-span-1 lg:col-span-1 space-y-5">
            {/* Quantity and Action Buttons - Simplified */}
            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <div className="flex items-center justify-between mb-5">
                <label htmlFor="quantity-selector" className="text-gray-700 font-medium text-sm cursor-pointer">
                  Số lượng:
                </label>
                <QuantitySelector
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
              </div>

              <button
                className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white text-base font-semibold py-3 rounded-lg hover:bg-purple-700 transition-all duration-200 shadow-sm hover:shadow-md mb-3"
                onClick={() => handleAddToCart(product, quantity)}
              >
                <FaShoppingCart className="w-5 h-5" />
                <span>Thêm vào giỏ hàng</span>
              </button>
              
              <button className="w-full flex items-center justify-center space-x-2 bg-yellow-400 text-gray-900 text-base font-semibold py-3 rounded-lg hover:bg-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md">
                <FaPaypal className="w-5 h-5" />
                <span>Thanh toán PayPal</span>
              </button>
            </div>

            {/* Service & Support - Cleaner */}
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaHeadset className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Hỗ trợ miễn phí</p>
                    <p className="text-xs text-gray-600">Dịch vụ 24/7</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaPercentage className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Đảm bảo giá tốt nhất</p>
                    <p className="text-xs text-gray-600">Giá thấp nhất online</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Zip Payment */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <img
                src={zip}
                alt={t("product.zip_payment_option")}
                className="h-5"
              />
              <p className="text-xs text-gray-600 text-right">
                {t("product.own_it_now")}{" "}
                <a
                  href="#"
                  className="text-purple-600 font-medium hover:underline"
                >
                  {t("product.learn_more")}
                </a>
              </p>
            </div>
          </div>
        </div>
        {/* Product Reviews Section - Simplified */}
        <div className="mt-8 bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Đánh giá</h2>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-yellow-500">{averageRating?.toFixed(1) ?? "0.0"}</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={`text-sm ${star <= Math.round(averageRating) ? "text-yellow-400" : "text-gray-300"}`}>★</span>
                ))}
              </div>
              <span className="text-sm text-gray-500">({reviews.length})</span>
            </div>
          </div>

          {/* Danh sách review - Minimal */}
          <div className="space-y-4 mb-6">
            {reviews.slice(0, showAll ? reviews.length : 3).map((review) => (
              <div key={review.id || review.reviewId} className="pb-4 border-b last:border-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-purple-600 font-semibold text-sm">
                        {(review.reviewerName || "A")[0].toUpperCase()}
                      </span>
                    </div>
                    <span className="font-medium text-gray-700 text-sm">{review.reviewerName || "Ẩn danh"}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className={`text-xs ${star <= review.rating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString("vi-VN")}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                {/* Reply section - Hiển thị reply nếu có */}
                {review.reply && (
                  <div className="mt-3 ml-8 pl-4 border-l-2 border-purple-200 bg-purple-50 rounded-r-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <img
                        src={logo}
                        alt="Shop Solid Phere"
                        className="w-6 h-6 rounded object-contain"
                      />
                      <span className="font-semibold text-purple-700 text-sm">Shop Solid Phere</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{review.reply}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Form Viết Đánh Giá - Simplified */}
          {getCurrentUser() ? (
            <div className="pt-6 border-t">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">Đánh giá của bạn</span>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className={`text-xl transition-colors ${
                        star <= newRating ? "text-yellow-400 hover:text-yellow-500" : "text-gray-300 hover:text-gray-400"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                className={`w-full p-3 border rounded-lg text-sm focus:ring-1 outline-none transition-all ${
                  validationError 
                    ? 'border-red-300 focus:border-red-400 focus:ring-red-200' 
                    : 'border-gray-200 focus:border-purple-400 focus:ring-purple-200'
                }`}
                rows="3"
                placeholder="Chia sẻ trải nghiệm của bạn..."
                value={newComment}
                onChange={(e) => {
                  setNewComment(e.target.value);
                  if (validationError) setValidationError("");
                }}
              />
              
              {validationError && (
                <div className="mt-2 flex items-center space-x-2 text-xs text-red-600 bg-red-50 rounded px-3 py-2">
                  <span>⚠️</span>
                  <p>{validationError}</p>
                </div>
              )}
              
              {!validationError && (
                <p className="mt-2 text-xs text-gray-400">Viết đánh giá văn minh, mang tính xây dựng</p>
              )}

              <button
                onClick={handleSubmitReview}
                className="mt-3 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
              >
                Gửi
              </button>
            </div>
          ) : (
            <div className="pt-6 border-t text-center">
              <p className="text-sm text-gray-500">
                <a href="/login" className="text-purple-600 font-medium hover:underline">Đăng nhập</a> để viết đánh giá
              </p>
            </div>
          )}

          {reviews.length > 3 && (
            <button
              className="w-full py-2 text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center justify-center space-x-1 transition-colors"
              onClick={() => setShowAll(!showAll)}
            >
              <span>{showAll ? "Ẩn bớt" : `Xem thêm (${reviews.length - 3})`}</span>
              {showAll ? <BiChevronUp /> : <BiChevronDown />}
            </button>
          )}
        </div>
      </div>
  );
}