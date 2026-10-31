package com.iuh.fit.se.service.impl;

import com.iuh.fit.se.domain.dto.UserDTO;
import com.iuh.fit.se.domain.entity.Role;
import com.iuh.fit.se.domain.entity.User;
import com.iuh.fit.se.domain.enums.PredefinedRole;
import com.iuh.fit.se.domain.enums.UserStatus;
import com.iuh.fit.se.exception.AppException;
import com.iuh.fit.se.exception.ErrorCode;
import com.iuh.fit.se.repository.RoleRepository;
import com.iuh.fit.se.repository.UserRepository;
import com.iuh.fit.se.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {
    
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDTO register(UserDTO userDTO) {
        if (!userDTO.getPassword().equals(userDTO.getConfirmPassword()))
            throw new AppException(ErrorCode.PASSWORD_MISMATCH);
        Optional<Role> role = roleRepository.findByName(PredefinedRole.CUSTOMER.name());
        User user = User.builder()
                .fullName(userDTO.getFullName())
                .phoneNumber(userDTO.getPhoneNumber())
                .email(userDTO.getEmail())
                .password(passwordEncoder.encode(userDTO.getPassword()))
                .status(UserStatus.ACTIVE)
                .role(role.get())
                .build();
        try {
            userRepository.save(user);
        }catch(DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        return UserDTO.builder()
                .fullName(user.getFullName())
                .phoneNumber(user.getPhoneNumber())
                .email(user.getEmail())
                .status(user.getStatus())
                .roleId(user.getRole().getId())
                .build();
    }

    @Override
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        user.setFullName(userDTO.getFullName());
        user.setEmail(userDTO.getEmail());
        user.setGender(userDTO.getGender());
        user.setAddress(userDTO.getAddress());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setDob(userDTO.getDob());
        user.setStatus(userDTO.getStatus());
        user.setCumulativePoints(userDTO.getCumulativePoints());

        if (userDTO.getRoleId() != null) {
            Role role = roleRepository.findById(userDTO.getRoleId())
                    .orElseThrow(() -> new RuntimeException("Role not found"));
            user.setRole(role);
        }

        User updatedUser = userRepository.save(user);
        return convertToDTO(updatedUser);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        return convertToDTO(user);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
        return convertToDTO(user);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserDTO> getUsersByStatus(UserStatus status) {
        return userRepository.findByStatus(status).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserDTO> getUsersByRole(Long roleId) {
        return userRepository.findByRoleId(roleId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserDTO> searchUsersByName(String name) {
        return userRepository.searchByName(name).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserDTO> getUsersByMinimumPoints(Long points) {
        return userRepository.findByMinimumPoints(points).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

   

    @Override
    @Transactional(readOnly = true)
    public Long countUsersByStatus(UserStatus status) {
        return userRepository.countByStatus(status);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserDTO> getTopCustomersByPoints(org.springframework.data.domain.Pageable pageable) {
        return userRepository.findTopCustomersByPoints(pageable).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setFullName(user.getFullName());
        dto.setPassword(user.getPassword());
        dto.setEmail(user.getEmail());
        dto.setGender(user.getGender());
        dto.setAddress(user.getAddress());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setDob(user.getDob());
        dto.setDateOfBirth(user.getDob());
        dto.setStatus(user.getStatus());
        dto.setCumulativePoints(user.getCumulativePoints());
        dto.setPoint(user.getCumulativePoints());
        dto.setNumberOfGamesPlayed(user.getNumberOfGamesPlayed());
        dto.setNumberOfPlaysAllowed(user.getNumberOfPlaysAllowed());
        
        // Add location fields (from address if available, or empty)
        dto.setCity("");
        dto.setState("");
        dto.setPostalCode("");
        dto.setCountry("");
        
        // Calculate order statistics from user's orders
        if (user.getOrders() != null && !user.getOrders().isEmpty()) {
            dto.setTotalOrders((long) user.getOrders().size());
            Long totalSpent = user.getOrders().stream()
                    .mapToLong(order -> order.getTotalPrice() != null ? order.getTotalPrice().longValue() : 0)
                    .sum();
            dto.setTotalSpent(totalSpent);
        } else {
            dto.setTotalOrders(0L);
            dto.setTotalSpent(0L);
        }
        
        if (user.getRole() != null) {
            dto.setRoleId(user.getRole().getId());
        }
        return dto;
    }

    private User convertToEntity(UserDTO dto) {
        User user = new User();
        user.setFullName(dto.getFullName());
        user.setPassword(dto.getPassword());
        user.setEmail(dto.getEmail());
        user.setGender(dto.getGender());
        user.setAddress(dto.getAddress());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setDob(dto.getDob());
        user.setStatus(dto.getStatus());
        user.setCumulativePoints(dto.getCumulativePoints());
        
        if (dto.getRoleId() != null) {
            Role role = roleRepository.findById(dto.getRoleId())
                    .orElseThrow(() -> new RuntimeException("Role not found"));
            user.setRole(role);
        }
        
        return user;
    }
    @Override
    public UserDTO updateUserPoints(Long userId, Long points) { // THAY ĐỔI VOID thành USER
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Giả sử tên trường là 'cumulativePoints'
        user.setCumulativePoints(points);

        return convertToDTO(userRepository.save(user));
    }

    @Override
    public UserDTO addGamePlays(Long userId, long additionalPlays) {
        if (additionalPlays <= 0) {
            return getUserById(userId);
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        long currentPlays = Optional.ofNullable(user.getNumberOfPlaysAllowed()).orElse(0L);
        user.setNumberOfPlaysAllowed(currentPlays + additionalPlays);

        if (user.getNumberOfGamesPlayed() == null) {
            user.setNumberOfGamesPlayed(0L);
        }

        return convertToDTO(userRepository.save(user));
    }

    @Override
    public UserDTO consumeGamePlay(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        long gamesPlayed = Optional.ofNullable(user.getNumberOfGamesPlayed()).orElse(0L);
        user.setNumberOfGamesPlayed(gamesPlayed + 1);

        System.out.println("Update "  + gamesPlayed);

        return convertToDTO(userRepository.save(user));
    }


    @Override
    public UserDTO addPlaysAllowedAfterOrder(Long userId) {
        return addGamePlays(userId, 5);
    }

    @Override
    public UserDTO decrementPlayCount(Long userId) {
        return consumeGamePlay(userId);
    }

    @Override
    public UserDTO changePassword(Long userId, String currentPassword, String newPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        // Verify current password
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new AppException(ErrorCode.CURRENT_PASSWORD_INCORRECT);
        }

        // Update password
        user.setPassword(passwordEncoder.encode(newPassword));
        return convertToDTO(userRepository.save(user));
    }
    
}