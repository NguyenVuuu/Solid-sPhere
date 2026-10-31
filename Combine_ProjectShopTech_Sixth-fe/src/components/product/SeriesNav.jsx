import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

const SeriesNav = ({
  series = ["MSI GE Series", "MSI GL Series", "MSI GE Series"],
}) => {
  const { t } = useTranslation();

  const [activeIndex, setActiveIndex] = useState(0); // State để lưu index item đang active

  return (
    <nav className="py-4 px-6 shadow-sm bg-gray-50 rounded-md">
      <div className="max-w-6xl mx-auto">
        <ul className="flex flex-wrap gap-4 md:gap-8 justify-center md:justify-start">
          {series.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveIndex(index);
                }}
                className={`font-medium transition-colors duration-200 whitespace-nowrap
                  ${
                    activeIndex === index
                      ? "text-blue-600 underline underline-offset-4 decoration-2"
                      : "text-gray-300 hover:text-blue-600 hover:underline"
                  }
                `}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default SeriesNav;
// Updated: 2025-10-12T16:06:36.634Z

// Updated: 2025-10-12T16:09:05.778Z
