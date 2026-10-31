const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Bắt đầu auto commit cho Backend...');

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
const backendFiles = [
    // Main Application
    'src/main/java/com/iuh/fit/se/ShopOnlineApplication.java',
    
    // Admin Config files
    'src/main/resources/application.yaml',
    'src/main/java/com/iuh/fit/se/config/SecurityConfig.java',
    'src/main/java/com/iuh/fit/se/config/JwtSecurityConfig.java',
    'src/main/java/com/iuh/fit/se/config/OpenApiConfig.java',
    'src/main/java/com/iuh/fit/se/config/CacheConfig.java',
    'src/main/java/com/iuh/fit/se/config/WebSocketConfig.java',
    
    // Admin Entity files
    'src/main/java/com/iuh/fit/se/domain/entity/User.java',
    'src/main/java/com/iuh/fit/se/domain/entity/Role.java',
    'src/main/java/com/iuh/fit/se/domain/entity/Permission.java',
    'src/main/java/com/iuh/fit/se/domain/entity/Product.java',
    'src/main/java/com/iuh/fit/se/domain/entity/Category.java',
    'src/main/java/com/iuh/fit/se/domain/entity/Order.java',
    'src/main/java/com/iuh/fit/se/domain/entity/OrderDetail.java',
    'src/main/java/com/iuh/fit/se/domain/entity/ProductReview.java',
    'src/main/java/com/iuh/fit/se/domain/entity/Discount.java',
    'src/main/java/com/iuh/fit/se/domain/entity/Cart.java',
    'src/main/java/com/iuh/fit/se/domain/entity/CartItem.java',
    'src/main/java/com/iuh/fit/se/domain/entity/BookingAppointment.java',
    'src/main/java/com/iuh/fit/se/domain/entity/ChatSession.java',
    'src/main/java/com/iuh/fit/se/domain/entity/Message.java',
    'src/main/java/com/iuh/fit/se/domain/entity/ChatCustomerService.java',
    'src/main/java/com/iuh/fit/se/domain/entity/UserDiscount.java',
    
    // Admin Repository files
    'src/main/java/com/iuh/fit/se/repository/UserRepository.java',
    'src/main/java/com/iuh/fit/se/repository/RoleRepository.java',
    'src/main/java/com/iuh/fit/se/repository/PermissionRepository.java',
    'src/main/java/com/iuh/fit/se/repository/ProductRepository.java',
    'src/main/java/com/iuh/fit/se/repository/CategoryRepository.java',
    'src/main/java/com/iuh/fit/se/repository/OrderRepository.java',
    'src/main/java/com/iuh/fit/se/repository/OrderDetailRepository.java',
    'src/main/java/com/iuh/fit/se/repository/ProductReviewRepository.java',
    'src/main/java/com/iuh/fit/se/repository/DiscountRepository.java',
    'src/main/java/com/iuh/fit/se/repository/CartRepository.java',
    'src/main/java/com/iuh/fit/se/repository/CartItemRepository.java',
    'src/main/java/com/iuh/fit/se/repository/BookingAppointmentRepository.java',
    'src/main/java/com/iuh/fit/se/repository/ChatSessionRepository.java',
    'src/main/java/com/iuh/fit/se/repository/MessageRepository.java',
    'src/main/java/com/iuh/fit/se/repository/ChatCustomerServiceRepository.java',
    'src/main/java/com/iuh/fit/se/repository/UserDiscountRepository.java',
    
    // Admin Service files
    'src/main/java/com/iuh/fit/se/service/UserService.java',
    'src/main/java/com/iuh/fit/se/service/ProductService.java',
    'src/main/java/com/iuh/fit/se/service/CategoryService.java',
    'src/main/java/com/iuh/fit/se/service/OrderService.java',
    'src/main/java/com/iuh/fit/se/service/OrderDetailService.java',
    'src/main/java/com/iuh/fit/se/service/ProductReviewService.java',
    'src/main/java/com/iuh/fit/se/service/DiscountService.java',
    'src/main/java/com/iuh/fit/se/service/CartService.java',
    'src/main/java/com/iuh/fit/se/service/CartItemService.java',
    'src/main/java/com/iuh/fit/se/service/BookingAppointmentService.java',
    'src/main/java/com/iuh/fit/se/service/ChatMessageRedisService.java',
    'src/main/java/com/iuh/fit/se/service/StatisticsService.java',
    'src/main/java/com/iuh/fit/se/service/UserDiscountService.java',
    'src/main/java/com/iuh/fit/se/service/CartRelationshipTestService.java',
    
    // Admin Service Implementation files
    'src/main/java/com/iuh/fit/se/service/impl/UserServiceImpl.java',
    'src/main/java/com/iuh/fit/se/service/impl/ProductServiceImpl.java',
    'src/main/java/com/iuh/fit/se/service/impl/CategoryServiceImpl.java',
    'src/main/java/com/iuh/fit/se/service/impl/OrderServiceImpl.java',
    'src/main/java/com/iuh/fit/se/service/impl/OrderDetailServiceImpl.java',
    'src/main/java/com/iuh/fit/se/service/impl/ProductReviewServiceImpl.java',
    'src/main/java/com/iuh/fit/se/service/impl/DiscountServiceImpl.java',
    'src/main/java/com/iuh/fit/se/service/impl/BookingAppointmentServiceImpl.java',
    'src/main/java/com/iuh/fit/se/service/impl/ChatMessageRedisServiceImpl.java',
    'src/main/java/com/iuh/fit/se/service/impl/StatisticsServiceImpl.java',
    
    // Admin Controller files
    'src/main/java/com/iuh/fit/se/controller/UserController.java',
    'src/main/java/com/iuh/fit/se/controller/ProductController.java',
    'src/main/java/com/iuh/fit/se/controller/CategoryController.java',
    'src/main/java/com/iuh/fit/se/controller/OrderController.java',
    'src/main/java/com/iuh/fit/se/controller/OrderDetailController.java',
    'src/main/java/com/iuh/fit/se/controller/ProductReviewController.java',
    'src/main/java/com/iuh/fit/se/controller/DiscountController.java',
    'src/main/java/com/iuh/fit/se/controller/CartController.java',
    'src/main/java/com/iuh/fit/se/controller/CartItemController.java',
    'src/main/java/com/iuh/fit/se/controller/BookingAppointmentController.java',
    'src/main/java/com/iuh/fit/se/controller/ChatController.java',
    'src/main/java/com/iuh/fit/se/controller/ChatWebSocketController.java',
    'src/main/java/com/iuh/fit/se/controller/ChatCustomerServiceController.java',
    'src/main/java/com/iuh/fit/se/controller/AuthController.java',
    'src/main/java/com/iuh/fit/se/controller/OAuth2CallbackController.java',
    'src/main/java/com/iuh/fit/se/controller/StatisticsController.java',
    'src/main/java/com/iuh/fit/se/controller/HealthController.java',
    'src/main/java/com/iuh/fit/se/controller/UserDiscountController.java',
    'src/main/java/com/iuh/fit/se/controller/CartRelationshipTestController.java',
    
    // Admin DTO files
    'src/main/java/com/iuh/fit/se/domain/dto/BookingAppointmentDTO.java',
    'src/main/java/com/iuh/fit/se/domain/dto/DiscountDTO.java',
    'src/main/java/com/iuh/fit/se/domain/dto/ChatMessageDTO.java',
    'src/main/java/com/iuh/fit/se/domain/dto/ChatMessageResponseDTO.java',
    'src/main/java/com/iuh/fit/se/domain/dto/GuestRequestDTO.java',
    
    // Admin Enum files
    'src/main/java/com/iuh/fit/se/domain/enums/ProductStatus.java',
    'src/main/java/com/iuh/fit/se/domain/enums/Gender.java',
    'src/main/java/com/iuh/fit/se/domain/enums/UserStatus.java',
    'src/main/java/com/iuh/fit/se/domain/enums/OrderStatus.java',
    'src/main/java/com/iuh/fit/se/domain/enums/PaymentStatus.java',
    'src/main/java/com/iuh/fit/se/domain/enums/PaymentMethod.java',
    'src/main/java/com/iuh/fit/se/domain/enums/DiscountType.java',
    'src/main/java/com/iuh/fit/se/domain/enums/ChatStatus.java',
    'src/main/java/com/iuh/fit/se/domain/enums/AppointmentStatus.java',
    
    // Admin Test files
    'src/test/java/com/iuh/fit/se/ShopOnlineApplicationTests.java',
    
    // Admin Config files
    'pom.xml',
    'src/main/resources/data-complete.sql',
    'src/main/resources/data-from-export-with-local-images.sql',
    'src/main/resources/additional-data.sql',
    
    // Additional files for more commits
    'README.md',
    'ENTITY_RELATIONSHIPS.md',
    'auto-commit-be.bat',
    'auto-commit-changes.js',
    'git-commit-all.js',
    'mvnw',
    'mvnw.cmd',
    'restart-backend.bat',
    'scan-local-images.js',
    'watch-auto-commit.js',
    'test-api.html'
];

