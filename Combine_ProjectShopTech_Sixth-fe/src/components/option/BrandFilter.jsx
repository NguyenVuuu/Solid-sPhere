import React from "react";

import logoRoccat from "../../assets/images/logo/logo_roccat.svg";
import logoMsi from "../../assets/images/logo/logo_msi.svg";
import logoRazer from "../../assets/images/logo/logo_razer.svg";
import logoThermaltake from "../../assets/images/logo/logo_thermaltake.svg";
import logoAdata from "../../assets/images/logo/logo_adata.svg";
import logoHp from "../../assets/images/logo/logo_hp.svg";
import logoGigabyte from "../../assets/images/logo/logo_gigabytes.svg";
import { useTranslation } from 'react-i18next';

const brands = [
  { name: "ROCCAT", img: logoRoccat },
  { name: "MSI", img: logoMsi },
  { name: "Razer", img: logoRazer },
  { name: "Thermaltake", img: logoThermaltake },
  { name: "ADATA", img: logoAdata },
  { name: "Hewlett Packard", img: logoHp },
  { name: "GIGABYTE", img: logoGigabyte },
];

export default function BrandFilter({ allProducts, onSelectBrand }) {
  const { t } = useTranslation();

  // Hàm filter sản phẩm theo tên brand
  const handleBrandSelect = (brandName) => {
    if (!brandName) {
      // Nếu chọn "All Brands" thì trả hết sản phẩm
      onSelectBrand(allProducts);
    } else {
      console.log("Selected brand:", brandName);
      const filtered = allProducts.filter(
        (product) => product.brandName === brandName
      );
      onSelectBrand(filtered);
    }
  };

  return (
    <div className="bg-[#f6f8ff] p-4 rounded-md">
      <h2 className="text-xl font-bold mb-4 text-center">{t('brand.brands')}</h2>

      <button
        onClick={() => handleBrandSelect(null)}
        className="w-full border border-gray-400 text-gray-400 font-semibold py-2 rounded-full mb-4"
      >
        {t('brand.all_brands')}
      </button>

      <div className="grid grid-cols-2 gap-4">
        {brands.map((brand) => (
          <button
            key={brand.name}
            onClick={() => handleBrandSelect(brand.name)}
            className="flex items-center justify-center border border-transparent hover:border-gray-300 rounded-md p-2 bg-white transition"
          >
            <img
              src={brand.img}
              alt={brand.name}
              className="max-h-10 object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// Updated: 2025-10-12T16:06:37.030Z

// Updated: 2025-10-12T16:09:00.599Z
