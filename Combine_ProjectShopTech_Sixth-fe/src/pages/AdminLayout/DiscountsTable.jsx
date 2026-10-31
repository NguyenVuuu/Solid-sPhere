import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaSearch, FaFilter, FaTicketAlt, FaCalendarAlt, FaPercent, FaToggleOn, FaToggleOff, FaEnvelope } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useToast } from '../../components/Toast';
import { 
  fetchDiscounts, 
  fetchProducts, 
  createDiscount, 
  updateDiscount, 
  deleteDiscount, 
  activateDiscount, 
  deactivateDiscount,
  fetchActiveDiscounts,
  fetchExpiredDiscounts,
  fetchUpcomingDiscounts,
  fetchBestActiveDiscounts,
  fetchDiscountsByRateRange,
  fetchDiscountsByCategory,
  searchDiscountsByKeyword,
  deactivateExpiredDiscounts,
  sendDiscountEmail,
  sendBulkDiscountEmail,
  sendDiscountToAllCustomers,
  fetchAllCustomers
} from '../../apis/adminApi';

const DiscountsTable = ({ theme }) => {
  const { t } = useTranslation();
  const { showSuccess, showError, showWarning } = useToast();
  const [discounts, setDiscounts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    minRate: '',
    maxRate: '',
    categoryId: '',
    dateFrom: '',
    dateTo: ''
  });
  const [viewMode, setViewMode] = useState('all'); // all, active, expired, upcoming, best
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [loadingCustomers, setLoadingCustomers] = useState(false);
  const [showCustomerSelector, setShowCustomerSelector] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [isSelectAllMode, setIsSelectAllMode] = useState(false);

  // Theme colors
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const secondaryTextColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    type: 'PERCENTAGE', // Mặc định là PERCENTAGE
    description: '',
    discountRate: '',
    discountStatus: true,
    startDate: '',
    endDate: '',
    productId: ''
  });

  useEffect(() => {
    fetchDiscountsData();
    fetchProductsData();
  }, []);

  useEffect(() => {
    fetchDiscountsData();
  }, [viewMode]);

  const fetchDiscountsData = async () => {
    try {
      setLoading(true);
      let data;
      
      // Build URL based on view mode
      const today = new Date().toISOString().split('T')[0];
      
      switch (viewMode) {
        case 'active':
          data = await fetchActiveDiscounts(today);
          break;
        case 'expired':
          data = await fetchExpiredDiscounts(today);
          break;
        case 'upcoming': {
          const nextMonth = new Date();
          nextMonth.setMonth(nextMonth.getMonth() + 1);
          data = await fetchUpcomingDiscounts(today, nextMonth.toISOString().split('T')[0]);
          break;
        }
        case 'best':
          data = await fetchBestActiveDiscounts();
          break;
        default:
          data = await fetchDiscounts();
      }

      console.log('Discounts data:', data);
      setDiscounts(data);
    } catch (error) {
      console.error('Error fetching discounts:', error);
      setError(error.message);
      setDiscounts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsData = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const applyAdvancedFilters = async () => {
    try {
      setLoading(true);
      let data;
      
      // Apply advanced filters
      if (advancedFilters.minRate && advancedFilters.maxRate) {
        data = await fetchDiscountsByRateRange(advancedFilters.minRate, advancedFilters.maxRate);
      } else if (advancedFilters.categoryId) {
        data = await fetchDiscountsByCategory(advancedFilters.categoryId);
      } else if (searchTerm) {
        data = await searchDiscountsByKeyword(searchTerm);
      } else {
        data = await fetchDiscounts();
      }

      setDiscounts(data);
    } catch (error) {
      console.error('Error applying filters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkDeactivateExpired = async () => {
    try {
      const count = await deactivateExpiredDiscounts();
      showSuccess(`✅ Đã vô hiệu hóa ${count} discount hết hạn`, 4000, 'top-right');
      fetchDiscountsData();
    } catch (error) {
      console.error('Error deactivating expired discounts:', error);
      showError('❌ Lỗi khi vô hiệu hóa discount hết hạn: ' + (error.response?.data?.message || error.message), 5000, 'top-right');
    }
  };

  const filteredDiscounts = discounts.filter(discount => {
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'active' && discount.discountStatus) ||
      (filterStatus === 'inactive' && !discount.discountStatus);
    
    const matchesSearch = 
      discount.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discount.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discount.type?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Không cần filter type nữa vì chỉ dùng PERCENTAGE
    const matchesType = true; // Tất cả đều là PERCENTAGE
    
    return matchesStatus && matchesSearch && matchesType;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate discountRate
      const discountRateValue = parseFloat(formData.discountRate);
      if (isNaN(discountRateValue) || discountRateValue < 0 || discountRateValue > 1) {
        showError('Phần trăm giảm phải từ 0 đến 1 (0 = 0%, 0.3 = 30%, 1 = 100%)');
        return;
      }

      // Validate dates
      if (!formData.startDate || !formData.endDate) {
        showError('Vui lòng chọn ngày bắt đầu và ngày kết thúc');
        return;
      }

      // Validate date range
      if (new Date(formData.startDate) > new Date(formData.endDate)) {
        showError('Ngày bắt đầu không được lớn hơn ngày kết thúc');
        return;
      }

      // Xử lý productId: nếu là empty string thì set null, nếu có thì parse int
      let productIdValue = null;
      if (formData.productId) {
        // Chuyển productId sang string để xử lý (có thể là string hoặc number)
        const productIdStr = String(formData.productId).trim();
        if (productIdStr !== '') {
          const parsedId = parseInt(productIdStr);
          if (isNaN(parsedId)) {
            showError('ID sản phẩm không hợp lệ');
            return;
          }
          productIdValue = parsedId;
        }
      }

      const discountData = {
        name: formData.name.trim(),
        type: 'PERCENTAGE', // Luôn là PERCENTAGE
        description: formData.description ? formData.description.trim() : null,
        discountRate: discountRateValue,
        discountStatus: formData.discountStatus === 'true' || formData.discountStatus === true,
        startDate: formData.startDate,
        endDate: formData.endDate,
        productId: productIdValue
      };

      if (editingDiscount) {
        await updateDiscount(editingDiscount.id, discountData);
        showSuccess('Discount đã được cập nhật thành công!');
      } else {
        await createDiscount(discountData);
        showSuccess('Discount đã được tạo thành công!');
      }

      fetchDiscountsData();
      setShowForm(false);
      setEditingDiscount(null);
      setFormData({
        name: '',
        type: 'PERCENTAGE', // Mặc định là PERCENTAGE
        description: '',
        discountRate: '',
        discountStatus: true,
        startDate: '',
        endDate: '',
        productId: ''
      });
    } catch (error) {
      console.error('Error saving discount:', error);
      
      // Xử lý validation errors từ backend
      if (error.response?.data) {
        const errorData = error.response.data;
        
        // Kiểm tra nếu có validation errors trong result
        if (errorData.result && typeof errorData.result === 'object') {
          const validationErrors = errorData.result;
          
          // Hiển thị warning cho từng validation error
          Object.entries(validationErrors).forEach(([field, msg]) => {
            showWarning(`${field}: ${msg}`);
          });
        } else if (errorData.message) {
          // Hiển thị error message từ backend
          showError(errorData.message);
        } else {
          showError('Lỗi khi lưu discount');
        }
      } else {
        showError(error.message || 'Lỗi khi lưu discount');
      }
    }
  };

  const handleEdit = (discount) => {
    setEditingDiscount(discount);
    
    // Format discountRate để hiển thị trong form (luôn là PERCENTAGE)
    let displayDiscountRate = discount.discountRate || '';
    
    // Backend có thể trả về 30 (cho 30%) hoặc 0.3 (cho 30%)
    // Frontend form hiển thị: 0.3 (cho 30%)
    if (discount.discountRate) {
      if (discount.discountRate > 1) {
        displayDiscountRate = discount.discountRate / 100; // 30 -> 0.3
      } else {
        displayDiscountRate = discount.discountRate; // 0.3 -> 0.3
      }
    }
    
    setFormData({
      name: discount.name || '',
      type: 'PERCENTAGE', // Luôn là PERCENTAGE
      description: discount.description || '',
      discountRate: displayDiscountRate,
      discountStatus: discount.discountStatus,
      startDate: discount.startDate ? discount.startDate.split('T')[0] : '',
      endDate: discount.endDate ? discount.endDate.split('T')[0] : '',
      productId: discount.productId ? String(discount.productId) : '' // Chuyển sang string để tránh lỗi trim()
    });
    setShowForm(true);
    showSuccess('📝 Đã mở form chỉnh sửa discount', 2000, 'top-right');
  };

  // Ẩn function handleDelete vì không cho phép xóa discount
  // const handleDelete = async (discountId) => {
  //   if (window.confirm('Bạn có chắc chắn muốn xóa discount này?')) {
  //     try {
  //       await deleteDiscount(discountId);
  //       fetchDiscountsData();
  //       alert('Xóa discount thành công!');
  //     } catch (error) {
  //       console.error('Error deleting discount:', error);
  //       alert('Lỗi khi xóa discount');
  //     }
  //   }
  // };

  const handleToggleStatus = async (discountId, currentStatus) => {
    try {
      if (currentStatus) {
        await deactivateDiscount(discountId);
        showSuccess('✅ Đã vô hiệu hóa discount thành công!', 3000, 'top-right');
      } else {
        await activateDiscount(discountId);
        showSuccess('✅ Đã kích hoạt discount thành công!', 3000, 'top-right');
      }
      fetchDiscountsData();
    } catch (error) {
      console.error('Error updating status:', error);
      showError('❌ Lỗi khi cập nhật trạng thái: ' + (error.response?.data?.message || error.message), 5000, 'top-right');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const getProductName = (productId) => {
    if (!productId) return 'Tất cả sản phẩm';
    const product = products.find(p => p.id === productId);
    return product ? product.name : `Product #${productId}`;
  };

  const handleSendEmailClick = async (discount) => {
    setSelectedDiscount(discount);
    setShowEmailModal(true);
    setSelectedCustomers([]);
    setShowCustomerSelector(false);
    setIsSelectAllMode(false);
    
    // Load danh sách khách hàng
    try {
      setLoadingCustomers(true);
      const customersList = await fetchAllCustomers();
      setCustomers(customersList);
    } catch (error) {
      console.error('Error fetching customers:', error);
      showError('❌ Lỗi khi tải danh sách khách hàng', 3000, 'top-right');
    } finally {
      setLoadingCustomers(false);
    }
  };
  
  const handleSelectCustomers = () => {
    // Nếu đang ở chế độ "chọn tất cả", reset lại danh sách khi chuyển sang "chọn khách"
    if (isSelectAllMode) {
      setSelectedCustomers([]);
    }
    // Hiển thị danh sách để có thể chọn nhiều hoặc xóa
    setShowCustomerSelector(true);
    setIsSelectAllMode(false);
  };
  
  const handleSelectAllCustomers = () => {
    // Chọn tất cả khách hàng - không hiển thị bảng xanh
    const allEmails = customers.map(c => c.email).filter(e => e && e.trim() !== '');
    setSelectedCustomers(allEmails);
    setShowCustomerSelector(false);
    setIsSelectAllMode(true);
  };
  
  const toggleCustomerSelection = (email) => {
    // Toggle: nếu đã chọn thì xóa ra, chưa chọn thì thêm vào
    if (selectedCustomers.includes(email)) {
      // Xóa khỏi danh sách đã chọn
      setSelectedCustomers(selectedCustomers.filter(e => e !== email));
    } else {
      // Thêm vào danh sách đã chọn
      setSelectedCustomers([...selectedCustomers, email]);
    }
  };
  
  const removeSelectedCustomer = (email) => {
    // Xóa khách hàng khỏi danh sách đã chọn
    setSelectedCustomers(selectedCustomers.filter(e => e !== email));
  };
  
  const clearAllSelected = () => {
    // Xóa tất cả khách hàng đã chọn
    setSelectedCustomers([]);
  };

  const handleSendEmail = async () => {
    if (!selectedDiscount) return;
    
    if (selectedCustomers.length === 0) {
      showWarning('Vui lòng chọn ít nhất một khách hàng!', 3000, 'top-right');
      return;
    }
    
    try {
      setSendingEmail(true);
      
      if (selectedCustomers.length === 1) {
        // Gửi cho 1 khách hàng
        const customer = customers.find(c => c.email === selectedCustomers[0]);
        const response = await sendDiscountEmail(
          selectedDiscount.id,
          selectedCustomers[0],
          customer?.fullName || customer?.name || 'Quý khách'
        );
        showSuccess(response.message || '✅ Đã gửi email thành công!', 4000, 'top-right');
      } else {
        // Gửi cho nhiều khách hàng
        const response = await sendBulkDiscountEmail(selectedDiscount.id, selectedCustomers);
        showSuccess(response.message || `✅ Đã gửi email cho ${selectedCustomers.length} khách hàng!`, 4000, 'top-right');
      }
      
      setShowEmailModal(false);
      setSelectedDiscount(null);
      setSelectedCustomers([]);
      setShowCustomerSelector(false);
    } catch (error) {
      console.error('Error sending email:', error);
      showError('❌ Lỗi khi gửi email: ' + (error.response?.data?.message || error.message), 5000, 'top-right');
    } finally {
      setSendingEmail(false);
    }
  };

  if (loading) {
    return (
      <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className={`text-2xl font-bold ${textColor} mb-2`}>Quản lý Discount Nâng Cao</h2>
            <p className={secondaryTextColor}>Quản lý các chương trình giảm giá và khuyến mãi</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleBulkDeactivateExpired}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <FaCalendarAlt />
              Vô hiệu hóa hết hạn
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <FaPlus />
              Thêm Discount
            </button>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { key: 'all', label: 'Tất cả', icon: FaTicketAlt },
            { key: 'active', label: 'Đang hoạt động', icon: FaToggleOn },
            { key: 'expired', label: 'Hết hạn', icon: FaCalendarAlt },
            { key: 'upcoming', label: 'Sắp tới', icon: FaCalendarAlt },
            { key: 'best', label: 'Tốt nhất', icon: FaPercent }
          ].map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setViewMode(key)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                viewMode === key
                  ? 'bg-blue-600 text-white'
                  : theme === 'dark'
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {React.createElement(icon, { size: 14 })}
              {label}
            </button>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm discount..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`px-4 py-2 border rounded-lg ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang hoạt động</option>
            <option value="inactive">Không hoạt động</option>
          </select>

          {/* Ẩn filter type vì chỉ dùng PERCENTAGE */}

          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`px-4 py-2 border rounded-lg flex items-center gap-2 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
            }`}
          >
            <FaFilter />
            Bộ lọc nâng cao
          </button>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className={`mt-4 p-4 rounded-lg border ${
            theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${textColor}`}>
                  Tỷ lệ giảm giá từ (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={advancedFilters.minRate}
                  onChange={(e) => setAdvancedFilters({...advancedFilters, minRate: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${textColor}`}>
                  Tỷ lệ giảm giá đến (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={advancedFilters.maxRate}
                  onChange={(e) => setAdvancedFilters({...advancedFilters, maxRate: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${textColor}`}>
                  Danh mục sản phẩm
                </label>
                <select
                  value={advancedFilters.categoryId}
                  onChange={(e) => setAdvancedFilters({...advancedFilters, categoryId: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Tất cả danh mục</option>
                  <option value="1">Monitors</option>
                  <option value="2">Laptops</option>
                  <option value="3">Phones</option>
                  <option value="4">Mice</option>
                  <option value="5">Keyboards</option>
                  <option value="6">Processors</option>
                  <option value="7">Storage</option>
                  <option value="8">RAM</option>
                  <option value="9">Headphones</option>
                  <option value="10">Cases</option>
                  <option value="11">PCs</option>
                  <option value="12">PSUs</option>
                  <option value="13">Mainboards</option>
                  <option value="14">Mousepads</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setAdvancedFilters({
                    minRate: '',
                    maxRate: '',
                    categoryId: '',
                    dateFrom: '',
                    dateTo: ''
                  });
                  setViewMode('all');
                  fetchDiscountsData();
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Xóa bộ lọc
              </button>
              <button
                onClick={applyAdvancedFilters}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Áp dụng bộ lọc
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`p-4 rounded-lg ${cardBg} border ${borderColor}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${secondaryTextColor}`}>Tổng Discount</p>
              <p className={`text-2xl font-bold ${textColor}`}>{discounts.length}</p>
            </div>
            <FaTicketAlt className="text-blue-600 text-xl" />
          </div>
        </div>

        <div className={`p-4 rounded-lg ${cardBg} border ${borderColor}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${secondaryTextColor}`}>Đang hoạt động</p>
              <p className={`text-2xl font-bold ${textColor}`}>
                {discounts.filter(d => d.discountStatus).length}
              </p>
            </div>
            <FaToggleOn className="text-green-600 text-xl" />
          </div>
        </div>

        <div className={`p-4 rounded-lg ${cardBg} border ${borderColor}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${secondaryTextColor}`}>Đã hết hạn</p>
              <p className={`text-2xl font-bold ${textColor}`}>
                {discounts.filter(d => !d.discountStatus).length}
              </p>
            </div>
            <FaToggleOff className="text-red-600 text-xl" />
          </div>
        </div>

        <div className={`p-4 rounded-lg ${cardBg} border ${borderColor}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${secondaryTextColor}`}>Giảm giá TB</p>
              <p className={`text-2xl font-bold ${textColor}`}>
                {discounts.length > 0 ? 
                  (() => {
                    // Tính trung bình cho tất cả discounts (tất cả đều là PERCENTAGE)
                    const avg = discounts.reduce((sum, d) => {
                      const rate = d.discountRate || 0;
                      // Nếu rate <= 1 thì là decimal (0.3), convert sang phần trăm (30)
                      const percentage = rate <= 1 ? rate * 100 : rate;
                      return sum + percentage;
                    }, 0) / discounts.length;
                    return avg.toFixed(1) + '%';
                  })()
                  : '0%'}
              </p>
            </div>
            <FaPercent className="text-purple-600 text-xl" />
          </div>
        </div>
      </div>


      {/* Discounts Table */}
      <div className={`rounded-lg ${cardBg} border ${borderColor} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <tr>
                <th className={`px-4 py-3 text-left text-xs font-medium ${secondaryTextColor} uppercase tracking-wider`}>
                  Tên Discount
                </th>
                <th className={`px-4 py-3 text-left text-xs font-medium ${secondaryTextColor} uppercase tracking-wider`}>
                  Loại
                </th>
                <th className={`px-4 py-3 text-left text-xs font-medium ${secondaryTextColor} uppercase tracking-wider`}>
                  Tỷ lệ giảm
                </th>
                <th className={`px-4 py-3 text-left text-xs font-medium ${secondaryTextColor} uppercase tracking-wider`}>
                  Sản phẩm
                </th>
                <th className={`px-4 py-3 text-left text-xs font-medium ${secondaryTextColor} uppercase tracking-wider`}>
                  Thời gian
                </th>
                <th className={`px-4 py-3 text-left text-xs font-medium ${secondaryTextColor} uppercase tracking-wider`}>
                  Trạng thái
                </th>
                <th className={`px-4 py-3 text-left text-xs font-medium ${secondaryTextColor} uppercase tracking-wider`}>
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${borderColor}`}>
              {filteredDiscounts.map((discount) => (
                <tr key={discount.id} className={`hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <td className="px-4 py-4">
                    <div>
                      <div className={`text-sm font-medium ${textColor}`}>{discount.name}</div>
                      <div className={`text-sm ${secondaryTextColor}`}>{discount.description}</div>
                    </div>
                  </td>
                  <td className={`px-4 py-4 whitespace-nowrap text-sm ${textColor}`}>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700`}>
                      Phần trăm
                    </span>
                  </td>
                  <td className={`px-4 py-4 whitespace-nowrap text-sm ${textColor}`}>
                    <div className="flex items-center gap-1">
                      <FaPercent className="text-purple-600" />
                      <span className="font-medium">
                        {(discount.discountRate <= 1 ? discount.discountRate * 100 : discount.discountRate).toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className={`px-4 py-4 whitespace-nowrap text-sm ${textColor}`}>
                    {getProductName(discount.productId)}
                  </td>
                  <td className={`px-4 py-4 whitespace-nowrap text-sm ${textColor}`}>
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="text-gray-400" />
                      <div>
                        <div>Từ: {formatDate(discount.startDate)}</div>
                        <div>Đến: {formatDate(discount.endDate)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleStatus(discount.id, discount.discountStatus)}
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        discount.discountStatus 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {discount.discountStatus ? 'Hoạt động' : 'Không hoạt động'}
                    </button>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(discount)}
                        className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                      >
                        <FaEdit />
                        Sửa
                      </button>
                      <button
                        onClick={() => handleSendEmailClick(discount)}
                        className="text-purple-600 hover:text-purple-900 flex items-center gap-1"
                      >
                        <FaEnvelope />
                        Gửi Email
                      </button>
                      {/* Ẩn nút xóa - chỉ cho phép cập nhật trạng thái */}
                      {/* <button
                        onClick={() => handleDelete(discount.id)}
                        className="text-red-600 hover:text-red-900 flex items-center gap-1"
                      >
                        <FaTrash />
                        Xóa
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDiscounts.length === 0 && (
          <div className="text-center py-8">
            <FaTicketAlt className="mx-auto text-gray-400 text-4xl mb-4" />
            <h3 className={`text-lg font-medium ${textColor} mb-2`}>Không tìm thấy discount nào</h3>
            <p className={secondaryTextColor}>Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg ${cardBg} border ${borderColor} max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto`}>
            <h3 className={`text-lg font-bold ${textColor} mb-4`}>
              {editingDiscount ? 'Sửa Discount' : 'Thêm Discount mới'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${textColor} mb-1`}>Tên Discount</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`w-full px-3 py-2 border ${borderColor} rounded-lg focus:border-blue-500 focus:outline-none ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                  required
                />
              </div>

              {/* Ẩn field type vì chỉ dùng PERCENTAGE */}
              <input type="hidden" value="PERCENTAGE" />

              <div>
                <label className={`block text-sm font-medium ${textColor} mb-1`}>Mô tả</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className={`w-full px-3 py-2 border ${borderColor} rounded-lg focus:border-blue-500 focus:outline-none ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                  rows="3"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${textColor} mb-1`}>
                  Phần trăm giảm (%)
                </label>
                <input
                  type="number"
                  value={formData.discountRate}
                  onChange={(e) => setFormData({...formData, discountRate: e.target.value})}
                  className={`w-full px-3 py-2 border ${borderColor} rounded-lg focus:border-blue-500 focus:outline-none ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                  required
                  min="0"
                  max="1"
                  step="0.1"
                  placeholder="VD: 0.3 (cho 30%)"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${textColor} mb-1`}>Sản phẩm</label>
                <select
                  value={formData.productId}
                  onChange={(e) => setFormData({...formData, productId: e.target.value})}
                  className={`w-full px-3 py-2 border ${borderColor} rounded-lg focus:border-blue-500 focus:outline-none ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                >
                  <option value="">Tất cả sản phẩm</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>{product.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${textColor} mb-1`}>Ngày bắt đầu</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className={`w-full px-3 py-2 border ${borderColor} rounded-lg focus:border-blue-500 focus:outline-none ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${textColor} mb-1`}>Ngày kết thúc</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    className={`w-full px-3 py-2 border ${borderColor} rounded-lg focus:border-blue-500 focus:outline-none ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="discountStatus"
                  checked={formData.discountStatus}
                  onChange={(e) => setFormData({...formData, discountStatus: e.target.checked})}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="discountStatus" className={`text-sm font-medium ${textColor}`}>
                  Kích hoạt discount
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingDiscount(null);
                    setFormData({
                      name: '',
                      type: '',
                      description: '',
                      discountRate: '',
                      discountStatus: true,
                      startDate: '',
                      endDate: '',
                      productId: ''
                    });
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {editingDiscount ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Gửi Email Tri Ân Khách Hàng */}
      {showEmailModal && selectedDiscount && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)'
          }}
        >
          <div className={`${cardBg} rounded-lg p-6 w-full max-w-2xl border ${borderColor} shadow-xl`}>
            <div>
              <h3 className={`text-xl font-bold ${textColor} mb-4 flex items-center gap-2`}>
                <FaEnvelope />
                Gửi Mã Khuyến Mãi Tri Ân
              </h3>
              
              <div className={`mb-4 p-3 rounded-lg border ${borderColor} ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-sm font-medium ${textColor}`}>
                  <strong>Khuyến mãi:</strong> {selectedDiscount.name}
                </p>
                <p className={`text-sm ${secondaryTextColor}`}>
                  Giảm giá: {(selectedDiscount.discountRate <= 1 ? selectedDiscount.discountRate * 100 : selectedDiscount.discountRate).toFixed(1)}%
                </p>
              </div>

              <div className="space-y-4 mb-4">
                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleSelectCustomers}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <FaEnvelope />
                    Chọn Khách
                  </button>
                  <button
                    type="button"
                    onClick={handleSelectAllCustomers}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <FaEnvelope />
                    Chọn Tất Cả Khách
                  </button>
                </div>

                {/* Hiển thị danh sách đã chọn và có thể xóa - CHỈ khi không phải "chọn tất cả" */}
                {selectedCustomers.length > 0 && !isSelectAllMode && (
                  <div className={`p-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <p className={`text-sm font-medium ${textColor}`}>
                        ✓ Đã chọn: <strong>{selectedCustomers.length}</strong> khách hàng
                      </p>
                      <button
                        type="button"
                        onClick={clearAllSelected}
                        className="text-xs text-gray-600 hover:text-gray-800 underline"
                      >
                        Xóa tất cả
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedCustomers.map((email) => {
                        const customer = customers.find(c => c.email === email);
                        return (
                          <div
                            key={email}
                            className={`flex items-center gap-1 px-2 py-1 rounded-md border text-xs ${theme === 'dark' ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'}`}
                          >
                            <span className={textColor}>
                              {customer?.fullName || customer?.name || email}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeSelectedCustomer(email)}
                              className="text-gray-600 hover:text-gray-800 ml-1 font-bold"
                              title="Xóa khỏi danh sách"
                            >
                              ×
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Danh sách khách hàng để chọn */}
                {showCustomerSelector && (
                  <div className={`max-h-96 overflow-y-auto border ${borderColor} rounded-lg p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    {loadingCustomers ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className={`ml-3 ${textColor}`}>Đang tải danh sách khách hàng...</span>
                      </div>
                    ) : customers.length === 0 ? (
                      <p className={`text-center py-8 ${secondaryTextColor}`}>Không có khách hàng nào</p>
                    ) : (
                      <div className="space-y-2">
                        {customers.map((customer) => {
                          const isSelected = selectedCustomers.includes(customer.email);
                          return (
                            <label
                              key={customer.id || customer.email}
                              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                                isSelected
                                  ? `${theme === 'dark' ? 'bg-gray-700 border-2 border-blue-500' : 'bg-blue-50 border-2 border-blue-500'}`
                                  : `border ${borderColor} ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleCustomerSelection(customer.email)}
                                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                              />
                              <div className="flex-1">
                                <p className={`font-medium ${textColor}`}>
                                  {customer.fullName || customer.name || 'Khách hàng'}
                                </p>
                                <p className={`text-sm ${secondaryTextColor}`}>
                                  {customer.email}
                                </p>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowEmailModal(false);
                    setSelectedDiscount(null);
                    setSelectedCustomers([]);
                    setShowCustomerSelector(false);
                    setIsSelectAllMode(false);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  disabled={sendingEmail}
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleSendEmail}
                  disabled={sendingEmail || selectedCustomers.length === 0}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {sendingEmail ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <FaEnvelope />
                      Gửi Email ({selectedCustomers.length})
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscountsTable;
