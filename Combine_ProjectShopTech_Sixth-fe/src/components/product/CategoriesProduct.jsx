import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import custom_builds from "../../assets/images/custom_buid.webp"; // Đã sửa lỗi chính tả tên biến

const CategoriesProduct = ({ image = custom_builds, text = "Custom Builds", link = "/products", listID = [] }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    if (listID && listID.length > 0) {
      // Truyền listID qua location.state
      navigate("/products", { state: { list: listID } });
    } else {
      // Fallback về link thông thường
      navigate(link);
    }
  };

  return (
    <div className="relative w-full h-[290px] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Background Image */}
      <img 
        src={image}  // Sử dụng prop image được truyền vào
        alt={text}   // Sử dụng text prop cho alt
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null; 
          e.target.src = 'https://via.placeholder.com/300x250?text=Image+Not+Found';
        }}
      />

      {/* Overlay + Text Centered */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col items-center justify-end text-white text-center p-4 pb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">{text}</h2>
        <button
          onClick={handleClick}
          className="mt-2 px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-100 transition-colors duration-200"
        >
          {t('common.products')}
        </button>
      </div>
    </div>
  );
};

export default CategoriesProduct;
// Updated: 2025-10-12T16:06:28.051Z

// Updated: 2025-10-12T16:08:50.245Z
