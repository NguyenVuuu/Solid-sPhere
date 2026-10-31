package com.iuh.fit.se.domain.dto;

import com.iuh.fit.se.domain.enums.OrderStatus;
import com.iuh.fit.se.domain.enums.PaymentMethod;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderTrackingDTO {
    Long orderId;
    OrderStatus status;
    LocalDate createdDate;
    LocalDateTime shippedDate;
    LocalDateTime estimatedDeliveryDate;
    String deliveryAddress;
    String notes;
    Double totalPrice;
    PaymentMethod paymentMethod;
    List<OrderDetailDTO> items;
    Integer totalItems;
    
    // Thông tin tracking
    Boolean isShipped;
    Long daysUntilDelivery;
    String trackingStatus;
}
