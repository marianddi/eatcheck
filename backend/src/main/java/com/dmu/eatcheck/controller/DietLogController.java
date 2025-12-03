package com.dmu.eatcheck.controller;

import com.dmu.eatcheck.dto.request.DietLogRequestDto;
import com.dmu.eatcheck.service.DietLogService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/log")
public class DietLogController {

    private final DietLogService dietLogService;

    @PostMapping("/meal")
    public ResponseEntity<String> logMeal(@Valid @RequestBody DietLogRequestDto requestDto, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getFieldError().getDefaultMessage();
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(errorMessage);
        }

        try {
            dietLogService.logMeal(requestDto);

            log.info("User {} 식단 기록 성공: {}", requestDto.getUserId(), requestDto.getFoodName());
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body("식단이 성공적으로 기록되었습니다.");

        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        } catch (Exception e) {
            log.error("식단 기록 중 서버 오류 발생: {}", e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR) // 500 Internal Server Error
                    .body("서버 오류로 인해 식단 기록에 실패했습니다.");
        }
    }
}