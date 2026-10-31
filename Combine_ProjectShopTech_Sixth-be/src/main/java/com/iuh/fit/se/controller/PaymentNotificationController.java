package com.iuh.fit.se.controller;

import com.iuh.fit.se.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/payment-notifications")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:8889"}, allowCredentials = "true", maxAge = 3600)
public class PaymentNotificationController {
    
    private final EmailService emailService;
    
    /**
     * Send order confirmation email and push notification after successful payment
     */
    @PostMapping("/send-order-confirmation")
    public ResponseEntity<Map<String, Object>> sendOrderConfirmation(
            @RequestBody Map<String, Object> request) {
        
        try {
            String toEmail = (String) request.get("email");
            String customerName = (String) request.get("customerName");
            String orderId = (String) request.get("orderId");
            String orderCode = (String) request.get("orderCode");
            Double totalAmount = request.get("totalAmount") != null ? 
                Double.parseDouble(request.get("totalAmount").toString()) : null;
            String paymentMethod = (String) request.get("paymentMethod");
            String orderDate = (String) request.get("orderDate");
            String orderInfo = (String) request.get("orderInfo");
            String orderType = (String) request.get("orderType");
            String items = (String) request.get("items");
            
            if (toEmail == null || toEmail.trim().isEmpty()) {
                Map<String, Object> error = new HashMap<>();
                error.put("success", false);
                error.put("message", "Email is required");
                return ResponseEntity.badRequest().body(error);
            }
            
            // Send email
            emailService.sendOrderConfirmation(
                    toEmail,
                    customerName != null ? customerName : "Quý khách",
                    orderId,
                    orderCode,
                    totalAmount,
                    paymentMethod != null ? paymentMethod : "VNPay",
                    orderDate != null ? orderDate : java.time.LocalDateTime.now()
                            .format(java.time.format.DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss")),
                    orderInfo,
                    orderType,
                    items
            );
            
            // TODO: Send push notification via FCM
            // This requires Firebase Admin SDK setup
            // For now, we'll just send email
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Order confirmation email sent successfully");
            response.put("pushNotification", "Push notification will be sent after FCM setup");
            
            log.info("Order confirmation email sent to: {}", toEmail);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Error sending order confirmation: ", e);
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Failed to send order confirmation: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }
}