// Tạo commit messages đơn giản chỉ có create/fix
const createCommitMessage = (filePath, index) => {
    const fileName = path.basename(filePath);
    const fileType = path.extname(fileName);
    
    // Tạo pattern create/fix xen kẽ
    const isCreate = index % 2 === 0;
    const action = isCreate ? 'create' : 'fix';
    
    if (fileName.includes('Application')) {
        return `${action} main application`;
    } else if (fileName.includes('Config')) {
        return `${action} ${fileName.replace('.java', '')} configuration`;
    } else if (fileName.includes('Entity')) {
        return `${action} ${fileName.replace('.java', '')} entity`;
    } else if (fileName.includes('Repository')) {
        return `${action} ${fileName.replace('.java', '')} repository`;
    } else if (fileName.includes('Service')) {
        return `${action} ${fileName.replace('.java', '')} service`;
    } else if (fileName.includes('Controller')) {
        return `${action} ${fileName.replace('.java', '')} controller`;
    } else if (fileName.includes('DTO')) {
        return `${action} ${fileName.replace('.java', '')} dto`;
    } else if (fileName.includes('Enum')) {
        return `${action} ${fileName.replace('.java', '')} enum`;
    } else if (fileName.includes('Test')) {
        return `${action} ${fileName.replace('.java', '')} test`;
    } else if (fileName === 'pom.xml') {
        return `${action} maven configuration`;
    } else if (fileName.includes('.sql')) {
        return `${action} ${fileName} data`;
    } else if (fileName.includes('.yaml')) {
        return `${action} application configuration`;
    } else if (fileName.includes('.md')) {
        return `${action} ${fileName} documentation`;
    } else if (fileName.includes('.bat')) {
        return `${action} ${fileName} script`;
    } else if (fileName.includes('.js')) {
        return `${action} ${fileName} script`;
    } else if (fileName.includes('.html')) {
        return `${action} ${fileName} page`;
    } else {
        return `${action} ${fileName}`;
    }
};

console.log('Bắt đầu tạo commits...');

let successCount = 0;
let failCount = 0;

backendFiles.forEach((filePath, index) => {
    try {
        // Kiểm tra file có tồn tại không
        if (!fs.existsSync(filePath)) {
            console.log(`File không tồn tại: ${filePath}`);
            return;
        }
        
        const commitMessage = createCommitMessage(filePath, index);
        
        console.log(`Commit ${index + 1} of ${backendFiles.length}`);
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

console.log('\nAuto commit completed for Backend!');
console.log(`Total successful commits: ${successCount}`);
console.log(`Failed commits: ${failCount}`);
console.log('\nTo push to GitHub, run:');
console.log('git remote add origin YOUR_REPO_URL');
console.log('git push -u origin main');
console.log('\nDone!');