package com.dmu.eatcheck.service;

import com.dmu.eatcheck.dto.response.FoodSearchResponseDto;

import java.util.List;

public interface FoodRecommendService {

    /**
     * 사용자 ID를 기반으로 남은 권장 영양성분을 계산하고,
     * 모든 음식을 스칼라 값 기준으로 정렬하여 추천 목록을 반환합니다.
     * @param userId 사용자 ID (pk)
     * @param filter 적용할 필터 (예: "favorite", "avoidance")
     * @return 정렬된 FoodSearchResponseDto 리스트
     */
    List<FoodSearchResponseDto> getRecommendedFoods(Integer userId, String filter);
}