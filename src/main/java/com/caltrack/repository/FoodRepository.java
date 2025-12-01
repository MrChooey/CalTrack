package com.caltrack.repository;

import com.caltrack.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FoodRepository extends JpaRepository<Food, Long> {
    List<Food> findByUserId(Long userId);
    Optional<Food> findByIdAndUserId(Long id, Long userId);
}

