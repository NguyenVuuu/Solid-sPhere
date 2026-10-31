import { useState, useEffect, useMemo } from "react";
import { FaFire, FaClock, FaTag, FaStar, FaFilter, FaSearch, FaHeart, FaShoppingCart } from "react-icons/fa";
import { getAllDiscounts } from "../../apis/discountApi";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { useTranslation } from "react-i18next";

const Deals = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // State management
  const [selectedTab, setSelectedTab] = useState("all"); // all, top10, best, new, ending-soon
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [allDeals, setAllDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("discount"); // discount, price, rating, name
  const [sortOrder, setSortOrder] = useState("desc"); // asc, desc
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000000 });
  const [discountRange, setDiscountRange] = useState({ min: 0, max: 100 });
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  // Fetch all deals data
  useEffect(() => {
    const fetchAllDeals = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Load all discounts first
        const allDiscountsData = await getAllDiscounts();
        
        console.log("🔍 Raw data from backend:", allDiscountsData);
        console.log("📊 Number of items:", allDiscountsData.length);
        console.log("📋 First item structure:", allDiscountsData[0]);
        
        const formattedDeals = allDiscountsData.map(item => ({
          id: item.productId,
          title: item.productName || "Unnamed Product",
          originalPrice: item.originalPrice || 0,
          salePrice: item.originalPrice && item.discountRate
            ? item.originalPrice * (1 - item.discountRate)
            : item.originalPrice || 0,
          discount: Math.round((item.discountRate || 0) * 100),
          image: item.imageUrl || "https://via.placeholder.com/400x300?text=No+Image",
          category: item.categoryName || "others",
          timeLeft: item.endDate ? new Date(item.endDate).toLocaleDateString() : "N/A",
          rating: 4.5, // Default rating since it's not in backend
          stock: Math.floor(Math.random() * 50) + 1, // Random stock since it's not in backend
          description: item.description || "",
          brand: item.categoryName || "Unknown Brand",
          startDate: item.startDate,
          endDate: item.endDate,
          discountStatus: item.discountStatus,
          type: item.type || "percentage"
        }));

        console.log("✅ All deals loaded:", formattedDeals.length);
        console.log("✅ Sample deals:", formattedDeals.slice(0, 3));
        console.log("🔍 First formatted deal:", formattedDeals[0]);
        setAllDeals(formattedDeals);
      } catch (error) {
        console.error("Error fetching all deals:", error);
        setError(t('deals.error.loadFailed'));
      } finally {
        setLoading(false);
      }
    };

    fetchAllDeals();
  }, []);

  // Tab navigation configuration
  const tabs = [
    { id: "all", name: t('deals.tabs.all'), icon: "🔥", count: allDeals.length },
    { id: "top10", name: t('deals.tabs.top10'), icon: "⭐", count: Math.min(10, allDeals.length) },
    { id: "best", name: t('deals.tabs.best'), icon: "🏆", count: allDeals.filter(d => d.discount >= 30).length },
    { id: "new", name: t('deals.tabs.new'), icon: "🆕", count: allDeals.filter(d => {
      const startDate = new Date(d.startDate);
      const now = new Date();
      const diffDays = (now - startDate) / (1000 * 60 * 60 * 24);
      return diffDays <= 7;
    }).length },
    { id: "ending-soon", name: t('deals.tabs.endingSoon'), icon: "⏰", count: allDeals.filter(d => {
      const endDate = new Date(d.endDate);
      const now = new Date();
      const diffDays = (endDate - now) / (1000 * 60 * 60 * 24);
      return diffDays <= 3 && diffDays > 0;
    }).length },
  ];

  // Categories configuration
  const categories = [
    { id: "all", name: t('deals.categories.all'), icon: "🔥" },
    { id: "Laptop", name: t('deals.categories.laptop'), icon: "💻" },
    { id: "Phone", name: t('deals.categories.phone'), icon: "📱" },
    { id: "Screen", name: t('deals.categories.screen'), icon: "🖥️" },
    { id: "Desktop", name: t('deals.categories.desktop'), icon: "🖥️" },
    { id: "Accessories", name: t('deals.categories.accessories'), icon: "🎧" },
    { id: "Gaming", name: t('deals.categories.gaming'), icon: "🎮" },
    { id: "Office", name: t('deals.categories.office'), icon: "💼" },
  ];

  // Filter and sort deals based on selected tab and filters
  const filteredAndSortedDeals = useMemo(() => {
    console.log("🔍 Filtering deals...");
    console.log("📊 Total deals:", allDeals.length);
    console.log("🔍 Search term:", searchTerm);
    console.log("💰 Price range:", priceRange);
    console.log("📈 Discount range:", discountRange);
    console.log("📂 Selected category:", selectedCategory);
    console.log("📋 Selected tab:", selectedTab);
    
    let filtered = allDeals.filter(deal => {
      // Search filter - only apply if search term is not empty
      const matchesSearch = !searchTerm || 
        deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Price range filter - only apply if range is not default
      const matchesPrice = (priceRange.min === 0 && priceRange.max === 100000000) || 
        (deal.salePrice >= priceRange.min && deal.salePrice <= priceRange.max);
      
      // Discount range filter - only apply if range is not default
      const matchesDiscount = (discountRange.min === 0 && discountRange.max === 100) || 
        (deal.discount >= discountRange.min && deal.discount <= discountRange.max);
      
      // Category filter
      const matchesCategory = selectedCategory === "all" || 
        deal.category.toLowerCase().includes(selectedCategory.toLowerCase());
      
      const passes = matchesSearch && matchesPrice && matchesDiscount && matchesCategory;
      
      // Debug first few deals
      if (allDeals.indexOf(deal) < 3) {
        console.log(`🔍 Deal ${deal.id}:`, {
          title: deal.title,
          category: deal.category,
          salePrice: deal.salePrice,
          discount: deal.discount,
          matchesSearch,
          matchesPrice,
          matchesDiscount,
          matchesCategory,
          passes
        });
      }
      
      return passes;
    });
    
    console.log("✅ After basic filtering:", filtered.length);

    // Apply tab-specific filtering
    switch (selectedTab) {
      case "top10":
        filtered = filtered.sort((a, b) => b.discount - a.discount).slice(0, 10);
        break;
      case "best":
        filtered = filtered.filter(deal => deal.discount >= 30);
        break;
      case "new":
        filtered = filtered.filter(deal => {
          const startDate = new Date(deal.startDate);
          const now = new Date();
          const diffDays = (now - startDate) / (1000 * 60 * 60 * 24);
          return diffDays <= 7;
        });
        break;
      case "ending-soon":
        filtered = filtered.filter(deal => {
          const endDate = new Date(deal.endDate);
          const now = new Date();
          const diffDays = (endDate - now) / (1000 * 60 * 60 * 24);
          return diffDays <= 3 && diffDays > 0;
        });
        break;
      default:
        // "all" - no additional filtering
        break;
    }

    // Sort deals
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case "discount":
          aValue = a.discount;
          bValue = b.discount;
          break;
        case "price":
          aValue = a.salePrice;
          bValue = b.salePrice;
          break;
        case "rating":
          aValue = a.rating;
          bValue = b.rating;
          break;
        case "name":
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        default:
          aValue = a.discount;
          bValue = b.discount;
      }
      
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    console.log("🎯 Final filtered deals:", filtered.length);
    console.log("📋 Sample filtered deals:", filtered.slice(0, 2));
    
    return filtered;
  }, [allDeals, searchTerm, priceRange, discountRange, sortBy, sortOrder, selectedCategory, selectedTab]);

  // Toggle favorite
  const toggleFavorite = (dealId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(dealId)) {
      newFavorites.delete(dealId);
    } else {
      newFavorites.add(dealId);
    }
    setFavorites(newFavorites);
  };

  // View product details
  const viewProductDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setPriceRange({ min: 0, max: 100000000 });
    setDiscountRange({ min: 0, max: 100 });
    setSortBy("discount");
    setSortOrder("desc");
    setSelectedCategory("all");
    setSelectedTab("all");
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen py-20">
        <Loading fullScreen={false} size="lg" text={t('deals.loading')} className="py-20" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-red-700 mb-2">{t('deals.error.title')}</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            {t('deals.error.tryAgain')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simplified Header Section */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          
          {/* Title - Simplified */}
          <div className="text-center mb-4">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
              🔥 {t('deals.title')}
            </h1>
            <p className="text-sm text-gray-500">
              {t('deals.subtitle')}
            </p>
          </div>

          {/* Tab Navigation - Cleaner Design */}
          <div className="flex flex-wrap gap-2 justify-center mb-4 pb-3 border-b border-gray-100">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 text-sm ${
                  selectedTab === tab.id
                    ? "bg-purple-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  selectedTab === tab.id ? "bg-white/30" : "bg-gray-300"
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Simplified Search and Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center">
            
            {/* Search Bar - Simplified */}
            <div className="flex-1 w-full lg:max-w-sm">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  placeholder={t('deals.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm bg-white"
                />
              </div>
            </div>

            {/* Category Filter - Horizontal Scroll on Mobile */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 lg:pb-0 w-full lg:w-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all duration-200 flex items-center gap-1.5 text-xs whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>

            {/* Filter Controls - Simplified */}
            <div className="flex items-center gap-2 w-full lg:w-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors text-sm whitespace-nowrap ${
                  showFilters 
                    ? "bg-purple-600 text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <FaFilter className="text-xs" />
                <span>{t('deals.filter')}</span>
              </button>
              
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [newSortBy, newSortOrder] = e.target.value.split('-');
                  setSortBy(newSortBy);
                  setSortOrder(newSortOrder);
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm bg-white"
              >
                <option value="discount-desc">{t('deals.sort.highDiscount')}</option>
                <option value="price-asc">{t('deals.sort.lowPrice')}</option>
                <option value="rating-desc">{t('deals.sort.highRating')}</option>
              </select>

              <div className="text-xs text-gray-600 font-medium hidden sm:block">
                {t('deals.productCount', { count: filteredAndSortedDeals.length })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Filters Panel - Simplified */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  {t('deals.filters.priceRange')}
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder={t('deals.filters.from')}
                    value={priceRange.min || ''}
                    onChange={(e) => setPriceRange({...priceRange, min: Number(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="number"
                    placeholder={t('deals.filters.to')}
                    value={priceRange.max === 100000000 ? '' : priceRange.max}
                    onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value) || 100000000})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  {t('deals.filters.discountRange')}
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder={t('deals.filters.from')}
                    value={discountRange.min || ''}
                    onChange={(e) => setDiscountRange({...discountRange, min: Number(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="number"
                    placeholder={t('deals.filters.to')}
                    value={discountRange.max === 100 ? '' : discountRange.max}
                    onChange={(e) => setDiscountRange({...discountRange, max: Number(e.target.value) || 100})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={resetFilters}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  {t('deals.filters.reset')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Deals Grid - Simplified */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Section Header - Simplified */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            {tabs.find(tab => tab.id === selectedTab)?.icon} {tabs.find(tab => tab.id === selectedTab)?.name}
          </h2>
          <p className="text-sm text-gray-500">
            {t('deals.displaying', { showing: filteredAndSortedDeals.length, total: allDeals.length })}
          </p>
        </div>

        {filteredAndSortedDeals.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-3">🔍</div>
            <h3 className="text-lg font-bold text-gray-700 mb-2">{t('deals.empty.title')}</h3>
            <p className="text-sm text-gray-500 mb-4">{t('deals.empty.description')}</p>
            <button
              onClick={resetFilters}
              className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
            >
              {t('deals.empty.resetFilters')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredAndSortedDeals.map(deal => (
              <div
                key={deal.id}
                className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => viewProductDetails(deal.id)}
              >
                <div className="relative">
                  {/* Discount Badge - Simplified */}
                  <div className="absolute top-2 left-2 z-10 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                    -{deal.discount}%
                  </div>
                  
                  {/* Favorite Button - Simplified */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(deal.id);
                    }}
                    className="absolute top-2 right-2 z-10 p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                  >
                    <FaHeart 
                      className={`text-sm ${favorites.has(deal.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} 
                    />
                  </button>
                  
                  {/* Time Left - Simplified */}
                  <div className="absolute bottom-2 left-2 z-10 bg-black/60 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                    <FaClock className="text-yellow-300" />
                    <span>{deal.timeLeft}</span>
                  </div>
                  
                  {/* Product Image - Simplified */}
                  <div className="aspect-square bg-gray-100 overflow-hidden">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={e => {
                        e.target.src = "https://via.placeholder.com/400x400?text=No+Image";
                      }}
                    />
                  </div>
                </div>

                <div className="p-3">
                  {/* Brand - Simplified */}
                  <div className="text-xs text-purple-600 font-medium mb-1 truncate">
                    {deal.brand}
                  </div>
                  
                  {/* Product Title - Simplified */}
                  <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
                    {deal.title}
                  </h3>

                  {/* Rating - Simplified */}
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`text-xs ${i < Math.floor(deal.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      {deal.rating}
                    </span>
                  </div>

                  {/* Price - Simplified */}
                  <div className="mb-3">
                    <div className="text-base font-bold text-purple-600">
                      {deal.salePrice.toLocaleString('vi-VN')} ₫
                    </div>
                    <div className="text-xs text-gray-400 line-through">
                      {deal.originalPrice.toLocaleString('vi-VN')} ₫
                    </div>
                  </div>

                  {/* Stock Warning - Simplified */}
                  {deal.stock < 10 && (
                    <div className="mb-2 p-2 bg-red-50 rounded text-xs">
                      <p className="text-red-600 font-medium">
                        {t('deals.stockWarning', { count: deal.stock })}
                      </p>
                    </div>
                  )}

                  {/* Action Button - Simplified */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      viewProductDetails(deal.id);
                    }}
                    className="w-full py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors text-sm flex items-center justify-center gap-2"
                  >
                    <FaShoppingCart className="text-xs" />
                    {t('deals.buyNow')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Deals;