import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Loader2, Grid, List, SlidersHorizontal } from 'lucide-react';
import ProductFilterSidebar from '../../components/product/ProductFilterSidebar';
import ProductCard from '../../components/product/ProductCard';
import ErrorBoundary from '../../components/ErrorBoundary';
import { filterProducts } from '../../apis/productApi';

function All_Products() {
    const { t } = useTranslation();
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentFilters, setCurrentFilters] = useState({});
    const [totalProducts, setTotalProducts] = useState(0);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [sortBy, setSortBy] = useState('default'); // 'default', 'price_asc', 'price_desc', 'name_asc'
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Load products on mount with filters from navigation state
    useEffect(() => {
        console.log("🚀 All_Products useEffect triggered");
        console.log("📍 location.pathname:", location.pathname);
        console.log("📍 location.state:", location.state);
        console.log("📍 location.key:", location.key); // React Router key changes on each navigation
        
        const initialFilters = {};
        
        // Support both formats: location.state.list or location.state.state.list (backward compatibility)
        const categoryList = location.state?.list || location.state?.state?.list;
        const brandFilter = location.state?.brand || location.state?.state?.brand;
        
        // Check if navigation state contains category list
        if (categoryList && Array.isArray(categoryList)) {
            console.log("✅ Found categoryIds in state:", categoryList);
            initialFilters.categoryIds = categoryList;
        } else {
            console.log("⚠️ No categoryIds in location.state");
        }
        
        // Check if navigation state contains brand filter
        if (brandFilter) {
            console.log("✅ Found brand in state:", brandFilter);
            initialFilters.brand = brandFilter;
        }
        
        console.log("📤 Setting filters to:", initialFilters);
        console.log("📤 Has categoryIds?", !!initialFilters.categoryIds);
        console.log("📤 CategoryIds length:", initialFilters.categoryIds?.length);
        
        setCurrentFilters(initialFilters);
        loadProducts(initialFilters);
    }, [location.key]); // Use location.key to trigger on every navigation

    const loadProducts = async (filters) => {
        setLoading(true);
        setError(null);
        try {
            console.log("🔍 Sending filter request:", filters);
            const response = await filterProducts(filters);
            console.log("✅ Filter response from backend:", response);

            // Backend trả về ProductFilterResponseDTO: { products: [], totalProducts: number }
            if (!response) {
                throw new Error("Response is null or undefined");
            }

            // Handle case where products might be in response.data or directly in response
            const productsData = response.products || response.data?.products || [];
            const totalCount = response.totalProducts || response.data?.totalProducts || 0;

            console.log("📦 Products data:", productsData);
            console.log("📊 Total products:", totalCount);

            // Map backend ProductFilterDTO to frontend ProductCard format
            const mappedProducts = productsData.map((p, index) => {
                try {
                    return {
                        productID: p.id || index,
                        productName: p.name || 'Unknown Product',
                        price: p.hasDiscount ? (p.discountPrice || p.unitPrice || 0) : (p.unitPrice || 0),
                        originalPrice: p.unitPrice || 0,
                        image: p.imageUrl || '/images/placeholder.png',
                        inStock: p.status === 'ACTIVE',
                        categoryName: p.categoryName || 'Uncategorized',
                        hasDiscount: p.hasDiscount || false,
                        percentage: p.percentage || 0,
                        quantity: p.quantity || 0,
                        status: p.status || 'INACTIVE'
                    };
                } catch (err) {
                    console.error("❌ Error mapping product:", p, err);
                    return null;
                }
            }).filter(p => p !== null); // Remove failed mappings

            console.log("✨ Mapped products:", mappedProducts);
            console.log("✨ Mapped products count:", mappedProducts.length);
            setProducts(mappedProducts);
            setTotalProducts(totalCount);
        } catch (err) {
            console.error("❌ Error loading products:", err);
            console.error("❌ Error details:", {
                message: err.message,
                response: err.response,
                status: err.response?.status,
                data: err.response?.data
            });

            const errorMessage = err.response?.data?.message
                || err.message
                || "Không thể kết nối đến server. Vui lòng kiểm tra Backend đã chạy chưa!";

            setError(errorMessage);
            setProducts([]);
            setTotalProducts(0);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (filters) => {
        console.log("==============================================");
        console.log("🎯 handleFilterChange called with:", filters);
        console.log("==============================================");
        setCurrentFilters(filters);
        setShowMobileFilters(false); // Close mobile filters after apply
        loadProducts(filters);
    };

    // Sort products locally
    const sortProducts = (productsToSort) => {
        const sorted = [...productsToSort];
        switch (sortBy) {
            case 'price_asc':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price_desc':
                return sorted.sort((a, b) => b.price - a.price);
            case 'name_asc':
                return sorted.sort((a, b) => a.productName.localeCompare(b.productName));
            case 'name_desc':
                return sorted.sort((a, b) => b.productName.localeCompare(a.productName));
            default:
                return sorted;
        }
    };

    const displayedProducts = sortProducts(products);

    return (
        <ErrorBoundary>
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {t('product.allproducts') || 'Tất Cả Sản Phẩm'}
                        </h1>
                        <p className="text-gray-600">
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    {t('common.loading') || 'Đang tải...'}
                                </span>
                            ) : (
                                <span>
                                    {t('product.showing_results') || 'Hiển thị'} <span className="font-semibold text-blue-600">{totalProducts}</span> {t('common.products') || 'sản phẩm'}
                                    {Object.keys(currentFilters).length > 0 && (
                                        <span className="ml-2 text-sm text-gray-500">
                                            ({Object.keys(currentFilters).length} bộ lọc đang áp dụng)
                                        </span>
                                    )}
                                </span>
                            )}
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Sidebar Filter - Desktop */}
                        <aside className="hidden lg:block lg:w-80 flex-shrink-0">
                            <div className="sticky top-4">
                                <ProductFilterSidebar
                                    onFilterChange={handleFilterChange}
                                    currentFilters={currentFilters}
                                />
                            </div>
                        </aside>

                        {/* Mobile Filter Button */}
                        <button
                            onClick={() => setShowMobileFilters(!showMobileFilters)}
                            className="lg:hidden fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 flex items-center gap-2"
                        >
                            <SlidersHorizontal size={20} />
                            <span className="font-semibold">Lọc</span>
                        </button>

                        {/* Mobile Filter Modal */}
                        {showMobileFilters && (
                            <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setShowMobileFilters(false)}>
                                <div className="absolute right-0 top-0 h-full w-80 bg-white overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                                    <div className="p-4">
                                        <button
                                            onClick={() => setShowMobileFilters(false)}
                                            className="mb-4 text-gray-600 hover:text-gray-900"
                                        >
                                            ✕ Đóng
                                        </button>
                                        <ProductFilterSidebar
                                            onFilterChange={handleFilterChange}
                                            currentFilters={currentFilters}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Products Grid */}
                        <main className="flex-1">
                            {/* Toolbar - Sort & View Mode */}
                            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
                                <div className="flex items-center gap-4">
                                    {/* Sort Dropdown */}
                                    <div className="flex items-center gap-2">
                                        <label className="text-sm text-gray-600">{t('common.sort_by') || 'Sắp xếp:'}  </label>
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="border rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="default">{t('common.default') || 'Mặc định'}</option>
                                            <option value="price_asc">{t('common.price_low_to_high') || 'Giá: Thấp đến Cao'}</option>
                                            <option value="price_desc">{t('common.price_high_to_low') || 'Giá: Cao đến Thấp'}</option>
                                            <option value="name_asc">{t('common.name_az') || 'Tên: A-Z'}</option>
                                            <option value="name_desc">{t('common.name_za') || 'Tên: Z-A'}</option>
                                        </select>
                                    </div>
                                </div>

                                {/* View Mode Toggle */}
                                <div className="hidden sm:flex items-center gap-2">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        <Grid size={20} />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        <List size={20} />
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg mb-6 shadow-md">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-red-800">
                                                ⚠️ Lỗi kết nối
                                            </h3>
                                            <div className="mt-2 text-sm text-red-700">
                                                <p>{error}</p>
                                                <p className="mt-2">
                                                    💡 <strong>Cách khắc phục:</strong>
                                                </p>
                                                <ul className="list-disc list-inside mt-1 space-y-1">
                                                    <li>Kiểm tra Backend đang chạy trên <code className="bg-red-100 px-1 rounded">http://localhost:8081</code></li>
                                                    <li>Kiểm tra endpoint <code className="bg-red-100 px-1 rounded">POST /api/products/filter</code> đã được implement chưa</li>
                                                    <li>Xem Console (F12) để biết thêm chi tiết</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {loading ? (
                                <div className="flex justify-center items-center h-64">
                                    <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
                                </div>
                            ) : displayedProducts.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-gray-400 text-6xl mb-4">📦</div>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                        {t('product.no_products') || 'Không tìm thấy sản phẩm'}
                                    </h3>
                                    <p className="text-gray-500">
                                        {t('product.try_different_filters') || 'Thử thay đổi bộ lọc để xem thêm sản phẩm'}
                                    </p>
                                </div>
                            ) : (
                                <div className={
                                    viewMode === 'grid'
                                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                                        : "flex flex-col gap-4"
                                }>
                                    {displayedProducts.map((product) => {
                                        try {
                                            return (
                                                <ProductCard
                                                    key={product.productID}
                                                    product={product}
                                                />
                                            );
                                        } catch (err) {
                                            console.error("Error rendering product:", product, err);
                                            return (
                                                <div key={product.productID} className="p-4 border border-red-300 bg-red-50 rounded">
                                                    <p className="text-red-700">Lỗi hiển thị sản phẩm: {product.productName}</p>
                                                </div>
                                            );
                                        }
                                    })}
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    );
}

export default All_Products;