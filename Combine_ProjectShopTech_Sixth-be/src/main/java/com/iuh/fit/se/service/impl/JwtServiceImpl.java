package com.iuh.fit.se.service.impl;


import com.iuh.fit.se.domain.dto.TokenPayload;
import com.iuh.fit.se.domain.entity.User;
import com.iuh.fit.se.domain.enums.TokenType;
import com.iuh.fit.se.exception.AppException;
import com.iuh.fit.se.exception.ErrorCode;
import com.iuh.fit.se.repository.RedisTokenRepository;
import com.iuh.fit.se.service.JwtService;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.RequiredArgsConstructor;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class JwtServiceImpl implements JwtService {

    @NonFinal
    @Value("${jwt.valid-duration}")
    protected long validDuration;
    @NonFinal
    @Value("${jwt.refreshable-duration}")
    protected long refreshableDuration;
    @NonFinal
    @Value("${jwt.secret-key}")
    private String secretKey;

    private final RedisTokenRepository redisTokenRepository;

    @Override
    public TokenPayload generateToken(User user, boolean isRefreshToken) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        Date issueTime = new Date();
        Date expiredTime = isRefreshToken
                ? new Date(Instant.now().plus(refreshableDuration, ChronoUnit.DAYS).toEpochMilli())
                : new Date(Instant.now().plus(validDuration, ChronoUnit.MINUTES).toEpochMilli());

        String jwtID = UUID.randomUUID().toString();

        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .subject(user.getEmail())
                .issueTime(issueTime)
                .expirationTime(expiredTime)
                .jwtID(jwtID)
                .claim("type", isRefreshToken ? TokenType.REFRESH_TOKEN.name() : TokenType.ACCESS_TOKEN.name())
                .claim("scope", buildScope(user))
                .build();

        Payload payload = new Payload(claimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(secretKey));
        } catch (JOSEException e) {
            throw new AppException(ErrorCode.TOKEN_GENERATION_FAILED);
        }

        String token = jwsObject.serialize();

      return TokenPayload.builder()
              .token(token)
              .jwtId(jwtID)
              .build();
    }

    @Override
    public boolean verifyToken(String token){
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);

            // 1. Verify signature
            if (!signedJWT.verify(new MACVerifier(secretKey))) {
                throw new AppException(ErrorCode.TOKEN_INVALID);
            }

            // 2. Check expiration
            Date expirationTime = signedJWT.getJWTClaimsSet().getExpirationTime();
            if (expirationTime.before(new Date())) {
                throw new AppException(ErrorCode.TOKEN_EXPIRED);
            }

            // 3. Check if token is revoked (Redis)
            String jwtId = signedJWT.getJWTClaimsSet().getJWTID();
            if (redisTokenRepository.findById(jwtId).isPresent()) {
                throw new AppException(ErrorCode.TOKEN_REVOKED);
            }

            return true;
        }catch(ParseException | JOSEException e){
            throw new AppException(ErrorCode.TOKEN_INVALID);
        }
    }
    @Override
    public SignedJWT parseToken(String token) {
        try {
            return SignedJWT.parse(token);
        } catch (ParseException e) {
            throw new AppException(ErrorCode.TOKEN_INVALID);
        }
    }
    private String buildScope(User user) {
        StringJoiner scopeJoiner = new StringJoiner(" ");
        if (user.getRole() != null) {
                scopeJoiner.add("ROLE_" + user.getRole().getName());
        }
        return scopeJoiner.toString();
    }
}