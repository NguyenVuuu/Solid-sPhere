import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ShoppingCart } from "lucide-react";
import { addToCart } from "../../../utils/redux/cartSlice";
import { useDispatch } from "react-redux";
export default function ProductCard({ product }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id || product.productID}/productAbout`);
  };
  const handleAddToCart = e => {
    e.stopPropagation();
    
    // Debug log để kiểm tra dữ liệu sản phẩm
    console.log("Product data:", product);
    
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
    
    dispatch(
      addToCart({
        userId: userId,
        productId: product.id || product.productID,
        quantity: 1,
        productData: {
          id: product.id || product.productID,
          name: product.name || product.productName,
          unitPrice: parseFloat(String(product.unitPrice || product.price || 0).replace(/[^\d.-]/g, '')) || 0,
          imageUrl: product.imageUrl || product.image || ''
        }
      })
    );
    
    // Thêm toast notification
    import('react-toastify').then(({ toast }) => {
      toast.success("Đã thêm sản phẩm vào giỏ hàng!");
    });
  };
  return (
    <div
      className="border-none rounded-none p-4 hover:shadow-lg transition cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-contain mb-2"
      />
      {product.availability === "In Stock" && (
        <p className="text-green-600 text-sm">{t("product.in_stock")}</p>
      )}

      <div className="flex items-center text-yellow-500 text-sm mb-1">
        {"★".repeat(product?.rating)}
        {"☆".repeat(5 - product?.rating)}
        <span className="ml-2 text-gray-600">Reviews ({product?.reviews})</span>
      </div>

      <p className="text-sm font-semibold text-gray-700 mb-1">
        {product.name.length > 60
          ? product.name.slice(0, 60) + "..."
          : product.name}
      </p>

      <div className="mt-1">
        {product?.oldPrice && product?.oldPrice !== product?.price && (
          <span className="line-through text-gray-400 text-sm mr-2">
            {parseInt(product?.oldPrice).toLocaleString("vi-VN")}₫
          </span>
        )}
        <span className="text-lg font-bold text-black">
          {parseInt(product?.unitPrice).toLocaleString("vi-VN")}₫
        </span>
      </div>
      {/*them button add to cart*/}
      <button
        onClick={handleAddToCart}
        className="w-full flex items-center justify-center gap-2 py-2 rounded-lg 
          bg-indigo-600 text-white font-semibold text-sm
          hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 mt-4"
      >
        <ShoppingCart className="w-4 h-4" />
        {t("product.add_to_cart")}
      </button>
    </div>
  );
}
