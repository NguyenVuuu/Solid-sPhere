package com.iuh.fit.se.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
    // ====== COMMON ======
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1001, "Invalid key", HttpStatus.BAD_REQUEST),

    // ====== AUTHENTICATION / AUTHORIZATION ======
    UNAUTHENTICATED(1012, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    TOKEN_GENERATION_FAILED(1013, "Token generation failed", HttpStatus.INTERNAL_SERVER_ERROR),
    TOKEN_INVALID(1014, "Token is invalid", HttpStatus.UNAUTHORIZED),
    TOKEN_EXPIRED(1015, "Token has expired", HttpStatus.UNAUTHORIZED),
    TOKEN_REVOKED(1016, "Token has been revoked", HttpStatus.UNAUTHORIZED),

    // ====== USER ======
    USER_EXISTED(1101, "User already exists", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1102, "User not found", HttpStatus.NOT_FOUND),
    FULLNAME_REQUIRED(1103, "Full name is required", HttpStatus.BAD_REQUEST),
    PASSWORD_REQUIRED(1104, "Password is required", HttpStatus.BAD_REQUEST),
    PASSWORD_MISMATCH(1105, "Password and Confirm Password do not match", HttpStatus.BAD_REQUEST),
    PASSWORD_INVALID(1106, "Password must be at least 6 characters", HttpStatus.BAD_REQUEST),
    CONFIRM_PASSWORD_REQUIRED(1107, "Confirm password is required", HttpStatus.BAD_REQUEST),
    CURRENT_PASSWORD_INCORRECT(1108, "Current password is incorrect", HttpStatus.UNAUTHORIZED),
    NO_GAME_PLAYS_LEFT(1109, "No game plays remaining", HttpStatus.BAD_REQUEST),
    ACCOUNT_INACTIVE(1110, "Tài khoản của bạn đã bị vô hiệu hóa", HttpStatus.FORBIDDEN),
    USER_NOT_FOUND(1111, "Không tìm thấy người dùng với email này", HttpStatus.NOT_FOUND),
    EMAIL_MISMATCH(1112, "Email không khớp với tài khoản", HttpStatus.BAD_REQUEST),
    INVALID_OTP(1113, "Mã OTP không hợp lệ", HttpStatus.BAD_REQUEST),
    OTP_EXPIRED(1114, "Mã OTP đã hết hạn", HttpStatus.BAD_REQUEST),

    // ====== CONTACT ======
    PHONE_INVALID(1201, "Phone number format is invalid", HttpStatus.BAD_REQUEST),
    EMAIL_REQUIRED(1202, "Email is required", HttpStatus.BAD_REQUEST),
    EMAIL_INVALID(1203, "Email format is invalid", HttpStatus.BAD_REQUEST),
    
    // ====== PRODUCT / INVENTORY ======
    PRODUCT_NOT_FOUND(1301, "Product not found", HttpStatus.NOT_FOUND),
    INSUFFICIENT_STOCK(1302, "Không đủ hàng", HttpStatus.CONFLICT),
    PRODUCT_OUT_OF_STOCK(1303, "Product is out of stock", HttpStatus.BAD_REQUEST),
    ;

    ErrorCode(int code, String message, HttpStatus statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatus statusCode;
}