import { useState } from 'react';
import { FaStar, FaFire, FaShippingFast, FaHeart } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const NewArrivals = () => {
  const { t } = useTranslation();

  const [hoveredProduct, setHoveredProduct] = useState(null);

  const newProducts = [
    {
      id: 1,
      name: 'MSI Titan 18 HX Gaming Laptop',
      category: 'Laptops',
      price: 4299,
      image: '/src/assets/images/products/laptop-new1.jpg',
      badge: 'Just Landed',
      rating: 5.0,
      reviews: 12,
      specs: ['RTX 4090', 'i9-14900HX', '64GB RAM']
    },
    {
      id: 2,
      name: 'ROG Azoth Wireless Keyboard',
      category: 'Gaming Gear',
      price: 249,
      image: '/src/assets/images/products/keyboard-new1.jpg',
      badge: t('common.new'),
      rating: 4.9,
      reviews: 45,
      specs: ['Wireless', 'RGB', 'Hot-swappable']
    },
    {
      id: 3,
      name: 'Logitech G Pro X Superlight 2',
      category: 'Gaming Gear',
      price: 159,
      image: '/src/assets/images/products/mouse-new1.jpg',
      badge: 'Trending',
      rating: 4.8,
      reviews: 89,
      specs: ['60g', '32K DPI', 'Wireless']
    },
    {
      id: 4,
      name: 'ASUS ROG Swift OLED PG27AQDM',
      category: 'Monitors',
      price: 899,
      image: '/src/assets/images/products/monitor-new1.jpg',
      badge: t('common.hot'),
      rating: 5.0,
      reviews: 67,
      specs: ['27" OLED', '240Hz', '0.03ms']
    },
    {
      id: 5,
      name: 'Samsung Galaxy S24 Ultra',
      category: 'Phones',
      price: 1299,
      image: '/src/assets/images/products/phone-new1.jpg',
      badge: t('common.new'),
      rating: 4.9,
      reviews: 234,
      specs: ['Snapdragon 8 Gen 3', '200MP', 'S Pen']
    },
    {
      id: 6,
      name: 'SteelSeries Arctis Nova Pro',
      category: 'Gaming Gear',
      price: 349,
      image: '/src/assets/images/products/headset-new1.jpg',
      badge: t('common.premium'),
      rating: 4.7,
      reviews: 156,
      specs: ['Hi-Res', 'Active ANC', 'Wireless']
    },
    {
      id: 7,
      name: 'AMD Ryzen 9 9950X',
      category: 'PC Parts',
      price: 699,
      image: '/src/assets/images/products/cpu-new1.jpg',
      badge: t('common.latest'),
      rating: 5.0,
      reviews: 89,
      specs: ['16 Cores', '5.7GHz', 'AM5']
    },
    {
      id: 8,
      name: 'NVIDIA RTX 5090',
      category: 'PC Parts',
      price: 1999,
      image: '/src/assets/images/products/gpu-new1.jpg',
      badge: t('common.hot'),
      rating: 5.0,
      reviews: 345,
      specs: ['24GB GDDR7', 'AI Enhanced', 'Ray Tracing']
    },
    {
      id: 9,
      name: 'Razer Blade 18 2025',
      category: 'Laptops',
      price: 3799,
      image: '/src/assets/images/products/laptop-new2.jpg',
      badge: t('common.new'),
      rating: 4.8,
      reviews: 78,
      specs: ['RTX 5080', 'QHD+ 240Hz', 'Per-Key RGB']
    }
  ];

  const categories = [t('common.all'), 'Laptops', 'Gaming Gear', 'Monitors', 'Phones', 'PC Parts'];
  const [selectedCategory, setSelectedCategory] = useState(t('common.all'));

  const filteredProducts = selectedCategory === t('common.all') 
    ? newProducts 
    : newProducts.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-black via-gray-900 to-purple-950 text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-purple-600/10 animate-pulse"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full font-semibold animate-bounce">
              🎉 Fresh Stock Just Arrived!
            </div>
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              New Arrivals
            </h1>
            <p className="text-xl text-purple-300 mb-8">
              Discover the latest tech innovations - Be the first to own them!
            </p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <FaShippingFast className="text-2xl text-green-400" />
                <span>{t('common.free_shipping')}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaFire className="text-2xl text-orange-500" />
                <span>{t('common.limited_stock')}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaStar className="text-2xl text-yellow-400" />
                <span>{t('common.premium_quality')}</span>
              </div>
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
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-purple-900 to-purple-950 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-purple-600 hover:text-purple-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div 
              key={product.id}
              className="group relative bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-purple-600 transition-all duration-500"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Badge */}
              <div className="absolute top-4 left-4 z-10 px-4 py-2 bg-gradient-to-r from-purple-900 to-purple-950 text-white rounded-lg font-bold shadow-lg">
                {product.badge}
              </div>

              {/* Wishlist */}
              <button className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300 group/wish">
                <FaHeart className="text-xl text-gray-400 group-hover/wish:text-white group-hover/wish:scale-125 transition-all" />
              </button>

              {/* Image */}
              <div className="relative overflow-hidden bg-gray-100">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=New+Product';
                  }}
                />
                {/* Hover Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6 transition-opacity duration-300 ${
                  hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="text-white">
                    <p className="font-semibold mb-2">{t('common.key_features')}</p>
                    {product.specs.map((spec, i) => (
                      <span key={i} className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm mr-2 mb-2">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="text-sm text-purple-600 font-semibold mb-2">
                  {product.category}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < Math.floor(product.rating) ? '' : 'text-gray-300'} />
                    ))}
                  </div>
                  <span className="text-gray-600 font-medium">{product.rating}</span>
                  <span className="text-gray-400 text-sm">({product.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold bg-gradient-to-r from-purple-900 to-purple-950 bg-clip-text text-transparent">
                    ${product.price}
                  </span>
                  <span className="text-sm text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full">
                    In Stock
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 py-3 bg-gradient-to-r from-purple-900 to-purple-950 text-white rounded-xl font-bold hover:scale-105 transition-transform duration-300 shadow-lg">{t('common.add_to_cart')}</button>
                  <button className="px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-xl font-bold hover:bg-purple-50 transition-colors">{t('common.details')}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-purple-950 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">{t('common.stay_updated')}</h2>
          <p className="text-xl text-purple-300 mb-8">
            Get notified when new products arrive
          </p>
          <button className="px-12 py-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg">{t('common.notify_me')}</button>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
