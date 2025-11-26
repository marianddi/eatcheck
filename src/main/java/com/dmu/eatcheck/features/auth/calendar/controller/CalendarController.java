//package com.dmu.eatcheck.features.auth.calendar.controller;
//
//import jakarta.validation.Valid;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.validation.BindingResult;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@Slf4j
//@RequiredArgsConstructor
//@RestController
//@RequestMapping("/calendar")
//public class CalendarController {
//
//    private final CalendarService calendarService;
//
//    /**
//     * POST /calendar/record
//     * 새로운 식단 기록을 저장합니다. (캘린더에 기록 추가)
//     */
//    @PostMapping("/record")
//    public ResponseEntity<?> recordDiet(@Valid @RequestBody DietRequestDto requestDto, BindingResult bindingResult) {
//        // 1. 입력 유효성 검사 (Validation)
//        if (bindingResult.hasErrors()) {
//            String errorMessage = bindingResult.getFieldError().getDefaultMessage();
//            return ResponseEntity
//                    .status(HttpStatus.BAD_REQUEST)
//                    .body(errorMessage);
//        }
//
//        try {
//            // 2. 서비스 로직 호출 (반환 값 없음)
//            calendarService.recordDiet(requestDto);
//
//            // 3. 응답 반환 (201 Created만 반환)
//            log.info("캘린더 기록 요청 처리 성공 (날짜: {})", requestDto.getRecordDate());
//            return ResponseEntity
//                    .status(HttpStatus.CREATED) // 201 Created
//                    .build();
//
//        } catch (IllegalArgumentException e) {
//            // 사용자 ID를 찾지 못한 경우 등
//            return ResponseEntity
//                    .status(HttpStatus.NOT_FOUND) // 404 Not Found
//                    .body(e.getMessage());
//        } catch (Exception e) {
//            log.error("캘린더 기록 중 서버 오류 발생", e);
//            return ResponseEntity
//                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("서버 오류로 인해 캘린더 기록에 실패했습니다.");
//        }
//    }
//}