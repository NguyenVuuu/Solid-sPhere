import React from "react";
import { useTranslation } from 'react-i18next';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const { t } = useTranslation();

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage > 2) pages.push(1);
      if (currentPage > 3) pages.push("...");
      if (currentPage > 1) pages.push(currentPage - 1);
      pages.push(currentPage);
      if (currentPage < totalPages) pages.push(currentPage + 1);
      if (currentPage < totalPages - 2) pages.push("...");
      if (currentPage < totalPages) pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex gap-3 justify-center items-center my-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 rounded-full border border-gray-400 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
      >
        ‹
      </button>

      {pages.map((page, idx) =>
        page === "..." ? (
          <span
            key={`ellipsis-${idx}`}
            className="w-10 h-10 flex items-center justify-center text-gray-400"
          >
            ...
          </span>
        ) : (
          <button
            key={`page-${page}-${idx}`} // ✅ Đảm bảo key luôn khác nhau
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-full border text-sm ${
              page === currentPage
                ? "bg-gray-100 text-black font-semibold"
                : "border-gray-400 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 rounded-full border border-gray-400 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
      >
        ›
      </button>
    </div>
  );
}

// Updated: 2025-10-12T16:06:46.000Z

// Updated: 2025-10-12T16:08:48.605Z
