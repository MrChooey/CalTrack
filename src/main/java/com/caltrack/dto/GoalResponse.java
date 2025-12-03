package com.caltrack.dto;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class GoalResponse {
    Long id;
    Double dailyGoal;
    Double weeklyGoal;
}

