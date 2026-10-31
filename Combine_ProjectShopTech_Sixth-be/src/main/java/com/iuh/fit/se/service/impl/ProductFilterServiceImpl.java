package com.iuh.fit.se.service.impl;

import com.iuh.fit.se.domain.dto.*;
import com.iuh.fit.se.domain.entity.Product;
import com.iuh.fit.se.domain.specification.ProductSpecification;
import com.iuh.fit.se.repository.ProductRepository;
import com.iuh.fit.se.service.ProductFilterService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * ProductFilterServiceImpl
 * <p>
 * Provides business logic for managing employment details.
 * <p>
 * Version 1.0
 * Date: 13/11/2025
 * <p>
 * Copyright
 * <p>
 * Modification Logs:
 * DATE         AUTHOR       DESCRIPTION
 * -------------------------------------
 * 13/11/2025    HDang      Create
 */
@Service
@RequiredArgsConstructor
public class ProductFilterServiceImpl implements ProductFilterService {
    private final ProductRepository productRepository;

    @Override
    @Transactional(readOnly = true)
    public ProductFilterResponseDTO filterProducts(ProductFilterRequestDTO request) {
        List<Product> products = productRepository.findAll(
                ProductSpecification.filterProducts(request)
        );

        // Convert sang DTO
        List<ProductFilterDTO> productDTOs = products.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        // Tạo response
        return new ProductFilterResponseDTO(
                productDTOs,
                productDTOs.size()
        );
    }

    @Override
    @Transactional(readOnly = true)
    public FilterOptionsResponseDTO getFilterOptions() {
        FilterOptionsResponseDTO response = new FilterOptionsResponseDTO();

        // 1. Lấy danh sách categories với số lượng sản phẩm
        List<Object[]> categoryData = productRepository.countByCategory();
        List<CategoryCountDTO> categories = categoryData.stream()
                .map(data -> new CategoryCountDTO(
                        (Long) data[0],      // categoryId
                        (String) data[1],    // categoryName
                        (Long) data[2]       // productCount
                ))
                .collect(Collectors.toList());
        response.setCategoryOptions(categories);

        // 2. Tạo các khoảng giá với số lượng
        List<PriceRangeCountDTO> priceRanges = new ArrayList<>();
        priceRanges.add(createPriceRange("Dưới 1 triệu", 0.0, 1_000_000.0));
        priceRanges.add(createPriceRange("1 - 2 triệu", 1_000_000.0, 2_000_000.0));
        priceRanges.add(createPriceRange("2 - 3 triệu", 2_000_000.0, 3_000_000.0));
        priceRanges.add(createPriceRange("3 - 4 triệu", 3_000_000.0, 4_000_000.0));
        priceRanges.add(createPriceRange("4 - 5 triệu", 4_000_000.0, 5_000_000.0));
        priceRanges.add(createPriceRange("5 - 6 triệu", 5_000_000.0, 6_000_000.0));
        priceRanges.add(createPriceRange("6 - 7 triệu", 6_000_000.0, 7_000_000.0));
        priceRanges.add(createPriceRangeAbove("Trên 7 triệu", 7_000_000.0));
        response.setPriceRanges(priceRanges);

        // 3. Lấy số lượng theo status
        List<Object[]> statusData = productRepository.countByStatus();
        List<StatusCountDTO> statuses = statusData.stream()
                .map(data -> new StatusCountDTO(
                        data[0].toString(),  // status
                        (Long) data[1]       // count
                ))
                .collect(Collectors.toList());
        response.setStatusOptions(statuses);
        return response;
    }

    private PriceRangeCountDTO createPriceRange(String label, Double min, Double max) {
        Long count = productRepository.countByPriceRange(min, max);
        return new PriceRangeCountDTO(label, min, max, count);
    }

    private PriceRangeCountDTO createPriceRangeAbove(String label, Double min) {
        Long count = productRepository.countByPriceAbove(min);
        return new PriceRangeCountDTO(label, min, null, count);
    }

    private ProductFilterDTO convertToDTO(Product product) {
        ProductFilterDTO dto = new ProductFilterDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setUnitPrice(product.getUnitPrice());
        dto.setImageUrl(product.getImageUrl());
        dto.setQuantity(product.getQuantity());
        dto.setPercentage(product.getPercentage());
        dto.setStatus(product.getStatus() != null ? product.getStatus().toString() : null);

        // Set category info
        if (product.getCategory() != null) {
            dto.setCategoryName(product.getCategory().getName());
            dto.setCategoryId(product.getCategory().getId());
        }

        // Tính giá sau discount
        if (product.getDiscount() != null) {
            dto.setHasDiscount(true);
            // Giả sử Discount có field percentage
            // dto.setDiscountPrice(product.getUnitPrice() * (1 - product.getDiscount().getPercentage() / 100));
            dto.setDiscountPrice(product.getUnitPrice() * (1 - product.getPercentage() / 100));
        } else {
            dto.setHasDiscount(false);
            dto.setDiscountPrice(product.getUnitPrice());
        }
        return dto;
    }
}
