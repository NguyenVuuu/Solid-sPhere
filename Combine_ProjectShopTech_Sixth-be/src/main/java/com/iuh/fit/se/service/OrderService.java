package com.iuh.fit.se.service;

import com.iuh.fit.se.domain.dto.CreateOrderRequestDTO;
import com.iuh.fit.se.domain.dto.OrderDTO;
import com.iuh.fit.se.domain.dto.OrderTrackingDTO;
import com.iuh.fit.se.domain.dto.OrderWithDetailsDTO;
import com.iuh.fit.se.domain.dto.UpdateShippedDateDTO;
import com.iuh.fit.se.domain.enums.OrderStatus;
import com.iuh.fit.se.domain.enums.PaymentMethod;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface OrderService {
    OrderDTO createOrder(OrderDTO orderDTO);
    OrderDTO createOrderWithDetails(CreateOrderRequestDTO requestDTO);
    OrderDTO updateOrder(Long id, OrderDTO orderDTO);
    void deleteOrder(Long id);
    OrderDTO getOrderById(Long id);
    List<OrderDTO> getAllOrders();
    List<OrderDTO> getOrdersByUser(Long userId);
    List<OrderDTO> getOrdersByStatus(OrderStatus status);
    List<OrderDTO> getOrdersByDateRange(LocalDate startDate, LocalDate endDate);
    List<OrderDTO> getOrdersByMinimumTotal(Double minTotal);
    List<OrderDTO> getOrdersByUserAndStatus(Long userId, OrderStatus status);
    void updateOrderStatus(Long orderId, OrderStatus status);
    
    // Advanced methods
    Double calculateTotalRevenue(LocalDate startDate, LocalDate endDate);
    List<OrderDTO> getOrdersByPaymentMethod(PaymentMethod paymentMethod);
    Long countOrdersByStatus(OrderStatus status);
    List<OrderDTO> getRecentOrders(Pageable pageable);
    List<OrderDTO> getOrdersWithTotalGreaterThan(Double minTotal);
    OrderWithDetailsDTO getOrderWithDetails(Long orderId);
    List<OrderWithDetailsDTO> getOrdersWithDetailsByUser(Long userId);
    OrderDTO updateShippedDate(UpdateShippedDateDTO updateDTO);

    List<OrderDTO> getShippedOrders();

    // Customer tracking
    List<OrderTrackingDTO> getCustomerShippedOrders(Long userId);

    OrderTrackingDTO getOrderTracking(Long orderId, Long userId);
}
