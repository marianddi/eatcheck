package com.dmu.eatcheck.repository;

import com.dmu.eatcheck.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FoodRepository extends JpaRepository<Food, Long> {

    // 정확히 일치하는 음식 검색
    Optional<Food> findByFoodName(String foodName);

    // 🔥 부분 일치 검색 기능 (검색창에서 "고기" 입력하면 "돼지고기", "소고기" 등 나옴)
    List<Food> findByFoodNameContaining(String keyword);
}
