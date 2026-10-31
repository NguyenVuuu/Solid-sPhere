package com.iuh.fit.se.domain.dto;


import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderProductDetailDTO {
    Long orderDetailId;
    int amount;
    Double pricePerUnit;
    Long productId;
    String productName;
    String description;
    Double productUnitPrice;
    String imageUrl;
    String categoryName;
}
