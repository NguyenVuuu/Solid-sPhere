package com.iuh.fit.se.controller;

import com.iuh.fit.se.domain.dto.ApiResponse;
import com.iuh.fit.se.domain.dto.LoginRequestDTO;
import com.iuh.fit.se.domain.dto.LoginResponseDTO;
import com.iuh.fit.se.service.AuthenticationService;
import com.iuh.fit.se.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final EmailService emailService;


    @PostMapping("/login")
    ApiResponse<LoginResponseDTO> login(@RequestBody LoginRequestDTO request) {
        return ApiResponse.<LoginResponseDTO>builder()
                .result(authenticationService.login(request))
                .build();
    }
    @PostMapping("/logout")
    void logout(@RequestHeader(value = "Authorization", required = false) String authHeader) throws ParseException {
        // Allow logout even without token (e.g., when token expired or already cleared)
        if (authHeader != null && !authHeader.trim().isEmpty()) {
            log.info("Logging out with token: {}", authHeader);
            String token = authHeader.replace("Bearer ", "").trim();
            if (!token.isEmpty()) {
                authenticationService.logout(token);
            }
        } else {
            log.info("Logout called without Authorization header - client-side logout only");
        }
    }
    
    /**
     * Gửi email yêu cầu mở khóa tài khoản
     * @param request Chứa thông tin user: email, userName, userPhone, userId
     */
    @PostMapping("/request-unlock")
    public ResponseEntity<ApiResponse<Map<String, Object>>> requestAccountUnlock(@RequestBody Map<String, Object> request) {
        try {
            String userEmail = (String) request.get("email");
            String userName = (String) request.get("userName");
            String userPhone = (String) request.get("userPhone");
            Long userId = null;
            
            if (request.get("userId") != null) {
                if (request.get("userId") instanceof Number) {
                    userId = ((Number) request.get("userId")).longValue();
                } else if (request.get("userId") instanceof String) {
                    userId = Long.parseLong((String) request.get("userId"));
                }
            }
            
            if (userEmail == null || userEmail.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(
                    ApiResponse.<Map<String, Object>>builder()
                        .code(1400)
                        .message("Email không được để trống")
                        .build()
                );
            }
            
            emailService.sendAccountUnlockRequest(
                userEmail,
                userName,
                userPhone,
                userId
            );
            
            return ResponseEntity.ok(
                ApiResponse.<Map<String, Object>>builder()
                    .result(Map.of(
                        "success", true,
                        "message", "Email yêu cầu mở khóa đã được gửi thành công"
                    ))
                    .build()
            );
            
        } catch (Exception e) {
            log.error("Error sending unlock request email: ", e);
            return ResponseEntity.status(500).body(
                ApiResponse.<Map<String, Object>>builder()
                    .code(9999)
                    .message("Lỗi khi gửi email: " + e.getMessage())
                    .build()
            );
        }
    }
    
    /**
     * Gửi OTP về email để đặt lại mật khẩu
     */
    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<Map<String, Object>>> forgotPassword(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            
            if (email == null || email.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(
                    ApiResponse.<Map<String, Object>>builder()
                        .code(1400)
                        .message("Email không được để trống")
                        .build()
                );
            }
            
            Map<String, Object> result = authenticationService.requestPasswordReset(email);
            return ResponseEntity.ok(
                ApiResponse.<Map<String, Object>>builder()
                    .result(result)
                    .build()
            );
        } catch (Exception e) {
            log.error("Error in forgot password: ", e);
            return ResponseEntity.status(500).body(
                ApiResponse.<Map<String, Object>>builder()
                    .code(9999)
                    .message(e.getMessage())
                    .build()
            );
        }
    }
    
    /**
     * Xác thực mã OTP
     */
    @PostMapping("/verify-otp")
    public ResponseEntity<ApiResponse<Map<String, Object>>> verifyOTP(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String otp = request.get("otp");
            
            if (email == null || email.trim().isEmpty() || otp == null || otp.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(
                    ApiResponse.<Map<String, Object>>builder()
                        .code(1400)
                        .message("Email và mã OTP không được để trống")
                        .build()
                );
            }
            
            Map<String, Object> result = authenticationService.verifyOTP(email, otp);
            return ResponseEntity.ok(
                ApiResponse.<Map<String, Object>>builder()
                    .result(result)
                    .build()
            );
        } catch (Exception e) {
            log.error("Error verifying OTP: ", e);
            return ResponseEntity.status(500).body(
                ApiResponse.<Map<String, Object>>builder()
                    .code(9999)
                    .message(e.getMessage())
                    .build()
            );
        }
    }
    
    /**
     * Đặt lại mật khẩu mới sau khi xác thực OTP
     */
    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Map<String, Object>>> resetPassword(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String otp = request.get("otp");
            String newPassword = request.get("newPassword");
            
            if (email == null || email.trim().isEmpty() || 
                otp == null || otp.trim().isEmpty() || 
                newPassword == null || newPassword.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(
                    ApiResponse.<Map<String, Object>>builder()
                        .code(1400)
                        .message("Email, mã OTP và mật khẩu mới không được để trống")
                        .build()
                );
            }
            
            Map<String, Object> result = authenticationService.resetPassword(email, otp, newPassword);
            return ResponseEntity.ok(
                ApiResponse.<Map<String, Object>>builder()
                    .result(result)
                    .build()
            );
        } catch (Exception e) {
            log.error("Error resetting password: ", e);
            return ResponseEntity.status(500).body(
                ApiResponse.<Map<String, Object>>builder()
                    .code(9999)
                    .message(e.getMessage())
                    .build()
            );
        }
    }
}