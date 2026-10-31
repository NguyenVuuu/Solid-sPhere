const { execSync } = require('child_process');
const path = require('path');

// Màu sắc cho console
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[36m',
    red: '\x1b[31m'
};

function log(message, color = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
}

function execCommand(command) {
    try {
        const output = execSync(command, { encoding: 'utf-8', stdio: 'pipe' });
        return output;
    } catch (error) {
        log(`Error: ${error.message}`, colors.red);
        return null;
    }
}

function gitAdd(files) {
    const fileList = Array.isArray(files) ? files.join(' ') : files;
    return execCommand(`git add ${fileList}`);
}

function gitCommit(message) {
    return execCommand(`git commit -m "${message}"`);
}

function commitGroup(files, message) {
    log(`\n${'='.repeat(60)}`, colors.blue);
    log(`Committing: ${message}`, colors.bright);
    log(`Files: ${files.length}`, colors.yellow);
    
    gitAdd(files);
    const result = gitCommit(message);
    
    if (result !== null) {
        log('✓ Success', colors.green);
    } else {
        log('✗ Failed or no changes', colors.red);
    }
    
    return result !== null;
}

// Main execution
function main() {
    log('\n🚀 Starting Git Commit Process...', colors.bright + colors.blue);
    log('=' .repeat(60), colors.blue);

    const commitGroups = [
        // DTOs
        {
            files: [
                'src/main/java/com/iuh/fit/se/domain/dto/UserDTO.java',
                'src/main/java/com/iuh/fit/se/domain/dto/RoleDTO.java',
                'src/main/java/com/iuh/fit/se/domain/dto/PermissionDTO.java'
            ],
            message: 'Add User, Role and Permission DTOs for authentication and authorization'
        },
        {
            files: [
                'src/main/java/com/iuh/fit/se/domain/dto/ProductDTO.java',
                'src/main/java/com/iuh/fit/se/domain/dto/CategoryDTO.java',
                'src/main/java/com/iuh/fit/se/domain/dto/DiscountDTO.java',
                'src/main/java/com/iuh/fit/se/domain/dto/ProductReviewDTO.java'
            ],
            message: 'Add Product management DTOs with Category, Discount and Review support'
        },
        {
            files: [
                'src/main/java/com/iuh/fit/se/domain/dto/OrderDTO.java',
                'src/main/java/com/iuh/fit/se/domain/dto/OrderDetailDTO.java'
            ],
            message: 'Add Order and OrderDetail DTOs for order management'
        },
        {
            files: [
                'src/main/java/com/iuh/fit/se/domain/dto/BookingAppointmentDTO.java',
                'src/main/java/com/iuh/fit/se/domain/dto/ChatCustomerServiceDTO.java'
            ],
            message: 'Add Booking and Chat DTOs for customer service features'
        },

        // Repositories - Phase 1: User & Auth
        {
            files: [
                'src/main/java/com/iuh/fit/se/repository/UserRepository.java'
            ],
            message: 'Enhance UserRepository with advanced queries for customer analytics and segmentation'
        },
        {
            files: [
                'src/main/java/com/iuh/fit/se/repository/RoleRepository.java',
                'src/main/java/com/iuh/fit/se/repository/PermissionRepository.java'
            ],
            message: 'Enhance Role and Permission repositories with authorization queries'
        },

        // Repositories - Phase 2: Product Management
        {
            files: [
                'src/main/java/com/iuh/fit/se/repository/ProductRepository.java'
            ],
            message: 'Enhance ProductRepository with search filters and inventory management'
        },
        {
            files: [
                'src/main/java/com/iuh/fit/se/repository/CategoryRepository.java'
            ],
            message: 'Enhance CategoryRepository with product count and revenue analytics'
        },
        {
            files: [
                'src/main/java/com/iuh/fit/se/repository/DiscountRepository.java'
            ],
            message: 'Enhance DiscountRepository with promotion management and time-based queries'
        },
        {
            files: [
                'src/main/java/com/iuh/fit/se/repository/ProductReviewRepository.java'
            ],
            message: 'Enhance ProductReviewRepository with rating analytics and top products'
        },

        // Repositories - Phase 3: Order Management
        {
            files: [
                'src/main/java/com/iuh/fit/se/repository/OrderRepository.java'
            ],
            message: 'Enhance OrderRepository with revenue calculation and order analytics'
        },
        {
            files: [
                'src/main/java/com/iuh/fit/se/repository/OrderDetailRepository.java'
            ],
            message: 'Enhance OrderDetailRepository with sales analytics and product recommendations'
        },

        // Repositories - Phase 4: Customer Service
        {
            files: [
                'src/main/java/com/iuh/fit/se/repository/BookingAppointmentRepository.java'
            ],
            message: 'Enhance BookingAppointmentRepository with scheduling and date management'
        },
        {
            files: [
                'src/main/java/com/iuh/fit/se/repository/ChatCustomerServiceRepository.java'
            ],
            message: 'Enhance ChatCustomerServiceRepository with chat analytics and staff metrics'
        },

        // Services - Phase 1: User & Auth
        {
            files: [
                'src/main/java/com/iuh/fit/se/service/UserService.java',
                'src/main/java/com/iuh/fit/se/service/impl/UserServiceImpl.java'
            ],
            message: 'Update UserService with customer analytics and points management'
        },
        {
            files: [
                'src/main/java/com/iuh/fit/se/service/RoleService.java',
                'src/main/java/com/iuh/fit/se/service/impl/RoleServiceImpl.java'
            ],
            message: 'Update RoleService with permission management features'
        },
        {
            files: [
                'src/main/java/com/iuh/fit/se/service/PermissionService.java',
                'src/main/java/com/iuh/fit/se/service/impl/PermissionServiceImpl.java'
            ],
            message: 'Update PermissionService with role assignment features'
        },

        // Services - Phase 2: Product Management
        {
            files: [
                'src/main/java/com/iuh/fit/se/service/ProductService.java',
                'src/main/java/com/iuh/fit/se/service/impl/ProductServiceImpl.java'
            ],
            message: 'Update ProductService with advanced search and inventory features'
        },
        {
            files: [
                'src/main/java/com/iuh/fit/se/service/CategoryService.java',
                'src/main/java/com/iuh/fit/se/service/impl/CategoryServiceImpl.java'
            ],
            message: 'Update CategoryService with product analytics features'
        },
        {
            files: [
                'src/main/java/com/iuh/fit/se/service/DiscountService.java',
                'src/main/java/com/iuh/fit/se/service/impl/DiscountServiceImpl.java'
            ],
            message: 'Update DiscountService with promotion management and scheduling'
        },
        {
            files: [
                'src/main/java/com/iuh/fit/se/service/ProductReviewService.java',
                'src/main/java/com/iuh/fit/se/service/impl/ProductReviewServiceImpl.java'
            ],
            message: 'Update ProductReviewService with rating analytics and product rankings'
        },

        // Services - Phase 3: Order Management
        {
            files: [
                'src/main/java/com/iuh/fit/se/service/OrderService.java',
                'src/main/java/com/iuh/fit/se/service/impl/OrderServiceImpl.java'
            ],
            message: 'Update OrderService with revenue calculation and order tracking'
        },
        {
            files: [
                'src/main/java/com/iuh/fit/se/service/OrderDetailService.java',
                'src/main/java/com/iuh/fit/se/service/impl/OrderDetailServiceImpl.java'
            ],
            message: 'Update OrderDetailService with sales analytics and recommendations'
        },

        // Services - Phase 4: Customer Service
        {
            files: [
                'src/main/java/com/iuh/fit/se/service/BookingAppointmentService.java',
                'src/main/java/com/iuh/fit/se/service/impl/BookingAppointmentServiceImpl.java'
            ],
            message: 'Update BookingAppointmentService with appointment scheduling features'
        },
        {
            files: [
                'src/main/java/com/iuh/fit/se/service/ChatCustomerServiceService.java',
                'src/main/java/com/iuh/fit/se/service/impl/ChatCustomerServiceServiceImpl.java'
            ],
            message: 'Update ChatCustomerServiceService with chat management and analytics'
        },

        // Controllers - Phase 1: User & Auth
        {
            files: [
                'src/main/java/com/iuh/fit/se/controller/UserController.java'
            ],
            message: 'Add REST endpoints for user management with analytics and top customers'
        },
        {
            files: [
                'src/main/java/com/iuh/fit/se/controller/RoleController.java'
            ],
            message: 'Add REST endpoints for role management with user statistics'
        },
        {
            files: [
                'src/main/java/com/iuh/fit/se/controller/PermissionController.java'
            ],
            message: 'Add REST endpoints for permission management'
        },

        // Controllers - Phase 2: Product Management
        {
            files: [
                'src/main/java/com/iuh/fit/se/controller/ProductController.java'
            ],
            message: 'Add REST endpoints for product management with advanced search and filters'
        },
        {
            files: [
                'src/main/java/com/iuh/fit/se/controller/CategoryController.java'
            ],
            message: 'Add REST endpoints for category management with product analytics'
        },
        {
            files: [
                'src/main/java/com/iuh/fit/se/controller/DiscountController.java'
            ],
            message: 'Add REST endpoints for discount management with promotion features'
        },
        {
            files: [
                'src/main/java/com/iuh/fit/se/controller/ProductReviewController.java'
            ],
            message: 'Add REST endpoints for product reviews with rating analytics'
        },

        // Controllers - Phase 3: Order Management
        {
            files: [
                'src/main/java/com/iuh/fit/se/controller/OrderController.java'
            ],
            message: 'Add REST endpoints for order management with revenue and tracking'
        },
        {
            files: [
                'src/main/java/com/iuh/fit/se/controller/OrderDetailController.java'
            ],
            message: 'Add REST endpoints for order details with sales analytics'
        },

        // Controllers - Phase 4: Customer Service
        {
            files: [
                'src/main/java/com/iuh/fit/se/controller/BookingAppointmentController.java'
            ],
            message: 'Add REST endpoints for booking appointments management'
        },
        {
            files: [
                'src/main/java/com/iuh/fit/se/controller/ChatCustomerServiceController.java'
            ],
            message: 'Add REST endpoints for chat customer service management'
        },

        // Statistics Controller
        {
            files: [
                'src/main/java/com/iuh/fit/se/controller/StatisticsController.java'
            ],
            message: 'Add comprehensive statistics controller with business intelligence endpoints'
        }
    ];

    let successCount = 0;
    let failCount = 0;

    for (const group of commitGroups) {
        if (commitGroup(group.files, group.message)) {
            successCount++;
        } else {
            failCount++;
        }
    }

    log('\n' + '='.repeat(60), colors.blue);
    log('📊 Commit Summary:', colors.bright);
    log(`✓ Successful: ${successCount}`, colors.green);
    log(`✗ Failed/Skipped: ${failCount}`, colors.yellow);
    log('='.repeat(60), colors.blue);
    
    if (successCount > 0) {
        log('\n✨ All changes committed successfully!', colors.green + colors.bright);
        log('\nNext steps:', colors.yellow);
        log('  1. Review commits: git log --oneline', colors.reset);
        log('  2. Push to remote: git push origin new_backend', colors.reset);
    } else {
        log('\n⚠️  No changes to commit or all commits failed', colors.yellow);
        log('Check if files exist and have changes', colors.reset);
    }
}

// Run the script
try {
    // Check if git is available
    execCommand('git --version');
    main();
} catch (error) {
    log('❌ Git is not installed or not in PATH', colors.red);
    log('Please install Git and try again', colors.yellow);
    process.exit(1);
}
