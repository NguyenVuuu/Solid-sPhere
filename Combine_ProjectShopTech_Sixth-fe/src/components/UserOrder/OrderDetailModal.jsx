import { useState, useEffect } from "react";
import {
  getOrderById,
  getOrderProductDetails,
  getOrderDetails,
} from "../../apis/orderApi";
import { getUserById } from "../../apis/userApi";
import {
  FaBoxOpen,
  FaShippingFast,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaFilePdf,
} from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useTranslation } from "react-i18next";

const OrderDetailModal = ({ isOpen, onClose, orderId }) => {
  const { t } = useTranslation();
  const [order, setOrder] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    if (isOpen && orderId) {
      fetchOrderDetails();
    }
  }, [isOpen, orderId]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      // Lấy thông tin đơn hàng
      const orderData = await getOrderById(orderId);
      setOrder(orderData);

      // Lấy thông tin khách hàng theo user_id
      if (orderData.user_id) {
        const userData = await getUserById(orderData.user_id);
        console.log("Customer data loaded:", userData);
        setCustomer(userData);
      } else {
        console.log("No user_id found in order data");
      }

      // Lấy chi tiết đơn hàng với thông tin sản phẩm đầy đủ (sử dụng endpoint mới)
      console.log("Fetching order product details for orderId:", orderId);
      try {
        const detailsData = await getOrderProductDetails(orderId);
        console.log("Order product details received:", detailsData);
        setOrderDetails(detailsData || []);
      } catch (productError) {
        console.error(
          "Error fetching product details, falling back to basic details:",
          productError
        );
        // Fallback to basic order details if the new endpoint fails
        try {
          const basicDetailsData = await getOrderDetails(orderId);
          console.log("Basic order details received:", basicDetailsData);
          setOrderDetails(basicDetailsData || []);
        } catch (basicError) {
          console.error("Error fetching basic details:", basicError);
          setOrderDetails([]);
        }
      }
    } catch (err) {
      setError("Không thể tải chi tiết đơn hàng");
      console.error("Error fetching order details:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = price => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const getStatusInfo = status => {
    switch (status) {
      case "PENDING":
        return {
          color: "bg-yellow-100 text-yellow-800",
          icon: <FaClock className="w-3 h-3" />,
          text: <span>{t("my_order.pending")}</span>,
        };
      case "PROCESSING":
        return {
          color: "bg-orange-100 text-orange-800",
          icon: <FaClock className="w-3 h-3" />,
          text: <span>{t("my_order.processing")}</span>,
        };
      case "CONFIRMED":
        return {
          color: "bg-blue-100 text-blue-800",
          icon: <FaBoxOpen className="w-3 h-3" />,
          text: <span>{t("my_order.confirmed")}</span>,
        };
      case "SHIPPED":
        return {
          color: "bg-purple-100 text-purple-800",
          icon: <FaShippingFast className="w-3 h-3" />,
          text: <span>{t("my_order.shipped")}</span>,
        };
      case "DELIVERED":
        return {
          color: "bg-green-100 text-green-800",
          icon: <FaCheckCircle className="w-3 h-3" />,
          text: <span>{t("my_order.delivered")}</span>,
        };
      case "CANCELLED":
        return {
          color: "bg-red-100 text-red-800",
          icon: <FaTimesCircle className="w-3 h-3" />,
          text: <span>{t("my_order.cancelled")}</span>,
        };
      case "RETURNED":
        return {
          color: "bg-gray-100 text-gray-800",
          icon: <FaTimesCircle className="w-3 h-3" />,
          text: <span>{t("my_order.returned")}</span>,
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800",
          icon: <FaClock className="w-3 h-3" />,
          text: status,
        };
    }
  };

  const exportToPDF = async () => {
    if (!order) {
      alert("Vui lòng đợi dữ liệu tải xong trước khi xuất PDF");
      return;
    }

    if (order.user_id && !customer) {
      alert("Đang tải thông tin khách hàng, vui lòng thử lại sau ít giây");
      return;
    }

    try {
      setIsExporting(true);

      // Tạo một element tạm thời để render nội dung hóa đơn
      const invoiceElement = document.createElement("div");
      invoiceElement.style.position = "absolute";
      invoiceElement.style.left = "-9999px";
      invoiceElement.style.top = "0";
      invoiceElement.style.width = "210mm";
      invoiceElement.style.padding = "20px";
      invoiceElement.style.backgroundColor = "white";
      invoiceElement.style.fontFamily = "Arial, sans-serif";

      // Nội dung hóa đơn
      invoiceElement.innerHTML = `
        <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px;">
            <h1 style="color: #333; margin: 0; font-size: 28px;">
            HÓA ĐƠN BÁN HÀNG
            </h1>
            <p style="margin: 5px 0; color: #666; font-size: 16px;">Đơn hàng #${String(
              order.id
            ).substring(0, 8)}</p>
            <p style="margin: 5px 0; color: #666;">Ngày xuất: ${formatDate(
              new Date()
            )}</p>
          </div>

            
            

          <!-- Thông tin đơn hàng -->
          <div style="margin-bottom: 30px;">
            <h3 style="color: #333; margin-bottom: 10px; font-size: 18px;">Thông tin đơn hàng</h3>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 5px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span><strong>Ngày đặt hàng:</strong> ${formatDate(
                  order.createdDate
                )}</span>
                <span><strong>Trạng thái:</strong> ${
                  getStatusInfo(order.status).text
                }</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span><strong>Phương thức thanh toán:</strong> ${
                  order.paymentMethod === "CASH_ON_DELIVERY"
                    ? "Thanh toán khi nhận hàng"
                    : order.paymentMethod === "ONLINE_BANKING"
                    ? "Chuyển khoản ngân hàng"
                    : order.paymentMethod
                }</span>
              </div>
              ${
                order.notes
                  ? `<p style="margin: 5px 0;"><strong>Ghi chú:</strong> ${order.notes}</p>`
                  : ""
              }
            </div>
          </div>

          <!-- Bảng sản phẩm -->
          <div style="margin-bottom: 30px;">
            <h3 style="color: #333; margin-bottom: 15px; font-size: 18px;">Chi tiết sản phẩm</h3>
            <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
              <thead>
                <tr style="background-color: #f8f9fa;">
                  <th style="border: 1px solid #ddd; padding: 12px; text-align: left; font-weight: bold;">STT</th>
                  <th style="border: 1px solid #ddd; padding: 12px; text-align: left; font-weight: bold;">Tên sản phẩm</th>
                  <th style="border: 1px solid #ddd; padding: 12px; text-align: right; font-weight: bold;">Đơn giá</th>
                  <th style="border: 1px solid #ddd; padding: 12px; text-align: center; font-weight: bold;">Số lượng</th>
                  <th style="border: 1px solid #ddd; padding: 12px; text-align: right; font-weight: bold;">Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                ${orderDetails
                  .map(
                    (detail, index) => `
                  <tr>
                    <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">${
                      index + 1
                    }</td>
                    <td style="border: 1px solid #ddd; padding: 12px;">
                      ${detail.productName || "Sản phẩm không xác định"}
                      ${
                        detail.categoryName
                          ? `<br><small style="color: #666;">${detail.categoryName}</small>`
                          : ""
                      }
                    </td>
                    <td style="border: 1px solid #ddd; padding: 12px; text-align: right;">${formatPrice(
                      detail.pricePerUnit
                    )}</td>
                    <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">${
                      detail.amount
                    }</td>
                    <td style="border: 1px solid #ddd; padding: 12px; text-align: right; font-weight: bold;">${formatPrice(
                      detail.pricePerUnit * detail.amount
                    )}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>

          <!-- Tổng cộng -->
          <div style="margin-bottom: 30px;">
            <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; border-left: 4px solid #007bff;">
              <div style="text-align: right;">
                <p style="margin: 10px 0; font-size: 18px;"><strong>Tổng số lượng:</strong> ${orderDetails.reduce(
                  (sum, detail) => sum + detail.amount,
                  0
                )} sản phẩm</p>
                <p style="margin: 10px 0; font-size: 20px; color: #007bff;"><strong>TỔNG TIỀN: ${formatPrice(
                  order.totalPrice
                )}</strong></p>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="margin: 5px 0; color: #666;">Cảm ơn quý khách đã mua hàng!</p>
            <p style="margin: 5px 0; color: #666; font-size: 14px;">Hóa đơn được xuất tự động từ hệ thống</p>
          </div>
        </div>
      `;

      document.body.appendChild(invoiceElement);

      // Chuyển đổi thành canvas
      const canvas = await html2canvas(invoiceElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: invoiceElement.scrollWidth,
        height: invoiceElement.scrollHeight,
      });

      // Xóa element tạm thời
      document.body.removeChild(invoiceElement);

      // Tạo PDF
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth - 20; // margin 10mm mỗi bên
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 10; // margin top

      // Thêm trang đầu tiên
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight - 20; // trừ margin

      // Thêm các trang tiếp theo nếu cần
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight + 10;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight - 20;
      }

      // Lưu file
      const fileName = `hoa-don-${String(order.id).substring(0, 8)}-${
        new Date().toISOString().split("T")[0]
      }.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error("Lỗi khi xuất PDF:", error);
      alert("Có lỗi xảy ra khi xuất PDF. Vui lòng thử lại.");
    } finally {
      setIsExporting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-medium text-gray-900">
            {/* Chi tiết đơn hàng  */}
            {t("my_order.order_details")}#
            {order ? String(order.id).substring(0, 8) : ""}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-2">Đang tải...</span>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">{error}</p>
            </div>
          ) : order ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Thông tin khách hàng */}
                {/* <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Thông tin khách hàng
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Tên:</span>{" "}
                      {customer?.fullName || "Đang tải..."}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">Email:</span>{" "}
                      {customer?.email || "Đang tải..."}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">Số điện thoại:</span>{" "}
                      {customer?.phoneNumber || "Đang tải..."}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">Địa chỉ:</span>{" "}
                      {order.deliveryAddress}
                    </p>
                  </div>
                </div> */}

                {/* Thông tin đơn hàng */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    {/* Thông tin đơn hàng */}
                    {t("my_order.order_infor")}
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">
                        {/* Ngày đặt: */}
                        {t("my_order.order_date")}
                      </span>
                      {": "}
                      {formatDate(order.createdDate)}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">
                        {/* Trạng thái: */}
                        {t("my_order.status")}
                      </span>
                      {": "}
                      <span
                        className={`inline-flex items-center ${
                          getStatusInfo(order.status).color
                        } text-xs px-2 py-1 rounded-full ml-1`}
                      >
                        {getStatusInfo(order.status).icon}
                        <span className="ml-1">
                          {getStatusInfo(order.status).text}
                        </span>
                      </span>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">
                        {/* Tổng tiền: */}
                        {t("my_order.total_amount")}
                      </span>
                      {": "}
                      <span className="font-medium">
                        {formatPrice(order.totalPrice)}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">
                        {/* Phương thức thanh toán: */}
                        {t("my_order.payment_method")}
                      </span>
                      {": "}
                      <span className="text-sm text-gray-600 mt-1">
                        {order.paymentMethod === "CASH_ON_DELIVERY"
                          ? "Thanh toán khi nhận hàng"
                          : order.paymentMethod === "ONLINE_BANKING"
                          ? "Chuyển khoản ngân hàng"
                          : order.paymentMethod}
                      </span>
                    </p>
                    {order.notes && (
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">
                          {/* Ghi chú: */}
                          {t("my_order.notes")}
                        </span>
                        {": "}
                        {order.notes}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Bảng sản phẩm */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-900">
                    {t("my_order.items_ordered")} ({orderDetails.length}{" "}
                    {t("my_order.items")})
                  </h4>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {/* Sản phẩm */}
                          {t("my_order.items")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {/* Đơn giá */}
                          {t("my_order.unit_price")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {/* Số lượng */}
                          {t("my_order.quantity")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {/* Thành tiền */}
                          {t("my_order.into_money")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orderDetails && orderDetails.length > 0 ? (
                        orderDetails.map((detail, index) => (
                          <tr key={detail.orderDetailId || index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-12 w-12">
                                  {detail.imageUrl ? (
                                    <img
                                      className="h-12 w-12 rounded-lg object-cover"
                                      src={detail.imageUrl}
                                      alt={detail.productName}
                                      onError={e => {
                                        e.target.style.display = "none";
                                        e.target.nextSibling.style.display =
                                          "flex";
                                      }}
                                    />
                                  ) : null}
                                  <div
                                    className={`h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center ${
                                      detail.imageUrl ? "hidden" : "flex"
                                    }`}
                                    style={{
                                      display: detail.imageUrl
                                        ? "none"
                                        : "flex",
                                    }}
                                  >
                                    <FaBoxOpen className="w-6 h-6 text-gray-400" />
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {detail.productName ||
                                      "Sản phẩm không xác định"}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {detail.categoryName}
                                  </div>
                                  {detail.description && (
                                    <div className="text-xs text-gray-400 mt-1">
                                      {detail.description.length > 50
                                        ? detail.description.substring(0, 50) +
                                          "..."
                                        : detail.description}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {formatPrice(detail.pricePerUnit)}
                              </div>
                              {detail.productUnitPrice !==
                                detail.pricePerUnit && (
                                <div className="text-xs text-gray-500">
                                  {/* Giá gốc: */}
                                  {t("my_order.original_price")}
                                  {": "}
                                  {formatPrice(detail.productUnitPrice)}
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {detail.amount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                              {formatPrice(detail.pricePerUnit * detail.amount)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="4"
                            className="px-6 py-4 text-center text-gray-500"
                          >
                            Đang tải sản phẩm...
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="flex justify-between p-6 border-t bg-gray-50">
          <button
            onClick={exportToPDF}
            disabled={isExporting || loading || !order}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <FaFilePdf className="w-4 h-4" />
            {isExporting ? "Đang xuất..." : t("my_order.download_pdf")}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium"
          >
            {/* Đóng */}
            {t("my_order.close")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
