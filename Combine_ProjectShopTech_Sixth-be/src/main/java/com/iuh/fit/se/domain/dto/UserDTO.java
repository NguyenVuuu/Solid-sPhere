package com.iuh.fit.se.domain.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.iuh.fit.se.domain.enums.Gender;
import com.iuh.fit.se.domain.enums.UserStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO {
    Long id;

    @NotBlank(message = "FULLNAME_REQUIRED")
    String fullName;

    @NotBlank(message = "PASSWORD_REQUIRED")
    @Size(min = 6, message = "PASSWORD_INVALID")
    String password;

    @NotBlank(message = "CONFIRM_PASSWORD_REQUIRED")
    String confirmPassword;

    @NotBlank(message = "EMAIL_REQUIRED")
    @Email(message = "EMAIL_INVALID")
    String email;

    Gender gender;
    String address;
    String city;
    String state;
    String postalCode;
    String country;

    @Pattern(regexp = "^(0|\\+84)[0-9]{9,10}$", message = "PHONE_INVALID")
    String phoneNumber;
    LocalDate dob;
    LocalDate dateOfBirth;
    UserStatus status;
    Long cumulativePoints;
    Long point;
    Long roleId;

    private Long numberOfPlaysAllowed;
    private Long numberOfGamesPlayed;
    private Long totalOrders;
    private Long totalSpent;
    private LocalDateTime createdAt;
}