package com.dmu.eatcheck.repository;

import com.dmu.eatcheck.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FoodRepository extends JpaRepository<Food, Long> {
    // 음식 이름으로 DB에 이미 저장된 음식이 있는지 검색
    Optional<Food> findByFoodName(String foodName);
    List<Food> findByFoodNameContaining(String foodName);
}