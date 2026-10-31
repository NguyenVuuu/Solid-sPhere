package com.iuh.fit.se.controller;

import com.iuh.fit.se.domain.entity.CartItem;
import com.iuh.fit.se.service.CartItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * CartItemController
 * <p>
 * REST API controller for CartItem operations
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
@RequestMapping("/api/cart-items")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class CartItemController {

    private final CartItemService cartItemService;

    /**
     * Get all cart items
     * @return ResponseEntity<List<CartItem>>
     */
    @GetMapping
    public ResponseEntity<List<CartItem>> getAllCartItems() {
        try {
            List<CartItem> cartItems = cartItemService.findAll();
            return ResponseEntity.ok(cartItems);
        } catch (Exception e) {
            log.error("Error getting all cart items: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get cart item by ID
     * @param id CartItem ID
     * @return ResponseEntity<CartItem>
     */
    @GetMapping("/{id}")
    public ResponseEntity<CartItem> getCartItemById(@PathVariable Long id) {
        try {
            Optional<CartItem> cartItem = cartItemService.findById(id);
            return cartItem.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            log.error("Error getting cart item with id {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get cart items by cart ID
     * @param cartId Cart ID
     * @return ResponseEntity<List<CartItem>>
     */
    @GetMapping("/cart/{cartId}")
    public ResponseEntity<List<CartItem>> getCartItemsByCartId(@PathVariable Long cartId) {
        try {
            List<CartItem> cartItems = cartItemService.findByCartId(cartId);
            return ResponseEntity.ok(cartItems);
        } catch (Exception e) {
            log.error("Error getting cart items for cart {}: {}", cartId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Create cart item
     * @param cartItem CartItem to create
     * @return ResponseEntity<CartItem>
     */
    @PostMapping
    public ResponseEntity<CartItem> createCartItem(@RequestBody CartItem cartItem) {
        try {
            CartItem savedCartItem = cartItemService.save(cartItem);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCartItem);
        } catch (Exception e) {
            log.error("Error creating cart item: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Update cart item
     * @param id CartItem ID
     * @param cartItem CartItem to update
     * @return ResponseEntity<CartItem>
     */
    @PutMapping("/{id}")
    public ResponseEntity<CartItem> updateCartItem(@PathVariable Long id, @RequestBody CartItem cartItem) {
        try {
            cartItem.setId(id);
            CartItem updatedCartItem = cartItemService.update(cartItem);
            return ResponseEntity.ok(updatedCartItem);
        } catch (Exception e) {
            log.error("Error updating cart item with id {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Delete cart item by ID
     * @param id CartItem ID
     * @return ResponseEntity<Void>
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable Long id) {
        try {
            cartItemService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error("Error deleting cart item with id {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Delete cart items by cart ID
     * @param cartId Cart ID
     * @return ResponseEntity<Void>
     */
    @DeleteMapping("/cart/{cartId}")
    public ResponseEntity<Void> deleteCartItemsByCartId(@PathVariable Long cartId) {
        try {
            cartItemService.deleteByCartId(cartId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error("Error deleting cart items for cart {}: {}", cartId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Delete cart item by cart ID and product ID
     * @param cartId Cart ID
     * @param productId Product ID
     * @return ResponseEntity<Void>
     */
    @DeleteMapping("/cart/{cartId}/product/{productId}")
    public ResponseEntity<Void> deleteCartItemByCartAndProduct(
            @PathVariable Long cartId,
            @PathVariable Long productId) {
        try {
            cartItemService.deleteByCartIdAndProductId(cartId, productId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error("Error deleting cart item for cart {} and product {}: {}", cartId, productId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Count cart items by cart ID
     * @param cartId Cart ID
     * @return ResponseEntity<Long>
     */
    @GetMapping("/cart/{cartId}/count")
    public ResponseEntity<Long> countCartItemsByCartId(@PathVariable Long cartId) {
        try {
            Long count = cartItemService.countByCartId(cartId);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            log.error("Error counting cart items for cart {}: {}", cartId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Calculate total amount by cart ID
     * @param cartId Cart ID
     * @return ResponseEntity<Double>
     */
    @GetMapping("/cart/{cartId}/total")
    public ResponseEntity<Double> calculateTotalAmountByCartId(@PathVariable Long cartId) {
        try {
            Double totalAmount = cartItemService.calculateTotalAmountByCartId(cartId);
            return ResponseEntity.ok(totalAmount);
        } catch (Exception e) {
            log.error("Error calculating total amount for cart {}: {}", cartId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}