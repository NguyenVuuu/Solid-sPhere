import banner1 from "../../assets/images/logo_banner_catalog.png"; // Import banner image
import Breadcrumb from "../../components/info/Breadcrumb";
import DropdownControls from "../../components/option/DropdownControls";

import group from "../../assets/svg/grid.png";
import listIcon from "../../assets/svg/list.png";
import SidebarFilters from "../../components/option/SidebarFilters";

import FilterTagsBar from "../../components/product/catalog/FilterTagsBar";
import { useEffect, useState } from "react";
import BrandFilter from "../../components/option/BrandFilter";
import WishList from "../../components/option/WishList";
import CompareProducts from "../../components/option/CompareProducts";

import productImageQR from "../../assets/images/products/product_qr_1.png";
import Pagination from "../../components/option/Pagination";
import DescriptionSection from "../../components/option/DescriptionSection";

import ProductCard from "../../components/product/catalog/ProductCardGroup";
import ProductCardList from "../../components/product/catalog/ProductCardList";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllProducts } from "../../apis/productApi";
import { useTranslation } from 'react-i18next';

export default function Catalog() {

  const location = useLocation()
  const { search } = useLocation(); // Lấy search từ URL, ví dụ: ?search=query
  const queryParams = new URLSearchParams(search);
  const textSearch = queryParams.get("search"); // Lấy giá trị của tham số 'search'
  const navigate = useNavigate();

  const { list, brand } = location.state || {};

  const { t } = useTranslation();

  // Debug logs
  console.log("Catalog - location.state:", location.state);
  console.log("Catalog - list:", list);
  console.log("Catalog - brand:", brand);
  console.log("Catalog - textSearch:", textSearch);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // "grid" hoặc "list"
  // Get products from Mock Data - Logic chính
  useEffect(() => {
    const removeVietnameseTones = (str) => {
      return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
    };

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getAllProducts();

        if (response.EC !== 1) {
          throw new Error("Failed to fetch products");
        }

        const rawProducts = Array.isArray(response.DT)
          ? response.DT
          : response.DT
            ? [response.DT]
            : [];

        let formattedProducts = []

        // Xử lý theo list từ location.state
        if (list && Array.isArray(list)) {
          console.log("Filtering by list:", list);
          let filteredByCategory = rawProducts.filter((item) => list.includes(item.categoryId));
          
          // Nếu có brand, filter thêm theo brand
          if (brand) {
            console.log("Filtering by brand:", brand);
            filteredByCategory = filteredByCategory.filter((item) => {
              const itemBrandName = (item.brandName || item.brand?.name || item.brand || "").toLowerCase();
              const productName = (item.name || item.productName || "").toLowerCase();
              const searchBrand = brand.toLowerCase();
              
              // Check brand name hoặc tên sản phẩm chứa brand
              return itemBrandName.includes(searchBrand) || productName.includes(searchBrand);
            });
            console.log("Products found after brand filter:", filteredByCategory.length);
          }
          
          formattedProducts = filteredByCategory.map((item) => ({
            ...item,
            inStock: item.stock > 0,
          }));
          console.log("Products found for list:", formattedProducts.length);
        } else {
          // Xử lý theo textSearch
          if (textSearch) {
            const search = removeVietnameseTones(textSearch.toLowerCase());

            if (search === "gaming") {
              console.log("Gaming search:", rawProducts[0]);
              formattedProducts = rawProducts.filter((item) => (item.categoryId === 46 && item.name.includes("Gaming"))).map((item) => ({
                ...item,
                inStock: item.stock > 0,
              }));
            } else {
              // Tìm kiếm theo tên sản phẩm hoặc mô tả
              formattedProducts = rawProducts.filter((product) => {
                const searchTerm = removeVietnameseTones(search);
                const productName = removeVietnameseTones(product.name?.toLowerCase() || "");
                const productDesc = removeVietnameseTones(product.description?.toLowerCase() || "");
                
                return productName.includes(searchTerm) || productDesc.includes(searchTerm);
              }).map((item) => ({
                ...item,
                inStock: item.stock > 0,
              }));
            }
          } else {
            // Không có search, hiển thị tất cả
            formattedProducts = rawProducts.map((item) => ({
              ...item,
              inStock: item.stock > 0,
            }));
          }
        }

        console.log("Formatted products:", formattedProducts.length);

          setProducts(formattedProducts);
          setFilteredProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
          setProducts([]);
          setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [textSearch, list, brand]);
  console.log(products);
  // Trong function Catalog():
  const [filters, setFilters] = useState([
    { label: "CUSTOM PCS (24)" },
    { label: "HP/COMPAQ PCS (24)" },
  ]);

  const handleRemoveFilter = filterToRemove => {
    setFilters(filters.filter(f => f.label !== filterToRemove.label));
  };

  const handleClearFilters = () => {
    setFilters([]);
  };
  console.log(handleClearFilters);
  console.log(handleRemoveFilter);

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
      title: "Product Support",
      description:
        "Up to 3 years on-site warranty available for your peace of mind.",
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
      title: "Personal Account",
      description:
        "With big discounts, free delivery and a dedicated support specialist.",
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
      title: "Amazing Savings",
      description:
        "Up to 70% off new Products, you can be sure of the best price.",
    },
  ];
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  // const totalPages = 15;

  const handlePageChange = page => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Load dữ liệu tương ứng tại đây
    }
  };

  const [productsPerPage, setProductsPerPage] = useState(20); // Số sản phẩm trên mỗi trang
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Xử lý đổi số lượng sản phẩm trên một trang
  const handleProductsPerPageChange = event => {
    setProductsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset về trang đầu tiên khi thay đổi số lượng sản phẩm trên trang
  };

  const [sortOption, setSortOption] = useState("name-asc");
  const handleSortOptionChange = event => {
    setSortOption(event.target.value);
    setCurrentPage(1); // Optional: Reset về page 1 khi đổi sort
  };

  const getSortedProducts = (filteredProducts, sortOption) => {
    const sorted = [...filteredProducts]; // Clone mảng gốc để không mutate

    switch (sortOption) {
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        sorted.sort((a, b) => parseFloat(a.unitPrice) - parseFloat(b.unitPrice));
        break;
      case "price-desc":
        sorted.sort((a, b) => parseFloat(b.unitPrice) - parseFloat(a.unitPrice));
        break;
      case "date-desc":
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "date-asc":
        sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "brand-asc":
        sorted.sort((a, b) => a.brandName.localeCompare(b.brandName));
        break;
      case "stock-desc":
        sorted.sort((a, b) => b.stockQuantity - a.stockQuantity);
        break;
      default:
        break;
    }

    return sorted;
  };

  const sortedProducts = getSortedProducts(currentProducts, sortOption);

  return (
    <>
      {" "}
      <div className="py-6 max-w-screen-xl mx-auto">
        <img src={banner1} alt="" className="mb-2" />
        {/* <Breadcrumb
          items={[
            { label: "Trang chủ", url: "/" },
            { label: "Sản phẩm", url: "/products" },
            { label: "MSI WS Series", url: "/products/msi-ws-series" },
          ]}
        /> */}
      </div>
      {/* <div className="py-6 max-w-screen-xl mx-auto">
        <p className="text-4xl font-bold">{t('common.msi_ps_series_20')}</p>
      </div> */}
      {/* Phần header danh sách */}
      <div className="py-6 max-w-screen-xl mx-auto grid grid-cols-4 items-center gap-4">
        <div className="">
          <button
            type="button"
            className="w-full py-3 px-6 text-xl font-semibold text-gray-400 hover:text-black
            transition-all duration-300 ease-in-out flex items-center justify-start
            hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-200 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back
          </button>
        </div>

        <div className="px-2 py-1 flex justify-items-start text-[#A2A6B0]">
          Items {indexOfFirstProduct + 1}-{indexOfLastProduct} of{" "}
          {filteredProducts.length}
        </div>

        <div className="col-span-2 flex justify-end">
          <DropdownControls
            handleChangePerPage={handleProductsPerPageChange}
            productsPerPage={productsPerPage}
            sortOption={sortOption}
            handleChangeSortOption={handleSortOptionChange}
          />
          <div className="flex">
            <img
              src={group}
              alt={t("common.grid_view")}
              className={`w-8 h-8 cursor-pointer ${
                viewMode === "grid" ? "opacity-100" : "opacity-50"
              }`}
              onClick={() => setViewMode("grid")}
            />
            <img
              src={listIcon}
              alt={t("common.list_view")}
              className={`w-8 h-8 cursor-pointer ${
                viewMode === "list" ? "opacity-100" : "opacity-50"
              }`}
              onClick={() => setViewMode("list")}
            />
          </div>
        </div>
      </div>
      {/*  */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-4 gap-4">
        {/* Phần filter */}
        <div className="">
          <SidebarFilters
            products={filteredProducts}
            allProducts={products}
            onApplyFilters={filteredProducts => {
              setFilteredProducts(filteredProducts);
            }}
          />

          <div className="h-2"></div>
          <BrandFilter
            allProducts={products}
            onSelectBrand={filteredProducts =>
              setFilteredProducts(filteredProducts)
            }
          />
          <div className="h-2"></div>
          <WishList />
          <div className="h-2"></div>
          <CompareProducts />
          <img src={productImageQR} alt="" className="w-full" />
        </div>
        {/* Phần hiển thị danh sách */}
        <div className="col-span-3 flex flex-col min-h-[80vh]">
          {/* Thanh filter tag */}
          {/* <FilterTagsBar
            filters={filters}
            onRemove={handleRemoveFilter}
            onClear={handleClearFilters}
          /> */}

          {/* Danh sách sản phẩm, chiếm chiều cao còn lại */}
          <div className="flex-grow">
    {/* Loading Indicator */}
    {loading && (
        <div className="flex flex-col items-center justify-center py-20 min-h-[400px]">
            {/* Spinner */}
            <div className="relative w-16 h-16 mb-4">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-purple-200 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-purple-950 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-lg font-semibold text-purple-950 animate-pulse">
                Đang tải sản phẩm...
            </p>
            <p className="text-sm text-gray-500 mt-2">
                Vui lòng đợi trong giây lát
            </p>
        </div>
    )}

    {/* Dạng Grid */}
    {!loading && viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fadeIn">
            {sortedProducts.length > 0 ? (
                sortedProducts.map((product) => (
                    
                    <ProductCard key={product.id || product.productID} product={product} /> 
                ))
            ) : (
                // Hiển thị thông báo nếu không có sản phẩm trong chế độ Grid
                <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500">
                    {/* Icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 9.75L14.25 14.25M14.25 9.75L9.75 14.25M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                        />
                    </svg>

                    {/* Thông báo */}
                    <p className="text-lg font-semibold">
                        Không tìm thấy sản phẩm nào
                    </p>
                </div>
            )}
        </div>
    )}

    {/* Dạng List - Đã thêm logic kiểm tra sortedProducts.length */}
    {!loading && viewMode === "list" && (
        <div className="space-y-4 animate-fadeIn">
            {sortedProducts.length > 0 ? (
                sortedProducts.map(product => (
                    
                    <ProductCardList key={product.id || product.productID} product={product} />
                ))
            ) : (
                // HIỂN THỊ THÔNG BÁO TƯƠNG TỰ TRONG CHẾ ĐỘ LIST
                <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500">
                    {/* Icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 9.75L14.25 14.25M14.25 9.75L9.75 14.25M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                        />
                    </svg>

                    {/* Thông báo */}
                    <p className="text-lg font-semibold">
                        Không tìm thấy sản phẩm nào
                    </p>
                </div>
            )}
        </div>
    )}
</div>

          {/* Pagination + Mô tả thêm, nằm dưới cùng */}
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            <DescriptionSection />
          </div>
        </div>
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
    </>
  );
}