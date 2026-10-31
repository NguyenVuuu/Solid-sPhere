package com.iuh.fit.se.domain.entity;

import com.iuh.fit.se.domain.enums.ChatStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Set;

/**
 * ChatCustomerService
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
@Table(name = "chat_customer_services")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChatCustomerService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long sessionId;
    LocalDateTime startTime;
    LocalDateTime endTime;
    @Enumerated(EnumType.STRING)
    ChatStatus status;

    @ManyToMany(mappedBy = "asCustomerChats")
    private Set<User> customers ;

    // Nhân viên CSKH tham gia phiên chat này
    @ManyToMany(mappedBy = "asStaffChats")
    private Set<User> staffs ;
    
    // Thông tin khách vãng lai (không có tài khoản)
    String guestName;
    String guestEmail;
    String guestIdentifier; // Session ID, cookie, hoặc device ID để tracking
    Boolean isGuestChat; // true = khách vãng lai, false/null = khách có tài khoản
}
