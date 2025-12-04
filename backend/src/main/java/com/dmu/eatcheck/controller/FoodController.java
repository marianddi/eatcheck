package com.dmu.eatcheck.controller;

import com.dmu.eatcheck.dto.response.FoodSearchResponseDto;
import com.dmu.eatcheck.entity.Food;
import com.dmu.eatcheck.service.FoodService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/food") // 기본 경로 설정
public class FoodController {

    private final FoodService foodService;

    /**
     * GET /api/food/search?term={검색어}
     * 식품명에 검색어(term)가 포함된 모든 식품을 조회합니다. (LIKE 검색)
     */
    @GetMapping("/search")
    public ResponseEntity<List<FoodSearchResponseDto>> searchFoods(@RequestParam("term") String searchTerm) {

        log.info("LIKE 검색 요청: Term = {}", searchTerm);

        // FoodService의 searchFoodsByName 메서드를 사용해 LIKE 검색 실행
        List<Food> foods = foodService.searchFoodsByName(searchTerm);

        if (foods.isEmpty()) {
            log.info("검색 결과 없음: Term = {}", searchTerm);
            return ResponseEntity.noContent().build(); // 204 No Content
        }

        // Food 엔티티 리스트를 DTO 리스트로 변환
        List<FoodSearchResponseDto> response = foods.stream()
                .map(FoodSearchResponseDto::fromEntity)
                .collect(Collectors.toList());

        log.info("검색 결과 {}건 반환: Term = {}", response.size(), searchTerm);
        return ResponseEntity.ok(response); // 200 OK
    }
}
