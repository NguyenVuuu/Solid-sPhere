package com.iuh.fit.se.controller;

import com.iuh.fit.se.domain.dto.FilterOptionsResponseDTO;
import com.iuh.fit.se.domain.dto.ProductFilterRequestDTO;
import com.iuh.fit.se.domain.dto.ProductFilterResponseDTO;
import com.iuh.fit.se.service.ProductFilterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * ProductFilterController
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
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProductFilterController {
    private final ProductFilterService productFilterService;

    @PostMapping("/filter")
    public ResponseEntity<ProductFilterResponseDTO> filterProducts(
            @RequestBody ProductFilterRequestDTO request) {
        ProductFilterResponseDTO response = productFilterService.filterProducts(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/filter-options")
    public ResponseEntity<FilterOptionsResponseDTO> getFilterOptions() {
        FilterOptionsResponseDTO response = productFilterService.getFilterOptions();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/filter/category/{categoryId}")
    public ResponseEntity<ProductFilterResponseDTO> filterByCategory(
            @PathVariable Long categoryId) {

        ProductFilterRequestDTO request = new ProductFilterRequestDTO();
        request.setCategoryId(categoryId);

        ProductFilterResponseDTO response = productFilterService.filterProducts(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/filter/price")
    public ResponseEntity<ProductFilterResponseDTO> filterByPrice(
            @RequestParam Double min,
            @RequestParam(required = false) Double max) {

        ProductFilterRequestDTO request = new ProductFilterRequestDTO();
        request.setMinPrice(min);
        request.setMaxPrice(max);

        ProductFilterResponseDTO response = productFilterService.filterProducts(request);
        return ResponseEntity.ok(response);
    }
}
