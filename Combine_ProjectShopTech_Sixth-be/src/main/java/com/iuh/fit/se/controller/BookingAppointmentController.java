package com.iuh.fit.se.controller;

import com.iuh.fit.se.domain.dto.BookingAppointmentDTO;
import com.iuh.fit.se.service.BookingAppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BookingAppointmentController {
    
    private final BookingAppointmentService bookingAppointmentService;

    @PostMapping
    public ResponseEntity<BookingAppointmentDTO> createAppointment(@RequestBody BookingAppointmentDTO appointmentDTO) {
        BookingAppointmentDTO createdAppointment = bookingAppointmentService.createAppointment(appointmentDTO);
        return new ResponseEntity<>(createdAppointment, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookingAppointmentDTO> updateAppointment(@PathVariable Long id, @RequestBody BookingAppointmentDTO appointmentDTO) {
        BookingAppointmentDTO updatedAppointment = bookingAppointmentService.updateAppointment(id, appointmentDTO);
        return ResponseEntity.ok(updatedAppointment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        bookingAppointmentService.deleteAppointment(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingAppointmentDTO> getAppointmentById(@PathVariable Long id) {
        BookingAppointmentDTO appointment = bookingAppointmentService.getAppointmentById(id);
        return ResponseEntity.ok(appointment);
    }

    @GetMapping
    public ResponseEntity<List<BookingAppointmentDTO>> getAllAppointments() {
        List<BookingAppointmentDTO> appointments = bookingAppointmentService.getAllAppointments();
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookingAppointmentDTO>> getAppointmentsByUser(@PathVariable Long userId) {
        List<BookingAppointmentDTO> appointments = bookingAppointmentService.getAppointmentsByUser(userId);
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/date-range")
    public ResponseEntity<List<BookingAppointmentDTO>> getAppointmentsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        List<BookingAppointmentDTO> appointments = bookingAppointmentService.getAppointmentsByDateRange(start, end);
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<BookingAppointmentDTO>> getUpcomingAppointments(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fromDate) {
        List<BookingAppointmentDTO> appointments = bookingAppointmentService.getUpcomingAppointments(fromDate);
        return ResponseEntity.ok(appointments);
    }
}
