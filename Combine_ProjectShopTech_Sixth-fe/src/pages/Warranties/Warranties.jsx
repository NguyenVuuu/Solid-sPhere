import { useState } from 'react';
import { FaShieldAlt, FaCheckCircle, FaClock, FaTimes, FaFileAlt, FaPhone, FaSearch } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Warranties = () => {
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const warranties = [
    {
      id: 'WRT-001',
      productName: 'Dell XPS 15 Laptop',
      productId: 'PRD-1234',
      customer: 'Nguyễn Văn A',
      purchaseDate: '2024-01-15',
      warrantyStart: '2024-01-15',
      warrantyEnd: '2027-01-15',
      duration: '36 months',
      status: 'active',
      type: 'Full Warranty',
      serialNumber: 'DXS123456789',
      claimCount: 0
    },
    {
      id: 'WRT-002',
      productName: 'ASUS ROG Strix Gaming Mouse',
      productId: 'PRD-5678',
      customer: 'Trần Thị B',
      purchaseDate: '2024-06-20',
      warrantyStart: '2024-06-20',
      warrantyEnd: '2026-06-20',
      duration: '24 months',
      status: 'active',
      type: 'Standard Warranty',
      serialNumber: 'ASM987654321',
      claimCount: 1
    },
    {
      id: 'WRT-003',
      productName: 'LG UltraWide Monitor 34"',
      productId: 'PRD-9012',
      customer: 'Lê Văn C',
      purchaseDate: '2023-03-10',
      warrantyStart: '2023-03-10',
      warrantyEnd: '2025-03-10',
      duration: '24 months',
      status: 'claimed',
      type: 'Standard Warranty',
      serialNumber: 'LGM456789012',
      claimCount: 2
    },
    {
      id: 'WRT-004',
      productName: 'Logitech MX Keys Keyboard',
      productId: 'PRD-3456',
      customer: 'Phạm Thị D',
      purchaseDate: '2022-08-05',
      warrantyStart: '2022-08-05',
      warrantyEnd: '2023-08-05',
      duration: '12 months',
      status: 'expired',
      type: 'Standard Warranty',
      serialNumber: 'LTK234567890',
      claimCount: 0
    },
    {
      id: 'WRT-005',
      productName: 'Samsung 980 PRO SSD 1TB',
      productId: 'PRD-7890',
      customer: 'Hoàng Văn E',
      purchaseDate: '2024-09-12',
      warrantyStart: '2024-09-12',
      warrantyEnd: '2029-09-12',
      duration: '60 months',
      status: 'active',
      type: t('warranty.extended'),
      serialNumber: 'SSS567890123',
      claimCount: 0
    }
  ];

  const statusConfig = {
    all: { label: 'All Warranties', color: 'gray', count: warranties.length },
    active: { label: t('common.active'), color: 'green', count: warranties.filter(w => w.status === 'active').length },
    claimed: { label: 'Claimed', color: 'yellow', count: warranties.filter(w => w.status === 'claimed').length },
    expired: { label: 'Expired', color: 'red', count: warranties.filter(w => w.status === 'expired').length }
  };

  const filteredWarranties = warranties.filter(warranty => {
    const matchesStatus = filterStatus === 'all' || warranty.status === filterStatus;
    const matchesSearch = 
      warranty.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      warranty.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      warranty.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      warranty.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status) => {
    const config = {
      active: { label: t('common.active'), color: 'bg-green-100 text-green-800 border-green-300', icon: FaCheckCircle },
      claimed: { label: 'Claimed', color: 'bg-yellow-100 text-yellow-800 border-yellow-300', icon: FaClock },
      expired: { label: 'Expired', color: 'bg-red-100 text-red-800 border-red-300', icon: FaTimes }
    };

    const Icon = config[status].icon;

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${config[status].color}`}>
        <Icon className="text-xs" />
        {config[status].label}
      </span>
    );
  };

  const getRemainingTime = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Expired';
    if (diffDays < 30) return `${diffDays} days left`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months left`;
    return `${Math.floor(diffDays / 365)} years left`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-purple-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <FaShieldAlt className="text-6xl mb-4 text-purple-400" />
              <h1 className="text-5xl font-bold mb-3">{t('common.warranty_management')}</h1>
              <p className="text-xl text-purple-300">{t('common.track_and_manage_product')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-center">
                <p className="text-purple-300 text-sm mb-1">{t('common.active_warranties')}</p>
                <p className="text-4xl font-bold">{warranties.filter(w => w.status === 'active').length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-4 mb-6">
            {Object.entries(statusConfig).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setFilterStatus(key)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  filterStatus === key
                    ? 'bg-gradient-to-r from-purple-900 to-purple-950 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-purple-600'
                }`}
              >
                {config.label} ({config.count})
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t('common.search_by_warranty_id')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Warranties Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWarranties.map(warranty => (
            <div 
              key={warranty.id}
              className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-900 to-purple-950 text-white p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-lg">{warranty.id}</span>
                  <FaShieldAlt className="text-2xl" />
                </div>
                <h3 className="font-bold text-xl mb-1">{warranty.productName}</h3>
                <p className="text-purple-200 text-sm">SN: {warranty.serialNumber}</p>
              </div>

              {/* Body */}
              <div className="p-4">
                {/* Status */}
                <div className="flex items-center justify-between mb-4">
                  {getStatusBadge(warranty.status)}
                  <span className={`text-sm font-semibold ${
                    warranty.status === 'expired' ? 'text-red-600' : 
                    warranty.status === 'claimed' ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {getRemainingTime(warranty.warrantyEnd)}
                  </span>
                </div>

                {/* Customer */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">{t('common.customer')}</p>
                  <p className="font-semibold text-gray-900">{warranty.customer}</p>
                </div>

                {/* Warranty Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t('common.type')}</span>
                    <span className="font-semibold text-purple-600">{warranty.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t('common.duration')}</span>
                    <span className="font-semibold text-gray-900">{warranty.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t('remaining.start_date')}</span>
                    <span className="font-semibold text-gray-900">
                      {new Date(warranty.warrantyStart).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t('remaining.end_date')}</span>
                    <span className="font-semibold text-gray-900">
                      {new Date(warranty.warrantyEnd).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t('common.claims')}</span>
                    <span className={`font-semibold ${warranty.claimCount > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                      {warranty.claimCount} claim{warranty.claimCount !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 text-sm font-semibold">
                    <FaFileAlt />{t('search.view_details')}</button>
                  {warranty.status === 'active' && (
                    <button className="flex-1 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 text-sm font-semibold">
                      <FaPhone />
                      Claim
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredWarranties.length === 0 && (
          <div className="text-center py-12">
            <FaShieldAlt className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('common.no_warranties_found')}</h3>
            <p className="text-gray-600">{t('customer.try_adjusting_your_filters')}</p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
            <FaCheckCircle className="text-4xl mb-3" />
            <p className="text-3xl font-bold">{warranties.filter(w => w.status === 'active').length}</p>
            <p className="text-green-100">{t('common.active_warranties')}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-2xl shadow-lg">
            <FaClock className="text-4xl mb-3" />
            <p className="text-3xl font-bold">{warranties.filter(w => w.status === 'claimed').length}</p>
            <p className="text-yellow-100">{t('common.claimed_warranties')}</p>
          </div>
          <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-2xl shadow-lg">
            <FaTimes className="text-4xl mb-3" />
            <p className="text-3xl font-bold">{warranties.filter(w => w.status === 'expired').length}</p>
            <p className="text-red-100">{t('common.expired_warranties')}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
            <FaShieldAlt className="text-4xl mb-3" />
            <p className="text-3xl font-bold">{warranties.reduce((sum, w) => sum + w.claimCount, 0)}</p>
            <p className="text-purple-100">{t('common.total_claims')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Warranties;
