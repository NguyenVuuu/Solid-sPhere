package com.iuh.fit.se.domain.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.iuh.fit.se.domain.enums.ProductStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;


@Entity
@Table(name = "products")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String name;
    String description;
    Double unitPrice;
    String imageUrl;
    Long quantity;
    Double percentage;
    @Enumerated(EnumType.STRING)
    ProductStatus status;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    Set<OrderDetail> orderDetails;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    Set<ProductReview> productReviews;

    @OneToOne(mappedBy = "product", fetch = FetchType.LAZY)
    @JsonBackReference
    Discount discount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    @JsonIgnore
    Category category;

    // Quan hệ với CartItem - một Product có thể có nhiều CartItem
    @OneToMany(mappedBy = "product", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    @JsonIgnore
    Set<CartItem> cartItems;

    // Quan hệ với UserFavorite - một Product có thể được nhiều user yêu thích
    @OneToMany(mappedBy = "product", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    @JsonIgnore
    Set<UserFavorite> userFavorites;
}
