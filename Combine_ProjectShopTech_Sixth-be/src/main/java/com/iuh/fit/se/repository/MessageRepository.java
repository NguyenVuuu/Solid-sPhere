package com.iuh.fit.se.repository;

import com.iuh.fit.se.domain.entity.ChatSession;
import com.iuh.fit.se.domain.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySessionOrderBySentAtAsc(ChatSession session);
}