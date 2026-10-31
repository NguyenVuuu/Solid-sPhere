import React from "react";
import { useTranslation } from 'react-i18next';

const CardNews = ({
  title = null,
  excerpt = null,
  date = "01.09.2020",
  imageUrl = "/path-to-default-image.jpg",
}) => {
  const { t } = useTranslation();

  // Nếu không truyền title/excerpt thì dùng mặc định đa ngôn ngữ
  const displayTitle = title || t('news.defaultTitle');
  const displayExcerpt = excerpt || t('news.defaultExcerpt');

  return (
    <div className="flex flex-col h-full max-w-sm w-full rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white border border-gray-100">
      {/* Image */}
      <div className="h-48 bg-gray-100 overflow-hidden">
        <img
          src={imageUrl}
          alt={displayTitle}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
        />
      </div>

      {/* Nội dung */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors cursor-pointer leading-snug">
          {displayTitle}
        </h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {displayExcerpt}
        </p>

        <div className="mt-auto flex items-center text-xs text-gray-500">
          <svg
            className="w-4 h-4 mr-1.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {date}
        </div>
      </div>
    </div>
  );
};

export default CardNews;

