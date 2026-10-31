package com.iuh.fit.se.repository;

import com.iuh.fit.se.domain.entity.UserFavorite;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * UserFavoriteRepository
 * <p>
 * Repository for UserFavorite entity with custom queries
 * <p>
 * Version 1.0
 * Date: 23/01/2025
 */
@Repository
public interface UserFavoriteRepository extends JpaRepository<UserFavorite, Long> {
    
    // Find all favorites by user
    List<UserFavorite> findByUserId(Long userId);
    
    // Find all favorites by user with pagination
    Page<UserFavorite> findByUserId(Long userId, Pageable pageable);
    
    // Find all favorites by product
    List<UserFavorite> findByProductId(Long productId);
    
    // Check if a specific product is favorited by a specific user
    @Query("SELECT uf FROM UserFavorite uf WHERE uf.user.id = :userId AND uf.product.id = :productId")
    Optional<UserFavorite> findByUserIdAndProductId(@Param("userId") Long userId, @Param("productId") Long productId);
    
    // Check if favorite exists
    boolean existsByUserIdAndProductId(Long userId, Long productId);
    
    // Count favorites by user
    @Query("SELECT COUNT(uf) FROM UserFavorite uf WHERE uf.user.id = :userId")
    Long countByUserId(@Param("userId") Long userId);
    
    // Count favorites by product
    @Query("SELECT COUNT(uf) FROM UserFavorite uf WHERE uf.product.id = :productId")
    Long countByProductId(@Param("productId") Long productId);
    
    // Find recent favorites by user
    @Query("SELECT uf FROM UserFavorite uf WHERE uf.user.id = :userId ORDER BY uf.addedAt DESC")
    List<UserFavorite> findRecentFavoritesByUser(@Param("userId") Long userId, Pageable pageable);
    
    // Find most favorited products
    @Query("SELECT uf.product.id, COUNT(uf) as favoriteCount " +
           "FROM UserFavorite uf " +
           "GROUP BY uf.product.id " +
           "ORDER BY favoriteCount DESC")
    List<Object[]> findMostFavoritedProducts(Pageable pageable);
}

