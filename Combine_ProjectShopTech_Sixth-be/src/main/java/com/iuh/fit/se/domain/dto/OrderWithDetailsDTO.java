package com.iuh.fit.se.domain.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class OrderWithDetailsDTO {
    Long id;
    Double paymentFee;
    Double totalPrice;
    LocalDate createdDate;
    String deliveryAddress;
    com.iuh.fit.se.domain.enums.OrderStatus status;
    String notes;
    Long usedPoint;
    LocalDate usedAt;
    com.iuh.fit.se.domain.enums.PaymentMethod paymentMethod;
    Long userId;
    List<OrderDetailDTO> items;
    Integer totalItems;
}

