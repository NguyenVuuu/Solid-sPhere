package com.iuh.fit.se.domain.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

/**
 * ProductFilterRequest
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
public class ProductFilterRequestDTO {
    String categoryName; // Tên danh mục để filter
    Long categoryId;     // ID danh mục để filter (single)
    java.util.List<Long> categoryIds; // Danh sách ID danh mục để filter (multiple)
    Double minPrice;     // Giá tối thiểu
    Double maxPrice;     // Giá tối đa
    String status;       // ACTIVE, INACTIVE, OUT_OF_STOCK
    String searchName;
    String brand;        // Brand filter (iPhone, Samsung, Xiaomi, etc.)
}
