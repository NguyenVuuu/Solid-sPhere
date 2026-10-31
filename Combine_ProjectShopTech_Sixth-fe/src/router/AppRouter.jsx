// // AppRouter.jsx
// import React, { useContext } from "react";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate
// } from "react-router-dom";
// import { UserContext } from "../context/UserContext";
// import ProtectedRoute from "../services/ProtectedRoute";

// // Pages
// import Layout from "../pages/Layout/Layout";

// import Content from "../components/Content/Content";
// import Contact from "../components/Contact";
// import About from "../components/About";
// import LoginWave from "../pages/login/LoginWave";
// import Profile from "../pages/Profile/Profile";
// import Laptop from "../pages/Laptops/Laptops";
// import Desktop from "../pages/Desktops/Desktops";
// import NetWorking from "../pages/Networking_devices/Networking_devices";
// import Printer_Scanner from "../pages/Printer_scanner/Printer_scanner";
// import PC_Part from "../pages/Pc_parts/PC_Part";
// import All_Product from "../pages/All_Products/All_Products";
// import Repair from "../pages/Repair/Repair";
// import Our_Deal from "../pages/Our_Deal/Our_Deal";
// import Card from "../pages/Card/Card";
// import Catalog from "../pages/Laptops/Catalog";
// import FAQ from "../pages/faq/FAQ";
// import ShoppingCartItem from "../pages/ShoppingCard/ShoppingCardItem";
// import ShoppingCard_CheckOut from "../pages/ShoppingCard/ShoppingCard_CheckOut";
// import ProductDetail from "../components/product/ProductDetail";
// import ProductSpeccs from "../components/product/ProductSpecss";
// import Admin from "../pages/AdminLayout/AdminLayout";
// import ProductAbout from "../components/product/ProductAbout";
// import Product from "../components/product/Product";
// import ScrollToTop from "../components/option/ScrollToTop";
// const AppRouter = () => {
//   const { getUserRole, loading } = useContext(UserContext);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-700"></div>
//       </div>
//     );
//   }

//   const userRole = getUserRole();
//   console.log("Current user role:", userRole);

//   return (
//     <BrowserRouter>
//       <ScrollToTop />
//       <Routes>
//         {/* Public routes */}
//         <Route path="/login" element={<LoginWave />} />

//         {/* Admin routes  */}
//         <Route path="/admin" element={
//           <ProtectedRoute requiredRoles={['manager']}>
//             <Admin />
//           </ProtectedRoute>
//         } />

//         {/* Customer/public routes */}
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Content />} />
//           {/* Fix nested routes by removing leading slashes */}
//           <Route path="contact" element={<Contact />} />
//           <Route path="about" element={<About />} />
//           <Route path="laptops" element={<Laptop />} />
//           <Route path="laptops/catalog" element={<Catalog />} />
//           <Route path="faq" element={<FAQ />} />
//           <Route path="desktops" element={<Desktop />} />
//           <Route path="networking_devices" element={<NetWorking />} />
//           <Route path="printer_scanner" element={<Printer_Scanner />} />
//           <Route path="pc_parts" element={<PC_Part />} />
//           <Route path="all_products" element={<All_Product />} />
//           <Route path="repair" element={<Repair />} />
//           <Route path="our_deal" element={<Our_Deal />} />

//           {/* Protected customer routes - also fix nested paths */}
//           <Route path="profile" element={
//             <ProtectedRoute requiredRoles={['customer']}>
//               <Profile />
//             </ProtectedRoute>
//           } />
//           <Route path="card" element={
//             <ProtectedRoute requiredRoles={['customer']}>
//               <Card />
//             </ProtectedRoute>
//           } />
//           <Route path="shopping_card_checkout" element={
//             <ProtectedRoute requiredRoles={['customer']}>
//               <ShoppingCard_CheckOut />
//             </ProtectedRoute>
//           } />
//           <Route path="shopping_card_item" element={
//             <ProtectedRoute requiredRoles={['customer']}>
//               <ShoppingCartItem />
//             </ProtectedRoute>
//           } />
//         </Route>
//         <Route path="/product/:id" element={<Product />}>
//             <Route path="productAbout" element={<ProductAbout />}></Route>
//             <Route path="productDetail" element={<ProductDetail />}></Route>
//             <Route path="productSpeccs" element={<ProductSpeccs />}></Route>
//             <Route index element={<ProductAbout />}></Route>
//           </Route>
//         {/* Redirect based on role */}
//         <Route path="/dashboard" element={
//           userRole === 'manager' ? <Navigate to="/admin" /> :
//           userRole === 'employee' ? <Navigate to="/employee" /> :
//           <Navigate to="/" />
//         } />
//         <Route path="/products" element={<Catalog />}></Route>

