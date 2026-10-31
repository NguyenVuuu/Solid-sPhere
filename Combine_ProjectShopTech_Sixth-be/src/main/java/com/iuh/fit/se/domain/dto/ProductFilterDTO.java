package com.iuh.fit.se.domain.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

/**
 * ProductFilterDTO
 * <p>
 * Provides business logic for managing employment details.
 * <p>
 * Version 1.0
 * Date: 13/11/2025
 * <p>
 * Copyright
 * <p>
 * Modification Logs:
 * DATE         AUTHOR       DESCRIPTION
 * -------------------------------------
 * 13/11/2025    HDang      Create
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductFilterDTO {
    Long id;
    String name;
    String description;
    Double unitPrice;
    String imageUrl;
    Long quantity;
    Double percentage;
    String status;
    String categoryName;
    Long categoryId;
    Double discountPrice;
    Boolean hasDiscount;
}
