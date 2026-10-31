package com.iuh.fit.se.service;

import com.iuh.fit.se.domain.entity.UserDiscount;
import com.iuh.fit.se.domain.entity.User;
import com.iuh.fit.se.domain.entity.Discount;
import com.iuh.fit.se.domain.dto.UserDiscountDTO;
import com.iuh.fit.se.repository.UserDiscountRepository;
import com.iuh.fit.se.repository.UserRepository;
import com.iuh.fit.se.repository.DiscountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * UserDiscountService
 * <p>
 * Service for managing UserDiscount business logic
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
@Service
@RequiredArgsConstructor
@Transactional
public class UserDiscountService {
    
    private final UserDiscountRepository userDiscountRepository;
    private final UserRepository userRepository;
    private final DiscountRepository discountRepository;
    
    /**
     * Assign a discount to a user
     */
    public UserDiscount assignDiscountToUser(Long userId, Long discountId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        Discount discount = discountRepository.findById(discountId)
                .orElseThrow(() -> new RuntimeException("Discount not found with id: " + discountId));
        
        // Check if user already has this discount
        Optional<UserDiscount> existingUserDiscount = userDiscountRepository.findByUserAndDiscount(user, discount);
        if (existingUserDiscount.isPresent()) {
            throw new RuntimeException("User already has this discount");
        }
        
        // Check if discount is active
        if (!discount.getDiscountStatus()) {
            throw new RuntimeException("Discount is not active");
        }
        
        // Check if discount is still valid
        LocalDateTime now = LocalDateTime.now();
        if (discount.getEndDate() != null && discount.getEndDate().isBefore(now.toLocalDate())) {
            throw new RuntimeException("Discount has expired");
        }
        
        UserDiscount userDiscount = new UserDiscount(user, discount);
        if (discount.getEndDate() != null) {
            userDiscount.setExpiresAt(discount.getEndDate().atTime(23, 59, 59));
        }
        
        return userDiscountRepository.save(userDiscount);
    }
    
    /**
     * Get all discounts for a user
     */
    @Transactional(readOnly = true)
    public List<UserDiscount> getUserDiscounts(Long userId) {
        return userDiscountRepository.findByUserId(userId);
    }

    /**
     * Get all discounts for a user as DTOs
     */
    @Transactional(readOnly = true)
    public List<UserDiscountDTO> getUserDiscountsDTO(Long userId) {
        List<UserDiscount> userDiscounts = userDiscountRepository.findByUserId(userId);
        return userDiscounts.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get active discounts for a user
     */
    @Transactional(readOnly = true)
    public List<UserDiscount> getActiveUserDiscounts(Long userId) {
        return userDiscountRepository.findActiveDiscountsByUserId(userId, LocalDateTime.now());
    }

    /**
     * Get active discounts for a user as DTOs
     */
    @Transactional(readOnly = true)
    public List<UserDiscountDTO> getActiveUserDiscountsDTO(Long userId) {
        List<UserDiscount> activeDiscounts = userDiscountRepository.findActiveDiscountsByUserId(userId, LocalDateTime.now());
        return activeDiscounts.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Convert UserDiscount entity to DTO
     */
    private UserDiscountDTO convertToDTO(UserDiscount userDiscount) {
        Discount discount = userDiscount.getDiscount();
        User user = userDiscount.getUser();

        return UserDiscountDTO.builder()
                .id(userDiscount.getId())
                .userId(user != null ? user.getId() : null)
                .userName(user != null ? user.getFullName() : null)
                .userEmail(user != null ? user.getEmail() : null)
                .discountId(discount != null ? discount.getId() : null)
                .discountName(discount != null ? discount.getName() : null)
                .discountType(discount != null ? discount.getType() : null)
                .discountDescription(discount != null ? discount.getDescription() : null)
                .discountRate(discount != null ? discount.getDiscountRate() : null)
                .point(discount != null ? discount.getPoint() : null)
                .isUsed(userDiscount.getIsUsed())
                .usedAt(userDiscount.getUsedAt())
                .createdAt(userDiscount.getCreatedAt())
                .expiresAt(userDiscount.getExpiresAt())
                .build();
    }
    
    /**
     * Use a discount (mark as used)
     */
    public UserDiscount useDiscount(Long userDiscountId) {
        UserDiscount userDiscount = userDiscountRepository.findById(userDiscountId)
                .orElseThrow(() -> new RuntimeException("UserDiscount not found with id: " + userDiscountId));
        
        if (userDiscount.getIsUsed()) {
            throw new RuntimeException("Discount has already been used");
        }
        
        // Check if discount is still valid
        LocalDateTime now = LocalDateTime.now();
        if (userDiscount.getExpiresAt() != null && userDiscount.getExpiresAt().isBefore(now)) {
            throw new RuntimeException("Discount has expired");
        }
        
        userDiscount.setIsUsed(true);
        userDiscount.setUsedAt(now);
        
        return userDiscountRepository.save(userDiscount);
    }
    
    /**
     * Get all users who have a specific discount
     */
    @Transactional(readOnly = true)
    public List<UserDiscount> getDiscountUsers(Long discountId) {
        Discount discount = discountRepository.findById(discountId)
                .orElseThrow(() -> new RuntimeException("Discount not found with id: " + discountId));
        
        return userDiscountRepository.findByDiscount(discount);
    }
    
    /**
     * Remove a discount from a user
     */
    public void removeDiscountFromUser(Long userId, Long discountId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        Discount discount = discountRepository.findById(discountId)
                .orElseThrow(() -> new RuntimeException("Discount not found with id: " + discountId));
        
        Optional<UserDiscount> userDiscount = userDiscountRepository.findByUserAndDiscount(user, discount);
        if (userDiscount.isPresent()) {
            userDiscountRepository.delete(userDiscount.get());
        }
    }
    
    /**
     * Get expiring discounts for notification
     */
    @Transactional(readOnly = true)
    public List<UserDiscount> getExpiringDiscounts(int daysBeforeExpiry) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expiryThreshold = now.plusDays(daysBeforeExpiry);
        
        return userDiscountRepository.findExpiringDiscounts(now, expiryThreshold);
    }
    
    /**
     * Count active discounts for a user
     */
    @Transactional(readOnly = true)
    public Long countActiveDiscounts(Long userId) {
        return userDiscountRepository.countActiveDiscountsByUser(
                userRepository.findById(userId)
                        .orElseThrow(() -> new RuntimeException("User not found with id: " + userId)),
                LocalDateTime.now()
        );
    }
    public UserDiscount exchangePoints (Long uid, Long idDiscount, Long points ) {
        Discount discount = discountRepository.findById(idDiscount)
                .orElseThrow(() -> new RuntimeException("Discount not found with id: " + idDiscount));

        User user = userRepository.findById(uid) .orElseThrow(() -> new RuntimeException("not found user with id: " + uid));

        if (discount == null || user == null) {
            return null;
        }

        boolean rs = userRepository.deductPoints(uid, points) > 0;

        if (rs) {
            UserDiscount userDiscount = new UserDiscount(user, discount);
            return  userDiscountRepository.save(userDiscount);
        }
        return null;
    }
}
