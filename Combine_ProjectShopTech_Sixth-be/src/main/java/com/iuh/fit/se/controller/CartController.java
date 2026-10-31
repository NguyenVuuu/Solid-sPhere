package com.iuh.fit.se.controller;

import com.iuh.fit.se.domain.entity.Cart;
import com.iuh.fit.se.domain.entity.CartItem;
import com.iuh.fit.se.service.CartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * CartController
 * <p>
 * REST API controller for Cart operations
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
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class CartController {

    private final CartService cartService;

    /**
     * Get cart by user ID
     * @param userId User ID
     * @return ResponseEntity<Cart>
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<Cart> getCartByUserId(@PathVariable Long userId) {
        try {
            Cart cart = cartService.getCartSummary(userId);
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            log.error("Error getting cart for user {}: {}", userId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get cart items by user ID
     * @param userId User ID
     * @return ResponseEntity<List<CartItem>>
     */
    @GetMapping("/user/{userId}/items")
    public ResponseEntity<List<CartItem>> getCartItems(@PathVariable Long userId) {
        try {
            List<CartItem> cartItems = cartService.getCartItems(userId);
            return ResponseEntity.ok(cartItems);
        } catch (Exception e) {
            log.error("Error getting cart items for user {}: {}", userId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

     /**
     * Add product to cart
     * 
     * @param userId    User ID
     * @param productId Product ID
     * @param quantity  Quantity
     * @return ResponseEntity<CartItem>
     */
    @PostMapping("/user/{userId}/add")
    public ResponseEntity<CartItem> addToCart(
            @PathVariable Long userId,
            @RequestParam Long productId,
            @RequestParam(defaultValue = "1") Integer quantity) {
        Cart cart = cartService.getOrCreateCart(userId);
        if (cart == null) {
            cartService.createCart(userId);
        }
        CartItem cartItem = cartService.addToCart(userId, productId, quantity);
        return ResponseEntity.status(HttpStatus.CREATED).body(cartItem);
    }

    /**
     * Update cart item quantity
     * 
     * @param userId    User ID
     * @param productId Product ID
     * @param quantity  New quantity
     * @return ResponseEntity<CartItem>
     */
    @PutMapping("/user/{userId}/update")
    public ResponseEntity<CartItem> updateCartItemQuantity(
            @PathVariable Long userId,
            @RequestParam Long productId,
            @RequestParam Integer quantity) {
        CartItem cartItem = cartService.updateCartItemQuantity(userId, productId, quantity);
        return ResponseEntity.ok(cartItem);
    }

    /**
     * Remove product from cart
     * @param userId User ID
     * @param productId Product ID
     * @return ResponseEntity<Void>
     */
    @DeleteMapping("/user/{userId}/remove")
    public ResponseEntity<Void> removeFromCart(
            @PathVariable Long userId,
            @RequestParam Long productId) {
        try {
            cartService.removeFromCart(userId, productId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error("Error removing product {} from cart for user {}: {}", productId, userId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Clear cart
     * @param userId User ID
     * @return ResponseEntity<Void>
     */
    @Modifying
    @Transactional
    @DeleteMapping("/user/{userId}/clear")
    public ResponseEntity<Void> clearCart(@PathVariable Long userId) {
        try {
            cartService.clearCart(userId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error("Error clearing cart for user {}: {}", userId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get cart summary (total items and amount)
     * @param userId User ID
     * @return ResponseEntity<Cart>
     */
    @GetMapping("/user/{userId}/summary")
    public ResponseEntity<Cart> getCartSummary(@PathVariable Long userId) {
        try {
            Cart cart = cartService.getCartSummary(userId);
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            log.error("Error getting cart summary for user {}: {}", userId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}