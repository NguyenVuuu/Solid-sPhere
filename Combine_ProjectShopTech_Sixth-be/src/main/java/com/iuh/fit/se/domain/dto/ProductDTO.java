package com.iuh.fit.se.domain.dto;

import com.iuh.fit.se.domain.enums.ProductStatus;
import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductDTO {
    Long id;
    
    @NotBlank(message = "Tên sản phẩm không được để trống")
    @Size(min = 1, max = 255, message = "Tên sản phẩm phải có từ 1 đến 255 ký tự")
    String name;
    
    @Size(max = 2000, message = "Mô tả sản phẩm không được vượt quá 2000 ký tự")
    String description;
    
    @NotNull(message = "Giá sản phẩm không được để trống")
    @DecimalMin(value = "0.0", inclusive = false, message = "Giá sản phẩm phải lớn hơn 0")
    @DecimalMax(value = "999999999.99", message = "Giá sản phẩm không được vượt quá 999,999,999.99")
    Double unitPrice;
    
    String imageUrl;
    
    @NotNull(message = "Số lượng sản phẩm không được để trống")
    @Min(value = 0, message = "Số lượng sản phẩm không được âm")
    @Max(value = 999999999L, message = "Số lượng sản phẩm không được vượt quá 999,999,999")
    Long quantity;
    
    @DecimalMin(value = "0.0", message = "Phần trăm giảm giá không được âm")
    @DecimalMax(value = "100.0", message = "Phần trăm giảm giá không được vượt quá 100%")
    Double percentage;
    
    ProductStatus status;
    
    Long categoryId;

    public ProductDTO(Long id, String name, String description, Double unitPrice,
                      String imageUrl, Long quantity, Double percentage,
                      ProductStatus status) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.unitPrice = unitPrice;
        this.imageUrl = imageUrl;
        this.quantity = quantity;
        this.percentage = percentage;
        this.status = status;
    }
}
