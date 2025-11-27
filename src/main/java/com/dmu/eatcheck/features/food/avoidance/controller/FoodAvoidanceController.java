package com.dmu.eatcheck.features.food.avoidance.controller;

import com.dmu.eatcheck.features.food.avoidance.domain.dto.FoodAvoidanceRequestDto;
import com.dmu.eatcheck.features.food.avoidance.service.FoodAvoidanceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/avoidance")
public class FoodAvoidanceController {

    private final FoodAvoidanceService foodAvoidanceService;

    /**
     * POST /avoidance/set
     * 못 먹는 음식을 저장/업데이트합니다.
     */
    @PostMapping("/set")
    public ResponseEntity<?> setAvoidanceFoods(@Valid @RequestBody FoodAvoidanceRequestDto requestDto) {
        try {
            // ServiceImpl 에서 API 검증 및 저장 로직 수행
            foodAvoidanceService.saveAvoidanceFoods(requestDto);
            log.info("User ID {}의 못 먹는 음식 목록이 저장되었습니다.", requestDto.getUserId());
            return ResponseEntity.status(HttpStatus.OK).body("못 먹는 음식이 성공적으로 저장되었습니다.");
        } catch (IllegalArgumentException e) {
            // 사용자 ID를 찾지 못했거나, API 검증에 실패한 경우
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            log.error("음식 회피 목록 저장 중 서버 오류 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류로 인해 저장에 실패했습니다.");
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getAvoidanceFoods(@PathVariable Integer userId) {
        try {
            List<String> foods = foodAvoidanceService.getAvoidanceFoods(userId);

            if (foods.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("저장된 회피 음식이 없습니다.");
            }

            return ResponseEntity.status(HttpStatus.OK).body(foods);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            log.error("음식 회피 목록 조회 중 서버 오류 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류로 인해 조회에 실패했습니다.");
        }
    }
}
