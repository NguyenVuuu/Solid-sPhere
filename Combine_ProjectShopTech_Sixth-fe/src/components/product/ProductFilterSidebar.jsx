import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getFilterOptions } from "../../apis/productApi";

/**
 * ProductFilterSidebar Component
 * Sidebar component for filtering products based on categories, price ranges, and status
 */
const ProductFilterSidebar = ({ onFilterChange, currentFilters }) => {
    const { t } = useTranslation();

    // State for filter options from backend
    const [filterOptions, setFilterOptions] = useState({
        categoryOptions: [],
        priceRanges: [],
        statusOptions: []
    });

    // State for expanded sections
    const [expanded, setExpanded] = useState({
        category: true,
        price: true,
        status: true,
        name: true,
    });

    // Local filter state
    const [filters, setFilters] = useState({
        categoryId: null,
        categoryName: "",
        minPrice: null,
        maxPrice: null,
        status: "",
        searchName: ""
    });

    // Fetch filter options on component mount
    useEffect(() => {
        loadFilterOptions();
    }, []);

    const loadFilterOptions = async () => {
        try {
            console.log("🔄 Loading filter options from backend...");
            const response = await getFilterOptions();
            console.log("✅ Filter options response:", response);

            // Backend trả về FilterOptionsResponseDTO trực tiếp
            setFilterOptions({
                categoryOptions: response.categoryOptions || [],
                priceRanges: response.priceRanges || [],
                statusOptions: response.statusOptions || []
            });

            console.log("📊 Filter options set:");
            console.log("  - Categories:", response.categoryOptions?.length || 0);
            console.log("  - Price ranges:", response.priceRanges?.length || 0);
            console.log("  - Statuses:", response.statusOptions?.length || 0);
        } catch (error) {
            console.error("❌ Error loading filter options:", error);
            // Set empty arrays on error
            setFilterOptions({
                categoryOptions: [],
                priceRanges: [],
                statusOptions: []
            });
        }
    };

    const toggleSection = (section) => {
        setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handleCategorySelect = (category) => {
        const newFilters = {
            ...filters,
            categoryId: category.categoryId,
            categoryName: category.categoryName
        };
        setFilters(newFilters);

        // Apply filter ngay lập tức
        const cleanedFilters = cleanFilters(newFilters);
        onFilterChange(cleanedFilters);
    };

    const handlePriceRangeSelect = (range) => {
        console.log("💰 Price range clicked:", range);

        const newFilters = {
            ...filters,
            minPrice: range.minPrice,
            maxPrice: range.maxPrice
        };

        console.log("📝 New filters before clean:", newFilters);
        setFilters(newFilters);

        // Apply filter ngay lập tức
        const cleanedFilters = cleanFilters(newFilters);
        console.log("✨ Cleaned filters to send:", cleanedFilters);
        console.log("🚀 Calling onFilterChange...");

        onFilterChange(cleanedFilters);
    };

    const handleStatusSelect = (status) => {
        const newFilters = {
            ...filters,
            status: status
        };
        setFilters(newFilters);

        // Apply filter ngay lập tức
        const cleanedFilters = cleanFilters(newFilters);
        onFilterChange(cleanedFilters);
    };

    const handleSearchNameChange = (e) => {
        setFilters({
            ...filters,
            searchName: e.target.value
        });
    };

    // Helper function to clean filters
    const cleanFilters = (filtersToClean) => {
        console.log("🧹 Cleaning filters - BEFORE:", filtersToClean);
        const cleaned = Object.entries(filtersToClean).reduce((acc, [key, value]) => {
            // Don't send categoryName to backend (only categoryId)
            if (key === 'categoryName') {
                console.log("🗑️ Removing categoryName (not needed by backend)");
                return acc;
            }
            if (value !== null && value !== "" && value !== undefined) {
                acc[key] = value;
            }
            return acc;
        }, {});
        console.log("🧹 Cleaning filters - AFTER:", cleaned);
        return cleaned;
    };

    const handleApplyFilters = () => {
        // Chỉ dùng cho search name hoặc custom input
        const cleanedFilters = cleanFilters(filters);
        onFilterChange(cleanedFilters);
    };

    const handleClearFilters = () => {
        const emptyFilters = {
            categoryId: null,
            categoryName: "",
            minPrice: null,
            maxPrice: null,
            status: "",
            searchName: ""
        };
        setFilters(emptyFilters);
        onFilterChange({});
    };

    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">
                    Bộ Lọc
                </h2>
            </div>

            <div className="px-6 py-4">
                {/* Clear Filter Button */}
                <button
                    onClick={handleClearFilters}
                    className="w-full border-2 border-gray-300 text-gray-600 font-medium py-2.5 rounded-full mb-6 hover:bg-gray-50 transition-colors"
                >
                    Xóa Bộ Lọc
                </button>

                {/* Category Filter - Danh Mục */}
                <div className="mb-6">
                    <div
                        className="flex justify-between items-center cursor-pointer mb-3"
                        onClick={() => toggleSection("category")}
                    >
                        <span className="font-bold text-base text-gray-800">Danh Mục</span>
                        {expanded.category ? (
                            <ChevronUp size={20} className="text-gray-600" />
                        ) : (
                            <ChevronDown size={20} className="text-gray-600" />
                        )}
                    </div>
                    {expanded.category && (
                        <div className="space-y-1.5 max-h-80 overflow-y-auto">
                            {filterOptions.categoryOptions && filterOptions.categoryOptions.length > 0 ? (
                                filterOptions.categoryOptions.map((category) => (
                                    <div
                                        key={category.categoryId}
                                        className={`flex justify-between items-center cursor-pointer px-3 py-2.5 rounded-md transition-colors ${filters.categoryId === category.categoryId
                                            ? "bg-blue-50 text-blue-700"
                                            : "hover:bg-gray-50 text-gray-700"
                                            }`}
                                        onClick={() => handleCategorySelect(category)}
                                    >
                                        <span className="text-sm font-medium">{category.categoryName}</span>
                                        <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full">
                                            {category.productCount}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-400 text-sm text-center py-4">
                                    Đang tải...
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Price Filter - Giá */}
                <div className="mb-6">
                    <div
                        className="flex justify-between items-center cursor-pointer mb-3"
                        onClick={() => toggleSection("price")}
                    >
                        <span className="font-bold text-base text-gray-800">Giá</span>
                        {expanded.price ? (
                            <ChevronUp size={20} className="text-gray-600" />
                        ) : (
                            <ChevronDown size={20} className="text-gray-600" />
                        )}
                    </div>
                    {expanded.price && (
                        <div className="space-y-1.5">
                            {filterOptions.priceRanges && filterOptions.priceRanges.length > 0 ? (
                                filterOptions.priceRanges.map((range, index) => (
                                    <div
                                        key={index}
                                        className={`flex justify-between items-center cursor-pointer px-3 py-2.5 rounded-md transition-colors ${filters.minPrice === range.minPrice && filters.maxPrice === range.maxPrice
                                            ? "bg-blue-50 text-blue-700"
                                            : "hover:bg-gray-50 text-gray-700"
                                            }`}
                                        onClick={() => handlePriceRangeSelect(range)}
                                    >
                                        <span className="text-sm font-medium">{range.rangeLabel}</span>
                                        <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full">
                                            {range.productCount} Sản Phẩm
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-400 text-sm text-center py-4">
                                    Đang tải...
                                </div>
                            )}

                            {/* Custom price range input */}
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="flex items-center gap-2">
                                    <button
                                        className="flex-1 px-3 py-2.5 border-2 border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Tối Thiểu
                                    </button>
                                    <button
                                        className="flex-1 px-3 py-2.5 border-2 border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Tối Đa
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Mau Sac - Color (if needed later) */}
                <div className="mb-6">
                    <div className="flex justify-between items-center cursor-pointer mb-3">
                        <span className="font-bold text-base text-gray-800">Màu Sắc</span>
                        <ChevronDown size={20} className="text-gray-600" />
                    </div>
                </div>

                {/* Ten Bo Loc - Filter Name */}
                <div className="mb-6">
                    <div
                        className="flex justify-between items-center cursor-pointer mb-3"
                        onClick={() => toggleSection("name")}
                    >
                        <span className="font-bold text-base text-gray-800">Tên Bộ Lọc</span>
                        {expanded.name ? (
                            <ChevronUp size={20} className="text-gray-600" />
                        ) : (
                            <ChevronDown size={20} className="text-gray-600" />
                        )}
                    </div>
                    {expanded.name && (
                        <input
                            type="text"
                            value={filters.searchName}
                            onChange={handleSearchNameChange}
                            placeholder="Tìm kiếm theo tên..."
                            className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    )}
                </div>

                {/* Apply Filters Button */}
                <button
                    className="w-full bg-blue-600 text-white py-3 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-sm"
                    onClick={handleApplyFilters}
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default ProductFilterSidebar;