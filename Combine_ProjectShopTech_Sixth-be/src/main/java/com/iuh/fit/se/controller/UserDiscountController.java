package com.iuh.fit.se.controller;

import com.iuh.fit.se.domain.entity.UserDiscount;
import com.iuh.fit.se.domain.dto.UserDiscountDTO;
import com.iuh.fit.se.service.UserDiscountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * UserDiscountController
 * <p>
 * REST API controller for UserDiscount management
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
@RestController
@RequestMapping("/api/user-discounts")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserDiscountController {
    
    private final UserDiscountService userDiscountService;
    
    /**
     * Assign a discount to a user
     */
    @PostMapping("/assign")
    public ResponseEntity<UserDiscount> assignDiscountToUser(
            @RequestParam Long userId,
            @RequestParam Long discountId) {
        try {
            UserDiscount userDiscount = userDiscountService.assignDiscountToUser(userId, discountId);
            return ResponseEntity.ok(userDiscount);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Get all discounts for a user
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserDiscountDTO>> getUserDiscounts(@PathVariable Long userId) {
        List<UserDiscountDTO> userDiscounts = userDiscountService.getUserDiscountsDTO(userId);
        return ResponseEntity.ok(userDiscounts);
    }

    /**
     * Get active discounts for a user
     */
    @GetMapping("/user/{userId}/active")
    public ResponseEntity<List<UserDiscountDTO>> getActiveUserDiscounts(@PathVariable Long userId) {
        List<UserDiscountDTO> activeDiscounts = userDiscountService.getActiveUserDiscountsDTO(userId);
        return ResponseEntity.ok(activeDiscounts);
    }
    
    /**
     * Use a discount
     */
    @PutMapping("/{userDiscountId}/use")
    public ResponseEntity<UserDiscount> useDiscount(@PathVariable Long userDiscountId) {
        try {
            UserDiscount userDiscount = userDiscountService.useDiscount(userDiscountId);
            return ResponseEntity.ok(userDiscount);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Get all users who have a specific discount
     */
    @GetMapping("/discount/{discountId}")
    public ResponseEntity<List<UserDiscount>> getDiscountUsers(@PathVariable Long discountId) {
        List<UserDiscount> discountUsers = userDiscountService.getDiscountUsers(discountId);
        return ResponseEntity.ok(discountUsers);
    }
    
    /**
     * Remove a discount from a user
     */
    @DeleteMapping("/remove")
    public ResponseEntity<Void> removeDiscountFromUser(
            @RequestParam Long userId,
            @RequestParam Long discountId) {
        try {
            userDiscountService.removeDiscountFromUser(userId, discountId);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Get expiring discounts
     */
    @GetMapping("/expiring")
    public ResponseEntity<List<UserDiscount>> getExpiringDiscounts(
            @RequestParam(defaultValue = "7") int daysBeforeExpiry) {
        List<UserDiscount> expiringDiscounts = userDiscountService.getExpiringDiscounts(daysBeforeExpiry);
        return ResponseEntity.ok(expiringDiscounts);
    }
    
    /**
     * Count active discounts for a user
     */
    @GetMapping("/user/{userId}/count")
    public ResponseEntity<Long> countActiveDiscounts(@PathVariable Long userId) {
        Long count = userDiscountService.countActiveDiscounts(userId);
        return ResponseEntity.ok(count);
    }


    @PostMapping("/user/{userId}/exchange-point")
    public ResponseEntity<UserDiscount> exChangePointForUser(@PathVariable Long userId, @RequestParam Long point, @RequestParam Long idDisCount) {

        System.out.println(userId + point + idDisCount);
        UserDiscount count = userDiscountService.exchangePoints(userId, idDisCount, point);
        return ResponseEntity.ok(count);
    }
}
