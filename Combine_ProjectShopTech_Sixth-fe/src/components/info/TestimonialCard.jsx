import React from 'react';
import { useTranslation } from 'react-i18next';

const TestimonialCard = ({
  testimonial = "My first order arrived today in perfect condition...",
  author = "Tama Brown",
  buttonText = "Leave Us A Review",
  onButtonClick = () => {}
}) => {
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto p-8 rounded-md shadow-md" style={{ backgroundColor: '#f5f7ff' }}>
      <div className="mb-6">
        <p className="text-black text-lg italic leading-relaxed">
          "{testimonial}"
        </p>
      </div>
      
      <div className="mb-8">
        <p className="text-gray-900 font-semibold text-lg">
          - {author}
        </p>
      </div>
      
      <button 
        onClick={onButtonClick}
        className="px-6 py-3 bg-white text-blue-600 font-medium rounded-4xl border-2 border-blue-600 hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default TestimonialCard;
// Updated: 2025-10-12T16:06:22.063Z

// Updated: 2025-10-12T16:08:44.092Z
