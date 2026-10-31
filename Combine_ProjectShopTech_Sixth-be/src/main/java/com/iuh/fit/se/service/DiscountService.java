package com.iuh.fit.se.service;

import com.iuh.fit.se.domain.dto.DiscountDTO;

import java.time.LocalDate;
import java.util.List;

public interface DiscountService {
    DiscountDTO createDiscount(DiscountDTO discountDTO);
    DiscountDTO updateDiscount(Long id, DiscountDTO discountDTO);
    void deleteDiscount(Long id);
    DiscountDTO getDiscountById(Long id);
    List<DiscountDTO> getAllDiscounts();
    DiscountDTO getDiscountByProduct(Long productId);
    List<DiscountDTO> getDiscountsByStatus(Boolean status);
    List<DiscountDTO> getActiveDiscounts(LocalDate date);
    List<DiscountDTO> getExpiredDiscounts(LocalDate date);
    void activateDiscount(Long discountId);
    void deactivateDiscount(Long discountId);
    
    // Advanced methods
    List<DiscountDTO> getDiscountsByType(String type);
    List<DiscountDTO> getUpcomingDiscounts(LocalDate fromDate, LocalDate toDate);
    List<DiscountDTO> getDiscountsByRateRange(Double minRate, Double maxRate);
    List<DiscountDTO> getBestActiveDiscounts();
    Long countActiveDiscounts();
    int deactivateExpiredDiscounts();
    List<DiscountDTO> getDiscountsByCategory(Long categoryId);
    List<DiscountDTO> searchDiscountsByKeyword(String keyword);
    List<DiscountDTO> getTop10ProductsWithHighestDiscount();

    List<DiscountDTO> getTopProductDiscountsByCategory(String category);
    List<DiscountDTO> getAllDiscountExchangePoint();
}
