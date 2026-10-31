package com.iuh.fit.se.service.impl;

import com.iuh.fit.se.domain.dto.UserFavoriteDTO;
import com.iuh.fit.se.domain.entity.Product;
import com.iuh.fit.se.domain.entity.User;
import com.iuh.fit.se.domain.entity.UserFavorite;
import com.iuh.fit.se.repository.ProductRepository;
import com.iuh.fit.se.repository.UserFavoriteRepository;
import com.iuh.fit.se.repository.UserRepository;
import com.iuh.fit.se.service.UserFavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * UserFavoriteServiceImpl
 * <p>
 * Service implementation for UserFavorite operations
 * <p>
 * Version 1.0
 * Date: 23/01/2025
 */
@Service
@RequiredArgsConstructor
@Transactional
public class UserFavoriteServiceImpl implements UserFavoriteService {
    
    private final UserFavoriteRepository userFavoriteRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    
    @Override
    public UserFavoriteDTO addFavorite(Long userId, Long productId) {
        // Check if already favorited
        if (userFavoriteRepository.existsByUserIdAndProductId(userId, productId)) {
            throw new RuntimeException("Product already in favorites");
        }
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));
        
        UserFavorite favorite = new UserFavorite();
        favorite.setUser(user);
        favorite.setProduct(product);
        favorite.setAddedAt(LocalDateTime.now());
        
        UserFavorite savedFavorite = userFavoriteRepository.save(favorite);
        return convertToDTO(savedFavorite);
    }
    
    @Override
    public void removeFavorite(Long userId, Long productId) {
        UserFavorite favorite = userFavoriteRepository
                .findByUserIdAndProductId(userId, productId)
                .orElseThrow(() -> new RuntimeException("Favorite not found"));
        
        userFavoriteRepository.delete(favorite);
    }
    
    @Override
    public void removeFavoriteById(Long favoriteId) {
        if (!userFavoriteRepository.existsById(favoriteId)) {
            throw new RuntimeException("Favorite not found with id: " + favoriteId);
        }
        userFavoriteRepository.deleteById(favoriteId);
    }
    
    @Override
    @Transactional(readOnly = true)
    public UserFavoriteDTO getFavoriteById(Long favoriteId) {
        UserFavorite favorite = userFavoriteRepository.findById(favoriteId)
                .orElseThrow(() -> new RuntimeException("Favorite not found with id: " + favoriteId));
        return convertToDTO(favorite);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<UserFavoriteDTO> getAllFavorites() {
        return userFavoriteRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<UserFavoriteDTO> getFavoritesByUser(Long userId) {
        return userFavoriteRepository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<UserFavoriteDTO> getFavoritesByUser(Long userId, Pageable pageable) {
        Page<UserFavorite> favoritesPage = userFavoriteRepository.findByUserId(userId, pageable);
        return favoritesPage.map(this::convertToDTO);
    }
    
    @Override
    @Transactional(readOnly = true)
    public boolean isProductFavoritedByUser(Long userId, Long productId) {
        return userFavoriteRepository.existsByUserIdAndProductId(userId, productId);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Long countFavoritesByUser(Long userId) {
        return userFavoriteRepository.countByUserId(userId);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<UserFavoriteDTO> getFavoritesByProduct(Long productId) {
        return userFavoriteRepository.findByProductId(productId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    @Transactional(readOnly = true)
    public Long countFavoritesByProduct(Long productId) {
        return userFavoriteRepository.countByProductId(productId);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<UserFavoriteDTO> getRecentFavoritesByUser(Long userId, Pageable pageable) {
        return userFavoriteRepository.findRecentFavoritesByUser(userId, pageable).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Object[]> getMostFavoritedProducts(Pageable pageable) {
        return userFavoriteRepository.findMostFavoritedProducts(pageable);
    }
    
    // Convert Entity to DTO
    private UserFavoriteDTO convertToDTO(UserFavorite favorite) {
        UserFavoriteDTO dto = new UserFavoriteDTO();
        dto.setId(favorite.getId());
        dto.setAddedAt(favorite.getAddedAt());
        
        if (favorite.getUser() != null) {
            dto.setUserId(favorite.getUser().getId());
            dto.setUserFullName(favorite.getUser().getFullName());
        }
        
        if (favorite.getProduct() != null) {
            dto.setProductId(favorite.getProduct().getId());
            dto.setProductName(favorite.getProduct().getName());
            dto.setProductDescription(favorite.getProduct().getDescription());
            dto.setProductImageUrl(favorite.getProduct().getImageUrl());
            dto.setProductPrice(favorite.getProduct().getUnitPrice());
            
            if (favorite.getProduct().getCategory() != null) {
                dto.setProductCategoryName(favorite.getProduct().getCategory().getName());
            }
        }
        
        return dto;
    }
}

