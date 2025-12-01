package com.caltrack.controller;

import com.caltrack.config.UserPrincipal;
import com.caltrack.dto.ConsumptionRequest;
import com.caltrack.dto.ConsumptionSummaryResponse;
import com.caltrack.service.ConsumptionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/consumption")
@RequiredArgsConstructor
public class ConsumptionController {

    private final ConsumptionService consumptionService;

    @PostMapping
    public ResponseEntity<Map<String, String>> logConsumption(@AuthenticationPrincipal UserPrincipal principal,
                                                              @Valid @RequestBody ConsumptionRequest request) {
        consumptionService.logConsumption(principal.id(), request);
        return ResponseEntity.ok(Map.of("message", "Consumption logged"));
    }

    @GetMapping("/daily")
    public ConsumptionSummaryResponse daily(@AuthenticationPrincipal UserPrincipal principal,
                                            @RequestParam(required = false)
                                            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                            LocalDate date) {
        return consumptionService.getDailySummary(principal.id(), date);
    }

    @GetMapping("/weekly")
    public ConsumptionSummaryResponse weekly(@AuthenticationPrincipal UserPrincipal principal,
                                             @RequestParam(required = false, name = "weekStart")
                                             @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                             LocalDate weekStart) {
        return consumptionService.getWeeklySummary(principal.id(), weekStart);
    }
}

