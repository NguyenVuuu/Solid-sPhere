import React, { useState } from 'react';
import { FaStar, FaRegStar, FaThumbsUp, FaReply, FaFilter, FaSearch } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const ReviewsPage = () => {
  const { t } = useTranslation();

  const [reviews, setReviews] = useState([
    {
      id: 1,
      productName: "Gaming Laptop ASUS ROG",
      userName: "Nguyễn Văn A",
      rating: 5,
      comment: "Laptop chất lượng tuyệt vời, chơi game mượt mà!",
      createdAt: "2025-01-15",
      helpful: 24,
      replied: true
    },
    {
      id: 2,
      productName: "Dell XPS 15",
      userName: "Trần Thị B",
      rating: 4,
      comment: "Thiết kế đẹp, hiệu năng tốt nhưng giá hơi cao",
      createdAt: "2025-01-14",
      helpful: 18,
      replied: false
    },
    {
      id: 3,
      productName: "MacBook Pro M3",
      userName: "Lê Văn C",
      rating: 5,
      comment: "Pin trâu, màn hình đẹp, rất đáng tiền!",
      createdAt: "2025-01-13",
      helpful: 35,
      replied: true
    }
  ]);

  const [filterRating, setFilterRating] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      index < rating ? 
        <FaStar key={index} className="text-yellow-400" /> : 
        <FaRegStar key={index} className="text-gray-300" />
    ));
  };

  const filteredReviews = reviews.filter(review => {
    const matchesRating = filterRating === 'all' || review.rating === parseInt(filterRating);
    const matchesSearch = review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.userName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRating && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-black via-gray-900 to-purple-950 text-white rounded-2xl shadow-2xl p-8 mb-8">
          <h1 className="text-4xl font-bold mb-2">{t('common.product_reviews')}</h1>
          <p className="text-purple-200">{t('common.manage_and_respond_to')}</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{t('common.total_reviews')}</p>
                <p className="text-3xl font-bold text-gray-900">{reviews.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <FaStar className="text-purple-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{t('common.average_rating')}</p>
                <p className="text-3xl font-bold text-gray-900">{t('common.47')}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FaStar className="text-green-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{t('common.replied')}</p>
                <p className="text-3xl font-bold text-gray-900">
                  {reviews.filter(r => r.replied).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FaReply className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{t('common.pending')}</p>
                <p className="text-3xl font-bold text-gray-900">
                  {reviews.filter(r => !r.replied).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <FaThumbsUp className="text-yellow-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={t('common.search_by_product_or')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
              />
            </div>

            {/* Filter by Rating */}
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-600" />
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none bg-white"
              >
                <option value="all">{t('common.all_ratings')}</option>
                <option value="5">{t('common.5_stars')}</option>
                <option value="4">{t('common.4_stars')}</option>
                <option value="3">{t('common.3_stars')}</option>
                <option value="2">{t('common.2_stars')}</option>
                <option value="1">{t('common.1_star')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
              <div className="p-6">
                {/* Review Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {review.userName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{review.userName}</h3>
                      <p className="text-sm text-gray-500">{review.createdAt}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(review.rating)}
                  </div>
                </div>

                {/* Product Name */}
                <div className="mb-3">
                  <span className="text-sm text-gray-600">{t('common.product')}</span>
                  <span className="font-semibold text-purple-600">{review.productName}</span>
                </div>

                {/* Review Comment */}
                <p className="text-gray-700 mb-4">{review.comment}</p>

                {/* Review Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                      <FaThumbsUp />
                      <span className="text-sm">{review.helpful} helpful</span>
                    </button>
                    {review.replied && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">{t('common.replied')}</span>
                    )}
                    {!review.replied && (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">{t('common.pending')}</span>
                    )}
                  </div>
                  <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-md flex items-center gap-2">
                    <FaReply />
                    {review.replied ? 'View Reply' : 'Reply'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredReviews.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaStar className="text-gray-400 text-4xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t('common.no_reviews_found')}</h3>
            <p className="text-gray-600">{t('customer.try_adjusting_your_filters')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;

// Updated: 2025-10-12T16:06:40.063Z

// Updated: 2025-10-12T16:09:04.304Z
