package com.caltrack.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ConsumptionRequest {

    @NotNull
    private Long foodId;

    @Min(1)
    private Integer quantity;

    private LocalDate date;
}

