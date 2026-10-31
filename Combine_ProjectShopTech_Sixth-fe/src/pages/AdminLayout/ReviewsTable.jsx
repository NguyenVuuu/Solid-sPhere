import React, { useState, useEffect } from 'react';
import { FaStar, FaRegStar, FaThumbsUp, FaReply, FaFilter, FaSearch, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { fetchReviews, deleteReview, updateReview } from '../../apis/adminApi';
import { useToast } from '../../components/Toast';

const ReviewsTable = ({ activeMenu, theme }) => {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('all');
  const [selectedReview, setSelectedReview] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const { showSuccess, showError } = useToast();

  // Theme colors
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const secondaryTextColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  useEffect(() => {
    fetchReviewsData();
  }, []);

  const fetchReviewsData = async () => {
    try {
      setLoading(true);
      const data = await fetchReviews();
      console.log('Reviews data:', data);
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setError(error.message);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      index < rating ? 
        <FaStar key={index} className="text-yellow-400" /> : 
        <FaRegStar key={index} className="text-gray-300" />
    ));
  };

  const filteredReviews = reviews.filter(review => {
    const matchesRating = filterRating === 'all' || review.rating === parseInt(filterRating);
    const matchesSearch = 
      review.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.productId?.toString().includes(searchTerm.toLowerCase());
    return matchesRating && matchesSearch;
  });

  const handleReply = (review) => {
    setSelectedReview(review);
    setReplyText(review.reply || ''); // Nếu có reply sẵn thì load vào
    setShowReplyModal(true);
  };

  const handleSubmitReply = async () => {
    if (!replyText.trim()) {
      showError('Vui lòng nhập nội dung phản hồi', 3000, 'top-right');
      return;
    }

    try {
      setIsSubmittingReply(true);
      // Gọi API update review với reply
      await updateReview(selectedReview.id, {
        ...selectedReview,
        reply: replyText.trim()
      });

      // Cập nhật lại danh sách reviews
      setReviews(reviews.map(review => 
        review.id === selectedReview.id 
          ? { ...review, reply: replyText.trim() }
          : review
      ));

      showSuccess('✅ Đã gửi phản hồi thành công!', 3000, 'top-right');
      setShowReplyModal(false);
      setReplyText('');
    } catch (error) {
      console.error('Error submitting reply:', error);
      showError('❌ Lỗi khi gửi phản hồi: ' + (error.response?.data?.message || error.message), 5000, 'top-right');
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const handleCloseReplyModal = () => {
    setShowReplyModal(false);
    setReplyText('');
    setSelectedReview(null);
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa review này?')) {
      try {
        await deleteReview(reviewId);
        setReviews(reviews.filter(review => review.id !== reviewId));
        alert('Xóa review thành công!');
      } catch (error) {
        console.error('Error deleting review:', error);
        alert('Lỗi khi xóa review');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
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
        <h2 className={`text-2xl font-bold ${textColor} mb-2`}>Quản lý Reviews</h2>
        <p className={secondaryTextColor}>Quản lý và phản hồi đánh giá sản phẩm</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-4 rounded-lg ${cardBg} border ${borderColor}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${secondaryTextColor}`}>Tổng Reviews</p>
              <p className={`text-2xl font-bold ${textColor}`}>{reviews.length}</p>
            </div>
            <FaStar className="text-purple-600 text-xl" />
          </div>
        </div>

        <div className={`p-4 rounded-lg ${cardBg} border ${borderColor}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${secondaryTextColor}`}>Đánh giá TB</p>
              <p className={`text-2xl font-bold ${textColor}`}>
                {reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : '0.0'}
              </p>
            </div>
            <FaStar className="text-green-600 text-xl" />
          </div>
        </div>

        <div className={`p-4 rounded-lg ${cardBg} border ${borderColor}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${secondaryTextColor}`}>Reviews 5 sao</p>
              <p className={`text-2xl font-bold ${textColor}`}>
                {reviews.filter(r => r.rating === 5).length}
              </p>
            </div>
            <FaStar className="text-yellow-600 text-xl" />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className={`p-4 rounded-lg ${cardBg} border ${borderColor}`}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo nội dung review hoặc Product ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border ${borderColor} rounded-lg focus:border-blue-500 focus:outline-none ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
            />
          </div>
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-600" />
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className={`px-4 py-2 border ${borderColor} rounded-lg focus:border-blue-500 focus:outline-none ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
            >
              <option value="all">Tất cả đánh giá</option>
              <option value="5">5 sao</option>
              <option value="4">4 sao</option>
              <option value="3">3 sao</option>
              <option value="2">2 sao</option>
              <option value="1">1 sao</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews Table */}
      <div className={`rounded-lg ${cardBg} border ${borderColor} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <tr>
                <th className={`px-4 py-3 text-left text-xs font-medium ${secondaryTextColor} uppercase tracking-wider`}>
                  ID
                </th>
                <th className={`px-4 py-3 text-left text-xs font-medium ${secondaryTextColor} uppercase tracking-wider`}>
                  Product ID
                </th>
                <th className={`px-4 py-3 text-left text-xs font-medium ${secondaryTextColor} uppercase tracking-wider`}>
                  Đánh giá
                </th>
                <th className={`px-4 py-3 text-left text-xs font-medium ${secondaryTextColor} uppercase tracking-wider`}>
                  Nội dung
                </th>
                <th className={`px-4 py-3 text-left text-xs font-medium ${secondaryTextColor} uppercase tracking-wider`}>
                  Ngày tạo
                </th>
                <th className={`px-4 py-3 text-left text-xs font-medium ${secondaryTextColor} uppercase tracking-wider`}>
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${borderColor}`}>
              {filteredReviews.map((review) => (
                <tr key={review.id} className={`hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <td className={`px-4 py-4 whitespace-nowrap text-sm ${textColor}`}>
                    #{review.id}
                  </td>
                  <td className={`px-4 py-4 whitespace-nowrap text-sm ${textColor}`}>
                    <span className="font-medium">Product #{review.productId}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                      <span className={`ml-2 text-sm ${textColor}`}>({review.rating}/5)</span>
                    </div>
                  </td>
                  <td className={`px-4 py-4 text-sm ${textColor}`}>
                    <div className="max-w-xs truncate">
                      {review.comment || 'Không có nội dung'}
                    </div>
                  </td>
                  <td className={`px-4 py-4 whitespace-nowrap text-sm ${textColor}`}>
                    {formatDate(review.createdAt)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleReply(review)}
                        className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                      >
                        <FaReply />
                        Phản hồi
                      </button>
                      {/* Ẩn nút xóa theo yêu cầu */}
                      {/* <button
                        onClick={() => handleDeleteReview(review.id)}
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

        {filteredReviews.length === 0 && (
          <div className="text-center py-8">
            <FaStar className="mx-auto text-gray-400 text-4xl mb-4" />
            <h3 className={`text-lg font-medium ${textColor} mb-2`}>Không tìm thấy review nào</h3>
            <p className={secondaryTextColor}>Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        )}
      </div>

      {/* Reply Modal với backdrop blur */}
      {showReplyModal && selectedReview && (
        <div 
          className="fixed inset-0 backdrop-blur-md bg-opacity-0 flex items-center justify-center z-50"
          onClick={handleCloseReplyModal}
        >
          <div 
            className={`p-6 rounded-lg ${cardBg} border ${borderColor} max-w-2xl w-full mx-4 shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className={`text-xl font-bold ${textColor} mb-4`}>Phản hồi Review</h3>
            
            {/* Thông tin review gốc */}
            <div className={`mb-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} border ${borderColor}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className={`text-xs ${secondaryTextColor} mb-1`}>Review ID: #{selectedReview.id} | Product ID: #{selectedReview.productId}</p>
                  <div className="flex items-center gap-2 mb-2">
                    {renderStars(selectedReview.rating)}
                    <span className={`text-sm ${textColor} font-medium`}>({selectedReview.rating}/5)</span>
                  </div>
                </div>
              </div>
              <p className={`text-sm ${textColor} italic`}>
                "{selectedReview.comment || 'Không có nội dung'}"
              </p>
              {selectedReview.reply && (
                <div className={`mt-3 pt-3 border-t ${borderColor}`}>
                  <p className={`text-xs font-semibold ${secondaryTextColor} mb-1`}>Phản hồi hiện tại:</p>
                  <p className={`text-sm ${textColor}`}>{selectedReview.reply}</p>
                </div>
              )}
            </div>

            {/* Form phản hồi */}
            <div className="mb-6">
              <label className={`block text-sm font-medium ${textColor} mb-2`}>
                Nội dung phản hồi
              </label>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Nhập phản hồi của bạn cho bình luận này..."
                rows="5"
                className={`w-full px-4 py-3 border ${borderColor} rounded-lg focus:border-blue-500 focus:outline-none resize-none ${
                  theme === 'dark' ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'
                }`}
                disabled={isSubmittingReply}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCloseReplyModal}
                disabled={isSubmittingReply}
                className={`px-5 py-2 rounded-lg font-medium transition-colors ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } ${isSubmittingReply ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Hủy
              </button>
              <button
                onClick={handleSubmitReply}
                disabled={isSubmittingReply || !replyText.trim()}
                className={`px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors ${
                  isSubmittingReply || !replyText.trim() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmittingReply ? 'Đang gửi...' : 'Gửi phản hồi'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsTable;
