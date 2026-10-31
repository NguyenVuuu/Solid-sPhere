package com.iuh.fit.se.controller;

import com.iuh.fit.se.domain.dto.DiscountDTO;
import com.iuh.fit.se.repository.UserRepository;
import com.iuh.fit.se.service.DiscountService;
import com.iuh.fit.se.service.EmailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/discounts")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
public class DiscountController {
    
    private final DiscountService discountService;
    private final EmailService emailService;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<DiscountDTO> createDiscount(@Valid @RequestBody DiscountDTO discountDTO) {
        DiscountDTO createdDiscount = discountService.createDiscount(discountDTO);
        return new ResponseEntity<>(createdDiscount, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DiscountDTO> updateDiscount(@PathVariable Long id, @Valid @RequestBody DiscountDTO discountDTO) {
        DiscountDTO updatedDiscount = discountService.updateDiscount(id, discountDTO);
        return ResponseEntity.ok(updatedDiscount);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDiscount(@PathVariable Long id) {
        discountService.deleteDiscount(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DiscountDTO> getDiscountById(@PathVariable Long id) {
        DiscountDTO discount = discountService.getDiscountById(id);
        return ResponseEntity.ok(discount);
    }

    @GetMapping
    public ResponseEntity<List<DiscountDTO>> getAllDiscounts() {
        List<DiscountDTO> discounts = discountService.getAllDiscounts();
        return ResponseEntity.ok(discounts);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<DiscountDTO> getDiscountByProduct(@PathVariable Long productId) {
        DiscountDTO discount = discountService.getDiscountByProduct(productId);
        return ResponseEntity.ok(discount);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<DiscountDTO>> getDiscountsByStatus(@PathVariable Boolean status) {
        List<DiscountDTO> discounts = discountService.getDiscountsByStatus(status);
        return ResponseEntity.ok(discounts);
    }

    @GetMapping("/active")
    public ResponseEntity<List<DiscountDTO>> getActiveDiscounts(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<DiscountDTO> discounts = discountService.getActiveDiscounts(date);
        return ResponseEntity.ok(discounts);
    }

    @GetMapping("/expired")
    public ResponseEntity<List<DiscountDTO>> getExpiredDiscounts(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<DiscountDTO> discounts = discountService.getExpiredDiscounts(date);
        return ResponseEntity.ok(discounts);
    }

    @PatchMapping("/{discountId}/activate")
    public ResponseEntity<Void> activateDiscount(@PathVariable Long discountId) {
        discountService.activateDiscount(discountId);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{discountId}/deactivate")
    public ResponseEntity<Void> deactivateDiscount(@PathVariable Long discountId) {
        discountService.deactivateDiscount(discountId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<DiscountDTO>> getDiscountsByType(@PathVariable String type) {
        List<DiscountDTO> discounts = discountService.getDiscountsByType(type);
        return ResponseEntity.ok(discounts);
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<DiscountDTO>> getUpcomingDiscounts(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fromDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate toDate) {
        List<DiscountDTO> discounts = discountService.getUpcomingDiscounts(fromDate, toDate);
        return ResponseEntity.ok(discounts);
    }

    @GetMapping("/rate-range")
    public ResponseEntity<List<DiscountDTO>> getDiscountsByRateRange(
            @RequestParam Double minRate,
            @RequestParam Double maxRate) {
        List<DiscountDTO> discounts = discountService.getDiscountsByRateRange(minRate, maxRate);
        return ResponseEntity.ok(discounts);
    }

    @GetMapping("/best")
    public ResponseEntity<List<DiscountDTO>> getBestActiveDiscounts() {
        List<DiscountDTO> discounts = discountService.getBestActiveDiscounts();
        return ResponseEntity.ok(discounts);
    }

    @GetMapping("/count/active")
    public ResponseEntity<Long> countActiveDiscounts() {
        Long count = discountService.countActiveDiscounts();
        return ResponseEntity.ok(count);
    }

    @PostMapping("/deactivate-expired")
    public ResponseEntity<Integer> deactivateExpiredDiscounts() {
        int count = discountService.deactivateExpiredDiscounts();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<DiscountDTO>> getDiscountsByCategory(@PathVariable Long categoryId) {
        List<DiscountDTO> discounts = discountService.getDiscountsByCategory(categoryId);
        return ResponseEntity.ok(discounts);
    }

    @GetMapping("/search")
    public ResponseEntity<List<DiscountDTO>> searchDiscountsByKeyword(@RequestParam String keyword) {
        List<DiscountDTO> discounts = discountService.searchDiscountsByKeyword(keyword);
        return ResponseEntity.ok(discounts);
    }
    @GetMapping("/top10-products")
    public List<DiscountDTO> getTop10ProductsWithHighestDiscount() {
        return discountService.getTop10ProductsWithHighestDiscount();
    }

    @GetMapping("/top10-products/category/{category}")
    public ResponseEntity<List<DiscountDTO>> getTopProductDiscountsByCategory(@PathVariable String category) {
        List<DiscountDTO> discounts = discountService.getTopProductDiscountsByCategory(category);
        return ResponseEntity.ok(discounts);
    }


    
    @GetMapping("/exchange-point")
    public ResponseEntity<List<DiscountDTO>> getAllDiscountExchangePoint() {
        List<DiscountDTO>  discounts = discountService.getAllDiscountExchangePoint() ;
        return ResponseEntity.ok(discounts);
    }

    /**
     * Gửi mã khuyến mãi tri ân cho khách hàng qua email
     */
    @PostMapping("/{discountId}/send-email")
    public ResponseEntity<Map<String, Object>> sendDiscountEmail(
            @PathVariable Long discountId,
            @RequestBody Map<String, Object> request) {
        
        try {
            DiscountDTO discount = discountService.getDiscountById(discountId);
            
            String email = (String) request.get("email");
            if (email == null || email.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(Map.of(
                                "success", "false",
                                "message", "Email không được để trống"
                        ));
            }
            
            String customerName = (String) request.getOrDefault("customerName", "Quý khách");
            
            // Tạo mã khuyến mãi (có thể dùng ID hoặc tên discount)
            String discountCode = discount.getName() != null && !discount.getName().isEmpty() 
                ? discount.getName().toUpperCase().replaceAll("\\s+", "") 
                : "DISCOUNT" + discountId;
            
            emailService.sendDiscountCodeToCustomer(
                    email,
                    customerName,
                    discount.getName(),
                    discountCode,
                    discount.getDiscountRate(),
                    discount.getDescription(),
                    discount.getStartDate() != null ? discount.getStartDate().toString() : "",
                    discount.getEndDate() != null ? discount.getEndDate().toString() : ""
            );
            
            return ResponseEntity.ok(Map.of(
                    "success", "true",
                    "message", "Email đã được gửi thành công đến " + email
            ));
            
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of(
                            "success", "false",
                            "message", "Lỗi: " + e.getMessage()
                    ));
        } catch (IllegalStateException e) {
            log.error("Configuration error: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "success", "false",
                            "message", "Lỗi cấu hình email: " + e.getMessage() + ". Vui lòng kiểm tra cấu hình email trong application.yaml"
                    ));
        } catch (Exception e) {
            log.error("Error sending discount email: ", e);
            String errorMessage = e.getMessage();
            if (e.getCause() != null) {
                errorMessage += " (Chi tiết: " + e.getCause().getMessage() + ")";
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "success", "false",
                            "message", "Lỗi khi gửi email: " + errorMessage
                    ));
        }
    }
    
    /**
     * Gửi mã khuyến mãi cho nhiều khách hàng (bulk)
     */
    @PostMapping("/{discountId}/send-bulk-email")
    public ResponseEntity<Map<String, Object>> sendBulkDiscountEmail(
            @PathVariable Long discountId,
            @RequestBody Map<String, Object> request) {
        
        try {
            DiscountDTO discount = discountService.getDiscountById(discountId);
            
            Object emailsObj = request.get("emails");
            if (emailsObj == null) {
                return ResponseEntity.badRequest()
                        .body(Map.of(
                                "success", "false",
                                "message", "Danh sách email không được để trống"
                        ));
            }
            
            List<String> emails;
            try {
                @SuppressWarnings("unchecked")
                List<String> emailList = (List<String>) emailsObj;
                emails = emailList.stream()
                        .filter(email -> email != null && !email.trim().isEmpty())
                        .toList();
            } catch (ClassCastException e) {
                log.error("Invalid email format: {}", emailsObj.getClass().getName(), e);
                return ResponseEntity.badRequest()
                        .body(Map.of(
                                "success", "false",
                                "message", "Định dạng danh sách email không hợp lệ. Vui lòng gửi mảng các email."
                        ));
            }
            
            if (emails.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(Map.of(
                                "success", "false",
                                "message", "Danh sách email không được để trống"
                        ));
            }
            
            log.info("Sending bulk emails to {} customers for discount {}", emails.size(), discountId);
            
            // Tạo mã khuyến mãi
            String discountCode = discount.getName() != null && !discount.getName().isEmpty() 
                ? discount.getName().toUpperCase().replaceAll("\\s+", "") 
                : "DISCOUNT" + discountId;
            
            emailService.sendBulkDiscountCodes(
                    emails,
                    discount.getName(),
                    discountCode,
                    discount.getDiscountRate(),
                    discount.getDescription(),
                    discount.getStartDate() != null ? discount.getStartDate().toString() : "",
                    discount.getEndDate() != null ? discount.getEndDate().toString() : ""
            );
            
            return ResponseEntity.ok(Map.of(
                    "success", "true",
                    "message", "Đã gửi email cho " + emails.size() + " khách hàng"
            ));
            
        } catch (IllegalStateException e) {
            log.error("Configuration error: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "success", "false",
                            "message", "Lỗi cấu hình email: " + e.getMessage() + ". Vui lòng kiểm tra cấu hình email trong application.yaml"
                    ));
        } catch (Exception e) {
            log.error("Error sending bulk discount emails: ", e);
            String errorMessage = e.getMessage();
            if (e.getCause() != null) {
                errorMessage += " (Chi tiết: " + e.getCause().getMessage() + ")";
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "success", "false",
                            "message", "Lỗi khi gửi email: " + errorMessage
                    ));
        }
    }
    
    /**
     * Gửi mã khuyến mãi cho tất cả khách hàng đang active
     */
    @PostMapping("/{discountId}/send-all-customers")
    public ResponseEntity<Map<String, Object>> sendDiscountToAllCustomers(
            @PathVariable Long discountId) {
        
        try {
            DiscountDTO discount = discountService.getDiscountById(discountId);
            
            // Lấy tất cả email của customers (role = customer, status = ACTIVE)
            List<String> customerEmails = userRepository.findAll().stream()
                    .filter(user -> user.getEmail() != null && !user.getEmail().isEmpty())
                    .map(user -> user.getEmail())
                    .distinct()
                    .toList();
            
            if (customerEmails.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(Map.of(
                                "success", "false",
                                "message", "Không tìm thấy khách hàng nào"
                        ));
            }
            
            // Tạo mã khuyến mãi
            String discountCode = discount.getName() != null && !discount.getName().isEmpty() 
                ? discount.getName().toUpperCase().replaceAll("\\s+", "") 
                : "DISCOUNT" + discountId;
            
            emailService.sendBulkDiscountCodes(
                    customerEmails,
                    discount.getName(),
                    discountCode,
                    discount.getDiscountRate(),
                    discount.getDescription(),
                    discount.getStartDate() != null ? discount.getStartDate().toString() : "",
                    discount.getEndDate() != null ? discount.getEndDate().toString() : ""
            );
            
            return ResponseEntity.ok(Map.of(
                    "success", "true",
                    "message", "Đã gửi email cho " + customerEmails.size() + " khách hàng"
            ));
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "success", "false",
                            "message", "Lỗi khi gửi email: " + e.getMessage()
                    ));
        }
    }

}
