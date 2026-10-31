import { useDispatch } from "react-redux";
import { addToCart } from "../../../utils/redux/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ShoppingCart } from "lucide-react"; // Import ShoppingCart icon

export default function ProductCardList({ product }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleAddToCart = () => {
    const userId = getCurrentUserId();

    // Debug log để kiểm tra dữ liệu sản phẩm
    console.log("Product data (List):", product);

    // Đồng bộ cách lấy dữ liệu sản phẩm với ProductCard
    dispatch(addToCart({
      userId: userId,
      productId: product.id || product.productID,
      quantity: 1,
      productData: {
        id: product.id || product.productID,
        name: product.name || product.productName,
        // Sử dụng unitPrice, price hoặc 0 và xử lý chuỗi như ProductCard
        unitPrice: parseFloat(String(product.unitPrice || product.price || 0).replace(/[^\d.-]/g, '')) || 0,
        imageUrl: product.imageUrl || product.image || '' // Sử dụng imageUrl hoặc image
      }
    }));
    
    toast.success("Đã thêm sản phẩm vào giỏ hàng!");
  };

  const handleClick = () => {
    // Đồng bộ cách lấy ID sản phẩm
    navigate(`/product/${product.id || product.productID}/productAbout`);
  };

  return (
    <div
      className="border-none rounded-lg p-4 shadow-sm hover:shadow-lg transition bg-white flex gap-4 cursor-pointer"
      onClick={handleClick}
    >
      {/* Hình ảnh */}
      <div className="w-1/4 flex-shrink-0">
        <img
          src={product.imageUrl || product.image} // Đồng bộ cách lấy ảnh
          alt={product.name || product.productName}
          className="w-full h-auto object-contain max-h-40" // Giảm kích thước ảnh
        />
      </div>
      {/* Thông tin chi tiết */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Tên */}
        <div>
       
          <h2 className="font-semibold text-base text-gray-800 mb-2">
            {product.name || product.productName}
          </h2>
        </div>

        {/* Giá */}
        <div className="mb-2">
          {product?.oldPrice && (product?.oldPrice !== (product?.unitPrice || product?.price)) && (
            <span className="line-through text-sm text-gray-400 mr-2">
              {parseInt(product?.oldPrice).toLocaleString("vi-VN")}₫
            </span>
          )}
          <span className="text-lg font-bold text-black">
            {parseInt(product?.unitPrice || product?.price).toLocaleString("vi-VN")}₫
          </span>
        </div>

        {/* Đánh giá + trạng thái */}
        <div className="flex items-center justify-between mb-2">
          <div className="text-yellow-500 text-sm">
   
            <span className="text-gray-500 ml-2 text-xs">
              Reviews ({product?.reviews})
            </span>
          </div>
          {/* {product.inStock || product.availability === "In Stock" ? (
            <span className="text-green-500 text-xs font-medium">
              ● {t("product.in_stock")}
            </span>
          ) : (
            <span className="text-red-500 text-xs font-medium">
              ● {t("product.check_availability")}
            </span>
          )} */}
        </div>



        {/* Nút hành động */}
        <div className="flex items-center justify-between">
          <button
            onClick={e => {
              e.stopPropagation(); // Ngăn chặn click từ lan ra ngoài
              handleAddToCart();
            }}
            className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg 
              bg-indigo-600 text-white font-semibold text-sm
              hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <ShoppingCart className="w-4 h-4" /> {/* Sử dụng icon đồng bộ */}
            {t("product.add_to_cart")}
          </button>
          <div className="flex gap-2 text-gray-400 text-lg">
            <i className="far fa-envelope"></i>
            <i className="far fa-exchange-alt"></i>
            <i className="far fa-heart"></i>
          </div>
        </div>
      </div>
    </div>
  );
}