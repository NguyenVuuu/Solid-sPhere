package com.iuh.fit.se.domain.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductReviewDTO {
    Long id;
    int rating;
    String comment;
    String reply;
    LocalDateTime createdAt;
    Long productId;
    Long userId;
    String userFullName;
    
    // Moderation fields
    Boolean violate;
    String violationReason;
}