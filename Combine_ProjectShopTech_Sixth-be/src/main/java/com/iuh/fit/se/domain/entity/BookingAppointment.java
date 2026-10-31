package com.iuh.fit.se.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

/**
 * BookingAppointment
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
@Table(name = "booking_appointments")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingAppointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String notes;
    LocalDateTime expectedArrival;

    // Khách có tài khoản
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    User user;
    
    // Thông tin khách vãng lai (không có tài khoản)
    String guestName;
    String guestEmail;
    String guestPhone;
    Boolean isGuestBooking; // true = khách vãng lai, false/null = khách có tài khoản
}
