package com.caltrack.dto;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class ConsumptionSummaryResponse {
    String window;
    Double totalCalories;
    Double goalCalories;
    Double remainingCalories;
}

