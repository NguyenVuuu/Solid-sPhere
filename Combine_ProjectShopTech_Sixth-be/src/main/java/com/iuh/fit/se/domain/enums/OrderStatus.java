package com.iuh.fit.se.domain.enums;

/**
 * PaymentStatus
 * <p>
 * Provides business logic for managing employment details.
 * <p>
 * Version 1.0
 * Date: 05/09/2025
 * <p>
 * Copyright
 * <p>
 * Modification Logs:
 * DATE         AUTHOR       DESCRIPTION
 * -------------------------------------
 * 05/09/2025      ASUS      Create
 */
public enum OrderStatus {
    PENDING,        // Đang chờ xử lý
    CONFIRMED,      // Đã xác nhận
    PROCESSING,     // Đang xử lý
    SHIPPED,        // Đã gửi hàng
    DELIVERED,      // Đã giao hàng
    CANCELLED,      // Đã hủy
    RETURNED        // Đã trả hàng
}
