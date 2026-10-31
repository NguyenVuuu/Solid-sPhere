import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Bắt đầu auto commit cho Frontend...');

// Initialize git repository if needed
try {
    if (!fs.existsSync('.git')) {
        execSync('git init', { stdio: 'inherit' });
        console.log('Đã khởi tạo git repository');
    }
} catch (error) {
    console.log('Lỗi khởi tạo git:', error.message);
}

// Danh sách các file tập trung vào admin và config
const frontendFiles = [
    // Main files
    'src/main.jsx',
    'src/App.jsx',
    'index.html',
    'package.json',
    'vite.config.js',
    'tailwind.config.js',
    'eslint.config.js',
    
    // Router
    'src/router/AppRouter.jsx',
    
    // Context
    'src/context/UserContext.jsx',
    'src/context/LanguageContext.jsx',
    
    // Admin Layout components
    'src/pages/AdminLayout/AdminLayout.jsx',
    'src/pages/AdminLayout/LaptopTable.jsx',
    'src/pages/AdminLayout/CustomerTable.jsx',
    'src/pages/AdminLayout/ReviewsTable.jsx',
    'src/pages/AdminLayout/DiscountsTable.jsx',
    'src/pages/AdminLayout/OrderTable.jsx',
    'src/pages/AdminLayout/PhoneTable.jsx',
    'src/pages/AdminLayout/MouseTable.jsx',
    'src/pages/AdminLayout/KeyboardTable.jsx',
    'src/pages/AdminLayout/MonitorsTable.jsx',
    'src/pages/AdminLayout/ProcessorsTable.jsx',
    'src/pages/AdminLayout/Ram.jsx',
    'src/pages/AdminLayout/Mainboard.jsx',
    'src/pages/AdminLayout/Psus.jsx',
    'src/pages/AdminLayout/Pc.jsx',
    'src/pages/AdminLayout/Headphone.jsx',
    'src/pages/AdminLayout/Mousepad.jsx',
    'src/pages/AdminLayout/Storage.jsx',
    'src/pages/AdminLayout/Cases.jsx',
    'src/pages/AdminLayout/TabletTable.jsx',
    'src/pages/AdminLayout/GamingGearTable.jsx',
    
    // Admin API files
    'src/apis/adminApi.jsx',
    'src/apis/adminStatsApi.jsx',
    'src/apis/cartApi.jsx',
    'src/apis/categoryApi.jsx',
    'src/apis/discountApi.jsx',
    'src/apis/orderApi.jsx',
    'src/apis/productApi.jsx',
    'src/apis/userApi.jsx',
    
    // Admin Services
    'src/services/CartService.jsx',
    'src/services/LoginServices.jsx',
    'src/services/MockAuthService.js',
    'src/services/MockProductService.js',
    'src/services/MockUserService.js',
    'src/services/ProtectedRoute.jsx',
    'src/services/UserServices.jsx',
    
    // Admin Utils
    'src/utils/priceUtils.js',
    'src/utils/redux/store.jsx',
    'src/utils/redux/cartSlice.jsx',
    'src/utils/redux/orderSlice.jsx',
    'src/utils/redux/fetchProductsSlice.jsx',
    
    // Admin Custom
    'src/custom/axios.jsx',
    
    // Admin Hooks
    'src/hooks/useCart.jsx',
    
    // Admin Constants
    'src/constant/path.jsx',
    
    // Admin i18n
    'src/i18n/config.js',
    'src/i18n/locales/en.json',
    'src/i18n/locales/vi.json',
    'src/i18n/locales/zh.json',
    
    // Admin Locales
    'src/locales/translations.js',
    
    // Admin Mock Data
    'src/mockData/orders.js',
    'src/mockData/products.js',
    'src/mockData/reviews.js',
    'src/mockData/users.js',
    'src/mockData/vouchers.js',
    
    // Admin Pages
    'src/pages/Layout/Layout.jsx',
    'src/pages/AboutUs/AboutUs.jsx',
    'src/pages/account/order.jsx',
    'src/pages/All_Products/All_Products.jsx',
    'src/pages/Appointments/Appointments.jsx',
    'src/pages/Blog/Blog.jsx',
    'src/pages/Brands/Brands.jsx',
    'src/pages/Calendar/VIPCalendar.jsx',
    'src/pages/Card/Card.jsx',
    'src/pages/Categories/CategoriesManagement.jsx',
    'src/pages/Customers/CustomerManagement.jsx',
    'src/pages/CustomerService/CustomerServiceDashboard.jsx',
    'src/pages/Deals/Deals.jsx',
    'src/pages/Desktops/Desktops.jsx',
    'src/pages/Discounts/DiscountsPage.jsx',
    'src/pages/faq/FAQ.jsx',
    'src/pages/I18nDemo/I18nDemo.jsx',
    'src/pages/Laptops/Laptops.jsx',
    'src/pages/Laptops/Catalog.jsx',
    'src/pages/Messages/MessagesPage.jsx',
    'src/pages/Networking_devices/Networking_devices.jsx',
    'src/pages/NewArrivals/NewArrivals.jsx',
    'src/pages/Our_Deal/Our_Deal.jsx',
    'src/pages/Pc_parts/PC_Part.jsx',
    'src/pages/Permissions/PermissionsPage.jsx',
    'src/pages/Printer_scanner/Printer_scanner.jsx',
    'src/pages/Profile/Profile.jsx',
    'src/pages/Promotions/PromotionsManagement.jsx',
    'src/pages/Repair/Repair.jsx',
    'src/pages/Reviews/ReviewsPage.jsx',
    'src/pages/Staff/StaffManagement.jsx',
    'src/pages/ToastDemo/ToastDemo.jsx',
    'src/pages/TrackOrder/TrackOrder.jsx',
    'src/pages/UserProfile/UserProfile.jsx',
    'src/pages/Warranties/Warranties.jsx',
    'src/pages/order-confirmation.jsx',
    
    // Admin Login pages
    'src/pages/login/Login.jsx',
    'src/pages/login/LoginWave.jsx',
    'src/pages/login/GoogleCallback.jsx',
    
    // Admin Shopping Card pages
    'src/pages/ShoppingCard/ShoppingCardItem.jsx',
    'src/pages/ShoppingCard/ShoppingCart.jsx',
    'src/pages/ShoppingCard/ShoppingCard_CheckOut.jsx',
    'src/pages/ShoppingCard/ThankForShopping.jsx',
    
    // Admin Components
    'src/components/Header.jsx',
    'src/components/Footer.jsx',
    'src/components/About.jsx',
    'src/components/Contact.jsx',
    'src/components/Slideshow.jsx',
    'src/components/LanguageSwitcher.jsx',
    'src/components/AddToCartButton.jsx',
    'src/components/CartDropdown.jsx',
    'src/components/ConfirmModal.jsx',
    'src/components/DiscountModal.jsx',
    'src/components/AppointmentBookingForm.jsx',
    'src/components/HeroSearchSection.jsx',
    
    // Admin Product components
    'src/components/product/Product.jsx',
    'src/components/product/ProductCard.jsx',
    'src/components/product/ProductAbout.jsx',
    'src/components/product/ProductDetail.jsx',
    'src/components/product/ProductSpecss.jsx',
    'src/components/product/ProductSlider.jsx',
    'src/components/product/CategoriesProduct.jsx',
    'src/components/product/SeriesNav.jsx',
    'src/components/product/catalog/ProductCardList.jsx',
    'src/components/product/catalog/ProductCardGroup.jsx',
    'src/components/product/catalog/ProductGroupCatalog.jsx',
    'src/components/product/catalog/FilterTagsBar.jsx',
    'src/components/product/ContactTeam/TeamProfiles.jsx',
    'src/components/product/ContactTeam/ProfileCard.jsx',
    'src/components/product/ContactTeam/TailwindButton.jsx',
    
    // Admin Chat components
    'src/components/Chat/ChatWindow.jsx',
    'src/components/Chat/ChatSidebar.jsx',
    'src/components/Chat/ChatMessage.jsx',
    'src/components/ChatWidget/ChatWindow.jsx',
    'src/components/ChatWidget/ChatButton.jsx',
    'src/components/ChatWidget/index.jsx',
    'src/components/ChatWidget/ChatProvider.jsx',
    
    // Admin Info components
    'src/components/info/TestimonialCard.jsx',
    'src/components/info/TestimonialSlider.jsx',
    'src/components/info/CardNews.jsx',
    'src/components/info/Breadcrumb.jsx',
    
    // Admin Option components
    'src/components/option/DescriptionSection.jsx',
    'src/components/option/ScrollToTop.jsx',
    'src/components/option/SidebarFilters.jsx',
    'src/components/option/BrandFilter.jsx',
    'src/components/option/Pagination.jsx',
    'src/components/option/WishList.jsx',
    'src/components/option/ToastNotification.jsx',
    'src/components/option/DropdownControls.jsx',
    'src/components/option/CompareProducts.jsx',
    
    // Admin Order components
    'src/components/order/order-receipt.jsx',
    'src/components/order/create-order.jsx',
    
    // Admin Schedule components
    'src/components/Schedule/ScheduleForm.jsx',
    
    // Admin Shopping Card components
    'src/components/ShoppingCard/ShoppingCardItem.jsx',
    'src/components/ShoppingCard/ShoppingCard_CheckOut.jsx',
    
    // Admin Support components
    'src/components/Support/Support.jsx',
    'src/components/SupportCard/SupportCard.jsx',
    
    // Admin Toast components
    'src/components/Toast/Toast.jsx',
    'src/components/Toast/ToastProvider.jsx',
    
    // Admin Minigame components
    'src/components/minigame/flappy-bord.tsx',
    'src/components/minigame/flappy-bird.css',
    
    // Admin CSS files
    'src/App.css',
    'src/index.css',
    
    // Admin Assets
    'src/assets/image.png',
    'src/assets/react.svg',
    'src/assets/taro.jpg'
];

