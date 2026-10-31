package com.iuh.fit.se.controller;

import com.iuh.fit.se.domain.dto.ProductReviewDTO;
import com.iuh.fit.se.service.ProductReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProductReviewController {
    
    private final ProductReviewService productReviewService;

    @PostMapping
    public ResponseEntity<ProductReviewDTO> createReview(@RequestBody ProductReviewDTO reviewDTO) {
        ProductReviewDTO createdReview = productReviewService.createReview(reviewDTO);
        return new ResponseEntity<>(createdReview, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductReviewDTO> updateReview(@PathVariable Long id, @RequestBody ProductReviewDTO reviewDTO) {
        ProductReviewDTO updatedReview = productReviewService.updateReview(id, reviewDTO);
        return ResponseEntity.ok(updatedReview);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        productReviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductReviewDTO> getReviewById(@PathVariable Long id) {
        ProductReviewDTO review = productReviewService.getReviewById(id);
        return ResponseEntity.ok(review);
    }

    @GetMapping
    public ResponseEntity<List<ProductReviewDTO>> getAllReviews() {
        List<ProductReviewDTO> reviews = productReviewService.getAllReviews();
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ProductReviewDTO>> getReviewsByProduct(@PathVariable Long productId) {
        List<ProductReviewDTO> reviews = productReviewService.getReviewsByProduct(productId);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/rating")
    public ResponseEntity<List<ProductReviewDTO>> getReviewsByMinimumRating(@RequestParam int minRating) {
        List<ProductReviewDTO> reviews = productReviewService.getReviewsByMinimumRating(minRating);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/product/{productId}/average-rating")
    public ResponseEntity<Double> getAverageRatingByProduct(@PathVariable Long productId) {
        Double averageRating = productReviewService.getAverageRatingByProduct(productId);
        return ResponseEntity.ok(averageRating);
    }

    @GetMapping("/recent")
    public ResponseEntity<List<ProductReviewDTO>> getRecentReviews(@RequestParam(defaultValue = "20") int limit) {
        List<ProductReviewDTO> reviews = productReviewService.getRecentReviews(
                org.springframework.data.domain.PageRequest.of(0, limit)
        );
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/product/{productId}/count")
    public ResponseEntity<Long> countReviewsByProduct(@PathVariable Long productId) {
        Long count = productReviewService.countReviewsByProduct(productId);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/top-rated-products")
    public ResponseEntity<List<Object[]>> getTopRatedProducts(@RequestParam(defaultValue = "10") int limit) {
        List<Object[]> topRated = productReviewService.getTopRatedProducts(
                org.springframework.data.domain.PageRequest.of(0, limit)
        );
        return ResponseEntity.ok(topRated);
    }
}
