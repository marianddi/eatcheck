package com.dmu.eatcheck.features.food.avoidance.service;

import com.dmu.eatcheck.features.auth.signUp.domain.Entity.User;
import com.dmu.eatcheck.features.auth.signUp.repository.SignUpRepository;
import com.dmu.eatcheck.features.food.avoidance.domain.dto.FoodAvoidanceRequestDto;
import com.dmu.eatcheck.features.food.avoidance.domain.entity.FoodAvoidance;
import com.dmu.eatcheck.features.food.avoidance.domain.entity.RestrictionType;
import com.dmu.eatcheck.features.food.avoidance.repository.FoodAvoidanceRepository;
import com.dmu.eatcheck.features.food.common.Food;
import com.dmu.eatcheck.features.food.common.FoodApiService;
import com.dmu.eatcheck.features.food.common.repository.FoodRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class FoodAvoidanceServiceImpl implements FoodAvoidanceService {

    private final SignUpRepository signUpRepository;
    private final FoodRepository foodRepository;
    private final FoodAvoidanceRepository avoidanceRepository;
    private final FoodApiService foodApiService;

    @Transactional
    @Override
    public void saveAvoidanceFoods(FoodAvoidanceRequestDto requestDto) {
        User user = signUpRepository.findById(requestDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("사용자 ID를 찾을 수 없습니다."));

        List<String> foodNames = requestDto.getAvoidanceFoodNames();

        avoidanceRepository.deleteAll(avoidanceRepository.findByUser(user));

        for (String foodName : foodNames) {

            Optional<Food> existingFood = foodRepository.findByFoodName(foodName.trim());

            Food food;
            if (existingFood.isPresent()) {
                food = existingFood.get();
            } else {
                food = Food.builder()
                        .foodName(foodName.trim())
                        .apiFoodId("API_ID_" + foodName.trim())
                        .nutritionalInfo("{}")
                        .build();

                food = foodRepository.save(food);
            }

            FoodAvoidance avoidance = FoodAvoidance.builder()
                    .user(user)
                    .food(food) // Food_List의 PK(foodId)를 참조합니다.
                    .restrictionType(RestrictionType.DISLIKE)
                    .build();

            avoidanceRepository.save(avoidance);
        }
    }

    @Override
    public List<String> getAvoidanceFoods(Integer userId) {
        User user = signUpRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자 ID를 찾을 수 없습니다."));

        List<FoodAvoidance> avoidanceRecords = avoidanceRepository.findByUser(user);

        return avoidanceRecords.stream()
                .map(record -> record.getFood().getFoodName())
                .collect(Collectors.toList());
    }
}