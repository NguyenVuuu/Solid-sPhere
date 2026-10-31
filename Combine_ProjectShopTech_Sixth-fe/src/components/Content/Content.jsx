import Slideshow from "../Slideshow";
import ProductSlider from "../product/ProductSlider";
import ProductCard from "../product/ProductCard";
import customer_builds from "../../assets/images/custom_buid.webp";
import msi_series from "../../assets/images/msi_series.jpg";
import desktops from "../../assets/images/desktop.jpg";
import monitors from "../../assets/images/msi_monitor.jpg";
import { UserContext } from "../../context/UserContext";

import slide from "../../assets/images/slide.png";
import CategoriesProduct from "../product/CategoriesProduct";
import SeriesNav from "../product/SeriesNav";

// Import logo
import logo1 from "../../assets/images/logo/logo_roccat.svg";
import logo2 from "../../assets/images/logo/logo_msi.svg";
import logo3 from "../../assets/images/logo/logo_razer.svg";
import logo4 from "../../assets/images/logo/logo_thermaltake.svg";
import logo5 from "../../assets/images/logo/logo_adata.svg";
import logo6 from "../../assets/images/logo/logo_hp.svg";
import logo7 from "../../assets/images/logo/logo_gigabytes.svg";
import CardNews from "../info/CardNews";
import TestimonialSlider from "../info/TestimonialSlider";
import HeroSearchSection from "../HeroSearchSection";
import Loading from "../Loading";

// import product1 from "../../assets/images/banner.png";
// import product2 from "../../assets/images/banner.png";
import TestimonialCard from "../info/TestimonialCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../apis/productApi";
import { useTranslation } from 'react-i18next';

const ID_CUSTOM_BUILD = Array.from({ length: 35 - 18 + 1 }, (_, i) => i + 18);
const ID_LAPTOP = Array.from({ length: 7 }, (_, i) => i + 45);
const ID_SCREEN = Array.from({ length: 3 }, (_, i) => i + 36);
const ID_ACCESSORIES = Array.from({ length: 17 }, (_, i) => i + 1);
// const idDesktop = Array.from({ length: 2 }, (_, i) => i + 40);

const CATEGORY_IDS = {
  laptop: [45, 46, 47, 48, 49, 50, 51],
  mouse: [6, 7, 8, 9, 10],
  keyboard: [1, 2, 3, 4, 5],
  phone: [52, 53, 54],
  computers: [36, 37, 38, 39],
  tablet: [44],
  gamingGear: [14, 15, 16],
  processors: [18, 19],
  ram: [30, 31, 32],
  storage: [27, 28, 29],
  case: [17],
  mainboard: [20, 21, 22],
  psu: [23, 24, 25, 26],
  pc: [40, 41],
  headphone: [42, 43],
  mousepad: [11, 12, 13],
};


const ID_DESKTOP = [...CATEGORY_IDS.mainboard, ...CATEGORY_IDS.ram, ...CATEGORY_IDS.mouse, ...CATEGORY_IDS.storage]

const ID_SCREEN_ACCESSORIES = [...ID_SCREEN, ...ID_ACCESSORIES]


