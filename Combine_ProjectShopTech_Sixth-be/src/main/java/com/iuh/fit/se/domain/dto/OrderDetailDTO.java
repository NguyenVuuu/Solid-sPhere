package com.iuh.fit.se.domain.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderDetailDTO {
    Long id;
    int amount;
    Double unitPrice;
    Long orderId;
    Long productId;
}
