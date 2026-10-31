import { useState } from 'react';
import { FaFolder, FaLaptop, FaDesktop, FaMobileAlt, FaKeyboard, FaMouse, FaHeadphones, FaPlus, FaEdit, FaTrash, FaBox, FaSearch } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const CategoriesManagement = () => {
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const categories = [
    {
      id: 'CAT-001',
      name: 'Laptops',
      icon: FaLaptop,
      description: 'Portable computers for work and entertainment',
      productCount: 156,
      subcategories: ['Gaming Laptops', 'Business Laptops', 'Ultrabooks', 'Workstations'],
      status: 'active',
      createdDate: '2023-01-15'
    },
    {
      id: 'CAT-002',
      name: 'Desktops',
      icon: FaDesktop,
      description: 'Complete desktop computer systems',
      productCount: 89,
      subcategories: ['Gaming PCs', 'Office PCs', 'All-in-One', 'Mini PCs'],
      status: 'active',
      createdDate: '2023-01-15'
    },
    {
      id: 'CAT-003',
      name: 'Mobile Devices',
      icon: FaMobileAlt,
      description: 'Smartphones and tablets',
      productCount: 234,
      subcategories: ['Smartphones', 'Tablets', 'Smart Watches', 'Accessories'],
      status: 'active',
      createdDate: '2023-02-20'
    },
    {
      id: 'CAT-004',
      name: 'Keyboards',
      icon: FaKeyboard,
      description: 'Mechanical and membrane keyboards',
      productCount: 78,
      subcategories: ['Mechanical', 'Gaming', 'Wireless', 'Ergonomic'],
      status: 'active',
      createdDate: '2023-03-10'
    },
    {
      id: 'CAT-005',
      name: 'Mice',
      icon: FaMouse,
      description: 'Gaming and office mice',
      productCount: 92,
      subcategories: ['Gaming', 'Wireless', 'Ergonomic', 'Trackballs'],
      status: 'active',
      createdDate: '2023-03-10'
    },
    {
      id: 'CAT-006',
      name: 'Headphones',
      icon: FaHeadphones,
      description: 'Audio devices and headsets',
      productCount: 67,
      subcategories: ['Gaming Headsets', 'Wireless', 'Studio', 'Earbuds'],
      status: 'active',
      createdDate: '2023-04-05'
    },
    {
      id: 'CAT-007',
      name: 'PC Components',
      icon: FaBox,
      description: 'Computer hardware components',
      productCount: 345,
      subcategories: ['CPUs', 'GPUs', 'RAM', 'Storage', 'Motherboards', 'Power Supplies'],
      status: 'active',
      createdDate: '2023-01-15'
    }
  ];

  const filteredCategories = categories.filter(category => {
    const matchesSearch = 
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const totalProducts = categories.reduce((sum, cat) => sum + cat.productCount, 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-purple-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <FaFolder className="text-6xl mb-4 text-purple-400" />
              <h1 className="text-5xl font-bold mb-3">{t('category.categories_management')}</h1>
              <p className="text-xl text-purple-300">{t('category.organize_your_product_catalog')}</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <p className="text-purple-300 text-sm mb-1">{t('category.categories')}</p>
                <p className="text-4xl font-bold">{categories.length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <p className="text-purple-300 text-sm mb-1">{t('common.products')}</p>
                <p className="text-4xl font-bold">{totalProducts}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Actions */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={t('category.search_categories')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>
            <button className="bg-gradient-to-r from-purple-900 to-purple-950 text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg flex items-center gap-2">
              <FaPlus />
              Add Category
            </button>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map(category => {
            const Icon = category.icon;
            return (
              <div 
                key={category.id}
                className="group bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-900 to-purple-950 text-white p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full"></div>
                  <div className="relative">
                    <Icon className="text-5xl mb-4 text-purple-300" />
                    <h3 className="font-bold text-2xl mb-2">{category.name}</h3>
                    <p className="text-sm text-purple-200">{category.id}</p>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  {/* Description */}
                  <p className="text-gray-600 mb-4 text-sm">
                    {category.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{t('category.total_products')}</p>
                      <p className="text-2xl font-bold text-purple-600">{category.productCount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{t('category.subcategories')}</p>
                      <p className="text-2xl font-bold text-gray-900">{category.subcategories.length}</p>
                    </div>
                  </div>

                  {/* Subcategories */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-700 mb-2">{t('remaining.subcategories')}</p>
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.slice(0, 3).map((sub, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium"
                        >
                          {sub}
                        </span>
                      ))}
                      {category.subcategories.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                          +{category.subcategories.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Date */}
                  <p className="text-xs text-gray-500 mb-4">
                    Created: {new Date(category.createdDate).toLocaleDateString('vi-VN')}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm font-semibold">
                      <FaEdit />{t('account.edit')}</button>
                    <button className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 text-sm font-semibold">
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <FaFolder className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('category.no_categories_found')}</h3>
            <p className="text-gray-600">{t('common.try_adjusting_your_search')}</p>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('category.category_statistics')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.slice(0, 4).map((category, index) => {
            const Icon = category.icon;
            const colors = [
              'from-purple-500 to-purple-600',
              'from-blue-500 to-blue-600',
              'from-green-500 to-green-600',
              'from-orange-500 to-orange-600'
            ];
            return (
              <div 
                key={category.id}
                className={`bg-gradient-to-br ${colors[index]} text-white p-6 rounded-2xl shadow-lg`}
              >
                <Icon className="text-4xl mb-3" />
                <p className="text-3xl font-bold">{category.productCount}</p>
                <p className="opacity-90">{category.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoriesManagement;
