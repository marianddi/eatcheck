package com.dmu.eatcheck.service;

import com.dmu.eatcheck.entity.Food;
import com.dmu.eatcheck.repository.FoodRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class FoodServiceImpl implements FoodService {

    private final FoodRepository foodRepository;

    /**
     * Helper 메서드: String 값이 null이거나 비어있으면 "0"을 반환
     */
    private String getStringOrZero(String value) {
        if (value == null || value.trim().isEmpty() || "null".equalsIgnoreCase(value.trim())) {
            return "0";
        }
        return value.trim();
    }

    @Transactional
    @Override
    public Food getOrCreateFood(String foodName) {
        Optional<Food> existingFood = foodRepository.findByFoodName(foodName.trim());

        if (existingFood.isPresent()) {
            return existingFood.get();
        }

        throw new IllegalArgumentException("'" + foodName.trim() + "'에 대한 식품 정보가 DB에 존재하지 않습니다. (데이터 로드 확인 필요)");

    }
}