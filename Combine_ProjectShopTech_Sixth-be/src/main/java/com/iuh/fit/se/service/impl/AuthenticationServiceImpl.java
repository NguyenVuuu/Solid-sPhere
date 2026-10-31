package com.iuh.fit.se.service.impl;


import com.iuh.fit.se.domain.dto.*;
import com.iuh.fit.se.domain.entity.RedisToken;
import com.iuh.fit.se.domain.entity.User;
import com.iuh.fit.se.domain.enums.UserStatus;
import com.iuh.fit.se.exception.AppException;
import com.iuh.fit.se.exception.ErrorCode;
import com.iuh.fit.se.repository.RedisTokenRepository;
import com.iuh.fit.se.repository.UserRepository;
import com.iuh.fit.se.service.AuthenticationService;
import com.iuh.fit.se.service.EmailService;
import com.iuh.fit.se.service.JwtService;
import com.nimbusds.jwt.SignedJWT;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationServiceImpl implements AuthenticationService {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final RedisTokenRepository redisTokenRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    
    // Store OTP codes temporarily (email -> OTP info)
    // In production, consider using Redis
    private final Map<String, OTPInfo> otpStore = new ConcurrentHashMap<>();
    
    private static class OTPInfo {
        String otp;
        long expiresAt;
        boolean verified;
        
        OTPInfo(String otp, long expiresAt) {
            this.otp = otp;
            this.expiresAt = expiresAt;
            this.verified = false;
        }
        
        boolean isExpired() {
            return System.currentTimeMillis() > expiresAt;
        }
    }

    @Override
    public LoginResponseDTO login(LoginRequestDTO request) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());
        Authentication authenticated = authenticationManager.authenticate(authenticationToken);
        User user = (User) authenticated.getPrincipal();
        
        // Check if user status is INACTIVE - không cho phép login
        if (user.getStatus() == UserStatus.INACTIVE) {
            throw new AppException(ErrorCode.ACCOUNT_INACTIVE);
        }
        
        TokenPayload accessToken = jwtService.generateToken(user, false);
        TokenPayload refreshToken = jwtService.generateToken(user, true);

        try {
            redisTokenRepository.save(RedisToken.builder()
                    .jwtId(refreshToken.getJwtId())
                    .build());
        } catch (Exception e) {
            log.warn("Redis save failed (refresh token jti): {}", e.getMessage());
        }

        return LoginResponseDTO.builder()
                .accessToken(accessToken.getToken())
                .refreshToken(refreshToken.getToken())
                .build();
    }

    @Override
    public void logout(String token) throws ParseException {
        SignedJWT signedJWT = jwtService.parseToken(token);

        long ttl = Math.max(0, (signedJWT.getJWTClaimsSet().getExpirationTime().getTime() - System.currentTimeMillis()) / 1000);

        try {
            redisTokenRepository.save(RedisToken.builder()
                    .jwtId(signedJWT.getJWTClaimsSet().getJWTID())
                    .ttl(ttl)
                    .build());
            log.info("Token blacklisted successfully in Redis");
        } catch (Exception e) {
            log.warn("Redis save failed during logout (token blacklist): {}. Logout still proceeds.", e.getMessage());
            // Logout vẫn thành công ngay cả khi Redis không available
            // Token sẽ chỉ không được blacklist trong Redis, nhưng sẽ expire tự nhiên
        }
    }
    
    @Override
    public Map<String, Object> requestPasswordReset(String email) {
        // Find user by email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        
        // Generate 6-digit OTP
        String otp = String.format("%06d", new Random().nextInt(999999));
        
        // Store OTP (expires in 10 minutes)
        long expiresAt = System.currentTimeMillis() + (10 * 60 * 1000);
        otpStore.put(email.toLowerCase(), new OTPInfo(otp, expiresAt));
        
        // Send OTP email
        emailService.sendPasswordResetOTP(
                user.getEmail(),
                user.getFullName(),
                otp
        );
        
        log.info("Password reset OTP sent to email: {}", email);
        
        return Map.of(
                "success", true,
                "message", "Mã OTP đã được gửi đến email của bạn"
        );
    }
    
    @Override
    public Map<String, Object> verifyOTP(String email, String otp) {
        String emailLower = email.toLowerCase();
        OTPInfo otpInfo = otpStore.get(emailLower);
        
        if (otpInfo == null) {
            throw new AppException(ErrorCode.INVALID_OTP);
        }
        
        if (otpInfo.isExpired()) {
            otpStore.remove(emailLower);
            throw new AppException(ErrorCode.OTP_EXPIRED);
        }
        
        if (!otpInfo.otp.equals(otp)) {
            throw new AppException(ErrorCode.INVALID_OTP);
        }
        
        // Mark OTP as verified
        otpInfo.verified = true;
        
        return Map.of(
                "success", true,
                "message", "Mã OTP hợp lệ"
        );
    }
    
    @Override
    public Map<String, Object> resetPassword(String email, String otp, String newPassword) {
        String emailLower = email.toLowerCase();
        OTPInfo otpInfo = otpStore.get(emailLower);
        
        if (otpInfo == null || !otpInfo.verified) {
            throw new AppException(ErrorCode.INVALID_OTP);
        }
        
        if (otpInfo.isExpired()) {
            otpStore.remove(emailLower);
            throw new AppException(ErrorCode.OTP_EXPIRED);
        }
        
        if (!otpInfo.otp.equals(otp)) {
            throw new AppException(ErrorCode.INVALID_OTP);
        }
        
        // Validate password
        if (newPassword == null || newPassword.length() < 6) {
            throw new AppException(ErrorCode.PASSWORD_INVALID);
        }
        
        // Update password
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        
        // Remove OTP after successful reset
        otpStore.remove(emailLower);
        
        log.info("Password reset successful for email: {}", email);
        
        return Map.of(
                "success", true,
                "message", "Đặt lại mật khẩu thành công"
        );
    }

}