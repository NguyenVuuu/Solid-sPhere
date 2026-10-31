import { useEffect, useState } from "react";
import {
  AiOutlineHeart,
  AiOutlineShareAlt,
  AiOutlineMessage,
} from "react-icons/ai";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { FaHeadset, FaUserCircle, FaPercentage } from "react-icons/fa";

// import a1 from "../../assets/images/ProductDetail/a1.png";
// import a2 from "../../assets/images/ProductDetail/a2.png";
// import a3 from "../../assets/images/ProductDetail/a3.png";
// import a4 from "../../assets/images/ProductDetail/a4.png";
// import a5 from "../../assets/images/ProductDetail/a5.png";
// import a6 from "../../assets/images/ProductDetail/a6.png";
// import a7 from "../../assets/images/ProductDetail/a7.png";
import zip from "../../assets/images/ProductDetail/zip.png";
import { FaPaypal } from "react-icons/fa";
import { useParams } from "react-router-dom";
// import axiosInstance from "../../custom/axios";
import { getProductByIdWithDetails } from "../../services/MockProductService";
import { useTranslation } from 'react-i18next';
import Loading from "../Loading";

export default function ProductSpeccs() {
  const { t } = useTranslation();

  const [expanded, setExpanded] = useState(false);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  console.log(id);
  //   Lấy sản phẩm từ Mock Data
  async function fetchProduct(id) {
    try {
      setLoading(true);
      const res = await getProductByIdWithDetails(id);
      if (res && res.DT && res.DT.length > 0) {
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
    console.log("ID hiện tại:", id);
    fetchProduct(id);
  }, [id]);

  useEffect(() => {
    console.log("Product sau khi set:", product);
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen py-20">
        <Loading fullScreen={false} size="lg" text="Đang tải thông tin sản phẩm..." className="py-20" />
      </div>
    );
  }

  return (
    <div className="bg-transparent">
      {/* Main Content Area - Cleaner Layout */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section: Product Specs */}
          <div>
            {/* Breadcrumb */}
            <div className="text-sm mb-4 text-gray-600">
              <span className="hover:text-purple-600 transition cursor-pointer">
                Home / {product.categoryName} /{" "}
              </span>
              <span className="text-gray-400">{product.seriesName}</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              {product.productName}
            </h1>
            <p className="text-purple-600 text-sm mb-6 hover:underline cursor-pointer">
              Be the first to review this product
            </p>
            
            {/* Specifications Table - Cleaner Design */}
            <div className="border border-gray-200 rounded-lg overflow-hidden mb-6 bg-white">
              {product.attributeList?.split("|").map((item, index, arr) => {
                const [key, value] = item.split(":");
                return (
                  <div
                    key={index}
                    className={`flex justify-between items-center p-4 ${
                      index !== arr.length - 1 ? "border-b border-gray-200" : ""
                    } ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition`}
                  >
                    <span className="font-semibold text-sm text-gray-700">
                      {key?.trim() || "N/A"}
                    </span>
                    <span className="text-sm text-gray-600 text-right max-w-xs">
                      {value?.trim() || "N/A"}
                    </span>
                  </div>
                );
              })}
            </div>
            
            {/* Contact & SKU */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center mb-2">
                <p className="text-sm text-gray-700">{t('product.have_a_question')}</p>
                <a
                  href="#"
                  className="text-purple-600 text-sm ml-2 hover:underline"
                >
                  {t('product.contact_us')}
                </a>
              </div>
              <p className="text-gray-500 text-xs">
                {t('product.sku_d33654')}
              </p>
            </div>
            
            {/* More Information */}
            <div>
              <button
                className="flex items-center text-sm font-medium text-gray-700 hover:text-purple-600 transition"
                onClick={() => setExpanded(!expanded)}
              >
                <span className="mr-2 text-lg">{expanded ? "−" : "+"}</span>
                <span>{t('product.more_information')}</span>
              </button>
              {expanded && (
                <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  Thông tin bổ sung về thông số kỹ thuật sẽ được hiển thị tại đây...
                </div>
              )}
            </div>
          </div>

          {/* Right Section: Product Image & Icons */}
          <div className="flex flex-col items-center lg:items-end">
            <div className="flex flex-col lg:flex-row justify-between w-full h-full">
              {/* Social Icons */}
              <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 mb-4 lg:mb-0">
                <button className="bg-white rounded-full p-2.5 border border-gray-200 hover:border-purple-400 hover:text-red-500 transition shadow-sm">
                  <AiOutlineHeart className="w-5 h-5 text-gray-500" />
                </button>
                <button className="bg-white rounded-full p-2.5 border border-gray-200 hover:border-purple-400 hover:text-blue-500 transition shadow-sm">
                  <AiOutlineShareAlt className="w-5 h-5 text-gray-500" />
                </button>
                <button className="bg-white rounded-full p-2.5 border border-gray-200 hover:border-purple-400 hover:text-green-500 transition shadow-sm">
                  <AiOutlineMessage className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Product Image */}
              <div className="flex-1 flex justify-center items-center w-full lg:w-auto">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 max-w-md">
                  <img
                    src={product.image}
                    alt={product.productName}
                    className="w-full h-auto object-contain max-h-96"
                  />
                </div>
              </div>
            </div>

            {/* Zip Payment & Dots */}
            <div className="w-full mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-col items-center space-y-3">
                <div className="flex items-center justify-center space-x-2">
                  <img
                    src={zip}
                    alt={t('product.zip_payment_option')}
                    className="h-5"
                  />
                  <p className="text-xs text-gray-600">
                    own it now, up to 6 months interest free{" "}
                    <a
                      href="#"
                      className="text-purple-600 font-medium hover:underline"
                    >
                      {t('product.learn_more')}
                    </a>
                  </p>
                </div>

                <div className="flex justify-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-purple-600"></span>
                  <span className="h-2 w-2 rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer transition"></span>
                  <span className="h-2 w-2 rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer transition"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Updated: 2025-10-12T16:06:35.089Z

// Updated: 2025-10-12T16:08:45.877Z
