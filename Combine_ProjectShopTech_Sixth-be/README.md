## Tổng quan kỹ thuật áp dụng trong dự án

### 1) Swagger / OpenAPI (springdoc-openapi)
- Mục đích: Tự động sinh tài liệu API và cung cấp giao diện Swagger UI để thử API trực tiếp trên trình duyệt.
- Lợi ích: 
  - Giúp giảng viên/QA/dev xem toàn bộ endpoint, request/response mẫu.
  - Tiết kiệm thời gian test thủ công, dễ phát hiện lỗi hợp đồng API.
- Cách dùng trong dự án: Truy cập `http://localhost:8081/swagger-ui/index.html` để xem và test toàn bộ controller.

#### Cơ chế hoạt động trong dự án
- Thư viện: `org.springdoc:springdoc-openapi-starter-webmvc-ui`
- Tự quét các `@RestController`/`@RequestMapping` để sinh OpenAPI spec ở `/v3/api-docs` và Swagger UI ở `/swagger-ui/index.html`.
- Trong bảo mật, đã cho phép công khai các route tài liệu: `/swagger-ui/**`, `/v3/api-docs/**`, giúp luôn vào UI được để test.

#### Cách cấu hình mở rộng (nếu cần)
- Có thể thêm `OpenApiConfig` để đặt title/description/servers/tags.
- Có thể dùng annotation như `@Operation`, `@Parameter`, `@Schema` trên DTO để hiện mô tả đẹp trong UI.

#### Lý do chọn
- Chuẩn công nghiệp, không lock-in; giúp nhóm và giảng viên đồng thuận về giao diện API.
- Hỗ trợ tốt với Spring Boot 3.

### 2) OAuth2 / Security (Resource Server + Client optional)
- Mục đích: Bảo vệ API bằng chuẩn OAuth2/JWT (có thể tích hợp Keycloak/Google), phân quyền theo vai trò.
- Lợi ích:
  - An toàn: Chỉ người có token hợp lệ mới gọi được các endpoint nhạy cảm.
  - Mở rộng: Dễ tích hợp SSO, nhà cung cấp danh tính (IdP) như Keycloak/Google.
- Cách dùng trong dự án:
  - Khi `security.oauth2.enabled=true` hoặc `security.jwt.enabled=true`, các API yêu cầu Bearer Token. Swagger vẫn public để tiện test.
  - Phân quyền mẫu: `/api/admin/**` yêu cầu `ROLE_ADMIN`, các GET public cho sản phẩm/danh mục vẫn mở để demo.

#### Cơ chế hoạt động trong dự án
- File cấu hình chính: `SecurityConfig` (Resource Server khi bật `security.oauth2.enabled=true`).
- Dòng chính: tắt CSRF cho API, bật CORS, phân quyền theo đường dẫn, cấu hình Resource Server dùng JWT.
- Chuyển đổi quyền từ JWT: đọc claim (ví dụ Keycloak `realm_access.roles`) và map thành `ROLE_*` để Spring Security hiểu.
- Ngoài ra có cấu hình `JwtSecurityConfig` (khi bật `security.jwt.enabled=true`) cho trường hợp JWT tự ký HMAC, và `OAuth2ClientSecurityConfig` (khi bật `security.oauth2.client.enabled=true`) cho luồng đăng nhập OAuth2 Client (VD Google).

Ví dụ (đã có trong mã nguồn) cho phép tài liệu công khai và phân quyền endpoint admin:

```
// Các route public và tài liệu được permitAll
.requestMatchers("/api/public/**", "/api/auth/**", "/actuator/**", "/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
// Phân quyền role
.requestMatchers("/api/admin/**").hasRole("ADMIN")
.requestMatchers("/api/**").hasAnyRole("USER", "ADMIN", "MANAGER")
```

#### Flow tổng quát khi bật OAuth2 (Keycloak/IdP)
1. Client lấy Access Token từ IdP (OAuth2 Authorization Code/PKCE).
2. Gọi API kèm `Authorization: Bearer <token>`.
3. Resource Server (Spring) xác thực token (issuer, chữ ký, audience) và ánh xạ roles -> `ROLE_*`.
4. Các `@PreAuthorize`/phân quyền theo path sẽ quyết định cho phép/không.

#### Lý do chọn
- Bảo mật theo chuẩn, sẵn sàng cho SSO.
- Dễ tách biệt concern: Issuer/IdP cấp token, service chỉ xác thực/ủy quyền.

