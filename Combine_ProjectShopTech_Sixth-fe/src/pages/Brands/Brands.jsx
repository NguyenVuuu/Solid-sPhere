import { useState } from 'react';
import { FaSearch, FaStar } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Brands = () => {
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const brands = [
    {
      id: 1,
      name: 'MSI',
      logo: '/src/assets/svg/logo_msi.svg',
      category: 'laptops',
      products: 156,
      rating: 4.8,
      description: 'Gaming Laptops & Components'
    },
    {
      id: 2,
      name: 'ASUS',
      logo: '/src/assets/svg/logo_asus.svg',
      category: 'laptops',
      products: 243,
      rating: 4.9,
      description: 'ROG Gaming Series'
    },
    {
      id: 3,
      name: 'Razer',
      logo: '/src/assets/svg/logo_razer.svg',
      category: 'gaming',
      products: 89,
      rating: 4.7,
      description: 'Premium Gaming Gear'
    },
    {
      id: 4,
      name: 'Logitech',
      logo: '/src/assets/svg/logo_logitech.svg',
      category: 'gaming',
      products: 198,
      rating: 4.6,
      description: 'Peripherals & Accessories'
    },
    {
      id: 5,
      name: 'Corsair',
      logo: '/src/assets/svg/logo_corsair.svg',
      category: 'components',
      products: 145,
      rating: 4.7,
      description: 'PC Components & Cooling'
    },
    {
      id: 6,
      name: 'Thermaltake',
      logo: '/src/assets/svg/logo_thermaltake.svg',
      category: 'components',
      products: 112,
      rating: 4.5,
      description: 'Cases & PSU'
    },
    {
      id: 7,
      name: 'HP',
      logo: '/src/assets/svg/logo_hp.svg',
      category: 'laptops',
      products: 287,
      rating: 4.4,
      description: 'Business & Gaming Laptops'
    },
    {
      id: 8,
      name: 'Gigabyte',
      logo: '/src/assets/svg/logo_gigabytes.svg',
      category: 'components',
      products: 176,
      rating: 4.6,
      description: 'Motherboards & GPUs'
    },
    {
      id: 9,
      name: 'ADATA',
      logo: '/src/assets/svg/logo_adata.svg',
      category: 'components',
      products: 134,
      rating: 4.5,
      description: 'Storage & Memory'
    },
    {
      id: 10,
      name: 'Roccat',
      logo: '/src/assets/svg/logo_roccat.svg',
      category: 'gaming',
      products: 67,
      rating: 4.6,
      description: 'Gaming Peripherals'
    },
    {
      id: 11,
      name: 'Apple',
      logo: '/src/assets/images/logo/apple.png',
      category: 'phones',
      products: 45,
      rating: 5.0,
      description: 'iPhone & iPad'
    },
    {
      id: 12,
      name: 'Samsung',
      logo: '/src/assets/images/logo/samsung.png',
      category: 'phones',
      products: 234,
      rating: 4.7,
      description: 'Galaxy Series'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Brands', icon: '🏢' },
    { id: 'laptops', name: 'Laptops', icon: '💻' },
    { id: 'gaming', name: 'Gaming Gear', icon: '🎮' },
    { id: 'components', name: 'Components', icon: '🔧' },
    { id: 'phones', name: 'Phones', icon: '📱' }
  ];

  const filteredBrands = brands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || brand.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-black via-gray-900 to-purple-950 text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-4">{t('brand.top_brands')}</h1>
            <p className="text-xl text-purple-300 mb-8">
              Shop from the world's leading tech brands
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder={t('brand.search_brands')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-6 py-5 rounded-2xl text-gray-900 text-lg border-2 border-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-400 shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-purple-900 to-purple-950 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-purple-600 hover:text-purple-600'
                }`}
              >
                <span className="text-xl">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Brands Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Found {filteredBrands.length} {filteredBrands.length === 1 ? t('common.brand') : t('brands.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBrands.map(brand => (
            <div 
              key={brand.id}
              className="group bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-2xl hover:border-purple-600 transition-all duration-300 cursor-pointer"
            >
              {/* Logo */}
              <div className="h-24 flex items-center justify-center mb-6 bg-gray-50 rounded-xl p-4 group-hover:bg-purple-50 transition-colors">
                <img 
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all"
                  onError={(e) => {
                    e.target.parentElement.innerHTML = `<span class="text-4xl font-bold text-gray-400">${brand.name}</span>`;
                  }}
                />
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {brand.name}
                </h3>
                <p className="text-gray-600 mb-4">{brand.description}</p>

                {/* Stats */}
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span className="font-semibold text-gray-900">{brand.rating}</span>
                  </div>
                  <div className="text-gray-400">|</div>
                  <div className="text-gray-600">
                    <span className="font-semibold text-purple-600">{brand.products}</span>{t('common.products')}</div>
                </div>

                {/* Button */}
                <button className="w-full py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-xl font-bold group-hover:bg-gradient-to-r group-hover:from-purple-900 group-hover:to-purple-950 group-hover:text-white group-hover:border-transparent transition-all duration-300">{t('brand.view_products')}</button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredBrands.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">{t('brand.unknown')}</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('brand.no_brands_found')}</h3>
            <p className="text-gray-600">{t('brand.try_adjusting_your_search')}</p>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-purple-950 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">{t('brand.cant_find_your_brand')}</h2>
          <p className="text-xl text-purple-300 mb-8">
            Let us know and we'll try to add it!
          </p>
          <button className="px-12 py-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg">{t('brand.request_brand')}</button>
        </div>
      </div>
    </div>
  );
};

export default Brands;
