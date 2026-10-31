package com.iuh.fit.se.exception;

import com.iuh.fit.se.domain.dto.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = RuntimeException.class)
    public ResponseEntity<ApiResponse<?>> handlingRuntimeException(RuntimeException ex){
        // Log lỗi để debug
        log.error("RuntimeException occurred: ", ex);
        
        // Nếu là lỗi vi phạm từ moderation, trả về message cụ thể
        if (ex.getMessage() != null && ex.getMessage().contains("vi phạm")) {
            ApiResponse<?> apiResponse = ApiResponse.builder()
                    .code(1400)
                    .message(ex.getMessage())
                    .build();
            return ResponseEntity.badRequest().body(apiResponse);
        }
        
        // Trả về message thực tế của RuntimeException thay vì generic message
        String errorMessage = ex.getMessage() != null && !ex.getMessage().isEmpty() 
            ? ex.getMessage() 
            : "Uncategorized error";
        
        ApiResponse<?> apiResponse = ApiResponse.builder()
                .code(ErrorCode.UNCATEGORIZED_EXCEPTION.getCode())
                .message(errorMessage)
                .build();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(apiResponse);
    }
    
    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<ApiResponse<?>> handlingGeneralException(Exception ex){
        // Log lỗi để debug
        log.error("Exception occurred: ", ex);
        
        // Trả về message thực tế nếu có
        String errorMessage = ex.getMessage() != null && !ex.getMessage().isEmpty() 
            ? ex.getMessage() 
            : ErrorCode.UNCATEGORIZED_EXCEPTION.getMessage();
        
        ApiResponse<?> apiResponse = ApiResponse.builder()
                .code(ErrorCode.UNCATEGORIZED_EXCEPTION.getCode())
                .message(errorMessage)
                .build();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(apiResponse);
    }
    
    @ExceptionHandler(value = AppException.class)
    public ResponseEntity<ApiResponse<?>> handlingAppException(AppException ex) {
        ErrorCode errorCode = ex.getErrorCode();
        ApiResponse<?> apiResponse = ApiResponse.builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .build();
        return ResponseEntity.status(errorCode.getStatusCode()).body(apiResponse);
    }
    
    @ExceptionHandler(value = DataIntegrityViolationException.class)
    public ResponseEntity<ApiResponse<?>> handlingDataIntegrityViolation(DataIntegrityViolationException ex) {
        log.error("DataIntegrityViolationException occurred: ", ex);
        
        String errorMessage = "Lỗi dữ liệu: ";
        String exceptionMessage = ex.getMessage() != null ? ex.getMessage() : "";
        
        // Kiểm tra nếu là duplicate entry
        if (exceptionMessage.contains("Duplicate entry")) {
            // Kiểm tra nếu là duplicate entry cho product_id (có thể do database constraint cũ)
            if (exceptionMessage.contains("product_id")) {
                errorMessage = "Lỗi ràng buộc dữ liệu: Có vẻ như database đang có constraint unique trên product_id. Vui lòng xóa constraint này để cho phép một sản phẩm có nhiều discount.";
            } else {
                errorMessage = "Dữ liệu đã tồn tại trong hệ thống. Vui lòng kiểm tra lại.";
            }
        } else {
            errorMessage = "Lỗi ràng buộc dữ liệu: " + (exceptionMessage.length() > 200 ? exceptionMessage.substring(0, 200) + "..." : exceptionMessage);
        }
        
        ApiResponse<?> apiResponse = ApiResponse.builder()
                .code(ErrorCode.INVALID_KEY.getCode())
                .message(errorMessage)
                .build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiResponse);
    }
    
    private String extractProductIdFromMessage(String message) {
        // Tìm pattern "Duplicate entry 'X' for key" để lấy product_id
        // Ví dụ: "Duplicate entry '16' for key 'discounts.UK6rfl9mcvx0j58d6kpvd4rk2r'"
        try {
            int startIndex = message.indexOf("Duplicate entry '") + 17;
            int endIndex = message.indexOf("'", startIndex);
            if (startIndex > 16 && endIndex > startIndex) {
                return message.substring(startIndex, endIndex);
            }
        } catch (Exception e) {
            // Ignore
        }
        return null;
    }
    
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handlingValidation(MethodArgumentNotValidException ex) {
        // Lấy tất cả các lỗi validation theo từng field
        Map<String, String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .collect(Collectors.toMap(
                        FieldError::getField,
                        error -> error.getDefaultMessage() != null ? error.getDefaultMessage() : "Validation failed",
                        (existing, replacement) -> existing // Nếu có nhiều lỗi cho cùng một field, giữ lỗi đầu tiên
                ));
        
        // Tạo message tổng hợp từ các lỗi
        String combinedMessage = errors.values().stream()
                .collect(Collectors.joining(", "));
        
        ApiResponse<Map<String, String>> apiResponse = ApiResponse.<Map<String, String>>builder()
                .code(ErrorCode.INVALID_KEY.getCode())
                .message(combinedMessage.isEmpty() ? "Validation failed" : combinedMessage)
                .result(errors)
                .build();
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiResponse);
    }
}