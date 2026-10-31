package com.iuh.fit.se.domain.entity;

import com.iuh.fit.se.domain.enums.OrderStatus;
import com.iuh.fit.se.domain.enums.PaymentMethod;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

/**
 * Order
 * <p>
 * Provides business logic for managing employment details.
 * <p>
 * Version 1.0
 * Date: 05/09/2025
 * <p>
 * Copyright
 * <p>
 * Modification Logs:
 * DATE         AUTHOR       DESCRIPTION
 * -------------------------------------
 * 05/09/2025      ASUS      Create
 */
@Entity
@Table(name = "orders")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    Double paymentFee;
    Double totalPrice;
    LocalDate createdDate;
    LocalDateTime shippedDate;
    String deliveryAddress;
    @Enumerated(EnumType.STRING)
    OrderStatus status;
    String notes;
    Long usedPoint;
    LocalDate usedAt;
    @Enumerated(EnumType.STRING)
    PaymentMethod paymentMethod;

    @OneToMany(mappedBy = "order")
    Set<OrderDetail> orderDetails;

    // Khách có tài khoản (BẮT BUỘC - chỉ khách có tài khoản mới được đặt hàng)
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;

}
