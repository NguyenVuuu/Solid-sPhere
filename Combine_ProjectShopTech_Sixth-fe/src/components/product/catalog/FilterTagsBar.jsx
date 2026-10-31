import { useTranslation } from 'react-i18next';

export default function FilterTagsBar({ filters = [], onRemove, onClear }) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {filters.map((filter, index) => (
        <button
          key={index}
          onClick={() => onRemove(filter)}
          className="px-3 py-1 text-sm bg-gray-200 text-black rounded-full hover:bg-gray-300 transition"
        >
          {filter.label} <span className="text-red-500 ml-1">×</span>
        </button>
      ))}

      {filters.length > 0 && (
        <button
          onClick={onClear}
          className="px-3 py-1 text-sm bg-black text-white rounded-full hover:opacity-80 transition"
        >{t('product.clear_all')}</button>
      )}
    </div>
  );
}

// Updated: 2025-10-12T16:06:47.147Z

// Updated: 2025-10-12T16:08:44.233Z
