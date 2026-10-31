package com.iuh.fit.se.domain.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingAppointmentDTO {
    Long id;
    String notes;
    LocalDateTime expectedArrival;
    Long userId;
    
    // Thông tin khách vãng lai
    String guestName;
    String guestEmail;
    String guestPhone;
    Boolean isGuestBooking;
}
