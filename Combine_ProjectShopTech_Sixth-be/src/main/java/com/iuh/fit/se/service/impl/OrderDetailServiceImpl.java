package com.iuh.fit.se.service.impl;

import com.iuh.fit.se.domain.dto.OrderDetailDTO;
import com.iuh.fit.se.domain.dto.OrderProductDetailDTO;
import com.iuh.fit.se.domain.entity.Order;
import com.iuh.fit.se.domain.entity.OrderDetail;
import com.iuh.fit.se.domain.entity.Product;
import com.iuh.fit.se.exception.AppException;
import com.iuh.fit.se.exception.ErrorCode;
import com.iuh.fit.se.repository.OrderDetailRepository;
import com.iuh.fit.se.repository.OrderRepository;
import com.iuh.fit.se.repository.ProductRepository;
import com.iuh.fit.se.service.OrderDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderDetailServiceImpl implements OrderDetailService {
    
    private final OrderDetailRepository orderDetailRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    @Override
    @Transactional
    public OrderDetailDTO createOrderDetail(OrderDetailDTO orderDetailDTO) {
        // Validate product exists and get current stock
        if (orderDetailDTO.getProductId() == null) {
            throw new AppException(ErrorCode.PRODUCT_NOT_FOUND);
        }
        
        Product product = productRepository.findById(orderDetailDTO.getProductId())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        
        // Check if product is active and has stock
        if (product.getQuantity() == null || product.getQuantity() <= 0) {
            throw new AppException(ErrorCode.PRODUCT_OUT_OF_STOCK);
        }
        
        // Validate requested quantity
        int requestedQuantityInt = orderDetailDTO.getAmount();
        if (requestedQuantityInt <= 0) {
            throw new AppException(ErrorCode.INSUFFICIENT_STOCK);
        }
        
        Long requestedQuantity = Long.valueOf(requestedQuantityInt);
        
        /**
         * ATOMIC STOCK DECREASE với điều kiện
         * 
         * Query: UPDATE Product SET quantity = quantity - :quantity 
         *        WHERE id = :productId AND quantity >= :quantity
         * 
         * Giải quyết 2 vấn đề:
         * 
         * 1. VẤN ĐỀ: Kho còn 20, khách order 21
         *    - Điều kiện: 20 >= 21 → FALSE
         *    - UPDATE không thực thi → rowsAffected = 0
         *    - Throw exception → BÁO LỖI, stock không âm ✅
         * 
         * 2. VẤN ĐỀ: Kho còn 1, 2 khách cùng đặt
         *    - Khách A (trước): 1 >= 1 → TRUE → UPDATE thành công → stock = 0
         *    - Khách B (sau): 0 >= 1 → FALSE → UPDATE fail → rowsAffected = 0
         *    - Khách B throw exception → BÁO LỖI ✅
         *    - Kết quả: Người nhấn trước thành công, người sau báo lỗi ✅
         * 
         * Ưu điểm:
         * - Atomic operation ở database level (không cần lock application)
         * - Không có race condition (điều kiện kiểm tra trong cùng 1 SQL)
         * - First commit wins (người đến trước thành công)
         * - Performance tốt (chỉ 1 câu SQL)
         */
        int rowsAffected = productRepository.decreaseProductQuantity(
                orderDetailDTO.getProductId(), 
                requestedQuantity
        );
        
        // Nếu rowsAffected = 0 → không đủ hàng
        // Có thể do: stock < requestedQuantity HOẶC đã bị khách khác mua trước
        if (rowsAffected == 0) {
            // Throw exception → transaction rollback → không tạo OrderDetail
            throw new AppException(ErrorCode.INSUFFICIENT_STOCK);
        }
        
        // Stock decreased successfully, now create order detail
        OrderDetail orderDetail = convertToEntity(orderDetailDTO);
        OrderDetail savedOrderDetail = orderDetailRepository.save(orderDetail);
        return convertToDTO(savedOrderDetail);
    }

    @Override
    public OrderDetailDTO updateOrderDetail(Long id, OrderDetailDTO orderDetailDTO) {
        OrderDetail orderDetail = orderDetailRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("OrderDetail not found with id: " + id));
        
        orderDetail.setAmount(orderDetailDTO.getAmount());
        orderDetail.setUnitPrice(orderDetailDTO.getUnitPrice());
        
        if (orderDetailDTO.getOrderId() != null) {
            Order order = orderRepository.findById(orderDetailDTO.getOrderId())
                    .orElseThrow(() -> new RuntimeException("Order not found"));
            orderDetail.setOrder(order);
        }
        
        if (orderDetailDTO.getProductId() != null) {
            Product product = productRepository.findById(orderDetailDTO.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            orderDetail.setProduct(product);
        }
        
        OrderDetail updatedOrderDetail = orderDetailRepository.save(orderDetail);
        return convertToDTO(updatedOrderDetail);
    }

    @Override
    public void deleteOrderDetail(Long id) {
        orderDetailRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public OrderDetailDTO getOrderDetailById(Long id) {
        OrderDetail orderDetail = orderDetailRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("OrderDetail not found with id: " + id));
        return convertToDTO(orderDetail);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDetailDTO> getAllOrderDetails() {
        return orderDetailRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDetailDTO> getOrderDetailsByOrder(Long orderId) {
        return orderDetailRepository.findByOrderId(orderId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDetailDTO> getOrderDetailsByProduct(Long productId) {
        return orderDetailRepository.findByProductId(productId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDetailDTO> getOrderDetailsByUser(Long userId) {
        return orderDetailRepository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDetailDTO> getOrderDetailsByStatus(com.iuh.fit.se.domain.enums.OrderStatus status) {
        return orderDetailRepository.findByOrderStatus(status).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Double calculateProductRevenue(Long productId) {
        Double revenue = orderDetailRepository.calculateProductRevenue(productId);
        return revenue != null ? revenue : 0.0;
    }

    @Override
    @Transactional(readOnly = true)
    public Long getTotalQuantitySold(Long productId) {
        Long quantity = orderDetailRepository.getTotalQuantitySold(productId);
        return quantity != null ? quantity : 0L;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Object[]> getBestSellingProducts(org.springframework.data.domain.Pageable pageable) {
        return orderDetailRepository.findBestSellingProducts(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Double calculateOrderTotal(Long orderId) {
        Double total = orderDetailRepository.calculateOrderTotal(orderId);
        return total != null ? total : 0.0;
    }

    @Override
    @Transactional(readOnly = true)
    public Long countItemsInOrder(Long orderId) {
        return orderDetailRepository.countItemsInOrder(orderId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Object[]> getPopularProductsInDateRange(java.time.LocalDate startDate, java.time.LocalDate endDate, 
                                                        org.springframework.data.domain.Pageable pageable) {
        return orderDetailRepository.findPopularProductsInDateRange(startDate, endDate, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Object[]> getFrequentlyBoughtTogether(Long productId, org.springframework.data.domain.Pageable pageable) {
        return orderDetailRepository.findFrequentlyBoughtTogether(productId, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDetailDTO> getOrderDetailsByCategory(Long categoryId) {
        return orderDetailRepository.findByCategoryId(categoryId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private OrderDetailDTO convertToDTO(OrderDetail orderDetail) {
        OrderDetailDTO dto = new OrderDetailDTO();
        dto.setId(orderDetail.getId());
        dto.setAmount(orderDetail.getAmount());
        dto.setUnitPrice(orderDetail.getUnitPrice());
        
        if (orderDetail.getOrder() != null) {
            dto.setOrderId(orderDetail.getOrder().getId());
        }
        
        if (orderDetail.getProduct() != null) {
            dto.setProductId(orderDetail.getProduct().getId());
        }
        
        return dto;
    }

    private OrderDetail convertToEntity(OrderDetailDTO dto) {
        OrderDetail orderDetail = new OrderDetail();
        orderDetail.setAmount(dto.getAmount());
        orderDetail.setUnitPrice(dto.getUnitPrice());
        
        if (dto.getOrderId() != null) {
            Order order = orderRepository.findById(dto.getOrderId())
                    .orElseThrow(() -> new RuntimeException("Order not found"));
            orderDetail.setOrder(order);
        }
        
        if (dto.getProductId() != null) {
            Product product = productRepository.findById(dto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            orderDetail.setProduct(product);
        }
        
        return orderDetail;
    }

    private OrderProductDetailDTO convertToOrderProductDetailDTO(Object[] result) {
        OrderProductDetailDTO dto = new OrderProductDetailDTO();
        dto.setOrderDetailId((Long) result[0]);
        dto.setAmount((Integer) result[1]);
        dto.setPricePerUnit((Double) result[2]);
        dto.setProductId((Long) result[3]);
        dto.setProductName((String) result[4]);
        dto.setDescription((String) result[5]);
        dto.setProductUnitPrice((Double) result[6]);
        dto.setImageUrl((String) result[7]);
        dto.setCategoryName((String) result[8]);
        return dto;
    }

    //lay danh sach san pham theo hoa don
    @Override
    @Transactional(readOnly = true)
    public List<OrderProductDetailDTO> getOrderProductDetails(Long orderId) {
        List<Object[]> results = orderDetailRepository.findOrderProductDetails(orderId);
        return results.stream()
                .map(this::convertToOrderProductDetailDTO)
                .collect(Collectors.toList());
    }

}