function Content() {
  const { t } = useTranslation();

  // const { user } = React.useContext(UserContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Get products from Mock Data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getAllProducts();
        if (response.EC !== 1) {
          throw new Error("Failed to fetch products");
        }
        setProducts(
          response.DT.map((item) => {

            const stock = item.stock ?? item.quantity ?? item.inventory ?? 0;
            const categoryName = item.categoryName || item.category?.name || item.category;
            const brandName = item.name || item.brand?.name || item.brand || "";
            const seriesName = item.seriesName || item.series?.name || item.series || "";
            const imageUrl = item.imageUrl || item.image_url || item.thumbnail || "";
            const productID = item.productID || item.id;
            const productName = item.productName || item.name;
            const image = item.image || imageUrl;
            const price = item.price ?? item.unitPrice ?? item.unit_price ?? 0;


            return {
              item,
              stock,
              categoryName,
              brandName,
              seriesName,
              imageUrl,
              productID,
              productName,
              image,
              price,
              inStock: stock > 0,
            };
          })
        );
        console.log("Fetched products:", products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const SupportCard = ({ icon, title, description }) => {
    return (
      <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 max-w-xs mx-auto">
        <div className="mb-4 p-3 bg-blue-100 rounded-full">{icon}</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  };

  const supportItems = [
    {
      icon: (
        <svg
          className="w-8 h-8 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: t('content.product_support'),
      description: t('content.product_support_desc'),
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      title: t('content.personal_account'),
      description: t('content.personal_account_desc'),
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: t('content.amazing_savings'),
      description: t('content.amazing_savings_desc'),
    },
  ];

  // Show loading while fetching products
  if (loading) {
    return (
      <div className="pt-4 min-h-screen">
        <Loading fullScreen={false} size="lg" text="Đang tải sản phẩm..." className="py-20" />
      </div>
    );
  }

  return (
    <div className="pt-4">
      {/* Hero Search Section */}
      <HeroSearchSection product = {products}/>

      {/* Banner */}
      <Slideshow /> {/* Assuming you have a Slideshow component */}
      {/* Minigame CTA - Simple Design */}
      <div className="max-w-screen-xl mx-auto mt-8 mb-8">
        <div className="flex items-center justify-center">
          {(() => {
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            const hasPlays = user?.numberOfPlaysAllowed > 0 && user?.numberOfGamesPlayed < user?.numberOfPlaysAllowed;
            
            return hasPlays ? (
              <a
                href="/minigame"
                className="inline-flex items-center justify-center px-8 py-3 font-semibold text-white bg-gradient-to-r from-black via-gray-900 to-purple-950 rounded-lg hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <span className="mr-2">🎮</span>
                {t('minigame.playButton')}
              </a>
            ) : (
              <div className="inline-flex items-center justify-center px-8 py-3 font-semibold text-white bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 rounded-lg opacity-70 cursor-not-allowed">
                <span className="mr-2">❌</span>
                {t('minigame.noPlaysLeft')}
              </div>
            );
          })()}
        </div>
        
        {/* Subtitle */}
        <div className="text-center mt-3">
          <p className="text-gray-600 text-sm">
            {t('minigame.description')}
          </p>
        </div>
      </div>
      {/* New product */}
      <div className="py-6 max-w-screen-xl mx-auto">
        <h2 className="text-xl font-bold mb-4">{t('common.new_products')}</h2>
        <div className="w-full overflow-x-hidden">
          <div className="grid grid-cols-1">
            <ProductSlider
              products={products.filter ((product) => CATEGORY_IDS.laptop.includes(product.item.categoryId))}
              autoPlay={true}
              interval={4000}
              visibleCount={5}
            />
          </div>
        </div>
        {/* Quick render to ensure products visible on page */}
        {products?.length > 0 && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* {products.slice(0, 10).map((p, idx) => (
              <div key={p.id || idx} className="border rounded-md p-3 bg-white shadow-sm">
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt={p.name} className="w-full h-32 object-contain mb-2" />
                ) : null}
                <div className="text-sm font-semibold line-clamp-2">{p.name}</div>
                <div className="text-xs text-gray-500 mt-1">{p.brandName || ''}</div>
                <div className="text-blue-600 font-bold mt-2">
                  {p.unitPrice != null ? p.unitPrice.toLocaleString() + ' ₫' : ''}
                </div>
              </div>
            ))} */}
          </div>
        )}
        <div className="text-right mt-4">
          <Link
            to="/products"
            className="text-sm text-blue-600 hover:underline"
          >
            {t('common.see_all_products')}
          </Link>
        </div>
      </div>
      {/* slide */}
      <div className="w-full max-w-screen-xl mx-auto mt-4 rounded-md overflow-hidden shadow-md">
        <img src={slide} alt="" />
      </div>
      {/* customer_builds */}
      <div className="flex gap-4 max-w-screen-xl mx-auto py-6">
        {/* Left - CategoriesProduct chiếm 20% hoặc min-w */}
        <div className="w-[20%] min-w-[120px]">
          <CategoriesProduct image={customer_builds} listID={CATEGORY_IDS.pc} />
        </div>

        {/* Right - Products list chiếm 80% */}
        <div className="w-full overflow-x-hidden">
          <div className="grid grid-cols-1">
            <ProductSlider
              products={(function () {
                const list = products.filter((item) =>  CATEGORY_IDS.pc.includes(item.item.categoryId));
                const base = list.length ? list : products;
                return base.slice(0, 20);
              })()}
              autoPlay={true}
              interval={4000}
              visibleCount={5}
            />
          </div>
        </div>
      </div>
      {/* MSI Series */}
      <div className="w-full max-w-screen-xl mx-auto mt-4 rounded-md overflow-hidden">
        <SeriesNav
          series={[
            ...new Set(
              products
                .filter(
                  (item) =>{
                    return CATEGORY_IDS.laptop.includes(item.item.categoryId)

                  }
                )
                .map((item) => item.seriesName)
            ),
          ]}
        />
        <div className="flex gap-4 max-w-screen-xl mx-auto py-6">
          {/* Left - CategoriesProduct chiếm 20% hoặc min-w */}
          <div className="w-[20%] min-w-[120px]">
            <CategoriesProduct image={msi_series} text={t('content.laptops')} listID={CATEGORY_IDS.laptop} />
          </div>

          {/* Right - Products list chiếm 80% */}
          <div className="w-full overflow-x-hidden">
            <div className="grid grid-cols-1">
              <ProductSlider
                products={(function () {
                  const list = products.filter((item) => CATEGORY_IDS.laptop.includes(item.item.categoryId));
                  const base = list.length ? list : products;
                  return base.slice(0, 20);
                })()}
                autoPlay={true}
                interval={4000}
                visibleCount={5}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Desktops */}
      <div className="w-full max-w-screen-xl mx-auto mt-4 rounded-md overflow-hidden">
        <SeriesNav
          series={[
            ...new Set(
              products
                .filter((item) => item.categoryName === "Case")
                .map((item) => item.seriesName)
            ),
          ]}
        />
        <div className="flex gap-4 max-w-screen-xl mx-auto py-6">
          {/* Left - CategoriesProduct chiếm 20% hoặc min-w */}
          <div className="w-[20%] min-w-[120px]">
            <CategoriesProduct image={desktops} text={t('content.desktops')} listID={ID_DESKTOP} />
          </div>

          {/* Right - Products list chiếm 80% */}
          <div className="w-full overflow-x-hidden">
            <div className="grid grid-cols-1">
              <ProductSlider
                products={(function () {
                  const list = products.filter((item) =>  ID_DESKTOP.includes(item.item.categoryId));
                  const base = list.length ? list : products;
                  return base.slice(0, 20);
                })()}
                autoPlay={true}
                interval={4000}
                visibleCount={5}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Gaming Monitors */}
      <div className="w-full max-w-screen-xl mx-auto mt-4 rounded-md overflow-hidden">
        <div className="flex gap-4 max-w-screen-xl mx-auto py-6">
          {/* Left - CategoriesProduct chiếm 20% hoặc min-w */}
          <div className="w-[20%] min-w-[120px]">
            <CategoriesProduct image={monitors} text={t('content.gaming_monitors')} listID={CATEGORY_IDS.computers} />
          </div>

          {/* Right - Products list chiếm 80% */}
          <div className="w-full overflow-x-hidden">
            <div className="grid grid-cols-1">
              <ProductSlider
                products={(function () {
                  const list = products.filter((item) =>  CATEGORY_IDS.computers.includes(item.item.categoryId));
                  const base = list.length ? list : products;
                  return base.slice(0, 30);
                })()}
                autoPlay={true}
                interval={4000}
                visibleCount={5}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Logo group */}
      <div className="w-full max-w-screen-xl mx-auto mt-4 rounded-md overflow-hidden">
        <div className="flex gap-4 max-w-screen-xl mx-auto py-6">
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <img src={logo1} alt="" className="h-40 object-contain" />
            <img src={logo2} alt="" className="h-40 object-contain" />
            <img src={logo3} alt="" className="h-40 object-contain" />
            <img src={logo4} alt="" className="h-40 object-contain" />
            <img src={logo5} alt="" className="h-40 object-contain" />
            <img src={logo6} alt="" className="h-40 object-contain" />
            <img src={logo7} alt="" className="h-40 object-contain" />
          </div>
        </div>
      </div>
      {/* Follow us on Instagram for News, Offers & More */}
      <div className="w-full max-w-screen-xl mx-auto mt-4 rounded-md overflow-hidden">
        <h2 className="text-xl font-bold mb-4">
          Latest Tech News in Computer Hardware
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-2">
          {[
            {
              title: "NVIDIA Unveils RTX 5090",
              excerpt:
                "The next-gen GPU promises unmatched performance for gaming...",
              date: "2025-04-20",
              imageUrl:
                "https://www.techspot.com/images2/news/bigimage/2022/09/2022-09-20-image-29.jpg", // NVIDIA RTX 4090 image
              url: "https://www.anandtech.com/show/21369/nvidia-geforce-rtx-5090",
            },
            {
              title: "AMD Ryzen 9 9950X Review",
              excerpt:
                "A powerhouse CPU for gamers and creators with 16 cores...",
              date: "2025-04-15",
              imageUrl:
                "https://www.techspot.com/images2/news/bigimage/2023/02/2023-02-27-image-5.jpg", // AMD Ryzen 7000 series CPU image
              url: "https://www.tomshardware.com/reviews/amd-ryzen-9-9950x",
            },
            {
              title: "DDR6 Memory Standards Announced",
              excerpt:
                "Next-gen RAM set to boost PC performance with higher bandwidth...",
              date: "2025-04-10",
              imageUrl:
                "https://www.techspot.com/images2/news/bigimage/2023/10/2023-10-25-image-12.jpg", // DDR5 memory image (already working)
              url: "https://www.techradar.com/news/ddr6-memory",
            },
            {
              title: "Intel Arc B580 GPU Launched",
              excerpt:
                "Affordable graphics for budget gamers with ray tracing support...",
              date: "2025-04-05",
              imageUrl:
                "https://www.techspot.com/images2/news/bigimage/2022/10/2022-10-12-image-5.jpg", // Intel Arc A770 GPU image
              url: "https://www.anandtech.com/show/21370/intel-arc-b580",
            },
            {
              title: "New PCIe 6.0 SSDs Hit the Market",
              excerpt:
                "Blazing-fast storage for enthusiasts with unprecedented speeds...",
              date: "2025-04-01",
              imageUrl:
                "https://www.techspot.com/images2/news/bigimage/2023/08/2023-08-23-image-11.jpg", // Samsung 990 Pro SSD image
              url: "https://www.tomshardware.com/news/pcie-6-ssd",
            },
            {
              title: "ASUS ROG Z790 Motherboard Review",
              excerpt:
                "Top-tier features for high-end builds with Wi-Fi 7 support...",
              date: "2025-03-28",
              imageUrl:
                "https://www.techspot.com/images2/news/bigimage/2022/10/2022-10-20-image-6.jpg", // ASUS ROG Z690 motherboard image (similar to Z790)
              url: "https://www.techradar.com/reviews/asus-rog-z790",
            },
            {
              title: "Liquid Cooling Trends in 2025",
              excerpt: "AIO coolers dominate the market with sleek designs...",
              date: "2025-03-25",
              imageUrl:
                "https://www.techspot.com/images2/news/bigimage/2023/05/2023-05-30-image-7.jpg", // AIO liquid cooler image
              url: "https://www.anandtech.com/show/21371/liquid-cooling-2025",
            },
          ].map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CardNews
                title={article.title}
                excerpt={article.excerpt}
                date={article.date}
                imageUrl={
                  article.imageUrl ||
                  "https://via.placeholder.com/300x200?text=Fallback+Image"
                }
              />
            </a>
          ))}
        </div>
      </div>
      {/*FeedBack  */}
      <div className="w-full max-w-screen-xl mx-auto mt-4 rounded-md overflow-hidden">
        <TestimonialSlider autoPlay={true} interval={3000} />
      </div>
      {/* Support */}
      <div className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportItems.map((item, index) => (
              <SupportCard
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;

