package com.iuh.fit.se.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class OAuth2CallbackController {

    @GetMapping("/user")
    public Map<String, Object> getUserInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication != null && authentication.getPrincipal() instanceof OAuth2User) {
            OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
            return Map.of(
                "name", oauth2User.getAttribute("name"),
                "email", oauth2User.getAttribute("email"),
                "picture", oauth2User.getAttribute("picture"),
                "provider", "google"
            );
        }
        
        return Map.of("error", "Not authenticated");
    }

    // Alias for frontend GoogleCallback.jsx which calls /api/auth/me
    @GetMapping("/me")
    public Map<String, Object> getMe() {
        return getUserInfo();
    }

    @GetMapping("/login-success")
    public Map<String, Object> loginSuccess() {
        return Map.of(
            "success", true,
            "message", "Login successful",
            "redirectUrl", "http://localhost:5173/dashboard"
        );
    }
}















