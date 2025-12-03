package com.caltrack.controller;

import com.caltrack.config.UserPrincipal;
import com.caltrack.dto.GoalRequest;
import com.caltrack.dto.GoalResponse;
import com.caltrack.service.GoalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/goals")
@RequiredArgsConstructor
public class GoalController {

    private final GoalService goalService;

    @GetMapping
    public GoalResponse getGoal(@AuthenticationPrincipal UserPrincipal principal) {
        return goalService.getGoal(principal.id());
    }

    @PostMapping
    public GoalResponse createGoal(@AuthenticationPrincipal UserPrincipal principal,
                                   @Valid @RequestBody GoalRequest request) {
        return goalService.upsertGoal(principal.id(), request);
    }

    @PutMapping
    public GoalResponse updateGoal(@AuthenticationPrincipal UserPrincipal principal,
                                   @Valid @RequestBody GoalRequest request) {
        return goalService.upsertGoal(principal.id(), request);
    }
}

