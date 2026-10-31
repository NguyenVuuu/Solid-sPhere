package com.iuh.fit.se.service;

import com.iuh.fit.se.domain.dto.UserFavoriteDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * UserFavoriteService
 * <p>
 * Service interface for UserFavorite operations
 * <p>
 * Version 1.0
 * Date: 23/01/2025
 */
public interface UserFavoriteService {
    
    // Basic CRUD operations
    UserFavoriteDTO addFavorite(Long userId, Long productId);
    void removeFavorite(Long userId, Long productId);
    void removeFavoriteById(Long favoriteId);
    UserFavoriteDTO getFavoriteById(Long favoriteId);
    List<UserFavoriteDTO> getAllFavorites();
    
    // User-specific operations
    List<UserFavoriteDTO> getFavoritesByUser(Long userId);
    Page<UserFavoriteDTO> getFavoritesByUser(Long userId, Pageable pageable);
    boolean isProductFavoritedByUser(Long userId, Long productId);
    Long countFavoritesByUser(Long userId);
    
    // Product-specific operations
    List<UserFavoriteDTO> getFavoritesByProduct(Long productId);
    Long countFavoritesByProduct(Long productId);
    
    // Utility operations
    List<UserFavoriteDTO> getRecentFavoritesByUser(Long userId, Pageable pageable);
    List<Object[]> getMostFavoritedProducts(Pageable pageable);
}

