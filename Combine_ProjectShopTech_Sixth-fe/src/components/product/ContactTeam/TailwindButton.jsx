import React from 'react';
import { useTranslation } from 'react-i18next';

const TailwindButton = () => {
   const { t } = useTranslation();

   return (
    <div className="bg-gray-900 p-8 flex justify-center items-center">
 <button className="relative w-56 h-14 rounded-full group overflow-hidden">
  {/* Animated gradient border */}
  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 animate-gradient"></div>

  {/* Inner background */}
  <span className="absolute inset-0.5 rounded-full bg-gray-900 group-hover:bg-gray-800 transition-colors"></span>

  {/* Button text */}
  <span className="relative font-bold text-white text leading-tight">{t('product.sign_in')}</span> {/* Changed text size */}
</button>

      
      {/* Add the necessary animation keyframes via inline style */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 300% 300%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default TailwindButton;
// Updated: 2025-10-12T16:06:26.392Z

// Updated: 2025-10-12T16:08:52.149Z
