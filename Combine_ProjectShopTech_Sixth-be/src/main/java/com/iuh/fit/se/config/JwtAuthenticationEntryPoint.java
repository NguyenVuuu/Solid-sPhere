package com.iuh.fit.se.config;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.iuh.fit.se.domain.dto.ApiResponse;
import com.iuh.fit.se.exception.ErrorCode;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;

public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException, ServletException {
        ErrorCode errorCode = ErrorCode.UNAUTHENTICATED;
        response.setStatus(errorCode.getStatusCode().value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        ApiResponse<?> apiResponse = ApiResponse.builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .build();

        ObjectMapper objectMapper = new ObjectMapper();
        response.getWriter().write(objectMapper.writeValueAsString(apiResponse));
        response.flushBuffer(); // Giúp giảm độ trễ và đảm bảo gửi phản hồi tới client ngay lập tức.

        // objectMapper.writeValueAsString(apiResponse): Chuyển đối tượng apiResponse thành chuỗi JSON.
        // .write: Ghi JSON vào HTTP response body để gửi cho client
    }
    }
