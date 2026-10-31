package com.iuh.fit.se.domain.specification;

import com.iuh.fit.se.domain.dto.ProductFilterRequestDTO;
import com.iuh.fit.se.domain.entity.Product;
import com.iuh.fit.se.domain.enums.ProductStatus;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

/**
 * ProductSpecification
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
public class ProductSpecification {
    public static Specification<Product> filterProducts(ProductFilterRequestDTO request) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Filter theo category ID (single)
            if (request.getCategoryId() != null) {
                predicates.add(cb.equal(root.get("category").get("id"),
                        request.getCategoryId()));
            }

            // Filter theo categoryIds (multiple)
            if (request.getCategoryIds() != null && !request.getCategoryIds().isEmpty()) {
                predicates.add(root.get("category").get("id").in(request.getCategoryIds()));
            }

            // Filter theo category name
            if (request.getCategoryName() != null && !request.getCategoryName().isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("category").get("name")),
                        "%" + request.getCategoryName().toLowerCase() + "%"));
            }

            // Filter theo brand
            if (request.getBrand() != null && !request.getBrand().isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("name")),
                        "%" + request.getBrand().toLowerCase() + "%"));
            }

            // Filter theo khoảng giá
            if (request.getMinPrice() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("unitPrice"),
                        request.getMinPrice()));
            }

            if (request.getMaxPrice() != null) {
                predicates.add(cb.lessThan(root.get("unitPrice"),
                        request.getMaxPrice()));
            }

            // Filter theo status
            if (request.getStatus() != null && !request.getStatus().isEmpty()) {
                try {
                    ProductStatus status = ProductStatus.valueOf(request.getStatus());
                    predicates.add(cb.equal(root.get("status"), status));
                } catch (IllegalArgumentException e) {
                    // Ignore invalid status
                }
            }

            // Tìm kiếm theo tên sản phẩm
            if (request.getSearchName() != null && !request.getSearchName().isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("name")),
                        "%" + request.getSearchName().toLowerCase() + "%"));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
