package com.iuh.fit.se.domain.dto;

import lombok.Getter;

@Getter
public class LoginRequestDTO {
    private String email;
    private String password;
}