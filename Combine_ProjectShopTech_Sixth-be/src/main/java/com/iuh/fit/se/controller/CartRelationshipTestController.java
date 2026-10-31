package com.iuh.fit.se.controller;

import com.iuh.fit.se.service.CartRelationshipTestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * CartRelationshipTestController
 * Controller để test quan hệ giữa các entity
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
@RequestMapping("/api/test/cart-relationships")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class CartRelationshipTestController {

    private final CartRelationshipTestService testService;

    /**
     * Test quan hệ User ↔ Cart
     */
    @GetMapping("/user-cart")
    public ResponseEntity<String> testUserCartRelationship() {
        try {
            testService.testUserCartRelationship();
            return ResponseEntity.ok("User ↔ Cart relationship test completed. Check logs for details.");
        } catch (Exception e) {
            log.error("Error testing User ↔ Cart relationship: {}", e.getMessage());
            return ResponseEntity.internalServerError().body("Test failed: " + e.getMessage());
        }
    }

    /**
     * Test quan hệ Cart ↔ CartItem
     */
    @GetMapping("/cart-cartitem")
    public ResponseEntity<String> testCartCartItemRelationship() {
        try {
            testService.testCartCartItemRelationship();
            return ResponseEntity.ok("Cart ↔ CartItem relationship test completed. Check logs for details.");
        } catch (Exception e) {
            log.error("Error testing Cart ↔ CartItem relationship: {}", e.getMessage());
            return ResponseEntity.internalServerError().body("Test failed: " + e.getMessage());
        }
    }

    /**
     * Test quan hệ CartItem ↔ Product
     */
    @GetMapping("/cartitem-product")
    public ResponseEntity<String> testCartItemProductRelationship() {
        try {
            testService.testCartItemProductRelationship();
            return ResponseEntity.ok("CartItem ↔ Product relationship test completed. Check logs for details.");
        } catch (Exception e) {
            log.error("Error testing CartItem ↔ Product relationship: {}", e.getMessage());
            return ResponseEntity.internalServerError().body("Test failed: " + e.getMessage());
        }
    }

    /**
     * Test tính toán tổng tiền
     */
    @GetMapping("/total-calculation")
    public ResponseEntity<String> testTotalCalculation() {
        try {
            testService.testTotalCalculation();
            return ResponseEntity.ok("Total calculation test completed. Check logs for details.");
        } catch (Exception e) {
            log.error("Error testing total calculation: {}", e.getMessage());
            return ResponseEntity.internalServerError().body("Test failed: " + e.getMessage());
        }
    }

    /**
     * Test cascade operations
     */
    @GetMapping("/cascade")
    public ResponseEntity<String> testCascadeOperations() {
        try {
            testService.testCascadeOperations();
            return ResponseEntity.ok("Cascade operations test completed. Check logs for details.");
        } catch (Exception e) {
            log.error("Error testing cascade operations: {}", e.getMessage());
            return ResponseEntity.internalServerError().body("Test failed: " + e.getMessage());
        }
    }

    /**
     * Chạy tất cả tests
     */
    @GetMapping("/all")
    public ResponseEntity<String> runAllTests() {
        try {
            testService.runAllTests();
            return ResponseEntity.ok("All relationship tests completed. Check logs for details.");
        } catch (Exception e) {
            log.error("Error running all tests: {}", e.getMessage());
            return ResponseEntity.internalServerError().body("Tests failed: " + e.getMessage());
        }
    }
}
