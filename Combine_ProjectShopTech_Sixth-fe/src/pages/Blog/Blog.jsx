import { useState } from 'react';
import { FaClock, FaUser, FaComment, FaArrowRight, FaSearch, FaEye } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Blog = () => {
  const { t } = useTranslation();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const blogPosts = [
    {
      id: 1,
      title: 'NVIDIA RTX 5090: Hiệu năng vượt trội với kiến trúc Blackwell mới',
      excerpt: 'Card đồ họa RTX 5090 với kiến trúc Blackwell mới mang lại hiệu năng gaming và AI vượt trội, hỗ trợ ray tracing thế hệ mới và DLSS 4.0.',
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&h=600&fit=crop',
      category: 'gaming',
      author: 'Nguyễn Minh Tech',
      date: '15 Tháng 1, 2025',
      readTime: '12 phút đọc',
      comments: 234,
      views: 15420
    },
    {
      id: 2,
      title: 'Apple MacBook Pro M4: Hiệu năng và pin cực kỳ ấn tượng',
      excerpt: 'MacBook Pro M4 với chip Apple Silicon thế hệ mới mang lại hiệu năng xử lý vượt trội và thời lượng pin lên đến 22 giờ.',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop',
      category: 'reviews',
      author: 'Trần Văn Apple',
      date: '14 Tháng 1, 2025',
      readTime: '15 phút đọc',
      comments: 189,
      views: 12850
    },
    {
      id: 3,
      title: 'Hướng dẫn build PC Gaming giá 20 triệu: Cấu hình tối ưu nhất',
      excerpt: 'Cấu hình PC gaming hoàn hảo với RTX 4070 Super, CPU Intel i5-14600K và RAM DDR5-6000 cho trải nghiệm gaming mượt mà.',
      image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&h=600&fit=crop',
      category: 'guides',
      author: 'Lê Hoàng Builder',
      date: '13 Tháng 1, 2025',
      readTime: '18 phút đọc',
      comments: 456,
      views: 22100
    },
    {
      id: 4,
      title: 'Samsung Galaxy S24 Ultra: Camera AI và S Pen thông minh',
      excerpt: 'Galaxy S24 Ultra với camera AI mới, S Pen thông minh và hiệu năng Snapdragon 8 Gen 3 cho trải nghiệm smartphone cao cấp.',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop',
      category: 'reviews',
      author: 'Phạm Thị Samsung',
      date: '12 Tháng 1, 2025',
      readTime: '14 phút đọc',
      comments: 312,
      views: 18750
    },
    {
      id: 5,
      title: 'ASUS ROG Ally X: Console gaming Windows mạnh nhất',
      excerpt: 'ASUS ROG Ally X với AMD Z1 Extreme và màn hình 7 inch 120Hz mang lại trải nghiệm gaming di động đỉnh cao.',
      image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=600&fit=crop',
      category: 'gaming',
      author: 'Võ Minh Gaming',
      date: '11 Tháng 1, 2025',
      readTime: '10 phút đọc',
      comments: 178,
      views: 9650
    },
    {
      id: 6,
      title: 'Intel Core i9-14900K: CPU desktop mạnh nhất hiện tại',
      excerpt: 'Intel Core i9-14900K với 24 nhân và tốc độ boost lên đến 6.0GHz mang lại hiệu năng xử lý đỉnh cao cho gaming và content creation.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      category: 'reviews',
      author: 'Đặng Văn Intel',
      date: '10 Tháng 1, 2025',
      readTime: '13 phút đọc',
      comments: 267,
      views: 14200
    },
    {
      id: 7,
      title: 'Logitech MX Master 4: Chuột không dây cao cấp cho dân văn phòng',
      excerpt: 'Logitech MX Master 4 với cảm biến Darkfield 8000 DPI và pin sạc USB-C cho trải nghiệm làm việc mượt mà và chính xác.',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=600&fit=crop',
      category: 'accessories',
      author: 'Ngô Thị Logitech',
      date: '9 Tháng 1, 2025',
      readTime: '8 phút đọc',
      comments: 89,
      views: 6780
    },
    {
      id: 8,
      title: 'Corsair K100 RGB: Bàn phím cơ gaming cao cấp',
      excerpt: 'Corsair K100 RGB với switch Cherry MX Speed Silver và đèn RGB iCUE cho trải nghiệm gaming và typing tuyệt vời.',
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&h=600&fit=crop',
      category: 'accessories',
      author: 'Bùi Văn Corsair',
      date: '8 Tháng 1, 2025',
      readTime: '9 phút đọc',
      comments: 123,
      views: 8450
    },
    {
      id: 9,
      title: 'Microsoft Surface Laptop Studio 2: Laptop 2-in-1 đa năng',
      excerpt: 'Surface Laptop Studio 2 với màn hình cảm ứng 14.4 inch và hiệu năng Intel i7-13700H cho công việc sáng tạo và gaming.',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop',
      category: 'reviews',
      author: 'Hoàng Thị Microsoft',
      date: '7 Tháng 1, 2025',
      readTime: '11 phút đọc',
      comments: 156,
      views: 11200
    },
    {
      id: 10,
      title: 'AMD Ryzen 9 7950X3D: CPU gaming mạnh nhất với V-Cache',
      excerpt: 'AMD Ryzen 9 7950X3D với công nghệ 3D V-Cache mang lại hiệu năng gaming vượt trội và khả năng đa nhiệm tuyệt vời.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      category: 'gaming',
      author: 'Lý Văn AMD',
      date: '6 Tháng 1, 2025',
      readTime: '12 phút đọc',
      comments: 198,
      views: 13500
    },
    {
      id: 11,
      title: 'Sony WH-1000XM5: Tai nghe chống ồn hàng đầu',
      excerpt: 'Sony WH-1000XM5 với công nghệ chống ồn AI và chất âm Hi-Res Audio cho trải nghiệm nghe nhạc tuyệt vời.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
      category: 'accessories',
      author: 'Phan Thị Sony',
      date: '5 Tháng 1, 2025',
      readTime: '7 phút đọc',
      comments: 145,
      views: 9200
    },
    {
      id: 12,
      title: 'Meta Quest 3: VR headset thế hệ mới với Mixed Reality',
      excerpt: 'Meta Quest 3 với công nghệ Mixed Reality và hiệu năng Snapdragon XR2 Gen 2 mang lại trải nghiệm VR và AR đỉnh cao.',
      image: 'https://images.unsplash.com/photo-1592478411213-6153e4c4a8b0?w=800&h=600&fit=crop',
      category: 'gaming',
      author: 'Trịnh Văn Meta',
      date: '4 Tháng 1, 2025',
      readTime: '14 phút đọc',
      comments: 234,
      views: 16800
    },
    {
      id: 13,
      title: 'Dell XPS 15 2025: Laptop cao cấp cho dân sáng tạo',
      excerpt: 'Dell XPS 15 với màn hình OLED 15.6 inch và hiệu năng Intel i7-14700H cho công việc thiết kế và video editing chuyên nghiệp.',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop',
      category: 'reviews',
      author: 'Vũ Thị Dell',
      date: '3 Tháng 1, 2025',
      readTime: '13 phút đọc',
      comments: 167,
      views: 12400
    },
    {
      id: 14,
      title: 'Steam Deck OLED: Console handheld gaming hoàn hảo',
      excerpt: 'Steam Deck OLED với màn hình OLED 7 inch và hiệu năng AMD APU mới cho trải nghiệm gaming di động mượt mà.',
      image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=600&fit=crop',
      category: 'gaming',
      author: 'Đinh Văn Steam',
      date: '2 Tháng 1, 2025',
      readTime: '10 phút đọc',
      comments: 289,
      views: 19500
    },
    {
      id: 15,
      title: 'Hướng dẫn chọn màn hình gaming: 144Hz vs 240Hz vs 360Hz',
      excerpt: 'So sánh chi tiết các tần số quét màn hình gaming và cách chọn màn hình phù hợp với nhu cầu gaming của bạn.',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=600&fit=crop',
      category: 'guides',
      author: 'Lê Minh Monitor',
      date: '1 Tháng 1, 2025',
      readTime: '16 phút đọc',
      comments: 345,
      views: 25600
    },
    {
      id: 16,
      title: 'iPhone 16 Pro Max: Camera 48MP và chip A18 Pro mạnh mẽ',
      excerpt: 'iPhone 16 Pro Max với camera chính 48MP, chip A18 Pro và màn hình Dynamic Island cho trải nghiệm smartphone cao cấp.',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop',
      category: 'reviews',
      author: 'Nguyễn Thị iPhone',
      date: '31 Tháng 12, 2024',
      readTime: '15 phút đọc',
      comments: 456,
      views: 28900
    },
    {
      id: 17,
      title: 'Razer DeathAdder V3 Pro: Chuột gaming không dây đỉnh cao',
      excerpt: 'Razer DeathAdder V3 Pro với cảm biến Focus Pro 30K và thiết kế ergonomic cho trải nghiệm gaming chuyên nghiệp.',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=600&fit=crop',
      category: 'accessories',
      author: 'Phạm Văn Razer',
      date: '30 Tháng 12, 2024',
      readTime: '8 phút đọc',
      comments: 134,
      views: 8750
    },
    {
      id: 18,
      title: 'ASUS ROG Strix G16: Laptop gaming giá tốt với RTX 4060',
      excerpt: 'ASUS ROG Strix G16 với RTX 4060 và CPU Intel i7-13650HX mang lại hiệu năng gaming tốt với mức giá hợp lý.',
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&h=600&fit=crop',
      category: 'gaming',
      author: 'Trần Minh ASUS',
      date: '29 Tháng 12, 2024',
      readTime: '11 phút đọc',
      comments: 223,
      views: 15600
    },
    {
      id: 19,
      title: 'Hướng dẫn overclock CPU Intel và AMD an toàn',
      excerpt: 'Hướng dẫn chi tiết cách overclock CPU Intel và AMD một cách an toàn để tăng hiệu năng mà không làm hỏng phần cứng.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      category: 'guides',
      author: 'Lý Minh Overclock',
      date: '28 Tháng 12, 2024',
      readTime: '20 phút đọc',
      comments: 567,
      views: 32100
    },
    {
      id: 20,
      title: 'Samsung Odyssey G9: Màn hình ultrawide gaming 49 inch',
      excerpt: 'Samsung Odyssey G9 với màn hình ultrawide 49 inch, độ phân giải 5120x1440 và tần số quét 240Hz cho trải nghiệm gaming đỉnh cao.',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=600&fit=crop',
      category: 'accessories',
      author: 'Võ Thị Samsung',
      date: '27 Tháng 12, 2024',
      readTime: '12 phút đọc',
      comments: 189,
      views: 14200
    }
  ];

  const categories = [
    { id: 'all', name: t('blog.all_posts'), icon: '📚' },
    { id: 'gaming', name: t('blog.gaming'), icon: '🎮' },
    { id: 'reviews', name: t('blog.reviews'), icon: '⭐' },
    { id: 'guides', name: t('blog.guides'), icon: '📖' },
    { id: 'news', name: t('blog.news'), icon: '📰' },
    { id: 'accessories', name: t('blog.accessories'), icon: '⌨️' }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts[0];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-white text-gray-900 py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">{t('blog.title')}</h1>
            <p className="text-lg text-gray-600">
              {t('blog.subtitle')}
            </p>
          </div>

          {/* Search */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={t('blog.search_placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 border border-gray-300 focus:outline-none focus:border-gray-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-black via-gray-900 to-purple-950 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('blog.featured_post')}</h2>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-64 md:h-auto">
              <img 
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x600?text=Featured+Post';
                }}
              />
              <div className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-black via-gray-900 to-purple-950 text-white rounded font-bold text-sm">
                {t('blog.featured')}
              </div>
            </div>
            <div className="p-6 flex flex-col justify-center">
              <div className="text-sm text-gray-500 font-medium mb-2 uppercase">
                {featuredPost.category}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {featuredPost.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
                <div className="flex items-center gap-1">
                  <FaUser className="text-xs" />
                  <span>{featuredPost.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaClock className="text-xs" />
                  <span>{featuredPost.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaEye className="text-xs" />
                  <span>{featuredPost.views?.toLocaleString('vi-VN')}</span>
                </div>
              </div>
              <button className="inline-flex items-center gap-2 text-gray-700 font-medium">
                {t('blog.read_more')} <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('blog.latest_articles')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <div 
              key={post.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=Blog+Post';
                  }}
                />
                <div className="absolute top-3 right-3 px-2 py-1 bg-white rounded text-sm text-gray-600 font-medium">
                  {post.category}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-3 line-clamp-3 text-sm">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-3 text-gray-500 text-xs mb-3 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-1">
                    <FaUser />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaClock />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaEye />
                    <span>{post.views?.toLocaleString('vi-VN')}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-xs">{post.date}</span>
                  <button className="inline-flex items-center gap-1 text-gray-700 font-medium text-sm">
                    {t('blog.read')} <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-purple-950 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">{t('blog.subscribe_title')}</h2>
          <p className="text-gray-300 mb-6">
            {t('blog.subscribe_subtitle')}
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <input 
              type="email" 
              placeholder={t('blog.email_placeholder')}
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 border border-gray-300 focus:outline-none focus:border-purple-600"
            />
            <button className="px-6 py-3 bg-white text-gray-900 rounded-lg font-medium">{t('blog.subscribe')}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
