package com.iuh.fit.se.repository;

import com.iuh.fit.se.domain.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
    List<OrderDetail> findByOrderId(Long orderId);
    
    List<OrderDetail> findByProductId(Long productId);
    
    @Query("SELECT od FROM OrderDetail od WHERE od.order.user.id = ?1")
    List<OrderDetail> findByUserId(Long userId);
    
    // Find order details by order status
    @Query("SELECT od FROM OrderDetail od WHERE od.order.status = :status")
    List<OrderDetail> findByOrderStatus(@Param("status") com.iuh.fit.se.domain.enums.OrderStatus status);
    
    // Calculate total revenue from a product
    @Query("SELECT SUM(od.unitPrice * od.amount) FROM OrderDetail od WHERE od.product.id = :productId " +
           "AND od.order.status = 'DELIVERED'")
    Double calculateProductRevenue(@Param("productId") Long productId);
    
    // Calculate total quantity sold for a product
    @Query("SELECT SUM(od.amount) FROM OrderDetail od WHERE od.product.id = :productId " +
           "AND od.order.status = 'DELIVERED'")
    Long getTotalQuantitySold(@Param("productId") Long productId);
    
    // Find best selling products
    @Query("SELECT od.product.id, od.product.name, SUM(od.amount) as total FROM OrderDetail od " +
           "WHERE od.order.status = 'DELIVERED' " +
           "GROUP BY od.product.id, od.product.name ORDER BY total DESC")
    List<Object[]> findBestSellingProducts(org.springframework.data.domain.Pageable pageable);
    
    // Calculate order total
    @Query("SELECT SUM(od.unitPrice * od.amount) FROM OrderDetail od WHERE od.order.id = :orderId")
    Double calculateOrderTotal(@Param("orderId") Long orderId);
    
    // Count items in order
    @Query("SELECT COUNT(od) FROM OrderDetail od WHERE od.order.id = :orderId")
    Long countItemsInOrder(@Param("orderId") Long orderId);
    
    // Find popular products in date range
    @Query("SELECT od.product.id, od.product.name, SUM(od.amount) FROM OrderDetail od " +
           "WHERE od.order.createdDate BETWEEN :startDate AND :endDate AND od.order.status = 'DELIVERED' " +
           "GROUP BY od.product.id, od.product.name ORDER BY SUM(od.amount) DESC")
    List<Object[]> findPopularProductsInDateRange(@Param("startDate") LocalDate startDate,
                                                    @Param("endDate") LocalDate endDate,
                                                    org.springframework.data.domain.Pageable pageable);
    
    // Find products frequently bought together
    @Query("SELECT od2.product.id, od2.product.name, COUNT(od2) FROM OrderDetail od1 " +
           "JOIN OrderDetail od2 ON od1.order.id = od2.order.id " +
           "WHERE od1.product.id = :productId AND od2.product.id != :productId " +
           "GROUP BY od2.product.id, od2.product.name ORDER BY COUNT(od2) DESC")
    List<Object[]> findFrequentlyBoughtTogether(@Param("productId") Long productId,
                                                  org.springframework.data.domain.Pageable pageable);
    
    // Get revenue by product in date range
    @Query("SELECT od.product.id, od.product.name, SUM(od.unitPrice * od.amount) FROM OrderDetail od " +
           "WHERE od.order.createdDate BETWEEN :startDate AND :endDate AND od.order.status = 'DELIVERED' " +
           "GROUP BY od.product.id, od.product.name ORDER BY SUM(od.unitPrice * od.amount) DESC")
    List<Object[]> getRevenueByProduct(@Param("startDate") LocalDate startDate,
                                        @Param("endDate") LocalDate endDate);

    // Get revenue by category in date range
    @Query("SELECT od.product.category.id, od.product.category.name, SUM(od.unitPrice * od.amount) FROM OrderDetail od " +
           "WHERE od.order.createdDate BETWEEN :startDate AND :endDate AND od.order.status = 'DELIVERED' " +
           "GROUP BY od.product.category.id, od.product.category.name ORDER BY SUM(od.unitPrice * od.amount) DESC")
    List<Object[]> getRevenueByCategory(@Param("startDate") LocalDate startDate,
                                         @Param("endDate") LocalDate endDate);
    
    // Find order details by category
    @Query("SELECT od FROM OrderDetail od WHERE od.product.category.id = :categoryId")
    List<OrderDetail> findByCategoryId(@Param("categoryId") Long categoryId);
    
    // Average item price in orders
    @Query("SELECT AVG(od.unitPrice) FROM OrderDetail od WHERE od.order.status = 'DELIVERED'")
    Double getAverageItemPrice();
    
    // Total items sold
    @Query("SELECT SUM(od.amount) FROM OrderDetail od WHERE od.order.status = 'DELIVERED'")
    Long getTotalItemsSold();



    @Query("SELECT od.id AS orderDetailId, od.amount, od.unitPrice AS pricePerUnit, " +
            "p.id AS productId, p.name AS productName, p.description, " +
            "p.unitPrice AS productUnitPrice, p.imageUrl, c.name AS categoryName " +
            "FROM OrderDetail od " +
            "JOIN od.product p " +
            "LEFT JOIN p.category c " +
            "WHERE od.order.id = :orderId")
    List<Object[]> findOrderProductDetails(@Param("orderId") Long orderId);
}
