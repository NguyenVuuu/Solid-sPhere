package com.iuh.fit.se.domain.dto;

import lombok.*;

@Getter
@Setter
public class ChatMessageDTO {
    private Long chatId;
    private String senderType;  // CUSTOMER / STAFF
    private String senderName;  // Tên khách hoặc nhân viên
    private String content;
}