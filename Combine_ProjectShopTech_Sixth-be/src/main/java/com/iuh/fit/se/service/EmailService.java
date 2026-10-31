package com.iuh.fit.se.service;

/**
 * EmailService
 * <p>
 * Service interface for sending emails
 * <p>
 * Version 1.0
 * Date: 2025-01-XX
 * <p>
 * Copyright
 */
public interface EmailService {
    
    /**
     * Send discount code email to customer
     * @param toEmail Customer email address
     * @param customerName Customer name
     * @param discountName Discount name
     * @param discountCode Discount code
     * @param discountRate Discount rate (percentage or amount)
     * @param discountDescription Discount description
     * @param startDate Discount start date
     * @param endDate Discount end date
     */
    void sendDiscountCodeToCustomer(
            String toEmail,
            String customerName,
            String discountName,
            String discountCode,
            Double discountRate,
            String discountDescription,
            String startDate,
            String endDate
    );
    
    /**
     * Send bulk discount codes to multiple customers
     * @param customerEmails List of customer email addresses
     * @param discountName Discount name
     * @param discountCode Discount code
     * @param discountRate Discount rate
     * @param discountDescription Discount description
     * @param startDate Discount start date
     * @param endDate Discount end date
     */
    void sendBulkDiscountCodes(
            java.util.List<String> customerEmails,
            String discountName,
            String discountCode,
            Double discountRate,
            String discountDescription,
            String startDate,
            String endDate
    );
    
    /**
     * Send account unlock request email to admin/support
     * @param userEmail User email address requesting unlock
     * @param userName User full name
     * @param userPhone User phone number
     * @param userId User ID
     */
    void sendAccountUnlockRequest(
            String userEmail,
            String userName,
            String userPhone,
            Long userId
    );
    
    /**
     * Send order confirmation email to customer after successful payment
     * @param toEmail Customer email address
     * @param customerName Customer name
     * @param orderId Order ID
     * @param orderCode Order code
     * @param totalAmount Total amount
     * @param paymentMethod Payment method
     * @param orderDate Order date
     * @param orderInfo Order information/description
     * @param orderType Order type (topup, other, etc.)
     * @param items Order items (optional, can be null)
     */
    void sendOrderConfirmation(
            String toEmail,
            String customerName,
            String orderId,
            String orderCode,
            Double totalAmount,
            String paymentMethod,
            String orderDate,
            String orderInfo,
            String orderType,
            String items
    );
    
    /**
     * Send OTP code for password reset
     * @param toEmail User email address
     * @param customerName User name
     * @param otpCode OTP code (6 digits)
     */
    void sendPasswordResetOTP(
            String toEmail,
            String customerName,
            String otpCode
    );
}

