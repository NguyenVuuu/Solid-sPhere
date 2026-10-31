package com.iuh.fit.se.domain.dto;

import com.iuh.fit.se.domain.enums.ChatStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChatCustomerServiceDTO {
    Long sessionId;
    LocalDateTime startTime;
    LocalDateTime endTime;
    ChatStatus status;
    Set<Long> customerIds;
    Set<Long> staffIds;
}