// Tạo commit messages đơn giản chỉ có create/fix
const createCommitMessage = (filePath, index) => {
    const fileName = path.basename(filePath);
    const fileType = path.extname(fileName);
    
    // Tạo pattern create/fix xen kẽ
    const isCreate = index % 2 === 0;
    const action = isCreate ? 'create' : 'fix';
    
    if (fileName === 'main.jsx') {
        return `${action} main application entry`;
    } else if (fileName === 'App.jsx') {
        return `${action} main app component`;
    } else if (fileName === 'index.html') {
        return `${action} html template`;
    } else if (fileName === 'package.json') {
        return `${action} package configuration`;
    } else if (fileName === 'vite.config.js') {
        return `${action} vite configuration`;
    } else if (fileName === 'tailwind.config.js') {
        return `${action} tailwind configuration`;
    } else if (fileName === 'eslint.config.js') {
        return `${action} eslint configuration`;
    } else if (fileName.includes('Router')) {
        return `${action} ${fileName.replace('.jsx', '')} router`;
    } else if (fileName.includes('Context')) {
        return `${action} ${fileName.replace('.jsx', '')} context`;
    } else if (fileName.includes('Admin')) {
        return `${action} ${fileName.replace('.jsx', '')} admin component`;
    } else if (fileName.includes('Api')) {
        return `${action} ${fileName.replace('.jsx', '')} api`;
    } else if (fileName.includes('Service')) {
        return `${action} ${fileName.replace('.jsx', '')} service`;
    } else if (fileName.includes('Utils')) {
        return `${action} ${fileName.replace('.jsx', '')} utils`;
    } else if (fileName.includes('Hook')) {
        return `${action} ${fileName.replace('.jsx', '')} hook`;
    } else if (fileName.includes('Component')) {
        return `${action} ${fileName.replace('.jsx', '')} component`;
    } else if (fileName.includes('Page')) {
        return `${action} ${fileName.replace('.jsx', '')} page`;
    } else if (fileName.includes('.css')) {
        return `${action} ${fileName} styles`;
    } else if (fileName.includes('.json')) {
        return `${action} ${fileName} data`;
    } else if (fileName.includes('.js')) {
        return `${action} ${fileName} script`;
    } else if (fileName.includes('.tsx')) {
        return `${action} ${fileName} component`;
    } else {
        return `${action} ${fileName}`;
    }
};

