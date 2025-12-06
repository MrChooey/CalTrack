package com.caltrack.repository;

import com.caltrack.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FoodRepository extends JpaRepository<Food, Long> {
    List<Food> findByUserId(Long userId);
    Optional<Food> findByIdAndUserId(Long id, Long userId);
    
    @Query("SELECT f FROM Food f WHERE f.user.id = :userId " +
           "AND (:minCalories IS NULL OR f.caloriesPerServing >= :minCalories) " +
           "AND (:maxCalories IS NULL OR f.caloriesPerServing <= :maxCalories)")
    List<Food> findByUserIdWithFilters(@Param("userId") Long userId,
                                       @Param("minCalories") Double minCalories,
                                       @Param("maxCalories") Double maxCalories);
}

