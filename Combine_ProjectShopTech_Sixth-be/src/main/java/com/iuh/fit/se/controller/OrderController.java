package com.iuh.fit.se.controller;

import com.iuh.fit.se.domain.dto.*;
import com.iuh.fit.se.domain.enums.OrderStatus;
import com.iuh.fit.se.service.OrderService;
import com.iuh.fit.se.service.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"}, allowCredentials = "true", maxAge = 3600)
public class OrderController {
    
    private final OrderService orderService;
    private final UserService userService;

    /**
     * Create order with order details in one transaction
     * This ensures atomicity: if any product has insufficient stock, entire order is rolled back
     * Uses conditional UPDATE to prevent negative stock and handle concurrent requests
     */
    @PostMapping("/with-details")
    public ResponseEntity<OrderDTO> createOrderWithDetails(@RequestBody CreateOrderRequestDTO requestDTO) {
        OrderDTO createdOrder = orderService.createOrderWithDetails(requestDTO);
        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderDTO> updateOrder(@PathVariable Long id, @RequestBody OrderDTO orderDTO) {
        OrderDTO updatedOrder = orderService.updateOrder(id, orderDTO);
        return ResponseEntity.ok(updatedOrder);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable Long id) {
        OrderDTO order = orderService.getOrderById(id);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/{id}/with-details")
    public ResponseEntity<OrderWithDetailsDTO> getOrderWithDetails(@PathVariable Long id) {
        OrderWithDetailsDTO order = orderService.getOrderWithDetails(id);
        return ResponseEntity.ok(order);
    }

    @GetMapping
    public ResponseEntity<List<OrderDTO>> getAllOrders() {
        List<OrderDTO> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderDTO>> getOrdersByUser(@PathVariable Long userId) {
        List<OrderDTO> orders = orderService.getOrdersByUser(userId);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/user/{userId}/with-details")
    public ResponseEntity<List<OrderWithDetailsDTO>> getOrdersWithDetailsByUser(@PathVariable Long userId) {
        List<OrderWithDetailsDTO> orders = orderService.getOrdersWithDetailsByUser(userId);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<OrderDTO>> getOrdersByStatus(@PathVariable OrderStatus status) {
        List<OrderDTO> orders = orderService.getOrdersByStatus(status);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/date-range")
    public ResponseEntity<List<OrderDTO>> getOrdersByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<OrderDTO> orders = orderService.getOrdersByDateRange(startDate, endDate);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/minimum-total")
    public ResponseEntity<List<OrderDTO>> getOrdersByMinimumTotal(@RequestParam Double minTotal) {
        List<OrderDTO> orders = orderService.getOrdersByMinimumTotal(minTotal);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/user/{userId}/status/{status}")
    public ResponseEntity<List<OrderDTO>> getOrdersByUserAndStatus(
            @PathVariable Long userId, 
            @PathVariable OrderStatus status) {
        List<OrderDTO> orders = orderService.getOrdersByUserAndStatus(userId, status);
        return ResponseEntity.ok(orders);
    }

    @PatchMapping("/{orderId}/status")
    public ResponseEntity<Void> updateOrderStatus(@PathVariable Long orderId, @RequestParam OrderStatus status) {
        orderService.updateOrderStatus(orderId, status);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/revenue")
    public ResponseEntity<Double> calculateTotalRevenue(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        Double revenue = orderService.calculateTotalRevenue(startDate, endDate);
        return ResponseEntity.ok(revenue);
    }

    @GetMapping("/payment-method/{paymentMethod}")
    public ResponseEntity<List<OrderDTO>> getOrdersByPaymentMethod(
            @PathVariable com.iuh.fit.se.domain.enums.PaymentMethod paymentMethod) {
        List<OrderDTO> orders = orderService.getOrdersByPaymentMethod(paymentMethod);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/count/status/{status}")
    public ResponseEntity<Long> countOrdersByStatus(@PathVariable OrderStatus status) {
        Long count = orderService.countOrdersByStatus(status);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/recent")
    public ResponseEntity<List<OrderDTO>> getRecentOrders(@RequestParam(defaultValue = "20") int limit) {
        List<OrderDTO> orders = orderService.getRecentOrders(
                org.springframework.data.domain.PageRequest.of(0, limit)
        );
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/high-value")
    public ResponseEntity<List<OrderDTO>> getOrdersWithTotalGreaterThan(@RequestParam Double minTotal) {
        List<OrderDTO> orders = orderService.getOrdersWithTotalGreaterThan(minTotal);
        return ResponseEntity.ok(orders);
    }


    @PostMapping
    public ResponseEntity<OrderDTO> createOrder(@RequestBody OrderDTO orderDTO) {
        OrderDTO createdOrder = orderService.createOrder(orderDTO);
        Long id =  createdOrder.getUserId();
        if (id != null) {
            userService.addGamePlays(id, 3L);
        }
        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
    }

    //    shipped date

    /**
     * Admin cập nhật thời gian giao hàng
     */
    @PutMapping("/admin/update-shipped-date")
    public ResponseEntity<?> updateShippedDate(@RequestBody UpdateShippedDateDTO updateDTO) {
        try {
            OrderDTO updatedOrder = orderService.updateShippedDate(updateDTO);
            return ResponseEntity.ok(Map.of(
                    "EC", 1,
                    "EM", "ship success",
                    "DT", updatedOrder
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "EC", 0,
                    "EM", e.getMessage(),
                    "DT", null
            ));
        }
    }

    /**
     * Lấy danh sách đơn hàng SHIPPED (cho Admin)
     */
    @GetMapping("/admin/shipped-orders")
    public ResponseEntity<?> getShippedOrders() {
        try {
            List<OrderDTO> orders = orderService.getShippedOrders();
            return ResponseEntity.ok(Map.of(
                    "EC", 1,
                    "EM", "ship success",
                    "DT", orders
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "EC", 0,
                    "EM", e.getMessage(),
                    "DT", null
            ));
        }
    }

    /**
     * Customer xem danh sách đơn hàng đang giao của mình
     */
    @GetMapping("/customer/{userId}/tracking/shipped")
    public ResponseEntity<?> getCustomerShippedOrders(@PathVariable Long userId) {
        try {
            List<OrderTrackingDTO> orders = orderService.getCustomerShippedOrders(userId);
            return ResponseEntity.ok(Map.of(
                    "EC", 1,
                    "EM", "Get shipped orders successfully",
                    "DT", orders
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "EC", 0,
                    "EM", e.getMessage(),
                    "DT", null
            ));
        }
    }

    /**
     * Customer theo dõi chi tiết một đơn hàng
     */
    @GetMapping("/customer/{userId}/tracking/{orderId}")
    public ResponseEntity<?> getOrderTracking(
            @PathVariable Long userId,
            @PathVariable Long orderId) {
        try {
            OrderTrackingDTO tracking = orderService.getOrderTracking(orderId, userId);
            return ResponseEntity.ok(Map.of(
                    "EC", 1,
                    "EM", "Get order tracking successfully",
                    "DT", tracking
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                    "EC", 0,
                    "EM", e.getMessage(),
                    "DT", null
            ));
        }
    }

}


