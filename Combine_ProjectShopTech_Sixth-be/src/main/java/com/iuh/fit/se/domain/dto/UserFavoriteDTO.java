package com.iuh.fit.se.domain.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

/**
 * UserFavoriteDTO
 * <p>
 * Data Transfer Object for UserFavorite
 * <p>
 * Version 1.0
 * Date: 23/01/2025
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserFavoriteDTO {
    Long id;
    LocalDateTime addedAt;
    Long userId;
    String userFullName;
    Long productId;
    String productName;
    String productDescription;
    String productImageUrl;
    Double productPrice;
    String productCategoryName;
}

