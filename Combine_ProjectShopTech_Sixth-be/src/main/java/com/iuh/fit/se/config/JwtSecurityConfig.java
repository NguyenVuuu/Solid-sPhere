package com.iuh.fit.se.config;

import com.iuh.fit.se.service.impl.UserDetailServiceCustomizer;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class JwtSecurityConfig {
    @Value("${app.frontend-url:http://localhost:5173}")
    private String frontendUrl;

    private static final String[] WHITE_LIST = {
            //login,logout,register
            "/api/auth/**",
            //swagger
            "/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html",
            //Oauth2
            "/oauth2/**", "/login/oauth2/**",
            //WebSocket
            "/ws/**", "/topic/**", "/queue/**", "/app/**",
            //public
            "/api/public/**",
            //actuator
            "/actuator/**",
            //category
            "/api/categories/**",
            //statistics
            "/api/statistics/**",
            //reviews
            "/api/reviews/**",
            "/api/user-discounts/**",
            //send email
            "/api/discounts/*/send-email",
            //send bulk email
            "/api/discounts/*/send-bulk-email",
            //send all customers
            "/api/discounts/*/send-all-customers",
            //chat
            "/api/chat/**",
            //appointments
            "/api/appointments/**",
            //gemini
            "/api/gemini/**",
            //cart
            "/api/cart/**", "/api/cart-items/**",
            //favorite
            "/api/favorites/**",
            //oauth2 callback endpoints
            "/api/auth/user", "/api/auth/login-success",
            //admin
            "/api/admin/**", "/api/users/**", "/api/orders/**", "/api/order-details/**", "/api/products/**", "/api/discounts/**"
    };
    private final UserDetailServiceCustomizer userDetailService;
    private final JwtDecoderConfig jwtDecoderConfig;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(WHITE_LIST).permitAll()
//                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                // OAuth2 Login disabled - using regular login only
                // .oauth2Login(oauth2 -> oauth2
                //         .userInfoEndpoint(userInfo -> userInfo
                //                 .userAuthoritiesMapper(oauth2AuthoritiesMapper())
                //         )
                //         .defaultSuccessUrl("http://localhost:5173/login/callback", true)
                //         .failureUrl("http://localhost:5173/login")
                //                 )
                // JWT Resource Server - tạm thời comment để test
                // .oauth2ResourceServer(oauth2 -> oauth2
                //         .jwt(jwt -> jwt.decoder(jwtDecoderConfig)
                //                 .jwtAuthenticationConverter(jwtAuthenticationConverter()))
                // )
                .exceptionHandling(ex -> ex.authenticationEntryPoint(new JwtAuthenticationEntryPoint()))
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS));

        return http.build();
    }

    @Bean
    JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        jwtGrantedAuthoritiesConverter.setAuthorityPrefix("");

        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);

        return jwtAuthenticationConverter;
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of(frontendUrl));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider(userDetailService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());

        return new ProviderManager(authenticationProvider);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }

    @Bean
    public GrantedAuthoritiesMapper oauth2AuthoritiesMapper() {
        return authorities -> {
            Set<GrantedAuthority> mappedAuthorities = new HashSet<>(authorities);
            // Treat OAuth2 users as regular customer role
            mappedAuthorities.add(new SimpleGrantedAuthority("ROLE_CUSTOMER"));
            mappedAuthorities.add(new SimpleGrantedAuthority("CUSTOMER"));
            return mappedAuthorities;
        };
    }

}


