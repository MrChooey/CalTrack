package com.caltrack.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class UserProfileUpdateRequest {

    @NotBlank
    private String name;

    @Min(10)
    @Max(120)
    private Integer age;

    @Positive
    private Double height;

    @Positive
    private Double weight;

    private String activities;
}

