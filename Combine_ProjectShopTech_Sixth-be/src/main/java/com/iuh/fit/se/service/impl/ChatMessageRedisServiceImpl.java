// package com.iuh.fit.se.service.impl;

// import com.iuh.fit.se.domain.dto.ChatMessageDTO;
// import com.iuh.fit.se.domain.entity.ChatCustomerService;
// import com.iuh.fit.se.domain.enums.ChatStatus;
// import com.iuh.fit.se.repository.ChatCustomerServiceRepository;
// import com.iuh.fit.se.service.ChatMessageRedisService;
// import lombok.RequiredArgsConstructor;
// import org.springframework.data.redis.core.RedisTemplate;
// import org.springframework.stereotype.Service;

// import java.time.LocalDateTime;
// import java.util.List;
// import java.util.Set;
// import java.util.stream.Collectors;

// @Service
// @RequiredArgsConstructor
// public class ChatMessageRedisServiceImpl implements ChatMessageRedisService {

//     private static final String CHAT_KEY_PREFIX = "chat:session:";

//     private final RedisTemplate<String, Object> redisTemplate;
//     private final ChatCustomerServiceRepository chatCustomerServiceRepository;

//     private String getKey(Long sessionId) {
//         return CHAT_KEY_PREFIX + sessionId;
//     }

//     // ✅ Lưu tin nhắn vào Redis list
//     @Override
//     public void saveMessage(ChatMessageDTO message) {
// //        if (message == null || message.getSessionId() == null) {
// //            throw new IllegalArgumentException("Message and sessionId must not be null");
// //        }
// //        String key = CHAT_KEY_PREFIX + message.getSessionId();
// //        redisTemplate.opsForList().rightPush(key, message);
//     }

//     // ✅ Lấy toàn bộ lịch sử chat theo sessionId
//     @Override
//     public List<ChatMessageDTO> getMessages(Long sessionId) {
//         String key = CHAT_KEY_PREFIX + sessionId;
//         List<Object> raw = redisTemplate.opsForList().range(key, 0, -1);
//         return raw == null ? List.of() : raw.stream()
//                 .filter(o -> o instanceof ChatMessageDTO)
//                 .map(o -> (ChatMessageDTO) o)
//                 .toList();
//     }

//     @Override
//     public List<String> getAllSessionKeys() {
//         try {
//             Set<String> keys = redisTemplate.keys(CHAT_KEY_PREFIX + "*");
//             if (keys == null || keys.isEmpty()) {
//                 return List.of();
//             }
//             return keys.stream().sorted().collect(Collectors.toList());
//         } catch (Exception e) {
//             System.err.println("❌ [Redis] Failed to list sessions: " + e.getMessage());
//             return List.of();
//         }
//     }

//     @Override
//     public void removeSession(Long sessionId) {
//         String redisKey = getKey(sessionId);
//         try {
//             redisTemplate.delete(redisKey);
//             chatCustomerServiceRepository.findByRedisSessionId(redisKey).ifPresent(session -> {
//                 session.setEndTime(LocalDateTime.now());
//                 session.setStatus(ChatStatus.CLOSED);
//                 chatCustomerServiceRepository.save(session);
//             });
//             System.out.println("🗑️ [Redis] Removed session " + sessionId);
//         } catch (Exception e) {
//             System.err.println("❌ [Redis] Failed to remove session: " + e.getMessage());
//         }
//     }

//     private void synchronizeChatSession(String redisKey, ChatMessageDTO message) {
// //        LocalDateTime timestamp = message.getTimestamp() != null ? message.getTimestamp() : LocalDateTime.now();
// //
// //        chatCustomerServiceRepository.findByRedisSessionId(redisKey)
// //                .ifPresentOrElse(session -> updateExistingSession(session, timestamp),
// //                        () -> createNewSession(redisKey, timestamp));
//     }

//     private void updateExistingSession(ChatCustomerService session, LocalDateTime timestamp) {
//         boolean updated = false;

//         if (session.getStartTime() == null) {
//             session.setStartTime(timestamp);
//             updated = true;
//         }

//         if (session.getStatus() == null || ChatStatus.CLOSED.equals(session.getStatus())) {
//             session.setStatus(ChatStatus.ACTIVE);
//             updated = true;
//         }

//         if (Boolean.TRUE.equals(session.getIsGuestChat()) && session.getEndTime() != null) {
//             session.setEndTime(null);
//             updated = true;
//         }

//         if (updated) {
//             chatCustomerServiceRepository.save(session);
//         }
//     }

//     private void createNewSession(String redisKey, LocalDateTime timestamp) {
//         ChatCustomerService session = new ChatCustomerService();
//         session.setRedisSessionId(redisKey);
//         session.setStartTime(timestamp);
//         session.setStatus(ChatStatus.ACTIVE);
//         session.setIsGuestChat(Boolean.TRUE);
//         chatCustomerServiceRepository.save(session);
//         System.out.println("🆕 [Redis] Registered new chat session with key " + redisKey);
//     }
// }