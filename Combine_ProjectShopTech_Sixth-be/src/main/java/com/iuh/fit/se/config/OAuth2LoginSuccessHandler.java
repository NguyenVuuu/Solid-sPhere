package com.iuh.fit.se.config;

import com.iuh.fit.se.domain.dto.TokenPayload;
import com.iuh.fit.se.domain.entity.Role;
import com.iuh.fit.se.domain.entity.User;
import com.iuh.fit.se.repository.RedisTokenRepository;
import com.iuh.fit.se.repository.RoleRepository;
import com.iuh.fit.se.service.JwtService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
@Slf4j
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final RoleRepository roleRepository;
    private final RedisTokenRepository redisTokenRepository;

    @Value("${app.frontend-url:http://localhost:5173}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        Object principal = authentication.getPrincipal();
        if (!(principal instanceof OAuth2User oauth2User)) {
            response.sendRedirect(frontendUrl + "/login/callback?error=invalid_principal");
            return;
        }

        String email = oauth2User.getAttribute("email");
        String name = oauth2User.getAttribute("name");

        // Build a minimal User with ADMIN role for token generation
        Role adminRole = roleRepository.findByName("ADMIN").orElse(null);

        User tempUser = User.builder()
                .email(email != null ? email : (name != null ? name : "oauth2@user"))
                .fullName(name)
                .role(adminRole)
                .build();

        TokenPayload accessToken = jwtService.generateToken(tempUser, false);
        TokenPayload refreshToken = jwtService.generateToken(tempUser, true);

        // Store refresh token id in Redis (same behavior as username/password login)
        try {
            redisTokenRepository.save(com.iuh.fit.se.domain.entity.RedisToken.builder()
                    .jwtId(refreshToken.getJwtId())
                    .build());
        } catch (Exception e) {
            log.warn("Failed to save refresh token to Redis: {}", e.getMessage());
        }

        String url = frontendUrl + "/login/callback"
                + "?accessToken=" + URLEncoder.encode(accessToken.getToken(), StandardCharsets.UTF_8)
                + "&refreshToken=" + URLEncoder.encode(refreshToken.getToken(), StandardCharsets.UTF_8);

        response.sendRedirect(url);
    }
}


