package com.iuh.fit.se.controller;

import com.iuh.fit.se.domain.dto.UserFavoriteDTO;
import com.iuh.fit.se.service.UserFavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * UserFavoriteController
 * <p>
 * REST API controller for UserFavorite operations
 * <p>
 * Version 1.0
 * Date: 23/01/2025
 */
@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserFavoriteController {
    
    private final UserFavoriteService userFavoriteService;
    
    /**
     * Add a product to user's favorites
     * POST /api/favorites/add
     */
    @PostMapping("/add")
    public ResponseEntity<UserFavoriteDTO> addFavorite(
            @RequestParam Long userId,
            @RequestParam Long productId) {
        try {
            UserFavoriteDTO favorite = userFavoriteService.addFavorite(userId, productId);
            return new ResponseEntity<>(favorite, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    /**
     * Remove a product from user's favorites
     * DELETE /api/favorites/remove
     */
    @DeleteMapping("/remove")
    public ResponseEntity<Void> removeFavorite(
            @RequestParam Long userId,
            @RequestParam Long productId) {
        try {
            userFavoriteService.removeFavorite(userId, productId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Remove favorite by ID
     * DELETE /api/favorites/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeFavoriteById(@PathVariable Long id) {
        try {
            userFavoriteService.removeFavoriteById(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Get favorite by ID
     * GET /api/favorites/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserFavoriteDTO> getFavoriteById(@PathVariable Long id) {
        try {
            UserFavoriteDTO favorite = userFavoriteService.getFavoriteById(id);
            return ResponseEntity.ok(favorite);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Get all favorites
     * GET /api/favorites
     */
    @GetMapping
    public ResponseEntity<List<UserFavoriteDTO>> getAllFavorites() {
        List<UserFavoriteDTO> favorites = userFavoriteService.getAllFavorites();
        return ResponseEntity.ok(favorites);
    }
    
    /**
     * Get all favorites by user
     * GET /api/favorites/user/{userId}
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserFavoriteDTO>> getFavoritesByUser(@PathVariable Long userId) {
        List<UserFavoriteDTO> favorites = userFavoriteService.getFavoritesByUser(userId);
        return ResponseEntity.ok(favorites);
    }
    
    /**
     * Get all favorites by user with pagination
     * GET /api/favorites/user/{userId}/page?page=0&size=10
     */
    @GetMapping("/user/{userId}/page")
    public ResponseEntity<Page<UserFavoriteDTO>> getFavoritesByUserWithPagination(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<UserFavoriteDTO> favorites = userFavoriteService.getFavoritesByUser(
                userId, PageRequest.of(page, size));
        return ResponseEntity.ok(favorites);
    }
    
    /**
     * Check if product is favorited by user
     * GET /api/favorites/check?userId=1&productId=2
     */
    @GetMapping("/check")
    public ResponseEntity<Boolean> isProductFavorited(
            @RequestParam Long userId,
            @RequestParam Long productId) {
        boolean isFavorited = userFavoriteService.isProductFavoritedByUser(userId, productId);
        return ResponseEntity.ok(isFavorited);
    }
    
    /**
     * Get count of favorites by user
     * GET /api/favorites/user/{userId}/count
     */
    @GetMapping("/user/{userId}/count")
    public ResponseEntity<Long> countFavoritesByUser(@PathVariable Long userId) {
        Long count = userFavoriteService.countFavoritesByUser(userId);
        return ResponseEntity.ok(count);
    }
    
    /**
     * Get all favorites by product
     * GET /api/favorites/product/{productId}
     */
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<UserFavoriteDTO>> getFavoritesByProduct(@PathVariable Long productId) {
        List<UserFavoriteDTO> favorites = userFavoriteService.getFavoritesByProduct(productId);
        return ResponseEntity.ok(favorites);
    }
    
    /**
     * Get count of favorites by product
     * GET /api/favorites/product/{productId}/count
     */
    @GetMapping("/product/{productId}/count")
    public ResponseEntity<Long> countFavoritesByProduct(@PathVariable Long productId) {
        Long count = userFavoriteService.countFavoritesByProduct(productId);
        return ResponseEntity.ok(count);
    }
    
    /**
     * Get recent favorites by user
     * GET /api/favorites/user/{userId}/recent?limit=5
     */
    @GetMapping("/user/{userId}/recent")
    public ResponseEntity<List<UserFavoriteDTO>> getRecentFavoritesByUser(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "10") int limit) {
        List<UserFavoriteDTO> favorites = userFavoriteService.getRecentFavoritesByUser(
                userId, PageRequest.of(0, limit));
        return ResponseEntity.ok(favorites);
    }
    
    /**
     * Get most favorited products
     * GET /api/favorites/most-favorited?limit=10
     */
    @GetMapping("/most-favorited")
    public ResponseEntity<List<Object[]>> getMostFavoritedProducts(
            @RequestParam(defaultValue = "10") int limit) {
        List<Object[]> products = userFavoriteService.getMostFavoritedProducts(
                PageRequest.of(0, limit));
        return ResponseEntity.ok(products);
    }
}

