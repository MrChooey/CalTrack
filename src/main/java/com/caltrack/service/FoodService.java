package com.caltrack.service;

import com.caltrack.dto.FoodRequest;
import com.caltrack.dto.FoodResponse;
import com.caltrack.exception.ResourceNotFoundException;
import com.caltrack.model.Food;
import com.caltrack.model.User;
import com.caltrack.repository.FoodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FoodService {

    private final FoodRepository foodRepository;
    private final UserService userService;

    public List<FoodResponse> listFoods(Long userId) {
        return foodRepository.findByUserId(userId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public List<FoodResponse> listFoodsWithFilters(Long userId, Double minCalories, Double maxCalories) {
        return foodRepository.findByUserIdWithFilters(userId, minCalories, maxCalories)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public FoodResponse createFood(Long userId, FoodRequest request) {
        User user = userService.getUser(userId);
        Food food = Food.builder()
                .foodName(request.getFoodName())
                .caloriesPerServing(request.getCaloriesPerServing())
                .imageUrl(request.getImageUrl())
                .user(user)
                .build();
        return toResponse(foodRepository.save(food));
    }

    @Transactional
    public FoodResponse updateFood(Long userId, Long foodId, FoodRequest request) {
        Food food = getFoodForUser(userId, foodId);
        food.setFoodName(request.getFoodName());
        food.setCaloriesPerServing(request.getCaloriesPerServing());
        food.setImageUrl(request.getImageUrl());
        return toResponse(foodRepository.save(food));
    }

    @Transactional
    public void deleteFood(Long userId, Long foodId) {
        Food food = getFoodForUser(userId, foodId);
        foodRepository.delete(food);
    }

    public Food getFoodForUser(Long userId, Long foodId) {
        return foodRepository.findByIdAndUserId(foodId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Food not found"));
    }

    private FoodResponse toResponse(Food food) {
        return FoodResponse.builder()
                .id(food.getId())
                .foodName(food.getFoodName())
                .caloriesPerServing(food.getCaloriesPerServing())
                .imageUrl(food.getImageUrl())
                .build();
    }
}

