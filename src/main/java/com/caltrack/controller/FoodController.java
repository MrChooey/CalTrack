package com.caltrack.controller;

import com.caltrack.config.UserPrincipal;
import com.caltrack.dto.FoodRequest;
import com.caltrack.dto.FoodResponse;
import com.caltrack.service.FoodService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/foods")
@RequiredArgsConstructor
public class FoodController {

    private final FoodService foodService;

    @GetMapping
    public List<FoodResponse> list(@AuthenticationPrincipal UserPrincipal principal,
                                   @RequestParam(required = false) Double minCalories,
                                   @RequestParam(required = false) Double maxCalories) {
        if (minCalories != null || maxCalories != null) {
            return foodService.listFoodsWithFilters(principal.id(), minCalories, maxCalories);
        }
        return foodService.listFoods(principal.id());
    }

    @PostMapping
    public FoodResponse create(@AuthenticationPrincipal UserPrincipal principal,
                               @Valid @RequestBody FoodRequest request) {
        return foodService.createFood(principal.id(), request);
    }

    @PutMapping("/{foodId}")
    public FoodResponse update(@AuthenticationPrincipal UserPrincipal principal,
                               @PathVariable Long foodId,
                               @Valid @RequestBody FoodRequest request) {
        return foodService.updateFood(principal.id(), foodId, request);
    }

    @DeleteMapping("/{foodId}")
    public void delete(@AuthenticationPrincipal UserPrincipal principal,
                       @PathVariable Long foodId) {
        foodService.deleteFood(principal.id(), foodId);
    }
}

