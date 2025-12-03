package com.caltrack.dto;

import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class GoalRequest {

    @Positive
    private Double dailyGoal;

    @Positive
    private Double weeklyGoal;
}

