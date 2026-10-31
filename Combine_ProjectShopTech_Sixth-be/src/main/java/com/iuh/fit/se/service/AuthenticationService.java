package com.iuh.fit.se.service;


import com.iuh.fit.se.domain.dto.LoginRequestDTO;
import com.iuh.fit.se.domain.dto.LoginResponseDTO;

import java.text.ParseException;
import java.util.Map;

public interface AuthenticationService {
     LoginResponseDTO login(LoginRequestDTO request);
     void logout(String token) throws ParseException;
     Map<String, Object> requestPasswordReset(String email);
     Map<String, Object> verifyOTP(String email, String otp);
     Map<String, Object> resetPassword(String email, String otp, String newPassword);
}