console.log('Bắt đầu tạo commits...');

let successCount = 0;
let failCount = 0;

frontendFiles.forEach((filePath, index) => {
    try {
        // Kiểm tra file có tồn tại không
        if (!fs.existsSync(filePath)) {
            console.log(`File không tồn tại: ${filePath}`);
            return;
        }
        
        const commitMessage = createCommitMessage(filePath, index);
        
        console.log(`Commit ${index + 1} of ${frontendFiles.length}`);
        console.log(`File: ${filePath}`);
        console.log(`Message: ${commitMessage}`);
        
        // Add file cụ thể
        execSync(`git add "${filePath}"`, { stdio: 'pipe' });
        
        // Commit với message
        execSync(`git commit -m "${commitMessage}"`, { stdio: 'pipe' });
        
        console.log(`Success commit ${index + 1}`);
        successCount++;
        
        // Delay nhỏ giữa các commit
        setTimeout(() => {}, 200);
        
    } catch (error) {
        console.log(`Failed commit ${index + 1}:`, error.message);
        failCount++;
    }
});

console.log('\nAuto commit completed for Frontend!');
console.log(`Total successful commits: ${successCount}`);
console.log(`Failed commits: ${failCount}`);
console.log('\nTo push to GitHub, run:');
console.log('git remote add origin YOUR_REPO_URL');
console.log('git push -u origin main');
console.log('\nDone!');