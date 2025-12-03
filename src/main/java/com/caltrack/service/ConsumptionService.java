package com.caltrack.service;

import com.caltrack.dto.ConsumptionRequest;
import com.caltrack.dto.ConsumptionSummaryResponse;
import com.caltrack.model.Consumption;
import com.caltrack.model.Food;
import com.caltrack.model.Goal;
import com.caltrack.model.User;
import com.caltrack.repository.ConsumptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ConsumptionService {

    private final ConsumptionRepository consumptionRepository;
    private final FoodService foodService;
    private final UserService userService;
    private final GoalService goalService;

    @Transactional
    public void logConsumption(Long userId, ConsumptionRequest request) {
        User user = userService.getUser(userId);
        Food food = foodService.getFoodForUser(userId, request.getFoodId());
        Integer quantity = Optional.ofNullable(request.getQuantity()).orElse(1);
        LocalDate date = Optional.ofNullable(request.getDate()).orElse(LocalDate.now());

        Consumption consumption = Consumption.builder()
                .user(user)
                .food(food)
                .quantity(quantity)
                .date(date)
                .build();

        consumptionRepository.save(consumption);
    }

    public ConsumptionSummaryResponse getDailySummary(Long userId, LocalDate date) {
        LocalDate target = Optional.ofNullable(date).orElse(LocalDate.now());
        double total = safeTotal(consumptionRepository.totalCaloriesForDate(userId, target));
        Goal goal = goalService.getGoalEntity(userId);
        Double dailyGoal = goal != null ? goal.getDailyGoal() : null;

        return ConsumptionSummaryResponse.builder()
                .window(target.toString())
                .totalCalories(total)
                .goalCalories(dailyGoal)
                .remainingCalories(dailyGoal != null ? Math.max(dailyGoal - total, 0) : null)
                .build();
    }

    public ConsumptionSummaryResponse getWeeklySummary(Long userId, LocalDate reference) {
        LocalDate start = Optional.ofNullable(reference)
                .map(date -> date.with(DayOfWeek.MONDAY))
                .orElse(LocalDate.now().with(DayOfWeek.MONDAY));
        LocalDate end = start.plusDays(6);
        double total = safeTotal(consumptionRepository.totalCaloriesBetween(userId, start, end));
        Goal goal = goalService.getGoalEntity(userId);
        Double weeklyGoal = goal != null ? goal.getWeeklyGoal() : null;

        return ConsumptionSummaryResponse.builder()
                .window(start + " to " + end)
                .totalCalories(total)
                .goalCalories(weeklyGoal)
                .remainingCalories(weeklyGoal != null ? Math.max(weeklyGoal - total, 0) : null)
                .build();
    }

    private double safeTotal(Double total) {
        return total != null ? total : 0d;
    }
}

