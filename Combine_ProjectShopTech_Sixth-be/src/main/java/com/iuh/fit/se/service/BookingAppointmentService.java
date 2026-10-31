package com.iuh.fit.se.service;

import com.iuh.fit.se.domain.dto.BookingAppointmentDTO;

import java.time.LocalDateTime;
import java.util.List;

public interface BookingAppointmentService {
    BookingAppointmentDTO createAppointment(BookingAppointmentDTO appointmentDTO);
    BookingAppointmentDTO updateAppointment(Long id, BookingAppointmentDTO appointmentDTO);
    void deleteAppointment(Long id);
    BookingAppointmentDTO getAppointmentById(Long id);
    List<BookingAppointmentDTO> getAllAppointments();
    List<BookingAppointmentDTO> getAppointmentsByUser(Long userId);
    List<BookingAppointmentDTO> getAppointmentsByDateRange(LocalDateTime start, LocalDateTime end);
    List<BookingAppointmentDTO> getUpcomingAppointments(LocalDateTime fromDate);
}
