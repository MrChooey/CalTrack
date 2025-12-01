package com.caltrack.dto;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class FoodResponse {
    Long id;
    String foodName;
    Double caloriesPerServing;
}

