package com.iuh.fit.se.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

/**
 * UserDiscount
 * <p>
 * Manages many-to-many relationship between User and Discount
 * <p>
 * Version 1.0
 * Date: 05/09/2025
 * <p>
 * Copyright
 * <p>
 * Modification Logs:
 * DATE         AUTHOR       DESCRIPTION
 * -------------------------------------
 * 05/09/2025      ASUS      Create
 */
@Entity
@Table(name = "user_discounts")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserDiscount {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    User user;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "discount_id", nullable = false)
    Discount discount;
    
    @Column(name = "is_used", nullable = false)
    Boolean isUsed = false;
    
    @Column(name = "used_at")
    LocalDateTime usedAt;
    
    @Column(name = "created_at", nullable = false)
    LocalDateTime createdAt = LocalDateTime.now();
    
    @Column(name = "expires_at")
    LocalDateTime expiresAt;
    
    // Constructors for convenience
    public UserDiscount(User user, Discount discount) {
        this.user = user;
        this.discount = discount;
        this.isUsed = false;
        this.createdAt = LocalDateTime.now();
    }
    
    public UserDiscount(User user, Discount discount, LocalDateTime expiresAt) {
        this.user = user;
        this.discount = discount;
        this.isUsed = false;
        this.createdAt = LocalDateTime.now();
        this.expiresAt = expiresAt;
    }
}
