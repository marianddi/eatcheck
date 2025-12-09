package com.dmu.eatcheck.controller;

import com.dmu.eatcheck.dto.response.FoodApiItemDto;
import com.dmu.eatcheck.dto.response.GenericResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/diet")
public class DietRecommendationController {

    private final DietRecommendationService dietRecommendationService;

    @GetMapping("/recommend/{userId}")
    public ResponseEntity<GenericResponse> getRecommendedFoods(@PathVariable Integer userId) {
        try {
            List<FoodApiItemDto> recommendedFoods = dietRecommendationService.recommendFoods(userId);

            if (recommendedFoods.isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.NO_CONTENT)
                        .body(GenericResponse.error("추천할 음식이 없습니다."));
            }

            return ResponseEntity.ok(GenericResponse.success("식단 추천 성공", recommendedFoods));

        } catch (IllegalArgumentException e) {
            log.warn("추천 실패 (프로필 없음): userId={}", userId);
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(GenericResponse.error(e.getMessage()));
        } catch (IllegalStateException e) {
            log.error("추천 실패 (데이터 부족): userId={}", userId, e);
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(GenericResponse.error(e.getMessage()));
        } catch (Exception e) {
            log.error("식단 추천 중 서버 오류 발생: userId={}", userId, e);
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(GenericResponse.error("서버 오류로 인해 식단 추천에 실패했습니다."));
        }
    }
}
