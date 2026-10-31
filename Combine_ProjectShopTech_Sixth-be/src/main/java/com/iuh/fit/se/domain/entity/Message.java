package com.iuh.fit.se.domain.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id")
    @JsonBackReference
    ChatSession session;

    @Column(length = 20)
    String senderType; // CUSTOMER / STAFF / SYSTEM

    String senderName;

    @Column(columnDefinition = "TEXT")
    String content;

    LocalDateTime sentAt = LocalDateTime.now();
}