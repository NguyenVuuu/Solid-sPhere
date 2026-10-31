package com.iuh.fit.se.service.impl;

import com.iuh.fit.se.domain.dto.BookingAppointmentDTO;
import com.iuh.fit.se.domain.entity.BookingAppointment;
import com.iuh.fit.se.domain.entity.User;
import com.iuh.fit.se.repository.BookingAppointmentRepository;
import com.iuh.fit.se.repository.UserRepository;
import com.iuh.fit.se.service.BookingAppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class BookingAppointmentServiceImpl implements BookingAppointmentService {
    
    private final BookingAppointmentRepository bookingAppointmentRepository;
    private final UserRepository userRepository;

    @Override
    public BookingAppointmentDTO createAppointment(BookingAppointmentDTO appointmentDTO) {
        BookingAppointment appointment = convertToEntity(appointmentDTO);
        BookingAppointment savedAppointment = bookingAppointmentRepository.save(appointment);
        return convertToDTO(savedAppointment);
    }

    @Override
    public BookingAppointmentDTO updateAppointment(Long id, BookingAppointmentDTO appointmentDTO) {
        BookingAppointment appointment = bookingAppointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + id));
        
        appointment.setNotes(appointmentDTO.getNotes());
        appointment.setExpectedArrival(appointmentDTO.getExpectedArrival());
        
        if (appointmentDTO.getUserId() != null) {
            User user = userRepository.findById(appointmentDTO.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            appointment.setUser(user);
        }
        
        BookingAppointment updatedAppointment = bookingAppointmentRepository.save(appointment);
        return convertToDTO(updatedAppointment);
    }

    @Override
    public void deleteAppointment(Long id) {
        bookingAppointmentRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public BookingAppointmentDTO getAppointmentById(Long id) {
        BookingAppointment appointment = bookingAppointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + id));
        return convertToDTO(appointment);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookingAppointmentDTO> getAllAppointments() {
        return bookingAppointmentRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookingAppointmentDTO> getAppointmentsByUser(Long userId) {
        return bookingAppointmentRepository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookingAppointmentDTO> getAppointmentsByDateRange(LocalDateTime start, LocalDateTime end) {
        return bookingAppointmentRepository.findByExpectedArrivalBetween(start, end).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookingAppointmentDTO> getUpcomingAppointments(LocalDateTime fromDate) {
        return bookingAppointmentRepository.findUpcomingAppointments(fromDate).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private BookingAppointmentDTO convertToDTO(BookingAppointment appointment) {
        BookingAppointmentDTO dto = new BookingAppointmentDTO();
        dto.setId(appointment.getId());
        dto.setNotes(appointment.getNotes());
        dto.setExpectedArrival(appointment.getExpectedArrival());
        dto.setIsGuestBooking(appointment.getIsGuestBooking());
        
        if (appointment.getUser() != null) {
            dto.setUserId(appointment.getUser().getId());
        }
        
        // Thông tin guest
        dto.setGuestName(appointment.getGuestName());
        dto.setGuestEmail(appointment.getGuestEmail());
        dto.setGuestPhone(appointment.getGuestPhone());
        
        return dto;
    }

    private BookingAppointment convertToEntity(BookingAppointmentDTO dto) {
        BookingAppointment appointment = new BookingAppointment();
        appointment.setNotes(dto.getNotes());
        appointment.setExpectedArrival(dto.getExpectedArrival());
        appointment.setIsGuestBooking(dto.getIsGuestBooking());
        
        // Thông tin guest
        appointment.setGuestName(dto.getGuestName());
        appointment.setGuestEmail(dto.getGuestEmail());
        appointment.setGuestPhone(dto.getGuestPhone());
        
        if (dto.getUserId() != null) {
            User user = userRepository.findById(dto.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            appointment.setUser(user);
        }
        
        return appointment;
    }
}
