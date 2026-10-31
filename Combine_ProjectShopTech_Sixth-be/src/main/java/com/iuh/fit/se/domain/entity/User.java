package com.iuh.fit.se.domain.entity;

import com.iuh.fit.se.domain.enums.Gender;
import com.iuh.fit.se.domain.enums.UserStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

/**
 * User
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
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User implements UserDetails{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String fullName;
    String password;
    String email;
    @Enumerated(EnumType.STRING)
    Gender gender;
    String address;
    String phoneNumber;
    LocalDate dob;
    @Enumerated(EnumType.STRING)
    UserStatus status;
    Long cumulativePoints;

    private Long numberOfPlaysAllowed;

    private Long numberOfGamesPlayed;

    @ManyToOne
    @JoinColumn(name = "role_id")
    Role role;

    @OneToMany(mappedBy = "user")
    Set<BookingAppointment> bookingAppointments;

    @OneToMany(mappedBy = "user")
    Set<Order> orders;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    Cart cart;

    @ManyToMany
    @JoinTable(
            name = "chat_customer_customers",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "chat_id")
    )
    private Set<ChatCustomerService> asCustomerChats ;

    // Những phiên chat mà user này là nhân viên CSKH
    @ManyToMany
    @JoinTable(
            name = "chat_customer_staffs",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "chat_id")
    )
    private Set<ChatCustomerService> asStaffChats ;

    @OneToMany(mappedBy = "user")
    Set<UserDiscount> userDiscounts;

    @OneToMany(mappedBy = "user")
    Set<ProductReview> productReviews;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    Set<UserFavorite> userFavorites;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getUsername() {
        return "";
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}