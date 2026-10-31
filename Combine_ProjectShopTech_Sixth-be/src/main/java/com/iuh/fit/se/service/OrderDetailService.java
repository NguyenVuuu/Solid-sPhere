package com.iuh.fit.se.service;

import com.iuh.fit.se.domain.dto.OrderDetailDTO;
import com.iuh.fit.se.domain.dto.OrderProductDetailDTO;
import com.iuh.fit.se.domain.enums.OrderStatus;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface OrderDetailService {
    OrderDetailDTO createOrderDetail(OrderDetailDTO orderDetailDTO);
    OrderDetailDTO updateOrderDetail(Long id, OrderDetailDTO orderDetailDTO);
    void deleteOrderDetail(Long id);
    OrderDetailDTO getOrderDetailById(Long id);
    List<OrderDetailDTO> getAllOrderDetails();
    List<OrderDetailDTO> getOrderDetailsByOrder(Long orderId);
    List<OrderDetailDTO> getOrderDetailsByProduct(Long productId);
    List<OrderDetailDTO> getOrderDetailsByUser(Long userId);
    
    // Advanced methods
    List<OrderDetailDTO> getOrderDetailsByStatus(OrderStatus status);
    Double calculateProductRevenue(Long productId);
    Long getTotalQuantitySold(Long productId);
    List<Object[]> getBestSellingProducts(Pageable pageable);
    Double calculateOrderTotal(Long orderId);
    Long countItemsInOrder(Long orderId);
    List<Object[]> getPopularProductsInDateRange(LocalDate startDate, LocalDate endDate, Pageable pageable);
    List<Object[]> getFrequentlyBoughtTogether(Long productId, Pageable pageable);
    List<OrderDetailDTO> getOrderDetailsByCategory(Long categoryId);

    List<OrderProductDetailDTO> getOrderProductDetails(Long orderId);
}
