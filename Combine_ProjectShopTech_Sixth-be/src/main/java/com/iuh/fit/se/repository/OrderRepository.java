package com.iuh.fit.se.repository;

import com.iuh.fit.se.domain.entity.Order;
import com.iuh.fit.se.domain.enums.OrderStatus;
import com.iuh.fit.se.domain.enums.PaymentMethod;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);
    Page<Order> findByUserId(Long userId, Pageable pageable);
    
    List<Order> findByStatus(OrderStatus status);
    Page<Order> findByStatus(OrderStatus status, Pageable pageable);
    
    List<Order> findByCreatedDateBetween(LocalDate startDate, LocalDate endDate);
    Page<Order> findByCreatedDateBetween(LocalDate startDate, LocalDate endDate, Pageable pageable);
    
    @Query("SELECT o FROM Order o WHERE o.totalPrice >= ?1")
    List<Order> findByMinimumTotal(Double minTotal);
    
    @Query("SELECT o FROM Order o WHERE o.user.id = ?1 AND o.status = ?2")
    List<Order> findByUserAndStatus(Long userId, OrderStatus status);
    
    @Query("SELECT o FROM Order o WHERE o.user.id = :userId AND o.status = :status")
    Page<Order> findByUserAndStatus(@Param("userId") Long userId, 
                                     @Param("status") OrderStatus status,
                                     Pageable pageable);
    
    // Find orders by payment method
    List<Order> findByPaymentMethod(PaymentMethod paymentMethod);
    
    // Find recent orders
    @Query("SELECT o FROM Order o ORDER BY o.createdDate DESC, o.id DESC")
    List<Order> findRecentOrders(Pageable pageable);
    
    // Find pending orders older than specific date
    @Query("SELECT o FROM Order o WHERE o.status = 'PENDING' AND o.createdDate < :date")
    List<Order> findPendingOrdersOlderThan(@Param("date") LocalDate date);
    
    // Calculate total revenue by date range
    @Query("SELECT SUM(o.totalPrice) FROM Order o WHERE o.createdDate BETWEEN :startDate AND :endDate " +
           "AND o.status = 'DELIVERED'")
    Double calculateRevenue(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    // Calculate total revenue by user
    @Query("SELECT SUM(o.totalPrice) FROM Order o WHERE o.user.id = :userId AND o.status = 'DELIVERED'")
    Double calculateUserRevenue(@Param("userId") Long userId);
    
    // Count orders by status
    @Query("SELECT COUNT(o) FROM Order o WHERE o.status = :status")
    Long countByStatus(@Param("status") OrderStatus status);
    
    // Count orders by user and status
    @Query("SELECT COUNT(o) FROM Order o WHERE o.user.id = :userId AND o.status = :status")
    Long countByUserIdAndStatus(@Param("userId") Long userId, @Param("status") OrderStatus status);
    
    // Find orders with discount
    @Query("SELECT o FROM Order o WHERE o.usedPoint > 0")
    List<Order> findOrdersWithPointsUsed();
    
    // Average order value
    @Query("SELECT AVG(o.totalPrice) FROM Order o WHERE o.status = 'DELIVERED'")
    Double getAverageOrderValue();
    
    // Average order value by user
    @Query("SELECT AVG(o.totalPrice) FROM Order o WHERE o.user.id = :userId AND o.status = 'DELIVERED'")
    Double getAverageOrderValueByUser(@Param("userId") Long userId);
    
    // Find orders by delivery address containing
    @Query("SELECT o FROM Order o WHERE o.deliveryAddress LIKE %:address%")
    List<Order> findByDeliveryAddressContaining(@Param("address") String address);
    
    // Update order status
    @Modifying
    @Query("UPDATE Order o SET o.status = :status WHERE o.id = :orderId")
    int updateOrderStatus(@Param("orderId") Long orderId, @Param("status") OrderStatus status);
    
    // Find orders by multiple statuses
    @Query("SELECT o FROM Order o WHERE o.status IN :statuses")
    List<Order> findByStatusIn(@Param("statuses") List<OrderStatus> statuses);
    
    // Daily orders count
    @Query("SELECT COUNT(o) FROM Order o WHERE o.createdDate = :date")
    Long countOrdersByDate(@Param("date") LocalDate date);
    
    // Monthly orders count
    @Query("SELECT COUNT(o) FROM Order o WHERE YEAR(o.createdDate) = :year AND MONTH(o.createdDate) = :month")
    Long countOrdersByMonth(@Param("year") int year, @Param("month") int month);
    
    // Find top customers by order count
    @Query("SELECT o.user.id, COUNT(o) FROM Order o GROUP BY o.user.id ORDER BY COUNT(o) DESC")
    List<Object[]> findTopCustomersByOrderCount(Pageable pageable);
    List<Order> findByUserIdAndStatus(Long userId, OrderStatus status);

}
