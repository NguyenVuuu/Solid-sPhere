package com.iuh.fit.se.service.impl;

import com.iuh.fit.se.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * EmailServiceImpl
 * <p>
 * Implementation of EmailService for sending emails
 * <p>
 * Version 1.0
 * Date: 2025-01-XX
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImpl implements EmailService {
    
    private final JavaMailSender mailSender;
    
    @Value("${spring.mail.username:noreply@pcshop.com}")
    private String fromEmail;
    
    @Override
    public void sendDiscountCodeToCustomer(
            String toEmail,
            String customerName,
            String discountName,
            String discountCode,
            Double discountRate,
            String discountDescription,
            String startDate,
            String endDate) {
        
        try {
            // Validate inputs
            if (toEmail == null || toEmail.trim().isEmpty()) {
                throw new IllegalArgumentException("Email address cannot be empty");
            }
            
            if (mailSender == null) {
                log.error("JavaMailSender is null - email configuration might be missing");
                throw new IllegalStateException("Email service is not properly configured. Please check email configuration in application.yaml");
            }
            
            log.info("Attempting to send email to: {}", toEmail);
            log.debug("From email: {}", fromEmail);
            
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            String senderEmail = fromEmail != null && !fromEmail.isEmpty() ? fromEmail : "noreply@pcshop.com";
            helper.setFrom(senderEmail);
            helper.setTo(toEmail);
            helper.setSubject("🎉 Mã Khuyến Mãi Tri Ân - " + (discountName != null ? discountName : "Khuyến mãi"));
            
            String htmlContent = buildDiscountEmailHtml(
                    customerName,
                    discountName,
                    discountCode,
                    discountRate,
                    discountDescription,
                    startDate,
                    endDate
            );
            
            helper.setText(htmlContent, true);
            
            log.info("Sending email message...");
            mailSender.send(message);
            log.info("Discount code email sent successfully to: {}", toEmail);
            
        } catch (MessagingException e) {
            log.error("MessagingException when sending email to {}: {}", toEmail, e.getMessage(), e);
            String errorMessage = "Failed to send email: " + e.getMessage();
            if (e.getCause() != null) {
                errorMessage += " (Cause: " + e.getCause().getMessage() + ")";
            }
            throw new RuntimeException(errorMessage, e);
        } catch (IllegalStateException e) {
            log.error("Configuration error: {}", e.getMessage(), e);
            throw e;
        } catch (Exception e) {
            log.error("Unexpected error when sending email to {}: {}", toEmail, e.getMessage(), e);
            String errorMessage = "Failed to send email: " + e.getMessage();
            if (e.getCause() != null) {
                errorMessage += " (Cause: " + e.getCause().getMessage() + ")";
            }
            throw new RuntimeException(errorMessage, e);
        }
    }
    
    @Override
    public void sendBulkDiscountCodes(
            List<String> customerEmails,
            String discountName,
            String discountCode,
            Double discountRate,
            String discountDescription,
            String startDate,
            String endDate) {
        
        int successCount = 0;
        int failCount = 0;
        
        for (String email : customerEmails) {
            try {
                sendDiscountCodeToCustomer(
                        email,
                        "Quý khách",
                        discountName,
                        discountCode,
                        discountRate,
                        discountDescription,
                        startDate,
                        endDate
                );
                successCount++;
                
                // Delay giữa các email để tránh spam
                Thread.sleep(100);
                
            } catch (Exception e) {
                failCount++;
                log.error("Failed to send email to {}: {}", email, e.getMessage());
            }
        }
        
        log.info("Bulk email sending completed. Success: {}, Failed: {}", successCount, failCount);
    }
    
    private String buildDiscountEmailHtml(
            String customerName,
            String discountName,
            String discountCode,
            Double discountRate,
            String discountDescription,
            String startDate,
            String endDate) {
        
        String htmlTemplate = """
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #f4f4f4;
                    }
                    .container {
                        background-color: #ffffff;
                        border-radius: 10px;
                        padding: 30px;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    }
                    .header {
                        text-align: center;
                        background: linear-gradient(135deg, #667eea PERCENT_SIGN, #764ba2 PERCENT_SIGN);
                        color: white;
                        padding: 30px;
                        border-radius: 10px 10px 0 0;
                        margin: -30px -30px 30px -30px;
                    }
                    .header h1 {
                        margin: 0;
                        font-size: 28px;
                    }
                    .discount-code {
                        background: linear-gradient(135deg, #f093fb PERCENT_SIGN, #f5576c PERCENT_SIGN);
                        color: white;
                        padding: 20px;
                        border-radius: 8px;
                        text-align: center;
                        margin: 30px 0;
                        font-size: 32px;
                        font-weight: bold;
                        letter-spacing: 3px;
                    }
                    .discount-info {
                        background-color: #f8f9fa;
                        padding: 20px;
                        border-radius: 8px;
                        margin: 20px 0;
                        border-left: 4px solid #667eea;
                    }
                    .discount-info p {
                        margin: 10px 0;
                    }
                    .btn {
                        display: inline-block;
                        padding: 15px 30px;
                        background: linear-gradient(135deg, #667eea PERCENT_SIGN, #764ba2 PERCENT_SIGN);
                        color: white;
                        text-decoration: none;
                        border-radius: 5px;
                        margin: 20px 0;
                        text-align: center;
                        font-weight: bold;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 1px solid #eee;
                        color: #777;
                        font-size: 12px;
                    }
                    .highlight {
                        color: #f5576c;
                        font-weight: bold;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🎉 Tri Ân Khách Hàng 🎉</h1>
                    </div>
                    
                    <p>Xin chào <strong>%s</strong>,</p>
                    
                    <p>Chúng tôi xin gửi đến bạn mã khuyến mãi đặc biệt để tri ân sự ủng hộ của bạn!</p>
                    
                    <div class="discount-code">
                        %s
                    </div>
                    
                    <div class="discount-info">
                        <p><strong> Tên khuyến mãi:</strong> %s</p>
                        <p><strong> Giảm giá:</strong> <span class="highlight">%sPERCENT_SIGN</span></p>
                        <p><strong> Thời gian áp dụng:</strong> %s đến %s</p>
                        <p><strong> Mô tả:</strong> %s</p>
                    </div>
                    
                    <div style="text-align: center;">
                        <a href="http://localhost:5173" class="btn">Mua Ngay</a>
                    </div>
                    
                    <p><strong>Lưu ý:</strong></p>
                    <ul>
                        <li>Mã khuyến mãi chỉ có hiệu lực trong thời gian quy định</li>
                        <li>Mã có thể không áp dụng cho một số sản phẩm đặc biệt</li>
                        <li>Không thể kết hợp với các chương trình khuyến mãi khác</li>
                    </ul>
                    
                    <div class="footer">
                        <p>Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi!</p>
                        <p>© 2025 PC Shop. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
            """;
        
        // Format the template
        String formatted = String.format(htmlTemplate,
                customerName != null ? customerName : "Quý khách",
                discountCode != null ? discountCode : "DISCOUNT",
                discountName != null ? discountName : "Khuyến mãi",
                discountRate != null ? String.format("%.1f", discountRate) : "0.0",
                startDate != null ? startDate : "",
                endDate != null ? endDate : "",
                discountDescription != null ? discountDescription : "Áp dụng cho tất cả sản phẩm"
        );
        
        // Replace PERCENT_SIGN with actual % sign
        return formatted.replace("PERCENT_SIGN", "%");
    }
    
    @Override
    public void sendAccountUnlockRequest(
            String userEmail,
            String userName,
            String userPhone,
            Long userId) {
        
        try {
            // Validate inputs
            if (userEmail == null || userEmail.trim().isEmpty()) {
                throw new IllegalArgumentException("Email address cannot be empty");
            }
            
            if (mailSender == null) {
                log.error("JavaMailSender is null - email configuration might be missing");
                throw new IllegalStateException("Email service is not properly configured. Please check email configuration in application.yaml");
            }
            
            // Email admin/support - sử dụng cùng email với mail username (thatchjeager@gmail.com)
            String adminEmail = fromEmail != null && !fromEmail.isEmpty() ? fromEmail : "admin@shoponline.com";
            
            log.info("Attempting to send account unlock request email for user: {} to admin: {}", userEmail, adminEmail);
            
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            String senderEmail = fromEmail != null && !fromEmail.isEmpty() ? fromEmail : "noreply@pcshop.com";
            helper.setFrom(senderEmail);
            helper.setTo(adminEmail);
            helper.setSubject("🔓 Yêu Cầu Mở Khóa Tài Khoản - " + (userName != null ? userName : userEmail));
            
            String htmlContent = buildUnlockRequestEmailHtml(
                    userEmail,
                    userName,
                    userPhone,
                    userId
            );
            
            helper.setText(htmlContent, true);
            
            log.info("Sending account unlock request email...");
            mailSender.send(message);
            log.info("Account unlock request email sent successfully to: {}", adminEmail);
            
        } catch (MessagingException e) {
            log.error("MessagingException when sending account unlock request email: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to send account unlock request email: " + e.getMessage(), e);
        } catch (IllegalStateException e) {
            log.error("Configuration error: {}", e.getMessage(), e);
            throw e;
        } catch (Exception e) {
            log.error("Unexpected error when sending account unlock request email: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to send account unlock request email: " + e.getMessage(), e);
        }
    }
    
    private String buildUnlockRequestEmailHtml(
            String userEmail,
            String userName,
            String userPhone,
            Long userId) {
        
        String htmlTemplate = """
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #f4f4f4;
                    }
                    .container {
                        background-color: #ffffff;
                        border-radius: 10px;
                        padding: 30px;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    }
                    .header {
                        text-align: center;
                        background: linear-gradient(135deg, #f093fb %%, #f5576c %%);
                        color: white;
                        padding: 30px;
                        border-radius: 10px 10px 0 0;
                        margin: -30px -30px 30px -30px;
                    }
                    .header h1 {
                        margin: 0;
                        font-size: 28px;
                    }
                    .info-box {
                        background-color: #f8f9fa;
                        padding: 20px;
                        border-radius: 8px;
                        margin: 20px 0;
                        border-left: 4px solid #f5576c;
                    }
                    .info-box p {
                        margin: 10px 0;
                    }
                    .info-label {
                        font-weight: bold;
                        color: #555;
                        display: inline-block;
                        min-width: 120px;
                    }
                    .info-value {
                        color: #333;
                    }
                    .btn {
                        display: inline-block;
                        padding: 15px 30px;
                        background: linear-gradient(135deg, #667eea %%, #764ba2 %%);
                        color: white;
                        text-decoration: none;
                        border-radius: 5px;
                        margin: 20px 0;
                        text-align: center;
                        font-weight: bold;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 1px solid #eee;
                        color: #777;
                        font-size: 12px;
                    }
                    .highlight {
                        color: #f5576c;
                        font-weight: bold;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🔓 Yêu Cầu Mở Khóa Tài Khoản</h1>
                    </div>
                    
                    <p>Kính gửi Admin/Support,</p>
                    
                    <p>Hệ thống nhận được yêu cầu mở khóa tài khoản từ một khách hàng. Chi tiết thông tin như sau:</p>
                    
                    <div class="info-box">
                        <p><span class="info-label">Email:</span> <span class="info-value">%s</span></p>
                        <p><span class="info-label">Họ tên:</span> <span class="info-value">%s</span></p>
                        <p><span class="info-label">Số điện thoại:</span> <span class="info-value">%s</span></p>
                        <p><span class="info-label">User ID:</span> <span class="info-value">#%d</span></p>
                        <p><span class="info-label">Thời gian:</span> <span class="info-value">%s</span></p>
                    </div>
                    
                    <p><strong>Thông báo:</strong></p>
                    <p>Khách hàng trên đã cố gắng đăng nhập nhưng tài khoản đang ở trạng thái <span class="highlight">INACTIVE</span>. 
                    Khách hàng đã được thông báo và yêu cầu liên hệ để mở khóa tài khoản.</p>
                    
                    <p><strong>Hành động cần thực hiện:</strong></p>
                    <ol>
                        <li>Kiểm tra lý do tài khoản bị vô hiệu hóa</li>
                        <li>Xác minh thông tin khách hàng nếu cần</li>
                        <li>Mở khóa tài khoản trong Admin Panel nếu phù hợp</li>
                        <li>Phản hồi khách hàng qua email hoặc số điện thoại: <span class="highlight">%s</span></li>
                    </ol>
                    
                    <div style="text-align: center;">
                        <a href="http://localhost:5173/admin" class="btn">Truy cập Admin Panel</a>
                    </div>
                    
                    <div class="footer">
                        <p>Email tự động từ hệ thống Shop Online</p>
                        <p>© 2025 PC Shop. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
            """;
        
        // Format the template
        String formatted = String.format(htmlTemplate,
                userEmail != null ? userEmail : "N/A",
                userName != null ? userName : "N/A",
                userPhone != null ? userPhone : "N/A",
                userId != null ? userId : 0,
                java.time.LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss")),
                userPhone != null ? userPhone : "N/A"
        );
        
        // Replace %% with actual % sign
        return formatted.replace("%%", "%");
    }
    
    @Override
    public void sendOrderConfirmation(
            String toEmail,
            String customerName,
            String orderId,
            String orderCode,
            Double totalAmount,
            String paymentMethod,
            String orderDate,
            String orderInfo,
            String orderType,
            String items) {
        
        try {
            if (toEmail == null || toEmail.trim().isEmpty()) {
                throw new IllegalArgumentException("Email address cannot be empty");
            }
            
            if (mailSender == null) {
                log.error("JavaMailSender is null - email configuration might be missing");
                throw new IllegalStateException("Email service is not properly configured");
            }
            
            log.info("Attempting to send order confirmation email to: {}", toEmail);
            
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            String senderEmail = fromEmail != null && !fromEmail.isEmpty() ? fromEmail : "noreply@pcshop.com";
            helper.setFrom(senderEmail);
            helper.setTo(toEmail);
            helper.setSubject("✅ Cảm ơn bạn đã thanh toán - Đơn hàng " + (orderCode != null ? orderCode : orderId));
            
            String htmlContent = buildOrderConfirmationEmailHtml(
                    customerName,
                    orderId,
                    orderCode,
                    totalAmount,
                    paymentMethod,
                    orderDate,
                    orderInfo,
                    orderType,
                    items
            );
            
            helper.setText(htmlContent, true);
            
            log.info("Sending order confirmation email...");
            mailSender.send(message);
            log.info("Order confirmation email sent successfully to: {}", toEmail);
            
        } catch (MessagingException e) {
            log.error("MessagingException when sending order confirmation email: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to send order confirmation email: " + e.getMessage(), e);
        } catch (Exception e) {
            log.error("Unexpected error when sending order confirmation email: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to send order confirmation email: " + e.getMessage(), e);
        }
    }
    
    private String buildOrderConfirmationEmailHtml(
            String customerName,
            String orderId,
            String orderCode,
            Double totalAmount,
            String paymentMethod,
            String orderDate,
            String orderInfo,
            String orderType,
            String items) {
        
        // Generate order items based on orderType
        String orderItemsHtml = "";
        if (items != null && !items.trim().isEmpty()) {
            orderItemsHtml = items;
        } else {
            // Mock items based on orderType
            if ("topup".equals(orderType)) {
                orderItemsHtml = """
                    <tr>
                        <td>Nạp tiền điện thoại</td>
                        <td>%s ₫</td>
                    </tr>
                    """.formatted(totalAmount != null ? String.format("%,.0f", totalAmount) : "0");
            } else {
                orderItemsHtml = """
                    <tr>
                        <td>Sản phẩm / Dịch vụ</td>
                        <td>%s ₫</td>
                    </tr>
                    """.formatted(totalAmount != null ? String.format("%,.0f", totalAmount) : "0");
            }
        }
        
        String orderInfoText = orderInfo != null && !orderInfo.trim().isEmpty() 
            ? orderInfo 
            : (orderType != null && "topup".equals(orderType) 
                ? "Nạp tiền điện thoại" 
                : "Thanh toán đơn hàng");
        
        String htmlTemplate = """
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body { 
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
                        line-height: 1.6; 
                        color: #333; 
                        background-color: #f5f5f5;
                        padding: 0;
                        margin: 0;
                    }
                    .email-wrapper {
                        max-width: 600px; 
                        margin: 0 auto; 
                        background-color: #ffffff;
                    }
                    .header { 
                        background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%);
                        color: white; 
                        padding: 40px 30px; 
                        text-align: center; 
                    }
                    .header-icon {
                        font-size: 48px;
                        margin-bottom: 15px;
                    }
                    .header h1 {
                        font-size: 28px;
                        font-weight: 600;
                        margin: 0;
                    }
                    .thank-you-section {
                        background-color: #fff9e6;
                        border-left: 4px solid #ffa500;
                        padding: 25px 30px;
                        margin: 30px;
                        border-radius: 8px;
                    }
                    .thank-you-section h2 {
                        color: #d97706;
                        font-size: 22px;
                        margin-bottom: 10px;
                    }
                    .thank-you-message {
                        color: #78350f;
                        font-size: 16px;
                        line-height: 1.8;
                    }
                    .payment-amount {
                        background: linear-gradient(135deg, #10b981 0%%, #059669 100%%);
                        color: white;
                        padding: 30px;
                        margin: 30px;
                        border-radius: 12px;
                        text-align: center;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    }
                    .payment-amount-label {
                        font-size: 14px;
                        opacity: 0.9;
                        margin-bottom: 8px;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                    }
                    .payment-amount-value {
                        font-size: 36px;
                        font-weight: 700;
                        margin: 0;
                    }
                    .content { 
                        padding: 0 30px 30px 30px;
                    }
                    .greeting {
                        font-size: 16px;
                        margin-bottom: 25px;
                        color: #4b5563;
                    }
                    .order-info-section {
                        background-color: #f9fafb;
                        padding: 25px;
                        margin: 25px 0;
                        border-radius: 10px;
                        border: 1px solid #e5e7eb;
                    }
                    .order-info-section h3 {
                        color: #111827;
                        font-size: 18px;
                        margin-bottom: 20px;
                        padding-bottom: 12px;
                        border-bottom: 2px solid #e5e7eb;
                    }
                    .info-row {
                        display: flex;
                        padding: 12px 0;
                        border-bottom: 1px solid #e5e7eb;
                    }
                    .info-row:last-child {
                        border-bottom: none;
                    }
                    .info-label {
                        font-weight: 600;
                        color: #6b7280;
                        width: 180px;
                        flex-shrink: 0;
                    }
                    .info-value {
                        color: #111827;
                        font-weight: 500;
                        flex: 1;
                    }
                    .status-badge {
                        display: inline-block;
                        background-color: #10b981;
                        color: white;
                        padding: 4px 12px;
                        border-radius: 20px;
                        font-size: 12px;
                        font-weight: 600;
                        margin-left: 8px;
                    }
                    .order-items-table {
                        width: 100%%;
                        border-collapse: collapse;
                        margin: 25px 0;
                        background-color: white;
                        border-radius: 8px;
                        overflow: hidden;
                        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    }
                    .order-items-table thead {
                        background-color: #f3f4f6;
                    }
                    .order-items-table th {
                        padding: 15px;
                        text-align: left;
                        font-weight: 600;
                        color: #374151;
                        font-size: 14px;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }
                    .order-items-table th:last-child {
                        text-align: right;
                    }
                    .order-items-table td {
                        padding: 15px;
                        border-bottom: 1px solid #e5e7eb;
                        color: #111827;
                    }
                    .order-items-table tbody tr:last-child td {
                        border-bottom: none;
                    }
                    .order-items-table td:last-child {
                        text-align: right;
                        font-weight: 600;
                        color: #059669;
                    }
                    .footer-message {
                        background-color: #eff6ff;
                        border-left: 4px solid #3b82f6;
                        padding: 20px 25px;
                        margin: 25px 0;
                        border-radius: 8px;
                        color: #1e40af;
                        font-size: 14px;
                        line-height: 1.8;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 40px;
                        padding-top: 30px;
                        border-top: 1px solid #e5e7eb;
                        color: #6b7280;
                        font-size: 13px;
                        line-height: 1.8;
                    }
                    .footer p {
                        margin: 5px 0;
                    }
                    .support-link {
                        color: #3b82f6;
                        text-decoration: none;
                    }
                    @media only screen and (max-width: 600px) {
                        .header { padding: 30px 20px; }
                        .header h1 { font-size: 24px; }
                        .content { padding: 0 20px 20px 20px; }
                        .thank-you-section, .payment-amount { margin: 20px; }
                        .order-info-section { padding: 20px; }
                        .info-row { flex-direction: column; }
                        .info-label { width: 100%%; margin-bottom: 5px; }
                        .payment-amount-value { font-size: 28px; }
                    }
                </style>
            </head>
            <body>
                <div class="email-wrapper">
                    <div class="header">
                        <div class="header-icon">✅</div>
                        <h1>Thanh toán thành công!</h1>
                    </div>
                    
                    <div class="thank-you-section">
                        <h2>Cảm ơn bạn đã thanh toán!</h2>
                        <p class="thank-you-message">
                            Cảm ơn bạn <strong>%s</strong> đã thanh toán số tiền thanh toán cho đơn hàng của bạn. 
                            Đơn hàng đã được xác nhận và đang được xử lý.
                        </p>
                    </div>
                    
                    <div class="payment-amount">
                        <div class="payment-amount-label">Số tiền thanh toán</div>
                        <div class="payment-amount-value">%s ₫</div>
                    </div>
                    
                    <div class="content">
                        <div class="greeting">
                            Xin chào <strong>%s</strong>,
                        </div>
                        
                        <div class="order-info-section">
                            <h3>📦 Thông tin đơn hàng</h3>
                            <div class="info-row">
                                <span class="info-label">Mã đơn hàng:</span>
                                <span class="info-value">%s</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Mã giao dịch:</span>
                                <span class="info-value">%s</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Ngày đặt hàng:</span>
                                <span class="info-value">%s</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Nội dung đơn hàng:</span>
                                <span class="info-value">%s</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Phương thức thanh toán:</span>
                                <span class="info-value">%s</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Tình trạng:</span>
                                <span class="info-value">Đã thanh toán thành công<span class="status-badge">✓</span></span>
                            </div>
                        </div>
                        
                        <table class="order-items-table">
                            <thead>
                                <tr>
                                    <th>Sản phẩm / Dịch vụ</th>
                                    <th style="text-align: right;">Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                %s
                            </tbody>
                        </table>
                        
                        <div class="footer-message">
                            <strong>📬 Thông báo tiếp theo:</strong><br>
                            Chúng tôi sẽ gửi thông báo cập nhật khi đơn hàng được xử lý và vận chuyển. 
                            Bạn có thể theo dõi trạng thái đơn hàng bằng mã đơn hàng ở trên.
                        </div>
                        
                        <div class="footer">
                            <p><strong>PC Shop - Hệ thống mua sắm trực tuyến</strong></p>
                            <p>Email này được gửi tự động từ hệ thống</p>
                            <p>Nếu có thắc mắc, vui lòng liên hệ: <a href="mailto:hotrovnpay@vnpay.vn" class="support-link">hotrovnpay@vnpay.vn</a></p>
                            <p style="margin-top: 15px; font-size: 12px; color: #9ca3af;">
                                Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi! 🎉
                            </p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
            """;
        
        String customerNameValue = customerName != null ? customerName : "Quý khách";
        String totalAmountFormatted = totalAmount != null ? String.format("%,.0f", totalAmount) : "0";
        String orderCodeValue = orderCode != null ? orderCode : orderId;
        String orderIdValue = orderId != null ? orderId : "N/A";
        String orderDateValue = orderDate != null ? orderDate : java.time.LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss"));
        String paymentMethodValue = paymentMethod != null ? paymentMethod : "VNPay";
        
        String formatted = String.format(htmlTemplate,
                customerNameValue,  // Thank you message - customer name
                totalAmountFormatted,  // Payment amount
                customerNameValue,  // Greeting - customer name
                orderCodeValue,  // Order code
                orderIdValue,  // Order ID (transaction ID)
                orderDateValue,  // Order date
                orderInfoText,  // Order info
                paymentMethodValue,  // Payment method
                orderItemsHtml  // Order items HTML
        );
        
        return formatted.replace("%%", "%");
    }
    
    @Override
    public void sendPasswordResetOTP(String toEmail, String customerName, String otpCode) {
        try {
            if (toEmail == null || toEmail.trim().isEmpty()) {
                throw new IllegalArgumentException("Email address cannot be empty");
            }
            
            if (mailSender == null) {
                log.error("JavaMailSender is null - email configuration might be missing");
                throw new IllegalStateException("Email service is not properly configured");
            }
            
            log.info("Attempting to send password reset OTP email to: {}", toEmail);
            
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            String senderEmail = fromEmail != null && !fromEmail.isEmpty() ? fromEmail : "noreply@pcshop.com";
            helper.setFrom(senderEmail);
            helper.setTo(toEmail);
            helper.setSubject("🔐 Mã Xác Thực Đặt Lại Mật Khẩu");
            
            String htmlContent = buildPasswordResetOTPEmailHtml(customerName, otpCode);
            helper.setText(htmlContent, true);
            
            log.info("Sending password reset OTP email...");
            mailSender.send(message);
            log.info("Password reset OTP email sent successfully to: {}", toEmail);
            
        } catch (MessagingException e) {
            log.error("MessagingException when sending password reset OTP email: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to send password reset OTP email: " + e.getMessage(), e);
        } catch (Exception e) {
            log.error("Unexpected error when sending password reset OTP email: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to send password reset OTP email: " + e.getMessage(), e);
        }
    }
    
    private String buildPasswordResetOTPEmailHtml(String customerName, String otpCode) {
        String htmlTemplate = """
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                    }
                    .email-container {
                        max-width: 600px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        border-radius: 8px;
                        overflow: hidden;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    .header {
                        background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%);
                        color: white;
                        padding: 30px;
                        text-align: center;
                    }
                    .header h1 {
                        margin: 0;
                        font-size: 24px;
                    }
                    .content {
                        padding: 30px;
                    }
                    .otp-box {
                        background-color: #f8f9fa;
                        border: 2px dashed #667eea;
                        border-radius: 8px;
                        padding: 20px;
                        text-align: center;
                        margin: 20px 0;
                    }
                    .otp-code {
                        font-size: 32px;
                        font-weight: bold;
                        color: #667eea;
                        letter-spacing: 8px;
                        font-family: 'Courier New', monospace;
                    }
                    .warning {
                        background-color: #fff3cd;
                        border-left: 4px solid #ffc107;
                        padding: 15px;
                        margin: 20px 0;
                        border-radius: 4px;
                    }
                    .footer {
                        background-color: #f8f9fa;
                        padding: 20px;
                        text-align: center;
                        font-size: 12px;
                        color: #6c757d;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="header">
                        <h1>🔐 Mã Xác Thực Đặt Lại Mật Khẩu</h1>
                    </div>
                    <div class="content">
                        <p>Xin chào <strong>%s</strong>,</p>
                        <p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.</p>
                        <p>Vui lòng sử dụng mã OTP dưới đây để xác thực:</p>
                        
                        <div class="otp-box">
                            <div class="otp-code">%s</div>
                        </div>
                        
                        <div class="warning">
                            <strong>⚠️ Lưu ý:</strong>
                            <ul style="margin: 10px 0; padding-left: 20px;">
                                <li>Mã OTP này chỉ có hiệu lực trong <strong>10 phút</strong></li>
                                <li>Không chia sẻ mã này với bất kỳ ai</li>
                                <li>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này</li>
                            </ul>
                        </div>
                        
                        <p>Nếu bạn gặp vấn đề, vui lòng liên hệ bộ phận hỗ trợ của chúng tôi.</p>
                    </div>
                    <div class="footer">
                        <p><strong>PC Shop - Hệ thống mua sắm trực tuyến</strong></p>
                        <p>Email này được gửi tự động từ hệ thống</p>
                    </div>
                </div>
            </body>
            </html>
            """;
        
        String customerNameValue = customerName != null && !customerName.trim().isEmpty() ? customerName : "Quý khách";
        
        return String.format(htmlTemplate, customerNameValue, otpCode);
    }
}

