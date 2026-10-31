import { useTranslation } from 'react-i18next';

export default function CompareProducts() {
  const { t } = useTranslation();

  return (
    <div className="bg-[#f6f8ff] p-4 rounded-md flex flex-col items-center justify-center">
      <div className="text-3xl font-bold mb-4">{t('product.compare_products')}</div>
      <div className="text-center">
        You have no products to compare. Please select at least two products to
        compare.
      </div>
    </div>
  );
}

// Updated: 2025-10-12T16:06:39.927Z

// Updated: 2025-10-12T16:08:53.620Z
