package com.iuh.fit.se.domain.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserDiscountDTO {
    Long id;
    Long userId;
    String userName;
    String userEmail;
    
    // Discount info
    Long discountId;
    String discountName;
    String discountType;
    String discountDescription;
    Double discountRate;
    Long point;
    
    // Status
    Boolean isUsed;
    LocalDateTime usedAt;
    LocalDateTime createdAt;
    LocalDateTime expiresAt;
}

