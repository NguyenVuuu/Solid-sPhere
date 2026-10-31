package com.iuh.fit.se.service;

import com.iuh.fit.se.domain.dto.FilterOptionsResponseDTO;
import com.iuh.fit.se.domain.dto.ProductFilterRequestDTO;
import com.iuh.fit.se.domain.dto.ProductFilterResponseDTO;

/**
 * ProductFilterService
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
public interface ProductFilterService {
    ProductFilterResponseDTO filterProducts(ProductFilterRequestDTO request);
    FilterOptionsResponseDTO getFilterOptions();

}
