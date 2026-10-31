import React, { useState } from 'react';
import { FaTicketAlt, FaPlus, FaSearch, FaFilter, FaClock, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const DiscountsPage = () => {
  const { t } = useTranslation();

  const [discounts, setDiscounts] = useState([
    {
      id: 1,
      code: "SPRING2025",
      name: "Spring Sale 2025",
      description: "Giảm giá mùa xuân cho tất cả sản phẩm",
      discountType: "percentage",
      discountValue: 20,
      startDate: "2025-03-01",
      endDate: "2025-03-31",
      status: "active",
      usedCount: 145,
      maxUsage: 500
    },
    {
      id: 2,
      code: "NEWUSER50",
      name: "New Customer Discount",
      description: "Giảm 50K cho khách hàng mới",
      discountType: "fixed",
      discountValue: 50000,
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      status: "active",
      usedCount: 89,
      maxUsage: 1000
    },
    {
      id: 3,
      code: "BLACKFRIDAY",
      name: "Black Friday 2024",
      description: "Giảm giá khủng Black Friday",
      discountType: "percentage",
      discountValue: 50,
      startDate: "2024-11-29",
      endDate: "2024-11-30",
      status: "expired",
      usedCount: 234,
      maxUsage: 300
    }
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [newDiscount, setNewDiscount] = useState({
    code: '',
    name: '',
    description: '',
    discountType: 'percentage',
    discountValue: '',
    startDate: '',
    endDate: '',
    maxUsage: ''
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'expired':
        return 'bg-red-100 text-red-700';
      case 'scheduled':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <FaCheckCircle />;
      case 'expired':
        return <FaExclamationCircle />;
      case 'scheduled':
        return <FaClock />;
      default:
        return null;
    }
  };

  const filteredDiscounts = discounts.filter(discount => {
    const matchesSearch = discount.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discount.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || discount.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreateDiscount = () => {
    // Add discount creation logic here
    setIsCreateModalOpen(false);
    setNewDiscount({
      code: '',
      name: '',
      description: '',
      discountType: 'percentage',
      discountValue: '',
      startDate: '',
      endDate: '',
      maxUsage: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-black via-gray-900 to-purple-950 text-white rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">{t('common.discount_codes')}</h1>
              <p className="text-purple-200">{t('common.create_and_manage_promotional')}</p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-6 py-3 bg-white text-purple-900 rounded-lg font-semibold hover:bg-purple-50 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <FaPlus />
              Create New
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{t('common.total_codes')}</p>
                <p className="text-3xl font-bold text-gray-900">{discounts.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <FaTicketAlt className="text-purple-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{t('remaining.active')}</p>
                <p className="text-3xl font-bold text-gray-900">
                  {discounts.filter(d => d.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FaCheckCircle className="text-green-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{t('common.total_uses')}</p>
                <p className="text-3xl font-bold text-gray-900">
                  {discounts.reduce((sum, d) => sum + d.usedCount, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FaTicketAlt className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{t('common.expired')}</p>
                <p className="text-3xl font-bold text-gray-900">
                  {discounts.filter(d => d.status === 'expired').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <FaExclamationCircle className="text-red-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={t('common.search_by_code_or')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-600" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none bg-white"
              >
                <option value="all">{t('common.all_status')}</option>
                <option value="active">{t('remaining.active')}</option>
                <option value="expired">{t('common.expired')}</option>
                <option value="scheduled">{t('common.scheduled')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Discounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDiscounts.map((discount) => (
            <div key={discount.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <FaTicketAlt className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">{discount.code}</h3>
                      <p className="text-purple-100 text-sm">{discount.name}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(discount.status)}`}>
                    {getStatusIcon(discount.status)}
                    {discount.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-700 mb-4">{discount.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-purple-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">{t('common.discount_value')}</p>
                    <p className="font-bold text-purple-900">
                      {discount.discountType === 'percentage' 
                        ? `${discount.discountValue}%` 
                        : `${discount.discountValue.toLocaleString('vi-VN')}₫`}
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">{t('common.usage')}</p>
                    <p className="font-bold text-blue-900">
                      {discount.usedCount} / {discount.maxUsage}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{t('common.valid_period')}</span>
                    <span className="font-semibold text-gray-900">
                      {discount.startDate} → {discount.endDate}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all">{t('account.edit')}</button>
                  <button className="flex-1 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-all">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDiscounts.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTicketAlt className="text-gray-400 text-4xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t('common.no_discount_codes_found')}</h3>
            <p className="text-gray-600 mb-4">{t('common.try_adjusting_your_filters')}</p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:opacity-90 transition-all inline-flex items-center gap-2"
            >
              <FaPlus />
              Create New Discount
            </button>
          </div>
        )}

        {/* Create Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 pt-28">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
                <h2 className="text-2xl font-bold">{t('common.create_new_discount_code')}</h2>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{t('common.discount_code')}</label>
                      <input
                        type="text"
                        placeholder={t('common.eg_summer2025')}
                        value={newDiscount.code}
                        onChange={(e) => setNewDiscount({...newDiscount, code: e.target.value})}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{t('common.discount_name')}</label>
                      <input
                        type="text"
                        placeholder={t('common.eg_summer_sale')}
                        value={newDiscount.name}
                        onChange={(e) => setNewDiscount({...newDiscount, name: e.target.value})}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('remaining.description')}</label>
                    <textarea
                      placeholder={t('common.describe_the_discount')}
                      value={newDiscount.description}
                      onChange={(e) => setNewDiscount({...newDiscount, description: e.target.value})}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                      rows="3"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{t('common.discount_type')}</label>
                      <select
                        value={newDiscount.discountType}
                        onChange={(e) => setNewDiscount({...newDiscount, discountType: e.target.value})}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none bg-white"
                      >
                        <option value="percentage">{t('common.percentage')}</option>
                        <option value="fixed">{t('common.fixed_amount')}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{t('common.discount_value')}</label>
                      <input
                        type="number"
                        placeholder={newDiscount.discountType === 'percentage' ? '20' : '50000'}
                        value={newDiscount.discountValue}
                        onChange={(e) => setNewDiscount({...newDiscount, discountValue: e.target.value})}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{t('common.start_date')}</label>
                      <input
                        type="date"
                        value={newDiscount.startDate}
                        onChange={(e) => setNewDiscount({...newDiscount, startDate: e.target.value})}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{t('common.end_date')}</label>
                      <input
                        type="date"
                        value={newDiscount.endDate}
                        onChange={(e) => setNewDiscount({...newDiscount, endDate: e.target.value})}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('common.maximum_usage')}</label>
                    <input
                      type="number"
                      placeholder={t('common.eg_1000')}
                      value={newDiscount.maxUsage}
                      onChange={(e) => setNewDiscount({...newDiscount, maxUsage: e.target.value})}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleCreateDiscount}
                    className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all"
                  >{t('common.create_discount')}</button>
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscountsPage;

// Updated: 2025-10-12T16:06:24.876Z

// Updated: 2025-10-12T16:08:59.451Z
