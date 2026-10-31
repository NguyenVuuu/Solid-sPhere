package com.iuh.fit.se.controller;

import com.iuh.fit.se.domain.dto.OrderDetailDTO;
import com.iuh.fit.se.domain.dto.OrderProductDetailDTO;
import com.iuh.fit.se.service.OrderDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order-details")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OrderDetailController {
    
    private final OrderDetailService orderDetailService;

    @PostMapping
    public ResponseEntity<OrderDetailDTO> createOrderDetail(@RequestBody OrderDetailDTO orderDetailDTO) {
        OrderDetailDTO createdOrderDetail = orderDetailService.createOrderDetail(orderDetailDTO);
        return new ResponseEntity<>(createdOrderDetail, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderDetailDTO> updateOrderDetail(@PathVariable Long id, @RequestBody OrderDetailDTO orderDetailDTO) {
        OrderDetailDTO updatedOrderDetail = orderDetailService.updateOrderDetail(id, orderDetailDTO);
        return ResponseEntity.ok(updatedOrderDetail);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrderDetail(@PathVariable Long id) {
        orderDetailService.deleteOrderDetail(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDetailDTO> getOrderDetailById(@PathVariable Long id) {
        OrderDetailDTO orderDetail = orderDetailService.getOrderDetailById(id);
        return ResponseEntity.ok(orderDetail);
    }

    @GetMapping
    public ResponseEntity<List<OrderDetailDTO>> getAllOrderDetails() {
        List<OrderDetailDTO> orderDetails = orderDetailService.getAllOrderDetails();
        return ResponseEntity.ok(orderDetails);
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<List<OrderDetailDTO>> getOrderDetailsByOrder(@PathVariable Long orderId) {
        List<OrderDetailDTO> orderDetails = orderDetailService.getOrderDetailsByOrder(orderId);
        return ResponseEntity.ok(orderDetails);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<OrderDetailDTO>> getOrderDetailsByProduct(@PathVariable Long productId) {
        List<OrderDetailDTO> orderDetails = orderDetailService.getOrderDetailsByProduct(productId);
        return ResponseEntity.ok(orderDetails);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderDetailDTO>> getOrderDetailsByUser(@PathVariable Long userId) {
        List<OrderDetailDTO> orderDetails = orderDetailService.getOrderDetailsByUser(userId);
        return ResponseEntity.ok(orderDetails);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<OrderDetailDTO>> getOrderDetailsByStatus(
            @PathVariable com.iuh.fit.se.domain.enums.OrderStatus status) {
        List<OrderDetailDTO> orderDetails = orderDetailService.getOrderDetailsByStatus(status);
        return ResponseEntity.ok(orderDetails);
    }

    @GetMapping("/product/{productId}/revenue")
    public ResponseEntity<Double> calculateProductRevenue(@PathVariable Long productId) {
        Double revenue = orderDetailService.calculateProductRevenue(productId);
        return ResponseEntity.ok(revenue);
    }

    @GetMapping("/product/{productId}/quantity-sold")
    public ResponseEntity<Long> getTotalQuantitySold(@PathVariable Long productId) {
        Long quantity = orderDetailService.getTotalQuantitySold(productId);
        return ResponseEntity.ok(quantity);
    }

    @GetMapping("/best-selling")
    public ResponseEntity<List<Object[]>> getBestSellingProducts(@RequestParam(defaultValue = "10") int limit) {
        List<Object[]> bestSelling = orderDetailService.getBestSellingProducts(
                org.springframework.data.domain.PageRequest.of(0, limit)
        );
        return ResponseEntity.ok(bestSelling);
    }

    @GetMapping("/order/{orderId}/total")
    public ResponseEntity<Double> calculateOrderTotal(@PathVariable Long orderId) {
        Double total = orderDetailService.calculateOrderTotal(orderId);
        return ResponseEntity.ok(total);
    }

    @GetMapping("/order/{orderId}/count")
    public ResponseEntity<Long> countItemsInOrder(@PathVariable Long orderId) {
        Long count = orderDetailService.countItemsInOrder(orderId);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/popular-by-date")
    public ResponseEntity<List<Object[]>> getPopularProductsInDateRange(
            @RequestParam @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE) java.time.LocalDate startDate,
            @RequestParam @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE) java.time.LocalDate endDate,
            @RequestParam(defaultValue = "10") int limit) {
        List<Object[]> popular = orderDetailService.getPopularProductsInDateRange(startDate, endDate,
                org.springframework.data.domain.PageRequest.of(0, limit)
        );
        return ResponseEntity.ok(popular);
    }

    @GetMapping("/product/{productId}/frequently-bought-together")
    public ResponseEntity<List<Object[]>> getFrequentlyBoughtTogether(
            @PathVariable Long productId,
            @RequestParam(defaultValue = "5") int limit) {
        List<Object[]> frequentlyBought = orderDetailService.getFrequentlyBoughtTogether(productId,
                org.springframework.data.domain.PageRequest.of(0, limit)
        );
        return ResponseEntity.ok(frequentlyBought);
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<OrderDetailDTO>> getOrderDetailsByCategory(@PathVariable Long categoryId) {
        List<OrderDetailDTO> orderDetails = orderDetailService.getOrderDetailsByCategory(categoryId);
        return ResponseEntity.ok(orderDetails);
    }

    @GetMapping("/order/{orderId}/products")
    public ResponseEntity<List<OrderProductDetailDTO>> getOrderProductDetails(@PathVariable Long orderId) {
        List<OrderProductDetailDTO> productDetails = orderDetailService.getOrderProductDetails(orderId);
        return ResponseEntity.ok(productDetails);
    }
}
