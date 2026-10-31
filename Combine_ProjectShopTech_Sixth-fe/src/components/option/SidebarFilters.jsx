import { useState, useMemo } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";

const SidebarFilters = ({ products = [], allProducts, onApplyFilters }) => {
  const { t } = useTranslation();

  // Debug: Log products when component mounts or updates
  console.log("🔄 SidebarFilters rendered with:", {
    productsCount: products.length,
    allProductsCount: allProducts?.length,
    sampleProduct: products[0]
  });

  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [filterName, setFilterName] = useState("");
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expanded, setExpanded] = useState({
    category: true,
    price: true,
    name: true,
  });

  // Categories with subcategories - for display only, not for filtering
  const categoryStructure = {
    "Laptops": ["All Laptops"],
    "Gaming Gear": ["Mouse", "KeyBoard", "Game Gear", "Mouse Pad", "Headphone"],
    "PC Parts": ["Monitor", "Case", "CPU", "MainBoard", "PSU", "Storage", "RAM"],
    "Smart Device": ["iPhone", "Samsung", "Xiaomi", "iPad"]
  };

  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const toggleSection = section => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const clearFilters = () => {
    setSelectedPriceRange("");
    setFilterName("");
    onApplyFilters(allProducts);
  };

  const priceRanges = [
    { min: 0, max: 1000000, label: "0đ - 1,000,000đ" },
    { min: 1000000, max: 2000000, label: "1,000,000đ - 2,000,000đ" },
    { min: 2000000, max: 3000000, label: "2,000,000đ - 3,000,000đ" },
    { min: 3000000, max: 4000000, label: "3,000,000đ - 4,000,000đ" },
    { min: 4000000, max: 5000000, label: "4,000,000đ - 5,000,000đ" },
    { min: 5000000, max: 6000000, label: "5,000,000đ - 6,000,000đ" },
    { min: 6000000, max: 7000000, label: "6,000,000đ - 7,000,000đ" },
    { min: 7000000, max: Infinity, label: "7,000,000đ trở lên" },
  ];

  // Hàm lọc sản phẩm theo lựa chọn hiện tại
  // Note: Category is for display only, not used for filtering
  const filteredProducts = useMemo(() => {
    let filtered = [...(allProducts || products)];

    // Removed category filtering - categories are for display only

    if (selectedPriceRange) {
      const [minStr, maxStr] = selectedPriceRange.split(" - ");
      const min = parseFloat(minStr.replace(/[₫,]/g, ""));
      const max = maxStr ? parseFloat(maxStr.replace(/[₫,]/g, "")) : Infinity;
      filtered = filtered.filter(product => {
        // Use unitPrice (original price) for filtering
        const priceValue = typeof product.unitPrice === 'string'
          ? parseFloat(product.unitPrice.replace(/[₫,]/g, ""))
          : parseFloat(product.unitPrice || product.price || 0);
        return priceValue >= min && priceValue <= max;
      });
    }

    return filtered;
  }, [allProducts, products, selectedPriceRange]);

  // Tính priceCounts dựa trên filteredProducts
  const priceCounts = priceRanges.map(({ min, max }) => {
    return filteredProducts.filter(product => {
      // Handle both string and number unitPrice
      const productPrice = typeof product.unitPrice === 'string'
        ? parseFloat(product.unitPrice.replace(/[₫,]/g, ""))
        : parseFloat(product.unitPrice || 0);
      return (
        (min ? productPrice >= min : true) && (max ? productPrice <= max : true)
      );
    }).length;
  });

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h2 className="text-gray-800 text-lg font-bold flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          {t("common.filters") || "Bộ Lọc"}
        </h2>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Clear Filter Button */}
        <button
          onClick={clearFilters}
          className="w-full border-2 border-gray-300 text-gray-600 font-medium py-2.5 px-4 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          {t("common.clear_filters") || "Xóa Bộ Lọc"}
        </button>

        {/* Category */}
        <div>
          <div
            className="flex justify-between items-center font-bold text-gray-800 cursor-pointer hover:text-gray-600 transition-colors pb-3 border-b border-gray-200"
            onClick={() => toggleSection("category")}
          >
            <span className="text-base">{t("common.category") || "Danh Mục"}</span>
            {expanded.category ? (
              <ChevronUp size={20} className="text-gray-500" />
            ) : (
              <ChevronDown size={20} className="text-gray-500" />
            )}
          </div>
          {expanded.category && (
            <div className="mt-3 space-y-2">
              {Object.keys(categoryStructure).map(parentCategory => (
                <div key={parentCategory} className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* Parent Category - display only, no selection */}
                  <div
                    className="flex justify-between items-center cursor-pointer px-3 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium transition-all duration-200"
                    onClick={() => toggleCategory(parentCategory)}
                  >
                    <span className="text-sm">{parentCategory}</span>
                    {expandedCategories[parentCategory] ? (
                      <ChevronUp size={16} className="text-gray-600" />
                    ) : (
                      <ChevronDown size={16} className="text-gray-600" />
                    )}
                  </div>

                  {/* Sub Categories - display only */}
                  {expandedCategories[parentCategory] && (
                    <div className="bg-white">
                      {categoryStructure[parentCategory].map(subCategory => (
                        <div
                          key={subCategory}
                          className="px-5 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-all duration-200"
                        >
                          {subCategory}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price */}
        <div>
          <div
            className="flex justify-between items-center font-bold text-gray-800 cursor-pointer hover:text-gray-600 transition-colors pb-3 border-b border-gray-200"
            onClick={() => toggleSection("price")}
          >
            <span className="text-base">{t("common.price") || "Giá"}</span>
            {expanded.price ? (
              <ChevronUp size={20} className="text-gray-500" />
            ) : (
              <ChevronDown size={20} className="text-gray-500" />
            )}
          </div>
          {expanded.price && (
            <div className="mt-3 space-y-1.5">
              {priceRanges.map(({ label }, index) => (
                <div
                  key={label}
                  className={`flex justify-between items-center cursor-pointer px-3 py-2.5 rounded-lg transition-all duration-200 ${selectedPriceRange === label
                      ? "bg-gray-100 text-gray-900 font-medium border border-gray-300"
                      : "hover:bg-gray-50 text-gray-700 border border-transparent"
                    }`}
                  onClick={() => {
                    setSelectedPriceRange(label);
                  }}
                >
                  <span className="text-xs font-medium whitespace-nowrap truncate mr-2">{label}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 ${selectedPriceRange === label
                      ? "bg-gray-200 text-gray-800"
                      : "bg-gray-100 text-gray-600"
                    }`}>
                    {priceCounts[index]} SP
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Filter Name */}
        <div>
          <div
            className="flex justify-between items-center font-bold text-gray-800 cursor-pointer hover:text-gray-600 transition-colors pb-3 border-b border-gray-200"
            onClick={() => toggleSection("name")}
          >
            <span className="text-base">{t("common.filter_name") || "Tên Sản Phẩm"}</span>
            {expanded.name ? (
              <ChevronUp size={20} className="text-gray-500" />
            ) : (
              <ChevronDown size={20} className="text-gray-500" />
            )}
          </div>
          {expanded.name && (
            <input
              type="text"
              value={filterName}
              onChange={e => setFilterName(e.target.value)}
              placeholder={t("common.search_by_name") || "Tìm kiếm theo tên..."}
              className="mt-3 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all"
            />
          )}
        </div>

        {/* Apply Filters Button */}
        <button
          className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
          onClick={() => {
            console.log("🎯 Apply Filters clicked");
            console.log("📋 Current filters:", {
              selectedPriceRange,
              filterName
            });

            // Note: Categories are for display only, not used in filtering
            let finalFiltered = [...(allProducts || products)];
            console.log("📦 Total products before filter:", finalFiltered.length);
            console.log("📦 Using:", allProducts ? "allProducts" : "products");

            // Category filter removed - categories are display only

            if (selectedPriceRange) {
              const [minStr, maxStr] = selectedPriceRange.split(" - ");
              const min = parseFloat(minStr.replace(/[₫,]/g, ""));
              const max = maxStr
                ? parseFloat(maxStr.replace(/[₫,]/g, ""))
                : Infinity;
              console.log("💰 Price range:", { min, max });

              finalFiltered = finalFiltered.filter(product => {
                // Use unitPrice (original price) for filtering
                const priceValue = typeof product.unitPrice === 'string'
                  ? parseFloat(product.unitPrice.replace(/[₫,]/g, ""))
                  : parseFloat(product.unitPrice || product.price || 0);

                const inRange = priceValue >= min && priceValue <= max;
                return inRange;
              });
              console.log("💵 After price filter:", finalFiltered.length);
            }
            if (filterName) {
              finalFiltered = finalFiltered.filter(product =>
                product.name?.toLowerCase().includes(filterName.toLowerCase())
              );
              console.log("🔍 After name filter:", finalFiltered.length);
            }

            console.log("✅ Final filtered products:", finalFiltered.length);
            onApplyFilters(finalFiltered);
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {t("common.apply_filters") || "Áp Dụng Bộ Lọc"}
        </button>
      </div>
    </div>
  );
};

export default SidebarFilters;