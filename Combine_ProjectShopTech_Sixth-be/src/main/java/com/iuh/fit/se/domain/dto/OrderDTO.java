package com.iuh.fit.se.domain.dto;

import com.iuh.fit.se.domain.enums.OrderStatus;
import com.iuh.fit.se.domain.enums.PaymentMethod;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderDTO {
    Long id;
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
    Long userId;
}
