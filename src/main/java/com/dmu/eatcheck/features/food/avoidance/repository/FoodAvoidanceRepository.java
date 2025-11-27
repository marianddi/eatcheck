package com.dmu.eatcheck.features.food.avoidance.repository;

import com.dmu.eatcheck.features.auth.signUp.domain.Entity.User;
import com.dmu.eatcheck.features.food.avoidance.domain.entity.FoodAvoidance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodAvoidanceRepository extends JpaRepository<FoodAvoidance, Long> {
    // 특정 사용자의 회피 목록 조회
    List<FoodAvoidance> findByUser(User user);

    // 특정 사용자가 특정 음식을 이미 회피 목록에 추가했는지 확인
    boolean existsByUserAndFoodFoodId(User user, Long foodId);

    // 특정 사용자의 특정 음식 회피 기록 삭제용
    void deleteByUserAndFoodFoodId(User user, Long foodId);
}