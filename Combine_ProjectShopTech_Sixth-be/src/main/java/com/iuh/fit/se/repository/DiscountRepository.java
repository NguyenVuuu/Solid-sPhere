package com.iuh.fit.se.repository;

import com.iuh.fit.se.domain.entity.Discount;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface DiscountRepository extends JpaRepository<Discount, Long> {
    Optional<Discount> findByProductId(Long productId);
    
    // Find all discounts with product and category data
    @Query("SELECT d FROM Discount d JOIN FETCH d.product p JOIN FETCH p.category c")
    List<Discount> findAllWithProductAndCategory();
    
    List<Discount> findByDiscountStatus(Boolean status);
    
    List<Discount> findByType(String type);
    
    @Query("SELECT d FROM Discount d JOIN FETCH d.product p JOIN FETCH p.category c WHERE d.startDate <= ?1 AND d.endDate >= ?1 AND d.discountStatus = true")
    List<Discount> findActiveDiscounts(LocalDate date);
    
    @Query("SELECT d FROM Discount d JOIN FETCH d.product p JOIN FETCH p.category c WHERE d.endDate < ?1")
    List<Discount> findExpiredDiscounts(LocalDate date);
    
    // Find discounts starting soon
    @Query("SELECT d FROM Discount d JOIN FETCH d.product p JOIN FETCH p.category c WHERE d.startDate BETWEEN :fromDate AND :toDate AND d.discountStatus = true")
    List<Discount> findUpcomingDiscounts(@Param("fromDate") LocalDate fromDate, @Param("toDate") LocalDate toDate);
    
    // Find discounts by rate range
    @Query("SELECT d FROM Discount d JOIN FETCH d.product p JOIN FETCH p.category c WHERE d.discountRate BETWEEN :minRate AND :maxRate")
    List<Discount> findByDiscountRateRange(@Param("minRate") Double minRate, @Param("maxRate") Double maxRate);
    
    // Find best discounts
    @Query("SELECT d FROM Discount d JOIN FETCH d.product p JOIN FETCH p.category c WHERE d.discountStatus = true AND d.startDate <= CURRENT_DATE AND d.endDate >= CURRENT_DATE " +
           "ORDER BY d.discountRate DESC")
    List<Discount> findBestActiveDiscounts();
    
    // Count active discounts
    @Query("SELECT COUNT(d) FROM Discount d WHERE d.discountStatus = true AND d.startDate <= CURRENT_DATE AND d.endDate >= CURRENT_DATE")
    Long countActiveDiscounts();
    
    // Update discount status
    @Modifying
    @Query("UPDATE Discount d SET d.discountStatus = :status WHERE d.id = :discountId")
    int updateDiscountStatus(@Param("discountId") Long discountId, @Param("status") Boolean status);
    
    // Bulk activate expired discounts
    @Modifying
    @Query("UPDATE Discount d SET d.discountStatus = false WHERE d.endDate < CURRENT_DATE AND d.discountStatus = true")
    int deactivateExpiredDiscounts();
    
    // Find discounts by product category
    @Query("SELECT d FROM Discount d JOIN FETCH d.product p JOIN FETCH p.category c WHERE d.product.category.id = :categoryId AND d.discountStatus = true")
    List<Discount> findActiveByCategoryId(@Param("categoryId") Long categoryId);
    
    // Search discounts by name
    @Query("SELECT d FROM Discount d JOIN FETCH d.product p JOIN FETCH p.category c WHERE d.name LIKE %:keyword% OR d.description LIKE %:keyword%")
    List<Discount> searchByKeyword(@Param("keyword") String keyword);
    
    // Find seasonal discounts (within date range)
    @Query("SELECT d FROM Discount d JOIN FETCH d.product p JOIN FETCH p.category c WHERE (d.startDate <= :endDate AND d.endDate >= :startDate)")
    List<Discount> findByDateRangeOverlap(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    //get product highest disc
    @Query("SELECT d FROM Discount d JOIN FETCH d.product p JOIN FETCH p.category c WHERE d.discountStatus = true AND d.discountRate = (SELECT MAX(d2.discountRate) FROM Discount d2 WHERE d2.product.id = d.product.id) ORDER BY d.discountRate DESC")
    List<Discount> findTopProductsWithHighestDiscount(Pageable pageable);

    //get product highest disc by cate
    @Query("SELECT d FROM Discount d JOIN FETCH d.product p JOIN FETCH p.category c WHERE d.discountStatus = true AND d.product.category.name LIKE CONCAT(:categoryPrefix, '%') AND d.discountRate = (SELECT MAX(d2.discountRate) FROM Discount d2 WHERE d2.product.id = d.product.id) ORDER BY d.discountRate DESC")
    List<Discount> findTopProductsWithHighestDiscountByCategory(
            @Param("categoryPrefix") String categoryPrefix,
            Pageable pageable
    );



    @Query("SELECT d FROM Discount d WHERE d.id BETWEEN 101 AND 105")
    List<Discount> findDiscountsFrom101To105();
}
