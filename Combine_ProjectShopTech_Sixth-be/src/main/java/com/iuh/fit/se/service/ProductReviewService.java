package com.iuh.fit.se.service;

import com.iuh.fit.se.domain.dto.ProductReviewDTO;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductReviewService {
    ProductReviewDTO createReview(ProductReviewDTO reviewDTO);
    ProductReviewDTO updateReview(Long id, ProductReviewDTO reviewDTO);
    void deleteReview(Long id);
    ProductReviewDTO getReviewById(Long id);
    List<ProductReviewDTO> getAllReviews();
    List<ProductReviewDTO> getReviewsByProduct(Long productId);
    List<ProductReviewDTO> getReviewsByMinimumRating(int minRating);
    Double getAverageRatingByProduct(Long productId);
    
    // Advanced methods
    List<ProductReviewDTO> getRecentReviews(Pageable pageable);
    Long countReviewsByProduct(Long productId);
    List<Object[]> getTopRatedProducts(Pageable pageable);
    void detectAndPublish(Long reviewId, String  isToxic);
    
}
