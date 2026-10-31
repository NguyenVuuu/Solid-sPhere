package com.iuh.fit.se.repository;

import com.iuh.fit.se.domain.entity.ProductReview;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ProductReviewRepository extends JpaRepository<ProductReview, Long> {
    List<ProductReview> findByProductId(Long productId);
    Page<ProductReview> findByProductId(Long productId, Pageable pageable);
    
    List<ProductReview> findByRating(int rating);
    
    @Query("SELECT pr FROM ProductReview pr WHERE pr.rating >= ?1")
    List<ProductReview> findByMinimumRating(int minRating);
    
    @Query("SELECT pr FROM ProductReview pr WHERE pr.rating >= :minRating ORDER BY pr.createdAt DESC")
    Page<ProductReview> findByMinimumRating(@Param("minRating") int minRating, Pageable pageable);
    
    @Query("SELECT AVG(pr.rating) FROM ProductReview pr WHERE pr.product.id = ?1")
    Double getAverageRatingByProduct(Long productId);
    
    // Count reviews by product
    @Query("SELECT COUNT(pr) FROM ProductReview pr WHERE pr.product.id = :productId")
    Long countByProductId(@Param("productId") Long productId);
    
    // Count reviews by rating
    @Query("SELECT COUNT(pr) FROM ProductReview pr WHERE pr.product.id = :productId AND pr.rating = :rating")
    Long countByProductIdAndRating(@Param("productId") Long productId, @Param("rating") int rating);
    
    // Find recent reviews
    @Query("SELECT pr FROM ProductReview pr ORDER BY pr.createdAt DESC")
    List<ProductReview> findRecentReviews(Pageable pageable);
    
    // Find reviews by date range
    @Query("SELECT pr FROM ProductReview pr WHERE pr.createdAt BETWEEN :startDate AND :endDate ORDER BY pr.createdAt DESC")
    List<ProductReview> findByDateRange(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
    
    // Find top rated products
    @Query("SELECT p.id, p.name, AVG(pr.rating) as avgRating, COUNT(pr.id) as reviewCount " +
           "FROM Product p LEFT JOIN ProductReview pr ON p.id = pr.product.id " +
           "GROUP BY p.id, p.name " +
           "HAVING AVG(pr.rating) >= :minRating " +
           "ORDER BY avgRating DESC, reviewCount DESC")
    List<Object[]> findTopRatedProducts(@Param("minRating") Double minRating, Pageable pageable);
    
    // Find reviews with comments
    @Query("SELECT pr FROM ProductReview pr WHERE pr.comment IS NOT NULL AND pr.comment != ''")
    List<ProductReview> findReviewsWithComments();
    
    @Query("SELECT pr FROM ProductReview pr WHERE pr.comment IS NOT NULL AND pr.comment != ''")
    Page<ProductReview> findReviewsWithComments(Pageable pageable);
    
   
    
    // Search reviews by comment
    @Query("SELECT pr FROM ProductReview pr WHERE pr.comment LIKE %:keyword%")
    List<ProductReview> searchByComment(@Param("keyword") String keyword);
    
    // Get rating distribution for a product
    @Query("SELECT pr.rating, COUNT(pr) FROM ProductReview pr WHERE pr.product.id = :productId GROUP BY pr.rating")
    List<Object[]> getRatingDistribution(@Param("productId") Long productId);
}
