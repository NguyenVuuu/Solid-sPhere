package com.iuh.fit.se.service.impl;

import com.iuh.fit.se.domain.dto.ProductReviewDTO;
import com.iuh.fit.se.domain.entity.Product;
import com.iuh.fit.se.domain.entity.ProductReview;
import com.iuh.fit.se.domain.entity.User;
import com.iuh.fit.se.repository.ProductRepository;
import com.iuh.fit.se.repository.ProductReviewRepository;
import com.iuh.fit.se.repository.UserRepository;
import com.iuh.fit.se.service.ModerationService;
import com.iuh.fit.se.service.ProductReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductReviewServiceImpl implements ProductReviewService {
    
    private final ProductReviewRepository productReviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final RabbitTemplate rabbitTemplate;
    private final ModerationService moderationService;


    @Value("${rabbitmq.exchange}")
    private String exchange;

    @Value("${rabbitmq.routing-key}")
    private String routingKey;

    @Override
    public ProductReviewDTO createReview(ProductReviewDTO reviewDTO) {
        // Kiểm tra nội dung vi phạm
        ModerationService.ModerationResult modResult = moderationService.moderate(reviewDTO.getComment());
        
        if (modResult.violate()) {
            // Trả về DTO với thông tin vi phạm, không lưu vào DB
            ProductReviewDTO responseDTO = new ProductReviewDTO();
            responseDTO.setViolate(true);
            responseDTO.setViolationReason(modResult.reason());
            return responseDTO;
        }
        
        // Nếu không vi phạm, lưu vào DB
        // Lưu ý: comment là bình luận của khách, reply chỉ admin mới có thể tạo
        ProductReview review = convertToEntity(reviewDTO);
        review.setReply(null); // Khách hàng không thể tạo reply khi tạo review
        review.setCreatedAt(LocalDateTime.now());
        ProductReview savedReview = productReviewRepository.save(review);
        ProductReviewDTO result = convertToDTO(savedReview);
        result.setViolate(false);
        return result;
    }

    @Override
    public ProductReviewDTO updateReview(Long id, ProductReviewDTO reviewDTO) {
        ProductReview review = productReviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found with id: " + id));
        
        review.setRating(reviewDTO.getRating());
        review.setComment(reviewDTO.getComment());
        review.setReply(reviewDTO.getReply());
        
        if (reviewDTO.getProductId() != null) {
            Product product = productRepository.findById(reviewDTO.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            review.setProduct(product);
        }
        
        ProductReview updatedReview = productReviewRepository.save(review);
        return convertToDTO(updatedReview);
    }

    @Override
    public void detectAndPublish(Long reviewId, String  isToxic) {
        Optional<ProductReview> optionalReview = productReviewRepository.findById(reviewId);

        if (optionalReview.isPresent()) {
            ProductReview review = optionalReview.get();

            System.out.println("Review id " + review.getId());

            // ⚙️ 1. Cập nhật tạm trường isToxic (để đánh dấu trạng thái chờ xử lý)
            review.setIsToxic(isToxic);

            // ⚙️ 2. Chuẩn bị message gửi sang RabbitMQ
            Map<String, Object> message = new HashMap<>();
            message.put("reviewId", review.getId());
            message.put("content", review.getComment());
            message.put("isToxic", isToxic);

            // ⚙️ 3. Gửi message đến Exchange
            rabbitTemplate.convertAndSend(exchange, routingKey, message);

            System.out.println("[Publisher] Sent review to toxic detect queue: " + review.getId());
        } else {
            System.err.println("[Publisher] Review ID " + reviewId + " not found!");
        }
    }


    @Override
    public void deleteReview(Long id) {
        productReviewRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public ProductReviewDTO getReviewById(Long id) {
        ProductReview review = productReviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found with id: " + id));
        return convertToDTO(review);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductReviewDTO> getAllReviews() {
        return productReviewRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductReviewDTO> getReviewsByProduct(Long productId) {
        return productReviewRepository.findByProductId(productId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductReviewDTO> getReviewsByMinimumRating(int minRating) {
        return productReviewRepository.findByMinimumRating(minRating).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Double getAverageRatingByProduct(Long productId) {
        Double avg = productReviewRepository.getAverageRatingByProduct(productId);
        return avg != null ? avg : 0.0;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductReviewDTO> getRecentReviews(org.springframework.data.domain.Pageable pageable) {
        return productReviewRepository.findRecentReviews(pageable).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Long countReviewsByProduct(Long productId) {
        return productReviewRepository.countByProductId(productId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Object[]> getTopRatedProducts(org.springframework.data.domain.Pageable pageable) {
        return productReviewRepository.findTopRatedProducts(4.0, pageable);
    }

    private ProductReviewDTO convertToDTO(ProductReview review) {
        ProductReviewDTO dto = new ProductReviewDTO();
        dto.setId(review.getId());
        dto.setRating(review.getRating());
        dto.setComment(review.getComment());
        dto.setReply(review.getReply());
        dto.setCreatedAt(review.getCreatedAt());
        
        if (review.getProduct() != null) {
            dto.setProductId(review.getProduct().getId());
        }
        if (review.getUser() != null) {
            dto.setUserId(review.getUser().getId());
            dto.setUserFullName(review.getUser().getFullName());
        }
        return dto;
    }

    private ProductReview convertToEntity(ProductReviewDTO dto) {
        ProductReview review = new ProductReview();
        review.setRating(dto.getRating());
        review.setComment(dto.getComment());
        review.setReply(dto.getReply());
        
        if (dto.getProductId() != null) {
            Product product = productRepository.findById(dto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            review.setProduct(product);
        }
        if (dto.getUserId() != null) {
            User user =     userRepository.findById(dto.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            review.setUser(user);
        }
        return review;
    }
}
