package com.caltrack.service;

import com.caltrack.dto.GoalRequest;
import com.caltrack.dto.GoalResponse;
import com.caltrack.model.Goal;
import com.caltrack.model.User;
import com.caltrack.repository.GoalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class GoalService {

    private final GoalRepository goalRepository;
    private final UserService userService;

    public GoalResponse getGoal(Long userId) {
        return goalRepository.findByUserId(userId)
                .map(this::toResponse)
                .orElse(null);
    }

    @Transactional
    public GoalResponse upsertGoal(Long userId, GoalRequest request) {
        Goal goal = goalRepository.findByUserId(userId)
                .orElseGet(() -> newGoal(userId));
        goal.setDailyGoal(request.getDailyGoal());
        goal.setWeeklyGoal(request.getWeeklyGoal());
        return toResponse(goalRepository.save(goal));
    }

    public Goal getGoalEntity(Long userId) {
        return goalRepository.findByUserId(userId).orElse(null);
    }

    private Goal newGoal(Long userId) {
        User user = userService.getUser(userId);
        return Goal.builder()
                .user(user)
                .build();
    }

    private GoalResponse toResponse(Goal goal) {
        return GoalResponse.builder()
                .id(goal.getId())
                .dailyGoal(goal.getDailyGoal())
                .weeklyGoal(goal.getWeeklyGoal())
                .build();
    }
}

