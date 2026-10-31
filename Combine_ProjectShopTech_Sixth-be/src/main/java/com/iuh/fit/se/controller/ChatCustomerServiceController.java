package com.iuh.fit.se.controller;

import com.iuh.fit.se.domain.dto.ChatCustomerServiceDTO;
import com.iuh.fit.se.domain.enums.ChatStatus;
import com.iuh.fit.se.service.ChatCustomerServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chats")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ChatCustomerServiceController {
    
    private final ChatCustomerServiceService chatService;

    @PostMapping
    public ResponseEntity<ChatCustomerServiceDTO> createChatSession(@RequestBody ChatCustomerServiceDTO chatDTO) {
        ChatCustomerServiceDTO createdChat = chatService.createChatSession(chatDTO);
        return new ResponseEntity<>(createdChat, HttpStatus.CREATED);
    }
    

    @PutMapping("/{id}")
    public ResponseEntity<ChatCustomerServiceDTO> updateChatSession(@PathVariable Long id, @RequestBody ChatCustomerServiceDTO chatDTO) {
        ChatCustomerServiceDTO updatedChat = chatService.updateChatSession(id, chatDTO);
        return ResponseEntity.ok(updatedChat);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChatSession(@PathVariable Long id) {
        chatService.deleteChatSession(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChatCustomerServiceDTO> getChatSessionById(@PathVariable Long id) {
        ChatCustomerServiceDTO chat = chatService.getChatSessionById(id);
        return ResponseEntity.ok(chat);
    }

    @GetMapping
    public ResponseEntity<List<ChatCustomerServiceDTO>> getAllChatSessions() {
        List<ChatCustomerServiceDTO> chats = chatService.getAllChatSessions();
        return ResponseEntity.ok(chats);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ChatCustomerServiceDTO>> getChatSessionsByStatus(@PathVariable ChatStatus status) {
        List<ChatCustomerServiceDTO> chats = chatService.getChatSessionsByStatus(status);
        return ResponseEntity.ok(chats);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<ChatCustomerServiceDTO>> getChatSessionsByCustomer(@PathVariable Long customerId) {
        List<ChatCustomerServiceDTO> chats = chatService.getChatSessionsByCustomer(customerId);
        return ResponseEntity.ok(chats);
    }

    @GetMapping("/staff/{staffId}")
    public ResponseEntity<List<ChatCustomerServiceDTO>> getChatSessionsByStaff(@PathVariable Long staffId) {
        List<ChatCustomerServiceDTO> chats = chatService.getChatSessionsByStaff(staffId);
        return ResponseEntity.ok(chats);
    }

    @PatchMapping("/{sessionId}/status")
    public ResponseEntity<Void> updateChatStatus(@PathVariable Long sessionId, @RequestParam ChatStatus status) {
        chatService.updateChatStatus(sessionId, status);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{sessionId}/assign-staff/{staffId}")
    public ResponseEntity<Void> assignStaffToChat(@PathVariable Long sessionId, @PathVariable Long staffId) {
        chatService.assignStaffToChat(sessionId, staffId);
        return ResponseEntity.ok().build();
    }
}
