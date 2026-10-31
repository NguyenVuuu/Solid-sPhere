package com.iuh.fit.se.service;


import com.iuh.fit.se.domain.dto.TokenPayload;
import com.iuh.fit.se.domain.entity.User;
import com.nimbusds.jwt.SignedJWT;

import java.text.ParseException;

public interface JwtService {
    TokenPayload generateToken(User user, boolean isRefreshToken);
    boolean verifyToken(String token);
    SignedJWT parseToken(String token);
}