# �️ ShopTech - Hệ thống Thương mại Điện tử

## � Giới thiệu

ShopTech là một hệ thống thương mại điện tử toàn diện được xây dựng với kiến trúc phân tách Front-end và Back-end. Dự án cung cấp đầy đủ các tính năng của một nền tảng mua bán trực tuyến hiện đại, bao gồm quản lý sản phẩm, giỏ hàng, thanh toán, chat trực tuyến với nhân viên hỗ trợ, và hệ thống quản trị đa cấp.

## 🌐 Demo

**Link demo:** [https://solid-sphere-one.vercel.app/](https://solid-sphere-one.vercel.app/)

### � Tài khoản demo

Để trải nghiệm đầy đủ các tính năng của hệ thống, vui lòng sử dụng các tài khoản demo sau:

#### �‍💼 Admin
- **Email:** `admin@shoponline.com`
- **Mật khẩu:** `123456`
- **Quyền hạn:** Quản trị toàn hệ thống, quản lý sản phẩm, danh mục, người dùng, đơn hàng, thống kê

#### 🎧 Nhân viên Chăm sóc Khách hàng (CSKH)
- **Email:** `support1@shoponline.com`
- **Mật khẩu:** `123456`
- **Quyền hạn:** Hỗ trợ khách hàng qua chat, xem và xử lý đơn hàng

#### � Khách hàng
- **Email:** `customer4@gmail.com`
- **Mật khẩu:** `123456`
- **Quyền hạn:** Mua sắm, quản lý đơn hàng cá nhân, chat với CSKH

## 🏗️ Kiến trúc Hệ thống

Dự án được chia thành 4 module chính:

```
project06/
├── Combine_ProjectShopTech_Sixth-be/      # Backend - Spring Boot
├── Combine_ProjectShopTech_Sixth-fe/      # Frontend - React + Vite
├── Combine_ProjectShopTech_Sixth-vnpay/   # VNPay Gateway Integration
└── Combine_ProjectShopTech_Sixth-vnpaymock/  # VNPay Mock Service
```

## 🚀 Công nghệ sử dụng

### Backend
- **Framework:** Spring Boot 3.x
- **Database:** MySQL (Aiven Cloud)
- **Cache:** Redis (Upstash Cloud)
- **Authentication:** JWT + OAuth2 (Google Login)
- **API Documentation:** Swagger/OpenAPI
- **Rate Limiting:** Bucket4j
- **AI Integration:** Google Gemini API
- **Payment:** VNPay

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **State Management:** Redux Toolkit
- **UI Library:** Material-UI, Ant Design
- **Styling:** TailwindCSS
- **Real-time Communication:** Socket.IO
- **Internationalization:** i18next

### DevOps
- **Backend Deployment:** Render (Docker)
- **Frontend Deployment:** Vercel
- **Database:** Aiven MySQL
- **Cache:** Upstash Redis

## ✨ Tính năng chính

### 🛒 Dành cho Khách hàng
- ✅ Đăng ký, đăng nhập (Email + Google OAuth2)
- ✅ Xem danh sách sản phẩm với filter, search, phân trang
- ✅ Chi tiết sản phẩm, đánh giá, bình luận
- ✅ Giỏ hàng, wishlist
- ✅ Đặt hàng, thanh toán qua VNPay
- ✅ Theo dõi trạng thái đơn hàng
- ✅ Chat trực tuyến với nhân viên CSKH
- ✅ Quản lý thông tin cá nhân
- ✅ Đa ngôn ngữ (Tiếng Việt/English)

### 👨‍💼 Dành cho Admin
- ✅ Dashboard thống kê doanh thu, đơn hàng
- ✅ Quản lý sản phẩm (CRUD)
- ✅ Quản lý danh mục sản phẩm
- ✅ Quản lý người dùng và phân quyền
- ✅ Quản lý đơn hàng
- ✅ Xem báo cáo và thống kê chi tiết

### 🎧 Dành cho Nhân viên CSKH
- ✅ Nhận và trả lời chat từ khách hàng real-time
- ✅ Xem lịch sử chat
- ✅ Xem và xử lý đơn hàng
- ✅ Hỗ trợ khách hàng với AI assistant (Gemini)

## � Cài đặt và Chạy Local

### Yêu cầu hệ thống
- **Node.js:** >= 18.x
- **Java:** JDK 17+
- **Maven:** 3.8+
- **MySQL:** 8.0+
- **Redis:** 6.x+

### Backend

```bash
cd Combine_ProjectShopTech_Sixth-be

# Cấu hình môi trường
# Tạo file .env từ .env.example và điền thông tin

# Cài đặt dependencies và chạy
mvn clean install
mvn spring-boot:run

# Server sẽ chạy tại http://localhost:8081
# Swagger UI: http://localhost:8081/swagger-ui/index.html
```

### Frontend

```bash
cd Combine_ProjectShopTech_Sixth-fe

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Server sẽ chạy tại http://localhost:5173
```

### VNPay Mock (Development)

```bash
cd Combine_ProjectShopTech_Sixth-vnpaymock
npm install
npm start

# Server sẽ chạy tại http://localhost:8082
```

## � Cấu hình

### Backend Environment Variables
```env
# Database
DB_URL=jdbc:mysql://your-db-host:port/database
DB_USERNAME=your-username
DB_PASSWORD=your-password

# JWT
JWT_SECRET_KEY=your-secret-key
JWT_ISSUER_URI=http://localhost:8081

# Redis
REDIS_HOST=your-redis-host
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password

# OAuth2
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email
MAIL_USERNAME=your-email
MAIL_PASSWORD=your-password

# AI
GEMINI_API_KEY=your-gemini-api-key

# Frontend URL
FRONTEND_URL=http://localhost:5173

# VNPay
VNPAY_URL=your-vnpay-url
VNPAY_TMN_CODE=your-tmn-code
VNPAY_HASH_SECRET=your-hash-secret
```

### Frontend Environment Variables
```env
VITE_API_BASE_URL=http://localhost:8081
VITE_SOCKET_URL=http://localhost:8081
VITE_VNPAY_RETURN_URL=http://localhost:5173/payment/result
```

## � API Documentation

Sau khi chạy Backend, truy cập Swagger UI tại:
- **Local:** `http://localhost:8081/swagger-ui/index.html`
- **Production:** `https://solid-sphere.onrender.com/swagger-ui/index.html`

## 🎯 Workflow sử dụng

### Khách hàng
1. Đăng ký tài khoản hoặc đăng nhập qua Google
2. Duyệt sản phẩm, thêm vào giỏ hàng
3. Tiến hành đặt hàng và thanh toán qua VNPay
4. Theo dõi trạng thái đơn hàng
5. Chat với CSKH nếu cần hỗ trợ

### Nhân viên CSKH
1. Đăng nhập với tài khoản CSKH
2. Nhận tin nhắn từ khách hàng
3. Trả lời và hỗ trợ khách hàng
4. Xử lý các yêu cầu về đơn hàng

### Admin
1. Đăng nhập với tài khoản Admin
2. Xem dashboard thống kê tổng quan
3. Quản lý sản phẩm, danh mục, người dùng
4. Xem và xử lý đơn hàng
5. Theo dõi báo cáo doanh thu

## 🔒 Bảo mật

- **Authentication:** JWT Token + OAuth2 Google
- **Authorization:** Role-based Access Control (RBAC)
- **Rate Limiting:** Bucket4j (100 requests/minute per IP)
- **CORS:** Configured for specific origins
- **Password:** BCrypt hashing
- **API Security:** Bearer token required for protected endpoints

## 🌟 Highlights

### 1. Real-time Chat System
- WebSocket connection với Socket.IO
- Hỗ trợ chat trực tiếp giữa khách hàng và CSKH
- Tích hợp AI assistant (Google Gemini)
- Lưu trữ lịch sử chat

### 2. Payment Integration
- Tích hợp VNPay Gateway
- Xử lý callback và verify payment
- Mock service cho development

### 3. Caching Strategy
- Redis cache cho sản phẩm, danh mục
- TTL management
- Cache invalidation on updates

### 4. API Documentation
- Swagger/OpenAPI 3.0
- Interactive API testing
- Auto-generated from code

## 👥 Nhóm phát triển

**Nguyễn Vũ**
- 📧 Email: nguyenvu2112004@gmail.com
- � LinkedIn: [linkedin.com/in/nguyenvuuu](https://www.linkedin.com/in/nguyenvuuu/)
- � GitHub: [github.com/NguyenVuuu](https://github.com/NguyenVuuu)
- � Facebook: [facebook.com/nguyenvuuu0211](https://www.facebook.com/nguyenvuuu0211)

**Địa chỉ:** 466/12 Nguyễn Văn Bảo, Quận Gò Vấp, TP. Hồ Chí Minh

## � License

Dự án này được phát triển cho mục đích học tập tại Đại học Công nghiệp TP.HCM (IUH).

## 🐛 Known Issues & Roadmap

- [ ] Optimize image loading and caching
- [ ] Add more payment methods
- [ ] Implement push notifications
- [ ] Add product recommendation system
- [ ] Mobile app version

## 🙏 Acknowledgments

- **Spring Boot** - Backend framework
- **React** - Frontend library
- **VNPay** - Payment gateway
- **Google Gemini** - AI integration
- **Aiven** - Database hosting
- **Upstash** - Redis hosting
- **Render** - Backend hosting
- **Vercel** - Frontend hosting

---

**⚡ Hướng dẫn test nhanh:**

1. Truy cập [https://solid-sphere-one.vercel.app/](https://solid-sphere-one.vercel.app/)
2. Đăng nhập với một trong các tài khoản demo bên trên
3. Khám phá các tính năng theo từng role
4. Trải nghiệm chat real-time với CSKH
5. Thử thanh toán qua VNPay sandbox

**Lưu ý:** Backend có thể mất 30-60 giây để khởi động lần đầu tiên do Render free tier cold start.

---

⭐ Nếu bạn thấy dự án này hữu ích, hãy cho một star nhé!
