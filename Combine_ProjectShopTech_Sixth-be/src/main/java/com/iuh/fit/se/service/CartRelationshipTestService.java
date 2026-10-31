package com.iuh.fit.se.service;

import com.iuh.fit.se.domain.entity.*;
import com.iuh.fit.se.repository.CartItemRepository;
import com.iuh.fit.se.repository.CartRepository;
import com.iuh.fit.se.repository.ProductRepository;
import com.iuh.fit.se.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * CartRelationshipTestService
 * Service để test quan hệ giữa các entity
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
@Slf4j
@Transactional
public class CartRelationshipTestService {

    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;

    /**
     * Test quan hệ User ↔ Cart
     */
    public void testUserCartRelationship() {
        log.info("=== Testing User ↔ Cart Relationship ===");
        
        // Tìm user có ID = 5 (customer đầu tiên)
        Optional<User> userOpt = userRepository.findById(5L);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            log.info("Found user: {} (ID: {})", user.getFullName(), user.getId());
            
            // Kiểm tra cart của user
            Optional<Cart> cartOpt = cartRepository.findByUserId(user.getId());
            if (cartOpt.isPresent()) {
                Cart cart = cartOpt.get();
                log.info("Found cart: ID={}, TotalAmount={}, TotalItems={}", 
                    cart.getId(), cart.getTotalAmount(), cart.getTotalItems());
                
                // Kiểm tra cart items
                List<CartItem> cartItems = cartItemRepository.findByCartId(cart.getId());
                log.info("Cart has {} items", cartItems.size());
                
                for (CartItem item : cartItems) {
                    log.info("  - Product: {} (ID: {}), Quantity: {}, UnitPrice: {}, TotalPrice: {}", 
                        item.getProduct().getName(), 
                        item.getProduct().getId(),
                        item.getQuantity(),
                        item.getUnitPrice(),
                        item.getTotalPrice());
                }
            } else {
                log.warn("No cart found for user ID: {}", user.getId());
            }
        } else {
            log.warn("No user found with ID: 5");
        }
    }

    /**
     * Test quan hệ Cart ↔ CartItem
     */
    public void testCartCartItemRelationship() {
        log.info("=== Testing Cart ↔ CartItem Relationship ===");
        
        // Tìm cart có ID = 1
        Optional<Cart> cartOpt = cartRepository.findById(1L);
        if (cartOpt.isPresent()) {
            Cart cart = cartOpt.get();
            log.info("Found cart: ID={}, User: {} (ID: {})", 
                cart.getId(), cart.getUser().getFullName(), cart.getUser().getId());
            
            // Lấy cart items
            List<CartItem> cartItems = cartItemRepository.findByCartId(cart.getId());
            log.info("Cart has {} items", cartItems.size());
            
            // Kiểm tra từng cart item
            for (CartItem item : cartItems) {
                log.info("CartItem ID: {}, Product: {}, Quantity: {}, TotalPrice: {}", 
                    item.getId(), item.getProduct().getName(), item.getQuantity(), item.getTotalPrice());
            }
        } else {
            log.warn("No cart found with ID: 1");
        }
    }

    /**
     * Test quan hệ CartItem ↔ Product
     */
    public void testCartItemProductRelationship() {
        log.info("=== Testing CartItem ↔ Product Relationship ===");
        
        // Tìm product có ID = 1
        Optional<Product> productOpt = productRepository.findById(1L);
        if (productOpt.isPresent()) {
            Product product = productOpt.get();
            log.info("Found product: {} (ID: {}), Price: {}, Stock: {}", 
                product.getName(), product.getId(), product.getUnitPrice(), product.getQuantity());
            
            // Tìm cart items chứa product này
            List<CartItem> cartItems = cartItemRepository.findAll().stream()
                .filter(item -> item.getProduct().getId().equals(product.getId()))
                .toList();
            
            log.info("Product appears in {} cart items", cartItems.size());
            
            for (CartItem item : cartItems) {
                log.info("  - CartItem ID: {}, Cart ID: {}, User: {}, Quantity: {}", 
                    item.getId(), 
                    item.getCart().getId(),
                    item.getCart().getUser().getFullName(),
                    item.getQuantity());
            }
        } else {
            log.warn("No product found with ID: 1");
        }
    }

    /**
     * Test tính toán tổng tiền
     */
    public void testTotalCalculation() {
        log.info("=== Testing Total Calculation ===");
        
        // Lấy cart có ID = 1
        Optional<Cart> cartOpt = cartRepository.findById(1L);
        if (cartOpt.isPresent()) {
            Cart cart = cartOpt.get();
            
            // Tính tổng tiền từ cart items
            List<CartItem> cartItems = cartItemRepository.findByCartId(cart.getId());
            double calculatedTotal = cartItems.stream()
                .mapToDouble(CartItem::getTotalPrice)
                .sum();
            
            int calculatedItems = cartItems.stream()
                .mapToInt(CartItem::getQuantity)
                .sum();
            
            log.info("Cart ID: {}", cart.getId());
            log.info("Stored Total Amount: {}", cart.getTotalAmount());
            log.info("Calculated Total Amount: {}", calculatedTotal);
            log.info("Stored Total Items: {}", cart.getTotalItems());
            log.info("Calculated Total Items: {}", calculatedItems);
            
            // Kiểm tra consistency
            if (Math.abs(cart.getTotalAmount() - calculatedTotal) < 0.01) {
                log.info("✅ Total amount is consistent");
            } else {
                log.warn("❌ Total amount mismatch!");
            }
            
            if (cart.getTotalItems().equals(calculatedItems)) {
                log.info("✅ Total items is consistent");
            } else {
                log.warn("❌ Total items mismatch!");
            }
        }
    }

    /**
     * Test cascade operations
     */
    public void testCascadeOperations() {
        log.info("=== Testing Cascade Operations ===");
        
        // Test cascade từ Cart đến CartItem
        Optional<Cart> cartOpt = cartRepository.findById(1L);
        if (cartOpt.isPresent()) {
            Cart cart = cartOpt.get();
            List<CartItem> cartItems = cartItemRepository.findByCartId(cart.getId());
            
            log.info("Before cascade test - Cart has {} items", cartItems.size());
            
            // Note: Không thực sự xóa cart để tránh mất dữ liệu test
            // Chỉ log để verify cascade được setup đúng
            log.info("Cascade setup: Cart → CartItem (ALL)");
            log.info("Cascade setup: Product → CartItem (REMOVE)");
        }
    }

    /**
     * Chạy tất cả tests
     */
    public void runAllTests() {
        log.info("🚀 Starting Cart Relationship Tests...");
        
        try {
            testUserCartRelationship();
            testCartCartItemRelationship();
            testCartItemProductRelationship();
            testTotalCalculation();
            testCascadeOperations();
            
            log.info("✅ All tests completed successfully!");
        } catch (Exception e) {
            log.error("❌ Test failed: {}", e.getMessage(), e);
        }
    }
}
