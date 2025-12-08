package com.dmu.eatcheck.service;

import com.dmu.eatcheck.dto.request.FoodAvoidanceRequestDto;
import com.dmu.eatcheck.entity.Food;
import com.dmu.eatcheck.entity.FoodAvoidance;
import com.dmu.eatcheck.entity.RestrictionType;
import com.dmu.eatcheck.entity.User;
import com.dmu.eatcheck.repository.FoodAvoidanceRepository;
import com.dmu.eatcheck.repository.SignUpRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class FoodAvoidanceServiceImpl implements FoodAvoidanceService {

    private final SignUpRepository signUpRepository;
    private final FoodAvoidanceRepository avoidanceRepository;
    private final FoodService foodService;

    @Transactional
    @Override
    public void saveAvoidanceFoods(FoodAvoidanceRequestDto requestDto) {
        // 1. 사용자 확인 및 유효성 검사
        User user = signUpRepository.findById(requestDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("사용자 ID를 찾을 수 없습니다."));

        List<String> foodNames = requestDto.getAvoidanceFoodNames();
        avoidanceRepository.deleteAll(avoidanceRepository.findByUser(user));

        for (String foodName : foodNames) {

            Food food = foodService.getOrCreateFood(foodName.trim());

            FoodAvoidance avoidance = FoodAvoidance.builder()
                    .user(user)
                    .food(food)
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