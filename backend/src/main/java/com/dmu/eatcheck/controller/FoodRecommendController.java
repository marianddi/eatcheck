package com.dmu.eatcheck.controller;

import com.dmu.eatcheck.dto.response.FoodSearchResponseDto;
import com.dmu.eatcheck.service.FoodRecommendService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/recommend")
public class FoodRecommendController {

    private final FoodRecommendService foodRecommendService;

    /**
     * GET /recommend/food?userId={사용자 ID}
     * 사용자 목표 및 남은 권장 영양성분에 기반한 식단 추천 목록을 조회합니다.
     * 필터링 및 스칼라 값 기준으로 정렬된 목록을 반환합니다.
     */
    @GetMapping("/food")
    public ResponseEntity<?> recommendFoods(
            @RequestParam("userId") Integer userId,
            // 추가 필터링 옵션 (예: 즐겨찾기, 특정 식품군)이 필요하면 추가 가능
            @RequestParam(value = "filter", required = false) String filter
    ) {
        log.info("식단 추천 요청: userId={}, filter={}", userId, filter);

        try {
            List<FoodSearchResponseDto> recommendedFoods = foodRecommendService.getRecommendedFoods(userId, filter);

            if (recommendedFoods.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("추천할 식품을 찾을 수 없거나 DB에 식품 데이터가 없습니다.");
            }

            return ResponseEntity.ok(recommendedFoods);

        } catch (IllegalArgumentException e) {
            log.warn("식단 추천 실패: userId={}, 오류={}", userId, e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        } catch (Exception e) {
            log.error("식단 추천 중 서버 오류 발생: userId={}", userId, e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("서버 오류로 인해 식단 추천에 실패했습니다.");
        }
    }
}