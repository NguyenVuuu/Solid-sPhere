package com.iuh.fit.se.domain.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "chat_sessions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChatSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(unique = true)
    String sessionCode;

    String guestName;
    String guestPhone;

    LocalDateTime startedAt = LocalDateTime.now();
    LocalDateTime endedAt;
    String status = "ACTIVE"; // ACTIVE / CLOSED

    // Gán nhân viên đang phụ trách cuộc chat
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "staff_id")
    User staff;

    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    Set<Message> messages = new HashSet<>();

    // 🔹 Trạng thái chưa đọc
    Boolean unread = false;
}