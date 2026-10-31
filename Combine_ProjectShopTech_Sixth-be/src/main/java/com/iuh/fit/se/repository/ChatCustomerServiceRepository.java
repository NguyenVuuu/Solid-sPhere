package com.iuh.fit.se.repository;

import com.iuh.fit.se.domain.entity.ChatCustomerService;
import com.iuh.fit.se.domain.enums.ChatStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ChatCustomerServiceRepository extends JpaRepository<ChatCustomerService, Long> {
    List<ChatCustomerService> findByStatus(ChatStatus status);
    
    @Query("SELECT c FROM ChatCustomerService c JOIN c.customers u WHERE u.id = ?1")
    List<ChatCustomerService> findByCustomerId(Long customerId);
    
    @Query("SELECT c FROM ChatCustomerService c JOIN c.staffs u WHERE u.id = ?1")
    List<ChatCustomerService> findByStaffId(Long staffId);
    
    // Find active chat sessions
    @Query("SELECT c FROM ChatCustomerService c WHERE c.status = 'ACTIVE' ORDER BY c.startTime DESC")
    List<ChatCustomerService> findActiveChats();
    
    // Find pending chat sessions
    @Query("SELECT c FROM ChatCustomerService c WHERE c.status = 'PENDING' ORDER BY c.startTime")
    List<ChatCustomerService> findPendingChats();
    
    // Find chats within time range
    @Query("SELECT c FROM ChatCustomerService c WHERE c.startTime BETWEEN :startTime AND :endTime " +
           "ORDER BY c.startTime DESC")
    List<ChatCustomerService> findByTimeRange(@Param("startTime") LocalDateTime startTime,
                                               @Param("endTime") LocalDateTime endTime);
    
    // Find long-running chats (active for more than X minutes)
    @Query("SELECT c FROM ChatCustomerService c WHERE c.status = 'ACTIVE' " +
           "AND FUNCTION('TIMESTAMPDIFF', MINUTE, c.startTime, CURRENT_TIMESTAMP) > :minutes")
    List<ChatCustomerService> findLongRunningChats(@Param("minutes") Integer minutes);
    
    // Count chats by status
    @Query("SELECT COUNT(c) FROM ChatCustomerService c WHERE c.status = :status")
    Long countByStatus(@Param("status") ChatStatus status);
    
    // Find closed chats
    @Query("SELECT c FROM ChatCustomerService c WHERE c.status = 'CLOSED' AND c.endTime IS NOT NULL " +
           "ORDER BY c.endTime DESC")
    List<ChatCustomerService> findClosedChats();
    
    // Find chats that need attention (pending for too long)
    @Query("SELECT c FROM ChatCustomerService c WHERE c.status = 'PENDING' " +
           "AND FUNCTION('TIMESTAMPDIFF', MINUTE, c.startTime, CURRENT_TIMESTAMP) > :minutes")
    List<ChatCustomerService> findPendingTooLong(@Param("minutes") Integer minutes);
    
    // Close chat session
    @Modifying
    @Query("UPDATE ChatCustomerService c SET c.status = 'CLOSED', c.endTime = CURRENT_TIMESTAMP " +
           "WHERE c.sessionId = :sessionId")
    int closeChat(@Param("sessionId") Long sessionId);
    
    // Average chat duration
    @Query("SELECT AVG(CAST(FUNCTION('TIMESTAMPDIFF', MINUTE, c.startTime, c.endTime) AS double)) " +
           "FROM ChatCustomerService c WHERE c.status = 'CLOSED' AND c.endTime IS NOT NULL")
    Double getAverageChatDuration();
    
    // Count today's chats
    @Query("SELECT COUNT(c) FROM ChatCustomerService c WHERE DATE(c.startTime) = CURRENT_DATE")
    Long countTodayChats();
    
    // Find staff with most chats
    @Query("SELECT s.id, s.fullName, COUNT(c) FROM ChatCustomerService c " +
           "JOIN c.staffs s GROUP BY s.id, s.fullName ORDER BY COUNT(c) DESC")
    List<Object[]> findStaffWithMostChats(org.springframework.data.domain.Pageable pageable);
    
    // Find customer's chat history
    @Query("SELECT c FROM ChatCustomerService c JOIN c.customers u WHERE u.id = :customerId " +
           "ORDER BY c.startTime DESC")
    List<ChatCustomerService> findCustomerChatHistory(@Param("customerId") Long customerId);
    
    // Count chats this week
    @Query("SELECT COUNT(c) FROM ChatCustomerService c WHERE WEEK(c.startTime) = WEEK(CURRENT_DATE)")
    Long countThisWeekChats();
}
