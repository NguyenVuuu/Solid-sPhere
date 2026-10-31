package com.iuh.fit.se.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

/**
 * TokenPayload
 * <p>
 * Provides business logic for managing employment details.
 * <p>
 * Version 1.0
 * Date: 03/11/2025
 * <p>
 * Copyright
 * <p>
 * Modification Logs:
 * DATE         AUTHOR       DESCRIPTION
 * -------------------------------------
 * 03/11/2025    HaiDang      Create
 */
@Getter
@Setter
@Builder
public class TokenPayload {
    private String token;
    private String jwtId;
}