package com.dmu.eatcheck.controller;


import com.dmu.eatcheck.dto.request.FoodAvoidanceRequestDto;
import com.dmu.eatcheck.service.FoodAvoidanceService;
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

    @PostMapping("/set")
    public ResponseEntity<?> setAvoidanceFoods(@Valid @RequestBody FoodAvoidanceRequestDto requestDto) {
        try {
            foodAvoidanceService.saveAvoidanceFoods(requestDto);
            return ResponseEntity.status(HttpStatus.OK).body("못 먹는 음식이 성공적으로 저장되었습니다.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
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
