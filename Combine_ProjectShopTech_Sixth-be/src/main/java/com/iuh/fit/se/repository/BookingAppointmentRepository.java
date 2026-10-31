package com.iuh.fit.se.repository;

import com.iuh.fit.se.domain.entity.BookingAppointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingAppointmentRepository extends JpaRepository<BookingAppointment, Long> {
    List<BookingAppointment> findByUserId(Long userId);
    
    List<BookingAppointment> findByExpectedArrivalBetween(LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT ba FROM BookingAppointment ba WHERE ba.expectedArrival >= ?1 ORDER BY ba.expectedArrival ASC")
    List<BookingAppointment> findUpcomingAppointments(LocalDateTime fromDate);
    
    // Find today's appointments
    @Query("SELECT ba FROM BookingAppointment ba WHERE DATE(ba.expectedArrival) = CURRENT_DATE ORDER BY ba.expectedArrival")
    List<BookingAppointment> findTodayAppointments();
    
    // Find past appointments
    @Query("SELECT ba FROM BookingAppointment ba WHERE ba.expectedArrival < CURRENT_TIMESTAMP ORDER BY ba.expectedArrival DESC")
    List<BookingAppointment> findPastAppointments();
    
    // Find appointments by user and date range
    @Query("SELECT ba FROM BookingAppointment ba WHERE ba.user.id = :userId " +
           "AND ba.expectedArrival BETWEEN :startDate AND :endDate ORDER BY ba.expectedArrival")
    List<BookingAppointment> findByUserAndDateRange(@Param("userId") Long userId,
                                                      @Param("startDate") LocalDateTime startDate,
                                                      @Param("endDate") LocalDateTime endDate);
    
    // Count appointments by date
    @Query("SELECT COUNT(ba) FROM BookingAppointment ba WHERE DATE(ba.expectedArrival) = DATE(:date)")
    Long countByDate(@Param("date") LocalDateTime date);
    
    // Find appointments for next N days
    @Query("SELECT ba FROM BookingAppointment ba WHERE ba.expectedArrival BETWEEN CURRENT_TIMESTAMP AND :endDate " +
           "ORDER BY ba.expectedArrival")
    List<BookingAppointment> findAppointmentsForNextDays(@Param("endDate") LocalDateTime endDate);
    
    // Find user's latest appointment
    @Query("SELECT ba FROM BookingAppointment ba WHERE ba.user.id = :userId " +
           "ORDER BY ba.expectedArrival DESC")
    List<BookingAppointment> findLatestByUser(@Param("userId") Long userId,
                                               org.springframework.data.domain.Pageable pageable);
    
    // Count user's total appointments
    @Query("SELECT COUNT(ba) FROM BookingAppointment ba WHERE ba.user.id = :userId")
    Long countByUserId(@Param("userId") Long userId);
    
    // Find appointments by notes keyword
    @Query("SELECT ba FROM BookingAppointment ba WHERE ba.notes LIKE %:keyword%")
    List<BookingAppointment> searchByNotes(@Param("keyword") String keyword);
    
    // Find appointments with no notes
    @Query("SELECT ba FROM BookingAppointment ba WHERE ba.notes IS NULL OR ba.notes = ''")
    List<BookingAppointment> findWithoutNotes();
    
    // Count appointments this week
    @Query("SELECT COUNT(ba) FROM BookingAppointment ba WHERE WEEK(ba.expectedArrival) = WEEK(CURRENT_DATE)")
    Long countThisWeekAppointments();
    
    // Count appointments this month
    @Query("SELECT COUNT(ba) FROM BookingAppointment ba WHERE MONTH(ba.expectedArrival) = MONTH(CURRENT_DATE) " +
           "AND YEAR(ba.expectedArrival) = YEAR(CURRENT_DATE)")
    Long countThisMonthAppointments();
}
