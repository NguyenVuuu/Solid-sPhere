package com.iuh.fit.se.domain.dto;

import com.iuh.fit.se.domain.enums.OrderStatus;
import com.iuh.fit.se.domain.enums.PaymentMethod;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO for creating order with order details in one transaction
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateOrderRequestDTO {
    // Order information
    Long userId;
    Double paymentFee;
    Double totalPrice;
    LocalDate createdDate;
    LocalDateTime shippedDate;

    String deliveryAddress;
    OrderStatus status;
    String notes;
    Long usedPoint;
    LocalDate usedAt;
    PaymentMethod paymentMethod;
    
    // List of order details (products to order)
    List<OrderDetailItemDTO> items;
    
    /**
     * Inner DTO for order detail items
     */
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class OrderDetailItemDTO {
        Long productId;
        int amount;
        Double unitPrice;
    }
}

