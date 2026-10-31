import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

export default function DescriptionSection() {
  const { t } = useTranslation();

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="bg-white text-[#8C8C8C] px-6 py-10 text-sm leading-relaxed max-w-5xl mx-auto text-center">
      <div className={expanded ? "" : "line-clamp-6"}>
        <p className="mb-4">
          {t('product_description.msi_prestige_intro')}
        </p>
        <p className="mb-4">
          {t('product_description.screen_profiles')}
        </p>
        <p className="mb-4">
          {t('product_description.design_work')}
        </p>
        <p className="mb-6">
          {t('product_description.home_users')}
        </p>
      </div>

      <button
        onClick={toggleExpand}
        className="px-6 py-2 border-2 border-gray-400 rounded-full text-gray-400 font-bold bg-white cursor-pointer hover:bg-gray-200 transition duration-300"
      >
        {expanded ? t('product_description.less') : t('product_description.more')}
      </button>
    </div>
  );
}

// Updated: 2025-10-12T16:06:38.605Z

// Updated: 2025-10-12T16:08:46.739Z
