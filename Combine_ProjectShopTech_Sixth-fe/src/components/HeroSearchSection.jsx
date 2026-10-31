import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaMapMarkerAlt, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const HeroSearchSection = ({ product = [] }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("Tuy Hoa, Phu Yen");
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const modalRef = useRef(null);
  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Danh sách các cửa hàng cụ thể với địa chỉ chi tiết
  const locations = [
    { 
      name: "Tuy Hoa Store", 
      address: "123 Nguyễn Huệ, Phường 7, Tuy Hòa, Phú Yên, Vietnam",
      phone: "0257.123.456",
      hours: "8:00 - 22:00",
      status: "OPEN"
    },
    { 
      name: "Ho Chi Minh City Store", 
      address: "456 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh, Vietnam",
      phone: "028.123.456",
      hours: "8:00 - 22:00",
      status: "OPEN"
    },
    { 
      name: "Hanoi Store", 
      address: "789 Tràng Tiền, Hoàn Kiếm, Hà Nội, Vietnam",
      phone: "024.123.456",
      hours: "8:00 - 22:00",
      status: "OPEN"
    },
    { 
      name: "Da Nang Store", 
      address: "321 Lê Duẩn, Hải Châu, Đà Nẵng, Vietnam",
      phone: "0236.123.456",
      hours: "8:00 - 22:00",
      status: "OPEN"
    },
    { 
      name: "Can Tho Store", 
      address: "654 Nguyễn Văn Cừ, Ninh Kiều, Cần Thơ, Vietnam",
      phone: "0292.123.456",
      hours: "8:00 - 22:00",
      status: "OPEN"
    },
    { 
      name: "Hai Phong Store", 
      address: "987 Lê Lợi, Ngô Quyền, Hải Phòng, Vietnam",
      phone: "0225.123.456",
      hours: "8:00 - 22:00",
      status: "OPEN"
    },
    { 
      name: "Nha Trang Store", 
      address: "147 Trần Phú, Lộc Thọ, Nha Trang, Khánh Hòa, Vietnam",
      phone: "0258.123.456",
      hours: "8:00 - 22:00",
      status: "OPEN"
    },
    { 
      name: "Hue Store", 
      address: "258 Lê Lợi, Phú Hội, Huế, Thừa Thiên Huế, Vietnam",
      phone: "0234.123.456",
      hours: "8:00 - 22:00",
      status: "OPEN"
    },
    { 
      name: "Vung Tau Store", 
      address: "369 Thùy Vân, Thắng Tam, Vũng Tàu, Bà Rịa - Vũng Tàu, Vietnam",
      phone: "0254.123.456",
      hours: "8:00 - 22:00",
      status: "OPEN"
    },
    { 
      name: "Quy Nhon Store", 
      address: "741 Nguyễn Thái Học, Lê Lợi, Quy Nhơn, Bình Định, Vietnam",
      phone: "0256.123.456",
      hours: "8:00 - 22:00",
      status: "OPEN"
    }
  ];

  // Đóng modal khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsLocationModalOpen(false);
      }
      // Đóng suggestions dropdown khi click bên ngoài
      if (suggestionsRef.current && searchInputRef.current && 
          !suggestionsRef.current.contains(event.target) && 
          !searchInputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    if (isLocationModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Ngăn scroll khi modal mở
      document.body.style.overflow = 'hidden';
    } else {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (isLocationModalOpen) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isLocationModalOpen]);

  // Remove Vietnamese tones
  const removeVietnameseTones = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };

  // Filter products
  const filteredProducts = product.filter((product) => {
    if (!searchTerm.trim()) return false;
    const normalizedSearch = removeVietnameseTones(searchTerm.toLowerCase());
    
    // Try different product name fields
    const productName = removeVietnameseTones(
      (product.productName || product.item?.productName || product.item?.name || product.name || "").toLowerCase()
    );
    
    // Try different category/description fields
    const categoryName = removeVietnameseTones(
      (product.categoryName || product.item?.categoryName || product.item?.description || product.item?.category?.name || "").toLowerCase()
    );
    
    // Try brand name
    const brandName = removeVietnameseTones(
      (product.brandName || product.item?.brandName || product.item?.brand?.name || "").toLowerCase()
    );
    
    return productName.includes(normalizedSearch) || 
           categoryName.includes(normalizedSearch) || 
           brandName.includes(normalizedSearch);
  });

  // Handle search
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/products?search=${searchTerm}`);
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Handle input change with debounce for better UX
  useEffect(() => {
    if (searchTerm.trim() !== "") {
      setIsSearching(true);
      setShowSuggestions(true);
      
      // Debounce search - show loading for at least 200ms for better UX
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 200);
      
      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  // Handle input change
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle product click from suggestions
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}/productAbout`);
    setShowSuggestions(false);
    setSearchTerm("");
  };

  // Handle focus
  const handleFocus = () => {
    if (searchTerm.trim() !== "" && filteredProducts.length > 0) {
      setShowSuggestions(true);
    }
  };

  // Handle location selection
  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation.name);
    setIsLocationModalOpen(false);
    
    // Mở Google Maps với địa chỉ được chọn
    const encodedAddress = encodeURIComponent(selectedLocation.address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(googleMapsUrl, '_blank');
  };

  // Toggle location modal
  const toggleLocationModal = () => {
    setIsLocationModalOpen(!isLocationModalOpen);
  };

  // Đóng modal
  const closeLocationModal = () => {
    setIsLocationModalOpen(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-8">
      {/* Search Container - Simplified */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Product Search Input */}
          <div className="flex-1 relative" ref={searchInputRef}>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
              <input
                type="text"
                placeholder={t('search.search_for_products')}
                value={searchTerm}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onKeyPress={handleKeyPress}
                className="w-full h-[42px] pl-10 pr-10 py-2.5 text-gray-900 text-base rounded-md border border-gray-300 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 bg-white"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setShowSuggestions(false);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Product Suggestions Dropdown */}
            {showSuggestions && searchTerm.trim() !== "" && (
              <div ref={suggestionsRef} className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                {isSearching ? (
                  // Loading State
                  <div className="py-8 px-4 flex flex-col items-center justify-center">
                    <div className="relative w-12 h-12 mb-3">
                      <div className="absolute inset-0 border-4 border-purple-200 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-purple-600 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <p className="text-sm text-gray-600">Đang tìm kiếm...</p>
                  </div>
                ) : filteredProducts.length > 0 ? (
                  // Results State
                  <div className="py-2">
                    {filteredProducts.slice(0, 8).map((product, index) => {
                    // Try multiple ways to get product ID
                    const productId = product.productID || product.item?.productID || product.item?.id || product.id;
                    // Try multiple ways to get product name
                    const productName = product.productName || product.item?.productName || product.item?.name || product.name || "";
                    // Try multiple ways to get product image
                    const productImage = product.image || product.imageUrl || product.item?.imageUrl || product.item?.image || product.item?.thumbnail || "";
                    // Try multiple ways to get product price
                    const productPrice = product.price || product.unitPrice || product.item?.unitPrice || product.item?.price || 0;
                    
                    return (
                      <button
                        key={productId || index}
                        onClick={() => handleProductClick(productId)}
                        className="w-full px-4 py-3 hover:bg-gray-50 flex items-center gap-3 text-left transition-colors"
                      >
                        {productImage && (
                          <img
                            src={productImage}
                            alt={productName}
                            className="w-12 h-12 object-cover rounded"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{productName}</p>
                          <p className="text-xs text-gray-500">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(productPrice)}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                  {filteredProducts.length > 8 && (
                    <button
                      onClick={handleSearch}
                      className="w-full px-4 py-2 text-sm text-purple-600 hover:bg-purple-50 font-medium text-center border-t border-gray-200"
                    >
                      Xem tất cả {filteredProducts.length} kết quả
                    </button>
                  )}
                </div>
                ) : (
                  // No Results State
                  <div className="px-4 py-6 text-sm text-gray-500 text-center">
                    <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>Không tìm thấy sản phẩm nào</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Location Selector - Simplified */}
          <div className="relative w-full sm:w-auto sm:min-w-[240px]">
            <button 
              onClick={toggleLocationModal}
              className="w-full h-[42px] px-3 py-2.5 text-gray-700 text-base rounded-md border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-200 bg-white flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                <FaMapMarkerAlt className="text-gray-500 flex-shrink-0" />
                <span className="truncate">{location}</span>
              </div>
              <FaChevronDown 
                className={`w-3 h-3 text-gray-400 flex-shrink-0 transition-transform ${
                  isLocationModalOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {/* Search Button - Match header color */}
          <button
            onClick={handleSearch}
            className="h-[42px] px-6 py-2.5 bg-gradient-to-r from-black via-gray-900 to-purple-950 text-white text-base rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center justify-center gap-2 transition-opacity whitespace-nowrap"
          >
            <FaSearch />
            <span>{t('search.search')}</span>
          </button>
        </div>
      </div>

      {/* Location Modal - Simplified */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 transition-opacity"
            onClick={closeLocationModal}
          ></div>
          
          {/* Modal Content */}
          <div 
            ref={modalRef}
            className="relative bg-white rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-hidden"
          >
            {/* Header - Simplified */}
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Chọn cửa hàng</h3>
              <button
                onClick={closeLocationModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content - Simplified */}
            <div className="p-4">
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {locations.map((loc, index) => (
                  <button
                    key={index}
                    onClick={() => handleLocationSelect(loc)}
                    className={`w-full p-3 text-left rounded-md border flex items-start gap-3 transition-colors ${
                      location === loc.name 
                        ? 'border-gray-900 bg-gray-50' 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {/* Icon */}
                    <FaMapMarkerAlt className={`mt-0.5 flex-shrink-0 ${
                      location === loc.name ? 'text-gray-900' : 'text-gray-400'
                    }`} />
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className={`font-medium text-sm ${
                        location === loc.name ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {loc.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {loc.address}
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                        <span>{loc.phone}</span>
                        <span>•</span>
                        <span>{loc.hours}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Footer - Simplified */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Nhấn vào cửa hàng để mở Google Maps
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSearchSection;