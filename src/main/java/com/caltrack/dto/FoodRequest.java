package com.caltrack.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class FoodRequest {

    @NotBlank
    private String foodName;

    @Positive
    private Double caloriesPerServing;

    private String imageUrl;
}

