package com.iuh.fit.se.controller;

import com.iuh.fit.se.domain.dto.ApiResponse;
import com.iuh.fit.se.domain.dto.UserDTO;
import com.iuh.fit.se.domain.dto.ChangePasswordRequest;
import com.iuh.fit.se.domain.enums.UserStatus;
import com.iuh.fit.se.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {
    
    private final UserService userService;
    @Operation(
        method = "POST",
        summary = "Create new user",
        description = "Send a request via this API to create new user")
@PostMapping("/register")
public ApiResponse<UserDTO> register(@Valid @RequestBody UserDTO userDTO) {
    UserDTO createdUser = userService.register(userDTO);
    return ApiResponse.<UserDTO>builder()
            .result(createdUser)
            .build();
}

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        UserDTO updatedUser = userService.updateUser(id, userDTO);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        UserDTO user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<UserDTO> getUserByEmail(@PathVariable String email) {
        UserDTO user = userService.getUserByEmail(email);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<UserDTO>> getUsersByStatus(@PathVariable UserStatus status) {
        List<UserDTO> users = userService.getUsersByStatus(status);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/role/{roleId}")
    public ResponseEntity<List<UserDTO>> getUsersByRole(@PathVariable Long roleId) {
        List<UserDTO> users = userService.getUsersByRole(roleId);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/customers")
    public ResponseEntity<List<UserDTO>> getCustomers() {
        // Role CUSTOMER có id = 3 (theo data-complete.sql)
        List<UserDTO> customers = userService.getUsersByRole(3L);
        return ResponseEntity.ok(customers);
    }

    @GetMapping("/search")
    public ResponseEntity<List<UserDTO>> searchUsersByName(@RequestParam String name) {
        List<UserDTO> users = userService.searchUsersByName(name);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/points")
    public ResponseEntity<List<UserDTO>> getUsersByMinimumPoints(@RequestParam Long points) {
        List<UserDTO> users = userService.getUsersByMinimumPoints(points);
        return ResponseEntity.ok(users);
    }

    @PatchMapping("/{userId}/points")
    public ResponseEntity<UserDTO> updateUserPoints(@PathVariable Long userId, @RequestParam Long points) {
        UserDTO user = userService.updateUserPoints(userId, points);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/{userId}/add-plays")
    public ResponseEntity<UserDTO> addPlaysAllowedAfterOrder(@PathVariable Long userId) {
        UserDTO user = userService.addPlaysAllowedAfterOrder(userId);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/{userId}/plays-info")
    public ResponseEntity<UserDTO> getPlaysInfo(@PathVariable Long userId) {
        UserDTO user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/{userId}/decrement-play")
    public ResponseEntity<UserDTO> decrementPlayCount(@PathVariable Long userId) {
        UserDTO user = userService.decrementPlayCount(userId);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/{userId}/change-password")
    public ResponseEntity<UserDTO> changePassword(@PathVariable Long userId, @RequestBody ChangePasswordRequest request) {
        UserDTO user = userService.changePassword(userId, request.getCurrentPassword(), request.getNewPassword());
        return ResponseEntity.ok(user);
    }

    @GetMapping("/count/status/{status}")
    public ResponseEntity<Long> countUsersByStatus(@PathVariable UserStatus status) {
        Long count = userService.countUsersByStatus(status);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/top-customers")
    public ResponseEntity<List<UserDTO>> getTopCustomersByPoints(@RequestParam(defaultValue = "10") int limit) {
        List<UserDTO> topCustomers = userService.getTopCustomersByPoints(
                org.springframework.data.domain.PageRequest.of(0, limit)
        );
        return ResponseEntity.ok(topCustomers);
    }
}