//         <Route path="/about" element={<About />}></Route>
//         {/* Catch all - 404 */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default AppRouter;
import React, { useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { UserContext } from "../context/UserContext";
import ProtectedRoute from "../services/ProtectedRoute";

// Pages and Components
import Layout from "../pages/Layout/Layout";
import Content from "../components/Content/Content";
import Contact from "../components/Contact";
import About from "../components/About";
import LoginWave from "../pages/login/LoginWave";
import Login from "../pages/login/Login";
import GoogleCallback from "../pages/login/GoogleCallback";
import ProfileLayout from "../pages/Profile/ProfileLayout";
import ProfileDashboard from "../pages/Profile/ProfileDashboard";
import ProfileInfo from "../pages/Profile/ProfileInfo";
import MyOrders from "../pages/Profile/MyOrders";
import MyFavourite from "../pages/Profile/MyFavourite";
import Laptop from "../pages/Laptops/Laptops";
import Desktop from "../pages/Desktops/Desktops";
import NetWorking from "../pages/Networking_devices/Networking_devices";
import Printer_Scanner from "../pages/Printer_scanner/Printer_scanner";
import PC_Part from "../pages/Pc_parts/PC_Part";
import All_Product from "../pages/All_Products/All_Products";
import Repair from "../pages/Repair/Repair";
import Our_Deal from "../pages/Our_Deal/Our_Deal";
import Card from "../pages/Card/Card";
import Catalog from "../pages/Laptops/Catalog";
import FAQ from "../pages/faq/FAQ";
import ShoppingCartItem from "../pages/ShoppingCard/ShoppingCardItem";
import ShoppingCard_CheckOut from "../pages/ShoppingCard/ShoppingCard_CheckOut";
import ProductDetail from "../components/product/ProductDetail";
import ProductSpeccs from "../components/product/ProductSpecss";
import Admin from "../pages/AdminLayout/AdminLayout";
import ProductAbout from "../components/product/ProductAbout";
import Product from "../components/product/Product";
import ScrollToTop from "../components/option/ScrollToTop";
import VIPCalendar from "../pages/Calendar/VIPCalendar";
import ThankYouPage from "../pages/ShoppingCard/ThankForShopping";
import ReviewsPage from "../pages/Reviews/ReviewsPage";
import MessagesPage from "../pages/Messages/MessagesPage";
import DiscountsPage from "../pages/Discounts/DiscountsPage";
import PermissionsPage from "../pages/Permissions/PermissionsPage";
import ShoppingCardItem from "../pages/ShoppingCard/ShoppingCardItem";
import ShoppingCart from "../pages/ShoppingCard/ShoppingCart";
// New 2025 Ecommerce Pages
import Deals from "../pages/Deals/Deals";
import NewArrivals from "../pages/NewArrivals/NewArrivals";
import Brands from "../pages/Brands/Brands";
import TrackOrder from "../pages/TrackOrder/TrackOrder";
import Blog from "../pages/Blog/Blog";

// Management Pages
import Appointments from "../pages/Appointments/Appointments";
import Warranties from "../pages/Warranties/Warranties";
import CustomerManagement from "../pages/Customers/CustomerManagement";
import PromotionsManagement from "../pages/Promotions/PromotionsManagement";
import CategoriesManagement from "../pages/Categories/CategoriesManagement";
import StaffManagement from "../pages/Staff/StaffManagement";
import CustomerServiceDashboard from "../pages/CustomerService/CustomerServiceDashboard";
import ToastDemo from "../pages/ToastDemo/ToastDemo";
import I18nDemo from "../pages/I18nDemo/I18nDemo";
import UserProfile from "../pages/UserProfile/UserProfile";
import FlappyBird from "../components/minigame/flappy-bord";
import Favorites from "../pages/Favorites/Favorites";
import NotFound from "../pages/NotFound/NotFound";

const AppRouter = () => {
  const { getUserRole, loading: _loading } = useContext(UserContext);

  // Temporarily disable loading check for debugging
  // if (_loading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-700"></div>
  //     </div>
  //   );
  // }

  const userRole = getUserRole();
  console.log("Current user role:", userRole);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginWave />} />
        <Route path="/login/callback" element={<GoogleCallback />} />

        {/* Admin routes - Only accessible by ADMIN role */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRoles={["admin"]}>
              <Outlet /> {/* Render child routes */}
            </ProtectedRoute>
          }
        >
          <Route index element={<Admin />} /> {/* /admin */}
          <Route path="calendar" element={<VIPCalendar />} /> {/* /admin/calendar */}
          <Route path="reviews" element={<ReviewsPage />} /> {/* /admin/reviews */}
          <Route path="messages" element={<MessagesPage />} /> {/* /admin/messages */}
          <Route path="discounts" element={<DiscountsPage />} /> {/* /admin/discounts */}
          <Route path="permissions" element={<PermissionsPage />} /> {/* /admin/permissions */}
        </Route>
        {/* Customer/public routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Content />} />

          {/* Minigame route - Requires authentication */}
          <Route
            path="minigame"
            element={
              <ProtectedRoute requireAuth={true} requiredRoles={[]}>
                <FlappyBird />
              </ProtectedRoute>
            }
          />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="laptops" element={<Laptop />} />
          <Route path="laptops/catalog" element={<Catalog />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="desktops" element={<Desktop />} />
          <Route path="networking_devices" element={<NetWorking />} />
          <Route path="printer_scanner" element={<Printer_Scanner />} />
          <Route path="pc_parts" element={<PC_Part />} />
          <Route path="all_products" element={<All_Product />} />
          <Route path="repair" element={<Repair />} />
          <Route path="our_deal" element={<Our_Deal />} />
          <Route path="thank_you_shopping" element={<ThankYouPage />} />

          {/* New 2025 Ecommerce Pages */}
          <Route path="deals" element={<Deals />} />
          <Route path="new-arrivals" element={<NewArrivals />} />
          <Route path="brands" element={<Brands />} />
          <Route path="track-order" element={<TrackOrder />} />
          <Route path="blog" element={<Blog />} />
          <Route path="favorites" element={<Favorites />} />

          {/* Management Pages */}
          <Route path="appointments" element={<Appointments />} />
          <Route path="warranties" element={<Warranties />} />
          <Route path="customers" element={<CustomerManagement />} />
          <Route path="promotions" element={<PromotionsManagement />} />
          <Route path="categories" element={<CategoriesManagement />} />
          <Route path="staff" element={<StaffManagement />} />
          <Route path="customer-service" element={<CustomerServiceDashboard />} />
       
          {/* Protected customer routes - Requires authentication */}
          <Route
            path="userProfile"
            element={
              <ProtectedRoute requireAuth={true} requiredRoles={[]}>
                <UserProfile />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="profile"
            element={
              <ProtectedRoute requireAuth={true} requiredRoles={[]}>
                <ProfileLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProfileDashboard />} />
            <Route path="info" element={<ProfileInfo />} />
            <Route path="my-orders" element={<MyOrders />} />
            <Route path="my-favourite" element={<MyFavourite />} />
          </Route>
          <Route
            path="card"
            element={
              <ProtectedRoute requireAuth={true} requiredRoles={[]}>
                <Card />
              </ProtectedRoute>
            }
          />

          {/* Shopping cart routes - Requires authentication for checkout */}
          <Route
            path="shopping_card_checkout"
            element={
              <ProtectedRoute requireAuth={true} requiredRoles={[]}>
                <ShoppingCard_CheckOut />
              </ProtectedRoute>
            }
          />
          <Route
            path="shopping_card_item"
            element={
              <ShoppingCart />
            }
          />
          <Route
            path="shopping_payment"
            element={
              <ProtectedRoute requireAuth={true} requiredRoles={[]}>
                <ShoppingCardItem />
              </ProtectedRoute>
            }
          />
          <Route path="thank_you_shopping" element={<ThankYouPage />} />
          {/* Product routes */}
          <Route path="/product/:id" element={<Product />}>
            <Route path="productAbout" element={<ProductAbout />} />
            <Route path="productDetail" element={<ProductDetail />} />
            <Route path="productSpeccs" element={<ProductSpeccs />} />
            <Route index element={<ProductAbout />} />
          </Route>
          {/* Products route - Uses Catalog component (original design) */}
          <Route path="/products" element={<Catalog />} />

          {/* Toast Demo */}
          <Route path="/toast-demo" element={<ToastDemo />} />

          {/* I18n Demo */}
          <Route path="/i18n-demo" element={<I18nDemo />} />
        </Route>

        {/* Redirect based on role */}
        <Route
          path="/dashboard"
          element={
            userRole === "admin" ? (
              <Navigate to="/admin" />
            ) : userRole === "customer_service" ? (
              <Navigate to="/customer-service" />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* 404 Not Found Page */}
        <Route path="/404" element={<NotFound />} />
        
        {/* Catch all - 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
