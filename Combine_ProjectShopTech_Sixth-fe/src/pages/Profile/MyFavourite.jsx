import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../context/UserContext";
import { getUserFavorites, removeFromFavorites } from "../../apis/userApi";
import { addToCart } from "../../utils/redux/cartSlice";
import notify from "../../utils/notify";

function MyFavourite() {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper: lấy userId từ localStorage
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

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        // Call API to get user favorites
        const response = await getUserFavorites(user?.id);
        setFavorites(response || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching favorites:", err);
        setError("Failed to load favorites");
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchFavorites();
    }
  }, [user?.id]);

  const handleRemoveFavorite = async favoriteId => {
    try {
      await removeFromFavorites(favoriteId);
      setFavorites(favorites.filter(fav => fav.id !== favoriteId));
    } catch (err) {
      console.error("Error removing favorite:", err);
      alert("Failed to remove favorite");
    }
  };

  const handleViewProduct = productId => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = async (productId, product) => {
    const userId = getCurrentUserId();

    try {
      await dispatch(
        addToCart({
          userId,
          productId: productId,
          quantity: 1,
          productData: {
            id: productId,
            name: product.productName,
            unitPrice: product.productPrice || 0,
            imageUrl: product.productImageUrl || "",
          },
        })
      ).unwrap();

      notify.success("Đã thêm sản phẩm vào giỏ hàng!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      notify.error("Lỗi khi thêm sản phẩm vào giỏ hàng!");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
        {error}
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
        <p className="text-2xl font-light text-gray-900 mb-2">
          No Favourites Yet
        </p>
        <p className="text-gray-600">
          You haven't added any favorite products yet. Start exploring!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-light text-gray-900">
          My Favourite Products
        </h2>
        <p className="text-gray-600 mt-2">Your collection of favourite items</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map(product => (
          <div
            key={product.id}
            className="group bg-white border border-gray-200 rounded-xl overflow-visible hover:shadow-xl hover:border-gray-300 transition-all duration-300 flex flex-col w-full"
          >
            {/* Product Image Container */}
            <div className="relative h-52 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
              {product.productImageUrl ? (
                <img
                  src={product.productImageUrl}
                  alt={product.productName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      className="w-12 h-12 text-gray-300 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-gray-400 text-sm">No image</p>
                  </div>
                </div>
              )}

              {/* Remove Button */}
              <button
                onClick={() => handleRemoveFavorite(product.id)}
                className="absolute top-3 right-3 p-2.5 bg-white/90 hover:bg-red-500 text-gray-700 hover:text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 opacity-0 group-hover:opacity-100"
                title="Remove from favorites"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Category Badge */}
              {product.productCategoryName && (
                <div className="absolute top-3 left-3">
                  <span className="inline-block px-3 py-1 bg-gray-900 text-white text-xs font-semibold rounded-full">
                    {product.productCategoryName}
                  </span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-5 flex flex-col flex-1 w-full">
              {/* Product Name */}
              <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 text-lg">
                {product.productName}
              </h3>

              {/* Product Description */}
              {product.productDescription && (
                <p className="text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed">
                  {product.productDescription}
                </p>
              )}

              {/* Price & Date */}
              <div className="flex items-start justify-between gap-2 mb-3 py-2 border-b border-gray-100">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                    Price
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    $
                    {parseFloat(product.productPrice || 0).toLocaleString(
                      "en-US",
                      { minimumFractionDigits: 0, maximumFractionDigits: 0 }
                    )}
                  </p>
                </div>
                {product.addedAt && (
                  <div className="text-right whitespace-nowrap">
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                      Added
                    </p>
                    <p className="text-xs font-medium text-gray-700">
                      {new Date(product.addedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 mt-auto">
                <button
                  onClick={() => handleAddToCart(product.productId, product)}
                  className="w-full px-4 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 active:scale-95 transition-all duration-200 text-sm"
                  title="Add to cart"
                >
                  Add to Cart
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewProduct(product.productId)}
                    className="flex-1 px-4 py-2.5 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 active:scale-95 transition-all duration-200 text-sm"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleRemoveFavorite(product.id)}
                    className="flex-1 px-4 py-2.5 border-2 border-gray-200 text-gray-900 font-semibold rounded-lg hover:border-red-300 hover:bg-red-50 active:scale-95 transition-all duration-200 text-sm"
                    title="Remove from favorites"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyFavourite;