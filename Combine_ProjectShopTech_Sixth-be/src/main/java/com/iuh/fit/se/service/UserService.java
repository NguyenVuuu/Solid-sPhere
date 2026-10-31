package com.iuh.fit.se.service;

import com.iuh.fit.se.domain.dto.UserDTO;
import com.iuh.fit.se.domain.enums.UserStatus;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {
    UserDTO register(UserDTO userDTO);
    UserDTO updateUser(Long id, UserDTO userDTO);
    void deleteUser(Long id);
    UserDTO getUserById(Long id);
    List<UserDTO> getAllUsers();
    UserDTO getUserByEmail(String email);
    List<UserDTO> getUsersByStatus(UserStatus status);
    List<UserDTO> getUsersByRole(Long roleId);
    List<UserDTO> searchUsersByName(String name);
    List<UserDTO> getUsersByMinimumPoints(Long points);
    UserDTO updateUserPoints(Long userId, Long points);
    UserDTO addGamePlays(Long userId, long additionalPlays);
    UserDTO consumeGamePlay(Long userId);
    UserDTO addPlaysAllowedAfterOrder(Long userId);
    UserDTO decrementPlayCount(Long userId);
    UserDTO changePassword(Long userId, String currentPassword, String newPassword);
    
    // Advanced methods
    Long countUsersByStatus(UserStatus status);
    List<UserDTO> getTopCustomersByPoints(Pageable pageable);
}