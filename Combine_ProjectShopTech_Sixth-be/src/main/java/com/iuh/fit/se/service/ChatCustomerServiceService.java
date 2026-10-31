package com.iuh.fit.se.service;

import com.iuh.fit.se.domain.dto.ChatCustomerServiceDTO;
import com.iuh.fit.se.domain.enums.ChatStatus;

import java.util.List;

public interface ChatCustomerServiceService {
    ChatCustomerServiceDTO createChatSession(ChatCustomerServiceDTO chatDTO);
    ChatCustomerServiceDTO updateChatSession(Long id, ChatCustomerServiceDTO chatDTO);
    void deleteChatSession(Long id);
    ChatCustomerServiceDTO getChatSessionById(Long id);
    List<ChatCustomerServiceDTO> getAllChatSessions();
    List<ChatCustomerServiceDTO> getChatSessionsByStatus(ChatStatus status);
    List<ChatCustomerServiceDTO> getChatSessionsByCustomer(Long customerId);
    List<ChatCustomerServiceDTO> getChatSessionsByStaff(Long staffId);
    void updateChatStatus(Long sessionId, ChatStatus status);
    void assignStaffToChat(Long sessionId, Long staffId);
}
