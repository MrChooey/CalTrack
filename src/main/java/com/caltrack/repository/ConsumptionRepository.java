package com.caltrack.repository;

import com.caltrack.model.Consumption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;

public interface ConsumptionRepository extends JpaRepository<Consumption, Long> {

    @Query("select coalesce(sum(c.food.caloriesPerServing * c.quantity), 0) " +
            "from Consumption c where c.user.id = :userId and c.date = :targetDate")
    Double totalCaloriesForDate(@Param("userId") Long userId, @Param("targetDate") LocalDate date);

    @Query("select coalesce(sum(c.food.caloriesPerServing * c.quantity), 0) " +
            "from Consumption c where c.user.id = :userId and c.date between :start and :end")
    Double totalCaloriesBetween(@Param("userId") Long userId,
                                @Param("start") LocalDate start,
                                @Param("end") LocalDate end);
}

