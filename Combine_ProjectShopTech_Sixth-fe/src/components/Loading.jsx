import React from 'react';

/**
 * Loading Component - Hiển thị loading indicator đơn giản và đẹp
 * @param {Object} props
 * @param {string} props.size - Kích thước: 'sm', 'md', 'lg' (default: 'md')
 * @param {string} props.text - Text hiển thị (default: 'Đang tải...')
 * @param {boolean} props.fullScreen - Hiển thị full screen (default: false)
 * @param {string} props.className - Custom className
 */
const Loading = ({ 
  size = 'md', 
  text = 'Đang tải...', 
  fullScreen = false,
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const loadingContent = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative mb-3">
        {/* Outer ring */}
        <div className={`${sizeClasses[size]} border-4 border-purple-200 rounded-full`}></div>
        {/* Spinning ring */}
        <div 
          className={`absolute inset-0 ${sizeClasses[size]} border-4 border-purple-600 rounded-full border-t-transparent animate-spin`}
        ></div>
      </div>
      {text && (
        <p className={`${textSizeClasses[size]} text-gray-600 font-medium`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {loadingContent}
      </div>
    );
  }

  return loadingContent;
};

export default Loading;

