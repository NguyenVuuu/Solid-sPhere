package com.iuh.fit.se.service.impl;

import com.iuh.fit.se.domain.dto.CreateOrderRequestDTO;
import com.iuh.fit.se.domain.dto.OrderDTO;
import com.iuh.fit.se.domain.dto.OrderDetailDTO;
import com.iuh.fit.se.domain.dto.OrderTrackingDTO;
import com.iuh.fit.se.domain.dto.OrderWithDetailsDTO;
import com.iuh.fit.se.domain.dto.UpdateShippedDateDTO;
import com.iuh.fit.se.domain.entity.Order;
import com.iuh.fit.se.domain.entity.User;
import com.iuh.fit.se.domain.enums.OrderStatus;
import com.iuh.fit.se.repository.OrderRepository;
import com.iuh.fit.se.repository.UserRepository;
import com.iuh.fit.se.service.OrderDetailService;
import com.iuh.fit.se.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {
    
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final OrderDetailService orderDetailService;

    @Override
    public OrderDTO createOrder(OrderDTO orderDTO) {
        Order order = convertToEntity(orderDTO);
        Order savedOrder = orderRepository.save(order);
        return convertToDTO(savedOrder);
    }

    @Override
    @Transactional
    public OrderDTO createOrderWithDetails(CreateOrderRequestDTO requestDTO) {
        // Validate items
        if (requestDTO.getItems() == null || requestDTO.getItems().isEmpty()) {
            throw new RuntimeException("Order must have at least one item");
        }
        
        // Step 1: Create Order first (but not committed yet - in transaction)
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setUserId(requestDTO.getUserId());
        orderDTO.setPaymentFee(requestDTO.getPaymentFee());
        orderDTO.setTotalPrice(requestDTO.getTotalPrice());
        orderDTO.setCreatedDate(requestDTO.getCreatedDate());
        orderDTO.setDeliveryAddress(requestDTO.getDeliveryAddress());
        orderDTO.setStatus(requestDTO.getStatus());
        orderDTO.setNotes(requestDTO.getNotes());
        orderDTO.setUsedPoint(requestDTO.getUsedPoint());
        orderDTO.setUsedAt(requestDTO.getUsedAt());
        orderDTO.setPaymentMethod(requestDTO.getPaymentMethod());
        
        Order order = convertToEntity(orderDTO);
        Order savedOrder = orderRepository.save(order);
        // Flush to get the ID, but transaction not committed yet
        orderRepository.flush();
        
        // Step 2: Create all OrderDetails and decrease stock
        // If any fails, entire transaction will rollback (including order)
        for (CreateOrderRequestDTO.OrderDetailItemDTO item : requestDTO.getItems()) {
            OrderDetailDTO orderDetailDTO = new OrderDetailDTO();
            orderDetailDTO.setOrderId(savedOrder.getId());
            orderDetailDTO.setProductId(item.getProductId());
            orderDetailDTO.setAmount(item.getAmount());
            orderDetailDTO.setUnitPrice(item.getUnitPrice());
            
            // This will decrease stock atomically
            // If stock is insufficient, it will throw exception and rollback everything
            orderDetailService.createOrderDetail(orderDetailDTO);
        }
        
        // Step 3: If all successful, return the created order
        // Transaction will commit, and all changes (order + order details + stock decreases) will be persisted
        return convertToDTO(savedOrder);
    }

    @Override
    public OrderDTO updateOrder(Long id, OrderDTO orderDTO) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        
        order.setPaymentFee(orderDTO.getPaymentFee());
        order.setTotalPrice(orderDTO.getTotalPrice());
        order.setCreatedDate(orderDTO.getCreatedDate());
        order.setDeliveryAddress(orderDTO.getDeliveryAddress());
        order.setStatus(orderDTO.getStatus());
        order.setNotes(orderDTO.getNotes());
        order.setUsedPoint(orderDTO.getUsedPoint());
        order.setUsedAt(orderDTO.getUsedAt());
        order.setPaymentMethod(orderDTO.getPaymentMethod());
        
        if (orderDTO.getUserId() != null) {
            User user = userRepository.findById(orderDTO.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            order.setUser(user);
        }
        
        Order updatedOrder = orderRepository.save(order);
        return convertToDTO(updatedOrder);
    }

    @Override
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public OrderDTO getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        return convertToDTO(order);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDTO> getOrdersByUser(Long userId) {
        return orderRepository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDTO> getOrdersByStatus(OrderStatus status) {
        return orderRepository.findByStatus(status).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDTO> getOrdersByDateRange(LocalDate startDate, LocalDate endDate) {
        return orderRepository.findByCreatedDateBetween(startDate, endDate).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDTO> getOrdersByMinimumTotal(Double minTotal) {
        return orderRepository.findByMinimumTotal(minTotal).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDTO> getOrdersByUserAndStatus(Long userId, OrderStatus status) {
        return orderRepository.findByUserAndStatus(userId, status).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void updateOrderStatus(Long orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        orderRepository.save(order);
    }

    @Override
    @Transactional(readOnly = true)
    public Double calculateTotalRevenue(LocalDate startDate, LocalDate endDate) {
        Double revenue = orderRepository.calculateRevenue(startDate, endDate);
        return revenue != null ? revenue : 0.0;
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDTO> getOrdersByPaymentMethod(com.iuh.fit.se.domain.enums.PaymentMethod paymentMethod) {
        return orderRepository.findByPaymentMethod(paymentMethod).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Long countOrdersByStatus(OrderStatus status) {
        return orderRepository.countByStatus(status);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDTO> getRecentOrders(org.springframework.data.domain.Pageable pageable) {
        return orderRepository.findRecentOrders(pageable).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDTO> getOrdersWithTotalGreaterThan(Double minTotal) {
        return orderRepository.findByMinimumTotal(minTotal).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public OrderWithDetailsDTO getOrderWithDetails(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
        List<OrderDetailDTO> details = orderDetailService.getOrderDetailsByOrder(orderId);
        return convertToOrderWithDetailsDTO(order, details);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderWithDetailsDTO> getOrdersWithDetailsByUser(Long userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        return orders.stream()
                .map(order -> convertToOrderWithDetailsDTO(order,
                        orderDetailService.getOrderDetailsByOrder(order.getId())))
                .collect(Collectors.toList());
    }

    private OrderDTO convertToDTO(Order order) {
        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setPaymentFee(order.getPaymentFee());
        dto.setTotalPrice(order.getTotalPrice());
        dto.setCreatedDate(order.getCreatedDate());
        dto.setDeliveryAddress(order.getDeliveryAddress());
        dto.setStatus(order.getStatus());
        dto.setNotes(order.getNotes());
        dto.setUsedPoint(order.getUsedPoint());
        dto.setUsedAt(order.getUsedAt());
        dto.setPaymentMethod(order.getPaymentMethod());
        
        if (order.getUser() != null) {
            dto.setUserId(order.getUser().getId());
        }
        
        return dto;
    }

    private OrderWithDetailsDTO convertToOrderWithDetailsDTO(Order order, List<OrderDetailDTO> details) {
        return OrderWithDetailsDTO.builder()
                .id(order.getId())
                .paymentFee(order.getPaymentFee())
                .totalPrice(order.getTotalPrice())
                .createdDate(order.getCreatedDate())
                .deliveryAddress(order.getDeliveryAddress())
                .status(order.getStatus())
                .notes(order.getNotes())
                .usedPoint(order.getUsedPoint())
                .usedAt(order.getUsedAt())
                .paymentMethod(order.getPaymentMethod())
                .userId(order.getUser() != null ? order.getUser().getId() : null)
                .items(details)
                .totalItems(details != null
                        ? details.stream().mapToInt(OrderDetailDTO::getAmount).sum()
                        : 0)
                .build();
    }

    private Order convertToEntity(OrderDTO dto) {
        Order order = new Order();
        order.setPaymentFee(dto.getPaymentFee());
        order.setTotalPrice(dto.getTotalPrice());
        order.setCreatedDate(dto.getCreatedDate());
        order.setDeliveryAddress(dto.getDeliveryAddress());
        order.setStatus(dto.getStatus());
        order.setNotes(dto.getNotes());
        order.setUsedPoint(dto.getUsedPoint());
        order.setUsedAt(dto.getUsedAt());
        order.setPaymentMethod(dto.getPaymentMethod());
        
        if (dto.getUserId() != null) {
            User user = userRepository.findById(dto.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            order.setUser(user);
        }
        
        return order;
    }
    //    update shipped

    @Override
    @Transactional
    public OrderDTO updateShippedDate(UpdateShippedDateDTO updateDTO) {
        Order order = orderRepository.findById(updateDTO.getOrderId())
            .orElseThrow(() -> new RuntimeException("Order not found with id: " + updateDTO.getOrderId()));

        if (order.getStatus() != OrderStatus.SHIPPED) {
            throw new RuntimeException("Order status is not SHIPPED");
        }

        // FIX: Sửa logic kiểm tra null
        if (updateDTO.getShippedDate() == null) {
            throw new RuntimeException("Shipped Date cannot be null");
        }

        order.setShippedDate(updateDTO.getShippedDate());
        if (updateDTO.getNotes() != null) {
            order.setNotes(updateDTO.getNotes());
        }

        Order savedOrder = orderRepository.save(order);
        return convertToDTO(savedOrder);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDTO> getShippedOrders() {
        return orderRepository.findByStatus(OrderStatus.SHIPPED)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderTrackingDTO> getCustomerShippedOrders(Long userId) {
        List<Order> orders = orderRepository.findByUserIdAndStatus(userId, OrderStatus.SHIPPED);
        return orders.stream()
                .map(order -> {
                    List<OrderDetailDTO> details = orderDetailService.getOrderDetailsByOrder(order.getId());
                    return convertToOrderTrackingDTO(order, details);
                })
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public OrderTrackingDTO getOrderTracking(Long orderId, Long userId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
        
        // Kiểm tra order có thuộc về user này không
        if (!order.getUser().getId().equals(userId)) {
            throw new RuntimeException("You don't have permission to view this order");
        }
        
        List<OrderDetailDTO> details = orderDetailService.getOrderDetailsByOrder(orderId);
        return convertToOrderTrackingDTO(order, details);
    }

    private OrderTrackingDTO convertToOrderTrackingDTO(Order order, List<OrderDetailDTO> details) {
        LocalDateTime estimatedDelivery = null;
        Long daysUntilDelivery = null;
        String trackingStatus = "";
        
        if (order.getShippedDate() != null) {
            // shippedDate chính là thời gian dự kiến giao hàng
            estimatedDelivery = order.getShippedDate();
            daysUntilDelivery = ChronoUnit.DAYS.between(LocalDateTime.now(), estimatedDelivery);
            
            if (daysUntilDelivery < 0) {
trackingStatus = "Đơn hàng đã quá thời gian giao dự kiến";
            } else if (daysUntilDelivery == 0) {
                trackingStatus = "Đơn hàng sẽ được giao trong hôm nay";
            } else {
                trackingStatus = "Đơn hàng đang trên đường giao đến bạn - Dự kiến giao trong " + daysUntilDelivery + " ngày";
            }
        } else {
            trackingStatus = "Đơn hàng đã được xác nhận, chờ cập nhật thời gian giao hàng";
        }
        
        return OrderTrackingDTO.builder()
                .orderId(order.getId())
                .status(order.getStatus())
                .createdDate(order.getCreatedDate())
                .shippedDate(order.getShippedDate())
                .estimatedDeliveryDate(estimatedDelivery)
                .deliveryAddress(order.getDeliveryAddress())
                .notes(order.getNotes())
                .totalPrice(order.getTotalPrice())
                .paymentMethod(order.getPaymentMethod())
                .items(details)
                .totalItems(details != null ? details.stream().mapToInt(OrderDetailDTO::getAmount).sum() : 0)
                .isShipped(order.getStatus() == OrderStatus.SHIPPED)
                .daysUntilDelivery(daysUntilDelivery)
                .trackingStatus(trackingStatus)
                .build();
    }

}
