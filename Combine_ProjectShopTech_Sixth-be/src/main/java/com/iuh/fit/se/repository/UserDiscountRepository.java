package com.iuh.fit.se.repository;

import com.iuh.fit.se.domain.entity.UserDiscount;
import com.iuh.fit.se.domain.entity.User;
import com.iuh.fit.se.domain.entity.Discount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * UserDiscountRepository
 * <p>
 * Repository for managing UserDiscount entities
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
@Repository
public interface UserDiscountRepository extends JpaRepository<UserDiscount, Long> {
    
    /**
     * Find all discounts for a specific user
     */
    List<UserDiscount> findByUser(User user);
    
    /**
     * Find all users who have a specific discount
     */
    List<UserDiscount> findByDiscount(Discount discount);
    
    /**
     * Find active (unused) discounts for a user
     */
    @Query("SELECT ud FROM UserDiscount ud WHERE ud.user = :user AND ud.isUsed = false AND (ud.expiresAt IS NULL OR ud.expiresAt > :now)")
    List<UserDiscount> findActiveDiscountsByUser(@Param("user") User user, @Param("now") LocalDateTime now);
    
    /**
     * Find used discounts for a user
     */
    List<UserDiscount> findByUserAndIsUsedTrue(User user);
    
    /**
     * Check if user already has a specific discount
     */
    Optional<UserDiscount> findByUserAndDiscount(User user, Discount discount);
    
    /**
     * Find discounts that are about to expire
     */
    @Query("SELECT ud FROM UserDiscount ud WHERE ud.isUsed = false AND ud.expiresAt IS NOT NULL AND ud.expiresAt BETWEEN :now AND :expiryThreshold")
    List<UserDiscount> findExpiringDiscounts(@Param("now") LocalDateTime now, @Param("expiryThreshold") LocalDateTime expiryThreshold);
    
    /**
     * Count active discounts for a user
     */
    @Query("SELECT COUNT(ud) FROM UserDiscount ud WHERE ud.user = :user AND ud.isUsed = false AND (ud.expiresAt IS NULL OR ud.expiresAt > :now)")
    Long countActiveDiscountsByUser(@Param("user") User user, @Param("now") LocalDateTime now);
    
    /**
     * Find discounts by user ID
     */
    @Query("SELECT ud FROM UserDiscount ud WHERE ud.user.id = :userId")
    List<UserDiscount> findByUserId(@Param("userId") Long userId);
    
    /**
     * Find active discounts by user ID
     */
    @Query("SELECT ud FROM UserDiscount ud WHERE ud.user.id = :userId AND ud.isUsed = false AND (ud.expiresAt IS NULL OR ud.expiresAt > :now)")
    List<UserDiscount> findActiveDiscountsByUserId(@Param("userId") Long userId, @Param("now") LocalDateTime now);
}
