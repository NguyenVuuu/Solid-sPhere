package com.iuh.fit.se.domain.dto;


import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;

/**
 * FilterOptionsResponseDTO
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

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FilterOptionsResponseDTO {
    List<CategoryCountDTO> categoryOptions;
    List<PriceRangeCountDTO> priceRanges;
    List<StatusCountDTO> statusOptions;
}
