import ProductCard from "./ProductCardList";
import productImage1 from "../../../assets/images/products/product1.png";
import productImage2 from "../../../assets/images/products/product2.png";
import productImage3 from "../../../assets/images/products/product3.png";
import { useTranslation } from 'react-i18next';

const sampleProducts = [
  {
    id: 1,
    sku: "D5515AI",
    name: "MSI CREATOR 17 A10SF-240AU i7 UHD 4K HDR Thin Bezel Intel 10th Gen i7 10875H - RTX 2070 SUPER MAX Q - 16GB RAM - 1TB SSD NVME - Windows 10 PRO Laptop",
    image: productImage1,
    price: 499,
    oldPrice: 549,
    rating: 4,
    reviews: 4,
    inStock: true,
  },
  {
    id: 2,
    sku: "A8933XU",
    name: "HP Spectre x360 14T-EA000 - OLED Touch, Intel EVO i7, 16GB RAM, 1TB SSD, Windows 11 PRO",
    image: productImage2,
    price: 1199,
    oldPrice: 1299,
    rating: 5,
    reviews: 8,
    inStock: true,
  },
  {
    id: 3,
    sku: "C2023OP",
    name: "DELL Inspiron 16 Plus - 16GB RAM, 512GB SSD, RTX 3050, Intel i7-11800H, QHD+ Display",
    image: productImage3,
    price: 899,
    oldPrice: 999,
    rating: 4,
    reviews: 12,
    inStock: false,
  },
];

export default function ProductListCatalog() {
  return (
    <div className="space-y-4">
      {sampleProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// Updated: 2025-10-12T16:06:30.233Z

// Updated: 2025-10-12T16:08:54.839Z
