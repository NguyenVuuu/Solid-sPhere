import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import ProductCard from "./ProductCard";

const ProductSlider = ({
  products = [],
  autoPlay = false,
  interval = 5000,
  visibleCount = 5,
}) => {
  const { t } = useTranslation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const shouldSlide = products.length > visibleCount;
  const maxIndex = shouldSlide ? products.length - visibleCount : 0;

  useEffect(() => {
    let timer;
    if (isPlaying && shouldSlide) {
      timer = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex >= maxIndex ? 0 : prevIndex + 1
        );
      }, interval);
    }
    return () => clearInterval(timer);
  }, [currentIndex, isPlaying, interval, maxIndex, shouldSlide]);

  const goToPrev = () => {
    if (!shouldSlide || currentIndex === 0) return;
    setCurrentIndex((prevIndex) => prevIndex - 1);
    if (autoPlay) setIsPlaying(false);
  };

  const goToNext = () => {
    if (!shouldSlide || currentIndex >= maxIndex) return;
    setCurrentIndex((prevIndex) => prevIndex + 1);
    if (autoPlay) setIsPlaying(false);
  };

  return (
    <div className="relative w-full">
      {/* Navigation buttons */}
      {shouldSlide && (
        <>
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 hover:shadow-xl transition-all duration-300 ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
            }`}
          >
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 hover:shadow-xl transition-all duration-300 ${
              currentIndex >= maxIndex ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
            }`}
          >
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Product container */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: shouldSlide
              ? `translateX(-${(100 / visibleCount) * currentIndex}%)`
              : "translateX(0%)",
          }}
        >
          {products.map((product, idx) => (
            <div
              key={product.productID || product.id || idx}
              className={`px-3 ${shouldSlide ? "flex-shrink-0" : "w-full md:w-1/2 lg:w-1/3 xl:w-1/4"}`}
              style={{
                width: shouldSlide ? `${100 / visibleCount}%` : undefined,
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots indicator */}
      {shouldSlide && products.length > visibleCount && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-gray-900 w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSlider;