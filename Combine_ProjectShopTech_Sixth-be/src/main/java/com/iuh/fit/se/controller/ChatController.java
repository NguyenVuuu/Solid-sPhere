package com.iuh.fit.se.controller;

import com.iuh.fit.se.domain.dto.GuestRequestDTO;
import com.iuh.fit.se.domain.entity.ChatSession;
import com.iuh.fit.se.repository.ChatSessionRepository;
import com.iuh.fit.se.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"}, allowCredentials = "true", maxAge = 3600)
public class ChatController {

    private final ChatSessionRepository chatRepo;
    private final MessageRepository messageRepo;
    private final SimpMessagingTemplate messagingTemplate;

    @PostMapping("/start")
    public ResponseEntity<?> startChat(@RequestBody GuestRequestDTO req) {
        ChatSession chat = new ChatSession();
        chat.setGuestName(req.getFullName());
        chat.setGuestPhone(req.getPhoneNumber());
        chat.setSessionCode("CHAT_" + System.currentTimeMillis());
        chatRepo.save(chat);

        messagingTemplate.convertAndSend("/topic/chat/global", Map.of(
                "type", "NEW_SESSION",
                "sessionCode", chat.getSessionCode(),
                "guestName", chat.getGuestName(),
                "guestPhone", chat.getGuestPhone()
        ));

        return ResponseEntity.ok(Map.of(
                "chatId", chat.getId(),
                "sessionCode", chat.getSessionCode(),
                "message", "Tạo phiên chat thành công"
        ));
    }

    @GetMapping("/active")
    public ResponseEntity<?> getActiveChats() {
        return ResponseEntity.ok(chatRepo.findByStatusOrderByStartedAtDesc("ACTIVE"));
    }

    @GetMapping("/{sessionId}/messages")
    public ResponseEntity<?> getMessages(@PathVariable Long sessionId) {
        var session = chatRepo.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        var messages = messageRepo.findBySessionOrderBySentAtAsc(session);
        return ResponseEntity.ok(messages);
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<Void> markAsRead(@PathVariable Long id) {
        ChatSession session = chatRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Chat session not found"));
        session.setUnread(false);
        chatRepo.save(session);
        return ResponseEntity.ok().build();
    }
}