### 3) Redis Cache
- Mục đích: Cache dữ liệu tần suất truy cập cao (sản phẩm, danh mục, thống kê nhẹ) nhằm giảm tải DB và tăng tốc độ phản hồi.
- Lợi ích:
  - Hiệu năng: Giảm độ trễ, tăng throughput khi tải người dùng tăng.
  - Chi phí: Giảm số query tới MySQL.
- Cách dùng trong dự án: Bật Redis (`spring.cache.type: redis`, `spring.data.redis.*`). Có thể dùng @Cacheable/@CacheEvict ở service lớp đọc nhiều.

#### Cơ chế hoạt động trong dự án
- Starter: `spring-boot-starter-data-redis`.
- Khi annotate `@Cacheable("products")` ở service đọc sản phẩm, lần đầu sẽ query DB và đẩy vào Redis; lần sau đọc từ cache.
- Có thể cấu hình TTL (time-to-live), prefix key, và phân vùng cache theo business domain.

#### Chiến lược cache gợi ý
- Đọc nhiều/ít thay đổi: cache lâu hơn (danh mục, sản phẩm phổ biến).
- Dữ liệu hay thay đổi: TTL ngắn hoặc cache theo tham số.
- Invalidate: dùng `@CacheEvict` khi cập nhật/ghi để tránh dữ liệu cũ.

#### Lý do chọn
- Tối ưu hiệu năng nhanh chóng, dễ cài đặt.
- Phù hợp hệ thống thương mại điện tử có tỉ lệ đọc cao.

### 4) Bucket4j (Rate Limiting)
- Mục đích: Giới hạn tần suất gọi API (rate limit) để chống spam/DDoS và bảo vệ tài nguyên.
- Lợi ích:
  - Ổn định: Tránh việc một client gây nghẽn cho toàn hệ thống.
  - Bảo mật/chi phí: Ngăn lạm dụng tài nguyên, kiểm soát lưu lượng.
- Cách dùng trong dự án: Cấu hình trong `application.yaml` để áp hạn mức cho `/api/**` theo IP (ví dụ: 100 requests/phút).

#### Cơ chế hoạt động trong dự án
- Starter: `bucket4j-spring-boot-starter` cấu hình bằng YAML.
- Sử dụng filter áp dụng rule theo URL pattern và expression xác định key (ở đây là IP: `getRemoteAddr()`).
- Khi vượt hạn mức, request bị từ chối với status phù hợp (thường 429 Too Many Requests).

Ví dụ rule (đã cấu hình): 100 request/phút cho `/api/**` theo IP.

#### Lý do chọn
- Bổ sung tầng bảo vệ nhẹ, dễ thay đổi policy mà không phải viết filter phức tạp.

---

### Vì sao lựa chọn các công nghệ này?
- Swagger: Tăng tính minh bạch và tốc độ kiểm thử API cho giảng viên và nhóm.
- OAuth2/Security: Bảo vệ tài nguyên theo chuẩn phổ biến, dễ mở rộng Single Sign-On.
- Redis: Cải thiện hiệu năng thực tế với chi phí thấp, phù hợp use case thương mại điện tử (danh mục/sản phẩm đọc nhiều).
- Bucket4j: Tầng phòng vệ nhẹ, dễ cấu hình, giúp hệ thống ổn định khi tải tăng đột biến.

### Đường dẫn nhanh để demo
- Swagger UI: `http://localhost:8081/swagger-ui/index.html`
- OpenAPI JSON: `http://localhost:8081/v3/api-docs`

### Ghi chú cấu hình bảo mật
- Mặc định trong `application.yaml`, OAuth2/JWT đang tắt để tiện demo nhanh.
- Khi bật bảo mật: dùng nút Authorize ở Swagger, nhập `Bearer <token>` để test các endpoint yêu cầu xác thực.

### Câu hỏi thường gặp (FAQ) khi bảo vệ đồ án
- Tại sao tài liệu Swagger vẫn public khi bật Security? → Để giảng viên test nhanh; các API nhạy cảm vẫn cần token.
- Nếu tắt Redis thì sao? → Hệ thống vẫn chạy, chỉ là độ trễ cao hơn và DB chịu tải nhiều hơn.
- Rate limiting có ảnh hưởng user thật không? → Rule đang tương đối thoáng (100 req/phút/IP). Có thể điều chỉnh theo môi trường.
- Tại sao chọn OAuth2 thay vì session? → Dễ mở rộng microservices, SSO, và tích hợp nền tảng IdP hiện đại.



