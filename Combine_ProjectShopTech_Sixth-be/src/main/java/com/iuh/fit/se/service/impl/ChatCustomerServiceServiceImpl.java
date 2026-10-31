package com.iuh.fit.se.service.impl;

import com.iuh.fit.se.domain.dto.ChatCustomerServiceDTO;
import com.iuh.fit.se.domain.entity.ChatCustomerService;
import com.iuh.fit.se.domain.entity.User;
import com.iuh.fit.se.domain.enums.ChatStatus;
import com.iuh.fit.se.repository.ChatCustomerServiceRepository;
import com.iuh.fit.se.repository.UserRepository;
import com.iuh.fit.se.service.ChatCustomerServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ChatCustomerServiceServiceImpl implements ChatCustomerServiceService {
    
    private final ChatCustomerServiceRepository chatRepository;
    private final UserRepository userRepository;

    @Override
    public ChatCustomerServiceDTO createChatSession(ChatCustomerServiceDTO chatDTO) {
        ChatCustomerService chat = convertToEntity(chatDTO);
        ChatCustomerService savedChat = chatRepository.save(chat);
        return convertToDTO(savedChat);
    }

    @Override
    public ChatCustomerServiceDTO updateChatSession(Long id, ChatCustomerServiceDTO chatDTO) {
        ChatCustomerService chat = chatRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Chat session not found with id: " + id));
        
        chat.setStartTime(chatDTO.getStartTime());
        chat.setEndTime(chatDTO.getEndTime());
        chat.setStatus(chatDTO.getStatus());
        
        if (chatDTO.getCustomerIds() != null) {
            Set<User> customers = new HashSet<>();
            for (Long userId : chatDTO.getCustomerIds()) {
                User user = userRepository.findById(userId)
                        .orElseThrow(() -> new RuntimeException("User not found"));
                customers.add(user);
            }
            chat.setCustomers(customers);
        }
        
        if (chatDTO.getStaffIds() != null) {
            Set<User> staffs = new HashSet<>();
            for (Long userId : chatDTO.getStaffIds()) {
                User user = userRepository.findById(userId)
                        .orElseThrow(() -> new RuntimeException("User not found"));
                staffs.add(user);
            }
            chat.setStaffs(staffs);
        }
        
        ChatCustomerService updatedChat = chatRepository.save(chat);
        return convertToDTO(updatedChat);
    }

    @Override
    public void deleteChatSession(Long id) {
        chatRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public ChatCustomerServiceDTO getChatSessionById(Long id) {
        ChatCustomerService chat = chatRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Chat session not found with id: " + id));
        return convertToDTO(chat);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ChatCustomerServiceDTO> getAllChatSessions() {
        return chatRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ChatCustomerServiceDTO> getChatSessionsByStatus(ChatStatus status) {
        return chatRepository.findByStatus(status).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ChatCustomerServiceDTO> getChatSessionsByCustomer(Long customerId) {
        return chatRepository.findByCustomerId(customerId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ChatCustomerServiceDTO> getChatSessionsByStaff(Long staffId) {
        return chatRepository.findByStaffId(staffId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void updateChatStatus(Long sessionId, ChatStatus status) {
        ChatCustomerService chat = chatRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Chat session not found"));
        chat.setStatus(status);
        chatRepository.save(chat);
    }

    @Override
    public void assignStaffToChat(Long sessionId, Long staffId) {
        ChatCustomerService chat = chatRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Chat session not found"));
        
        User staff = userRepository.findById(staffId)
                .orElseThrow(() -> new RuntimeException("Staff not found"));
        
        if (chat.getStaffs() == null) {
            chat.setStaffs(new HashSet<>());
        }
        chat.getStaffs().add(staff);
        chatRepository.save(chat);
    }

    private ChatCustomerServiceDTO convertToDTO(ChatCustomerService chat) {
        ChatCustomerServiceDTO dto = new ChatCustomerServiceDTO();
        dto.setSessionId(chat.getSessionId());
        dto.setStartTime(chat.getStartTime());
        dto.setEndTime(chat.getEndTime());
        dto.setStatus(chat.getStatus());
        
        if (chat.getCustomers() != null) {
            Set<Long> customerIds = chat.getCustomers().stream()
                    .map(User::getId)
                    .collect(Collectors.toSet());
            dto.setCustomerIds(customerIds);
        }
        
        if (chat.getStaffs() != null) {
            Set<Long> staffIds = chat.getStaffs().stream()
                    .map(User::getId)
                    .collect(Collectors.toSet());
            dto.setStaffIds(staffIds);
        }
        
        return dto;
    }

    private ChatCustomerService convertToEntity(ChatCustomerServiceDTO dto) {
        ChatCustomerService chat = new ChatCustomerService();
        chat.setStartTime(dto.getStartTime());
        chat.setEndTime(dto.getEndTime());
        chat.setStatus(dto.getStatus());
        
        if (dto.getCustomerIds() != null) {
            Set<User> customers = new HashSet<>();
            for (Long userId : dto.getCustomerIds()) {
                User user = userRepository.findById(userId)
                        .orElseThrow(() -> new RuntimeException("User not found"));
                customers.add(user);
            }
            chat.setCustomers(customers);
        }
        
        if (dto.getStaffIds() != null) {
            Set<User> staffs = new HashSet<>();
            for (Long userId : dto.getStaffIds()) {
                User user = userRepository.findById(userId)
                        .orElseThrow(() -> new RuntimeException("User not found"));
                staffs.add(user);
            }
            chat.setStaffs(staffs);
        }
        
        return chat;
    }
}
