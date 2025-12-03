package com.caltrack.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @Email
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    @Min(value = 10, message = "Age should be realistic")
    @Max(value = 120, message = "Age should be realistic")
    private Integer age;

    @Positive(message = "Height must be positive")
    private Double height;

    @Positive(message = "Weight must be positive")
    private Double weight;

    private String activities;
}

