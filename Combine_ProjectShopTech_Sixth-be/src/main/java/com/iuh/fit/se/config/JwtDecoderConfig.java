package com.iuh.fit.se.config;

import com.iuh.fit.se.exception.AppException;
import com.iuh.fit.se.exception.ErrorCode;
import com.iuh.fit.se.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class JwtDecoderConfig implements JwtDecoder {

    @Value("${jwt.secret-key}")
    private String secretKey;

    private final JwtService jwtService;
    private NimbusJwtDecoder nimbusJwtDecoder = null;

    @Override
    public Jwt decode(String token) throws JwtException {
            if (!jwtService.verifyToken(token)) {
                throw new AppException(ErrorCode.TOKEN_INVALID);
            }
            if (Objects.isNull(nimbusJwtDecoder)) {
                SecretKey secretKeySpec = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "HS512");
                nimbusJwtDecoder = NimbusJwtDecoder.withSecretKey(secretKeySpec)
                        .macAlgorithm(MacAlgorithm.HS512)
                        .build();

            }
        return nimbusJwtDecoder.decode(token);
    }
}
