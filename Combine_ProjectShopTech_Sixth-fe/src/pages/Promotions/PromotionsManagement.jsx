import { useState } from 'react';
import { FaTags, FaPercent, FaCalendarAlt, FaFire, FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaSearch } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const PromotionsManagement = () => {
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const promotions = [
    {
      id: 'PROMO-001',
      name: 'Flash Sale - Gaming Laptops',
      code: 'GAMING25',
      discountType: 'percentage',
      discountValue: 25,
      startDate: '2025-10-15',
      endDate: '2025-10-20',
      status: 'active',
      usageLimit: 100,
      usageCount: 45,
      minPurchase: 10000000,
      applicableProducts: ['Laptops', 'Gaming'],
      description: '25% off all gaming laptops'
    },
    {
      id: 'PROMO-002',
      name: 'New Customer Welcome',
      code: 'WELCOME50',
      discountType: 'fixed',
      discountValue: 500000,
      startDate: '2025-10-01',
      endDate: '2025-12-31',
      status: 'active',
      usageLimit: 1000,
      usageCount: 234,
      minPurchase: 3000000,
      applicableProducts: [t('common.all')],
      description: '500k off for new customers'
    },
    {
      id: 'PROMO-003',
      name: 'Black Friday Mega Sale',
      code: 'BLACKFRI40',
      discountType: 'percentage',
      discountValue: 40,
      startDate: '2025-11-25',
      endDate: '2025-11-30',
      status: 'scheduled',
      usageLimit: 500,
      usageCount: 0,
      minPurchase: 15000000,
      applicableProducts: [t('common.all')],
      description: '40% off everything - Black Friday special'
    },
    {
      id: 'PROMO-004',
      name: 'Back to School',
      code: 'SCHOOL15',
      discountType: 'percentage',
      discountValue: 15,
      startDate: '2025-08-01',
      endDate: '2025-09-15',
      status: 'expired',
      usageLimit: 200,
      usageCount: 189,
      minPurchase: 5000000,
      applicableProducts: ['Laptops', 'Tablets'],
      description: '15% off laptops and tablets'
    },
    {
      id: 'PROMO-005',
      name: 'VIP Members Exclusive',
      code: 'VIPMEMBER',
      discountType: 'percentage',
      discountValue: 30,
      startDate: '2025-10-01',
      endDate: '2025-12-31',
      status: 'active',
      usageLimit: null,
      usageCount: 78,
      minPurchase: 0,
      applicableProducts: [t('common.all')],
      description: 'Exclusive 30% discount for VIP members'
    }
  ];

  const statusConfig = {
    all: { label: t('deals.all_promotions'), color: 'gray' },
    active: { label: t('common.active'), color: 'green' },
    scheduled: { label: t('common.scheduled'), color: 'blue' },
    expired: { label: t('common.expired'), color: 'red' }
  };

  const filteredPromotions = promotions.filter(promo => {
    const matchesStatus = filterStatus === 'all' || promo.status === filterStatus;
    const matchesSearch = 
      promo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status) => {
    const config = {
      active: { label: t('common.active'), color: 'bg-green-100 text-green-800 border-green-300', icon: FaToggleOn },
      scheduled: { label: t('common.scheduled'), color: 'bg-blue-100 text-blue-800 border-blue-300', icon: FaCalendarAlt },
      expired: { label: t('common.expired'), color: 'bg-red-100 text-red-800 border-red-300', icon: FaToggleOff }
    };

    const Icon = config[status].icon;

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${config[status].color}`}>
        <Icon />
        {config[status].label}
      </span>
    );
  };

  const getUsagePercentage = (promo) => {
    if (!promo.usageLimit) return 0;
    return Math.round((promo.usageCount / promo.usageLimit) * 100);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-purple-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <FaTags className="text-6xl mb-4 text-purple-400" />
              <h1 className="text-5xl font-bold mb-3">{t('deals.promotions_management')}</h1>
              <p className="text-xl text-purple-300">{t('deals.create_and_manage_promotional')}</p>
            </div>
            <button className="bg-white text-purple-900 px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg flex items-center gap-2">
              <FaPlus />
{t('deals.create_new_promotion')}
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-3 mb-6">
            {Object.entries(statusConfig).map(([key, config]) => {
              const count = key === 'all' ? promotions.length : promotions.filter(p => p.status === key).length;
              return (
                <button
                  key={key}
                  onClick={() => setFilterStatus(key)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    filterStatus === key
                      ? 'bg-gradient-to-r from-purple-900 to-purple-950 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-purple-600'
                  }`}
                >
                  {config.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t('deals.search_by_promotion_name')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Promotions Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPromotions.map(promo => (
            <div 
              key={promo.id}
              className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-900 to-purple-950 text-white p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm opacity-75">{promo.id}</span>
                  {promo.status === 'active' && <FaFire className="text-orange-400 text-xl animate-pulse" />}
                </div>
                <h3 className="font-bold text-xl mb-2">{promo.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">
                    {promo.discountType === 'percentage' ? `${promo.discountValue}%` : `${(promo.discountValue / 1000).toFixed(0)}K`}
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg font-mono font-bold">
                    {promo.code}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4">
                {/* Status */}
                <div className="flex items-center justify-between mb-4">
                  {getStatusBadge(promo.status)}
                  <span className="text-xs text-gray-600">
                    {promo.usageCount} / {promo.usageLimit || '∞'} {t('deals.used')}
                  </span>
                </div>

                {/* Usage Progress */}
                {promo.usageLimit && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>{t('deals.usage')}</span>
                      <span>{getUsagePercentage(promo)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-600 to-purple-800 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${getUsagePercentage(promo)}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 italic">
                  {promo.description}
                </p>

                {/* Details */}
                <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-2 text-sm">
                    <FaCalendarAlt className="text-purple-600" />
                    <span className="text-gray-700">
                      {new Date(promo.startDate).toLocaleDateString('vi-VN')} - {new Date(promo.endDate).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FaPercent className="text-purple-600" />
                    <span className="text-gray-700">
                      {t('deals.min_purchase')}: {promo.minPurchase.toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FaTags className="text-purple-600" />
                    <span className="text-gray-700">
                      {promo.applicableProducts.join(', ')}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm font-semibold">
                    <FaEdit />{t('account.edit')}</button>
                  <button className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 text-sm font-semibold">
                    <FaTrash />
{t('common.delete')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPromotions.length === 0 && (
          <div className="text-center py-12">
            <FaTags className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('deals.no_promotions_found')}</h3>
            <p className="text-gray-600">{t('customer.try_adjusting_your_filters')}</p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
            <FaToggleOn className="text-4xl mb-3" />
            <p className="text-3xl font-bold">{promotions.filter(p => p.status === 'active').length}</p>
            <p className="text-green-100">{t('deals.active_promotions')}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
            <FaCalendarAlt className="text-4xl mb-3" />
            <p className="text-3xl font-bold">{promotions.filter(p => p.status === 'scheduled').length}</p>
            <p className="text-blue-100">{t('common.scheduled')}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
            <FaTags className="text-4xl mb-3" />
            <p className="text-3xl font-bold">{promotions.length}</p>
            <p className="text-purple-100">{t('deals.total_campaigns')}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-lg">
            <FaFire className="text-4xl mb-3" />
            <p className="text-3xl font-bold">{promotions.reduce((sum, p) => sum + p.usageCount, 0)}</p>
            <p className="text-orange-100">{t('deals.total_usage')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionsManagement;
