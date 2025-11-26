//package com.dmu.eatcheck.features.auth.calendar.service;
//
//import com.dmu.eatcheck.features.auth.signUp.domain.Entity.User;
//import com.dmu.eatcheck.features.auth.signUp.repository.SignUpRepository;
//import jakarta.transaction.Transactional;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Service;
//
//@Slf4j
//@RequiredArgsConstructor
//@Service
//public class CalendarServiceImpl implements CalendarService {
//
//    private final SignUpRepository signUpRepository;
//
//    @Transactional
//    @Override
//    public void recordDiet(DietRequestDto requestDto) {
//        // 1. 사용자 ID로 User 엔티티 조회
//        User user = signUpRepository.findById(requestDto.getUserId())
//                .orElseThrow(() -> new IllegalArgumentException("사용자 ID를 찾을 수 없습니다."));
//
//        // 2. DietRequestDto를 DietRecord 엔티티로 변환 및 빌드
//        DietRecord newRecord = DietRecord.builder()
//                .user(user)
//                .recordDate(requestDto.getRecordDate())
//                .foodName(requestDto.getFoodName())
//                .calories(requestDto.getCalories())
//                .carb(requestDto.getCarb())
//                .protein(requestDto.getProtein())
//                .fat(requestDto.getFat())
//                // .mealType(...) // MealType이 Enum으로 정의되면 추가
//                .build();
//
//        // 3. DB에 저장
//        dietRecordRepository.save(newRecord);
//
//        log.info("User ID {}의 {} 식단 기록이 캘린더에 성공적으로 저장되었습니다.",
//                user.getId(),
//                requestDto.getRecordDate());
//    }
//}
