package com.iuh.fit.se.controller;

import com.iuh.fit.se.domain.dto.ChatMessageDTO;
import com.iuh.fit.se.domain.dto.ChatMessageResponseDTO;
import com.iuh.fit.se.domain.entity.ChatSession;
import com.iuh.fit.se.domain.entity.Message;
import com.iuh.fit.se.repository.ChatSessionRepository;
import com.iuh.fit.se.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class ChatWebSocketController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatSessionRepository sessionRepo;
    private final MessageRepository messageRepo;

    @MessageMapping("/chat.sendMessage")
    public void sendMessage(ChatMessageDTO dto) {
        ChatSession session = sessionRepo.findById(dto.getChatId())
                .orElseThrow(() -> new RuntimeException("Chat session not found"));

        Message message = new Message();
        message.setSession(session);
        message.setSenderType(dto.getSenderType()); // CUSTOMER / STAFF
        message.setSenderName(dto.getSenderName());
        message.setContent(dto.getContent());
        message.setSentAt(LocalDateTime.now());
        messageRepo.save(message);

        // 🔹 Nếu khách gửi tin thì đánh dấu session có tin chưa đọc
        if ("CUSTOMER".equalsIgnoreCase(dto.getSenderType())) {
            session.setUnread(true);
            sessionRepo.save(session);
        }

        messagingTemplate.convertAndSend(
                "/topic/chat/" + session.getSessionCode(),
                new ChatMessageResponseDTO(
                        message.getId(),
                        dto.getSenderType(),
                        dto.getSenderName(),
                        dto.getContent(),
                        message.getSentAt()
                )
        );

        messagingTemplate.convertAndSend("/topic/chat/global", Map.of(
                "type", "NEW_MESSAGE",
                "sessionCode", session.getSessionCode(),
                "senderType", dto.getSenderType(),
                "senderName", dto.getSenderName(),
                "content", dto.getContent(),
                "sentAt", message.getSentAt()
        ));
    }
}