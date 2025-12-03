package com.dmu.eatcheck.service;


import com.dmu.eatcheck.dto.request.FoodAvoidanceRequestDto;

import java.util.List;

public interface FoodAvoidanceService {
    // 못 먹는 음식 목록을 새로 저장합니다 (기존 목록은 덮어쓰기 또는 추가 로직 선택 가능)
    void saveAvoidanceFoods(FoodAvoidanceRequestDto requestDto);

    // 사용자 회피 음식 목록 조회
    List<String> getAvoidanceFoods(Integer userId);
}