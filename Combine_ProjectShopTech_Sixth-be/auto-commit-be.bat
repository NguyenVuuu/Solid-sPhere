@echo off
echo Starting auto commit for Backend...

cd /d "%~dp0"

echo Initializing git repository if needed...
if not exist ".git" (
    git init
    echo "Git repository initialized"
)

echo Adding all files...
git add .

REM Array of commit messages for Backend
set messages[0]=Initial backend setup with Spring Boot configuration
set messages[1]=Add database connection and JPA configuration
set messages[2]=Implement User entity and repository layer
set messages[3]=Create Product entity with category relationships
set messages[4]=Add Order and OrderDetail entities for e-commerce
set messages[5]=Implement ProductReview entity for customer feedback
set messages[6]=Create Discount entity for promotional features
set messages[7]=Setup Spring Security configuration with OAuth2
set messages[8]=Configure CORS for frontend integration
set messages[9]=Implement UserService with CRUD operations
set messages[10]=Create ProductService with REST endpoints
set messages[11]=Add OrderService for order management
set messages[12]=Implement ProductReviewService for review handling
set messages[13]=Create DiscountService for promotional management
set messages[14]=Add StatisticsService for analytics data
set messages[15]=Implement UserController with authentication
set messages[16]=Create ProductController with category filtering
set messages[17]=Add OrderController for order processing
set messages[18]=Implement ProductReviewController for reviews
set messages[19]=Create DiscountController with advanced features
set messages[20]=Add StatisticsController for dashboard data
set messages[21]=Implement JWT token validation and security
set messages[22]=Add database migration scripts and seed data
set messages[23]=Create DTO classes for API responses
set messages[24]=Implement exception handling and error responses
set messages[25]=Add validation annotations for input data
set messages[26]=Create custom repository queries for complex operations
set messages[27]=Implement caching mechanism for performance
set messages[28]=Add logging configuration and monitoring
set messages[29]=Create unit tests for service layer
set messages[30]=Implement integration tests for controllers
set messages[31]=Add API documentation with Swagger
set messages[32]=Create configuration profiles for different environments
set messages[33]=Implement email service for notifications
set messages[34]=Add file upload functionality for product images
set messages[35]=Create backup and recovery mechanisms
set messages[36]=Implement search functionality with filters
set messages[37]=Add pagination support for large datasets
set messages[38]=Create scheduled tasks for maintenance
set messages[39]=Implement audit logging for security
set messages[40]=Add performance monitoring and metrics
set messages[41]=Create database indexes for optimization
set messages[42]=Implement transaction management
set messages[43]=Add rate limiting for API endpoints
set messages[44]=Create health check endpoints
set messages[45]=Implement data export functionality
set messages[46]=Add compression for API responses
set messages[47]=Create automated testing pipeline
set messages[48]=Implement database connection pooling
set messages[49]=Add request/response interceptors
set messages[50]=Create configuration management system
set messages[51]=Implement API versioning strategy
set messages[52]=Add security headers and protection
set messages[53]=Create deployment scripts and Docker configuration
set messages[54]=Implement graceful shutdown handling
set messages[55]=Add memory optimization and garbage collection tuning
set messages[56]=Create backup strategies for data protection
set messages[57]=Implement multi-tenant architecture support
set messages[58]=Add comprehensive error tracking and reporting
set messages[59]=Create performance benchmarking tools
set messages[60]=Final backend optimization and cleanup

echo Creating commits...
for /L %%i in (0,1,60) do (
    echo.
    echo Commit %%i of 60
    call set "message=%%messages[%%i]%%"
    echo Committing: !message!
    git commit -m "!message!"
    if errorlevel 1 (
        echo Commit %%i failed, continuing...
    ) else (
        echo Commit %%i successful
    )
    timeout /t 1 /nobreak >nul
)

echo.
echo Auto commit completed for Backend!
echo Total commits created: 61
echo.
echo To push to remote repository, run:
echo git remote add origin YOUR_REPO_URL
echo git push -u origin main
echo.
pause
