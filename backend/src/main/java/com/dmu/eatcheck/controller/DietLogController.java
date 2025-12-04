package com.dmu.eatcheck.controller;

import com.dmu.eatcheck.dto.request.DietLogRequestDto;
import com.dmu.eatcheck.dto.response.DietSummaryDto;
import com.dmu.eatcheck.entity.DietLog;
import com.dmu.eatcheck.service.DietLogService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.weaver.ast.Not;
import org.hibernate.Internal;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/log")
public class DietLogController {

    private final DietLogService dietLogService;

    /**
     POST
     ex)/log/meal
    식단 기록: 사용자의 특정 식사 정보를 기록하고 영양 정보를 계산하여 저장합니다.
     **/
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
    /**
     GET /log/calendar
     캘린더 기간별 요약: startDate와 endDate 사이의 일자별 총 칼로리 및 영양소 요약 정보를 조회합니다.
     ex) ?userId=1&startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
     **/
    @GetMapping("/calendar")
    public ResponseEntity<?> getCalendarSummary(
            @RequestParam Integer userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        try {
            List<DietSummaryDto> summaries = dietLogService.getDietLogsByPeriod(userId, startDate, endDate);

            return ResponseEntity.ok(summaries);

        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        } catch (Exception e) {
            log.error("캘린더 요약 조회 중 서버 오류 발생: {}", e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("서버 오류로 인해 캘린더 정보를 불러오는 데 실패했습니다.");
        }
    }

    /**
     * 특정 날짜의 상세 식단 기록을 조회합니다. (캘린더 날짜 클릭 시 사용)
     * ex)/log/daily?userId=1&date=2024-01-15
     */
    @GetMapping("/daily")
    public ResponseEntity<?> getDailyLogs(
            @RequestParam Integer userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        try {
            List<DietLog> logs = dietLogService.getDailyDietLogs(userId, date);

            return ResponseEntity.ok(logs);

        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        } catch (Exception e) {
            log.error("일일 식단 기록 조회 중 서버 오류 발생: {}", e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("서버 오류로 인해 일일 식단 기록을 불러오는 데 실패했습니다.");
        }
    }
}