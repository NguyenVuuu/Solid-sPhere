import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getUserDiscounts } from "../../apis/userApi";
import {
  FaTicketAlt,
  FaCalendarAlt,
  FaPercent,
  FaCheck,
  FaClock,
} from "react-icons/fa";

const UserDiscounts = ({ userId }) => {
  const { t } = useTranslation();
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // all, active, used

  useEffect(() => {
    const fetchDiscounts = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        let data = await getUserDiscounts(userId);
        console.log("User discounts raw data:", data);
        console.log("Type of data:", typeof data);

        // Nếu data là string, parse JSON
        if (typeof data === "string") {
          try {
            data = JSON.parse(data);
            console.log("Parsed data from string:", data);
          } catch (parseError) {
            console.error("Failed to parse JSON string:", parseError);
          }
        }

        console.log("Is data an array after parse?", Array.isArray(data));

        // Đảm bảo data luôn là mảng
        let discountArray = [];
        if (Array.isArray(data)) {
          discountArray = data;
          console.log("Data is array, using directly");
        } else if (data && typeof data === "object") {
          console.log("Data is object, checking nested properties");
          if (Array.isArray(data.content)) {
            discountArray = data.content;
          } else if (Array.isArray(data.data)) {
            discountArray = data.data;
          } else if (Array.isArray(data.discounts)) {
            discountArray = data.discounts;
          }
        }

        console.log("Final discountArray:", discountArray);
        console.log("discountArray.length:", discountArray.length);

        setDiscounts(discountArray);
        setError(null);
      } catch (err) {
        console.error("Error fetching user discounts:", err);
        setError("Không thể tải danh sách mã giảm giá");
      } finally {
        setLoading(false);
      }
    };

    fetchDiscounts();
  }, [userId]);

  const formatDate = dateString => {
    if (!dateString) return "Không giới hạn";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const isExpired = expiresAt => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  };

  // Đảm bảo discounts luôn là mảng trước khi filter
  const safeDiscounts = Array.isArray(discounts) ? discounts : [];

  console.log("safeDiscounts:", safeDiscounts);
  console.log("safeDiscounts.length:", safeDiscounts.length);
  console.log("filter:", filter);

  const filteredDiscounts = safeDiscounts.filter(item => {
    console.log("Processing item:", item);
    console.log("item.isUsed:", item.isUsed);
    console.log("item.expiresAt:", item.expiresAt);
    console.log("isExpired:", isExpired(item.expiresAt));
    if (filter === "active") return !item.isUsed && !isExpired(item.expiresAt);
    if (filter === "used") return item.isUsed;
    return true;
  });

  console.log("filteredDiscounts:", filteredDiscounts);

  if (!userId) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Vui lòng đăng nhập để xem mã giảm giá</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-gray-600">Đang tải...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {t("account.my_discounts") || "Mã giảm giá của tôi"}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {/* Tất cả  */}
            {t("my_discount.all") || "Tất cả"} ({safeDiscounts.length})
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === "active"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {/* Còn hiệu lực */}
            {t("my_discount.active") || "Còn hiệu lực"}
          </button>
          <button
            onClick={() => setFilter("used")}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === "used"
                ? "bg-gray-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {/* Đã sử dụng */}
            {t("my_discount.used") || "Đã sử dụng"}
          </button>
        </div>
      </div>

      {filteredDiscounts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FaTicketAlt className="mx-auto text-4xl text-gray-400 mb-3" />
          <p className="text-gray-500">
            {filter === "all"
              ? "Bạn chưa có mã giảm giá nào"
              : filter === "active"
              ? "Không có mã giảm giá còn hiệu lực"
              : "Không có mã giảm giá đã sử dụng"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDiscounts.map(item => {
            const expired = isExpired(item.expiresAt);

            return (
              <div
                key={item.id}
                className={`relative border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
                  item.isUsed || expired ? "opacity-60 bg-gray-50" : "bg-white"
                }`}
              >
                {/* Header */}
                <div
                  className={`p-4 ${
                    item.isUsed
                      ? "bg-gray-400"
                      : expired
                      ? "bg-orange-400"
                      : "bg-gradient-to-r from-purple-500 to-blue-500"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <FaTicketAlt className="text-white text-lg" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">
                          {item.discountName || "Mã giảm giá"}
                        </h3>
                        <p className="text-white/80 text-sm">
                          {item.discountType || "PERCENTAGE"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-white font-bold text-xl">
                        {item.discountRate * 100 || 0}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4">
                  <p className="text-gray-600 text-sm mb-3">
                    {item.discountDescription || "Mã giảm giá đặc biệt"}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt />
                      <span>
                        {/* Ngày hết hạn:  */}
                        {t("my_discount.expired_date") || "Ngày hết hạn"}
                        {": "}
                        {formatDate(item.expiresAt)}
                      </span>
                    </div>
                    {item.point > 0 && (
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">⭐</span>
                        <span>
                          {item.point}
                          {/* điểm */} {t("my_discount.point") || "điểm"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Status badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {/* Nhận ngày:  */}
                      {t("my_discount.received_date") || "Nhận ngày"}
                      {": "}
                      {formatDate(item.createdAt)}
                    </span>
                    {item.isUsed ? (
                      <span className="flex items-center gap-1 px-2 py-1 bg-gray-200 text-gray-600 rounded-full text-xs">
                        <FaCheck />
                        {/* Đã sử dụng */}
                        {t("my_discount.used")}
                      </span>
                    ) : expired ? (
                      <span className="flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-600 rounded-full text-xs">
                        <FaClock />
                        {/* Hết hạn */}
                        {t("my_discount.expired")}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                        <FaCheck />
                        {/* Còn hiệu lực */}
                        {t("my_discount.active")}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserDiscounts;
