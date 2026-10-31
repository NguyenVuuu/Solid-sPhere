import React from "react";
import { useTranslation } from 'react-i18next';

const DropdownControls = ({ 
  handleChangePerPage, 
  productsPerPage, 
  sortOption, 
  handleChangeSortOption 
}) => {
  const { t } = useTranslation();

  
  const dropdownContainerClasses = "flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition duration-300 ease-in-out cursor-pointer";
  const labelClasses = "text-gray-600 text-sm mr-2 font-medium";
  const selectClasses = "bg-transparent text-gray-800 text-sm font-semibold outline-none appearance-none cursor-pointer pr-2"; // appearance-none để control mũi tên mặc định

  return (
    <div className="flex gap-4">
      {/* Sort By */}
      <div className={dropdownContainerClasses}>
        <span className={labelClasses}>{t('common.sort_by')}</span>
        <select
          className={selectClasses}
          value={sortOption}
          onChange={handleChangeSortOption}
        >
          <option value="name-asc">{t('common.name_az')} A-Z</option>
          <option value="name-desc">{t('common.name_za')} Z-A</option>
          <option value="price-asc">{t('common.price_low_to_high')} Low to High</option>
          <option value="price-desc">{t('common.price_high_to_low')} High to Low</option>
          <option value="date-desc">{t('common.newest')}</option>
          <option value="date-asc">{t('common.oldest')}</option>
          <option value="stock-desc">{t('common.stock_high_to_low')}</option>
        </select>
      </div>

      {/* Show per page */}
      <div className={dropdownContainerClasses}>
        <span className={labelClasses}>{t('common.show')}</span>
        <select
          className={selectClasses}
          onChange={handleChangePerPage}
          value={productsPerPage}
        >
          <option value={10}>{t('common.10_per_page')}</option>
          <option value={20}>{t('common.20_per_page')}</option>
          <option value={35}>{t('common.35_per_page')}</option>
          <option value={50}>{t('common.50_per_page')}</option>
        </select>
      </div>
    </div>
  );
};

export default DropdownControls;