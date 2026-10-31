package com.iuh.fit.se.domain.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DiscountDTO {
    Long id;
    
    @NotBlank(message = "Tên discount không được để trống")
    @Size(min = 1, max = 255, message = "Tên discount phải có từ 1 đến 255 ký tự")
    String name;
    
    @NotBlank(message = "Loại discount không được để trống")
    @Pattern(regexp = "PERCENTAGE", message = "Loại discount phải là PERCENTAGE")
    String type;
    
    @Size(max = 2000, message = "Mô tả discount không được vượt quá 2000 ký tự")
    String description;
    
    @NotNull(message = "Tỷ lệ/số tiền giảm không được để trống")
    @DecimalMin(value = "0.0", inclusive = true, message = "Tỷ lệ/số tiền giảm không được âm")
    @DecimalMax(value = "999999999.99", message = "Tỷ lệ/số tiền giảm không được vượt quá 999,999,999.99")
    // Lưu ý: Nếu type là PERCENTAGE, discountRate phải <= 100 (được validate trong service)
    // Nếu type là FIXED_AMOUNT, discountRate là số tiền VNĐ (có thể > 100)
    Double discountRate;
    
    Boolean discountStatus;
    
    @NotNull(message = "Ngày bắt đầu không được để trống")
    LocalDate startDate;
    
    @NotNull(message = "Ngày kết thúc không được để trống")
    LocalDate endDate;
    
    Long productId;
    String productName;
    Double originalPrice;
    String imageUrl;
    String categoryName;
    Long point;
}