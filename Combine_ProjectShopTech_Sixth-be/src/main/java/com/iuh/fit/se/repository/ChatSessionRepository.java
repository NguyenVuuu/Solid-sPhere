package com.iuh.fit.se.repository;

import com.iuh.fit.se.domain.entity.ChatSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatSessionRepository extends JpaRepository<ChatSession, Long> {
    Optional<ChatSession> findBySessionCode(String sessionCode);
    List<ChatSession> findByStatusOrderByStartedAtDesc(String status);
}