package com.dmu.eatcheck.service;

import com.dmu.eatcheck.dto.request.DietLogRequestDto;
import com.dmu.eatcheck.dto.response.DietSummaryDto;
import com.dmu.eatcheck.entity.DietLog;
import com.dmu.eatcheck.entity.Food; // Food 엔티티 임포트
import com.dmu.eatcheck.entity.User;
import com.dmu.eatcheck.repository.DietLogRepository;
import com.dmu.eatcheck.repository.SignUpRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class DietLogServiceImpl implements DietLogService {

    private final SignUpRepository signUpRepository;
    private final DietLogRepository dietLogRepository;
    private final FoodService foodService;

    private double parseNutrientValue(String value) {
        if (value == null || value.trim().isEmpty()) {
            return 0.0;
        }
        try {
            return Double.parseDouble(value.trim());
        } catch (NumberFormatException e) {
            return 0.0;
        }
    }

    /**
     * 식단 기록 시 Food DB에서 영양 정보를 가져와 칼로리를 계산하고 DietLog에 저장합니다.
     */
    @Transactional
    @Override
    public void logMeal(DietLogRequestDto requestDto) {

        // 1. 사용자 엔티티 조회
        User user = signUpRepository.findById(requestDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("사용자 ID를 찾을 수 없습니다."));

        // 2. Food 엔티티 조회 (식품명으로 영양 정보 가져오기)
        // foodService는 foodName에 해당하는 Food 엔티티를 DB에서 찾거나 예외를 발생시킵니다.
        Food food = foodService.getOrCreateFood(requestDto.getFoodName());

        // 3. 칼로리 계산
        double baseKcal = parseNutrientValue(food.getEnerc());
        double servingSize = requestDto.getServingSize();
        
        // 칼로리 계산
        int totalCalories = (int)(baseKcal * servingSize);

        // 탄수화물 계산 (chocdf)
        double baseCarb = parseNutrientValue(food.getChocdf());
        int totalCarb = (int)(baseCarb * servingSize);

        // 단백질 계산 (prot)
        double baseProtein = parseNutrientValue(food.getProt());
        int totalProtein = (int)(baseProtein * servingSize);

        // 지방 계산 (fatce)
        double baseFat = parseNutrientValue(food.getFatce());
        int totalFat = (int)(baseFat * servingSize);

        // 4. DietLog 엔티티 생성 및 매핑
        DietLog newLog = DietLog.builder()
                .user(user)
                .recordDate(requestDto.getRecordDate())
                .mealType(requestDto.getMealType())
                .foodName(requestDto.getFoodName())
                .servingSize(servingSize)
                .calories(totalCalories)
                .carb(totalCarb)
                .protein(totalProtein)
                .fat(totalFat)
                .build();

        // 5. DB 저장
        dietLogRepository.save(newLog);

        log.info("User {} 식단 기록 성공: {} (총 {} kcal)", user.getId(), requestDto.getFoodName(), totalCalories);
    }

    @Override
    public List<DietLog> getDailyDietLogs(Integer userId, LocalDate date) {
        // 1. 사용자 엔티티 조회
        User user = signUpRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자 ID를 찾을 수 없습니다."));

        // 2. 해당 날짜의 모든 기록 조회
        return dietLogRepository.findByUserAndRecordDate(user, date);
    }

    // 캘린더 기능
    @Override
    public List<DietSummaryDto> getDietLogsByPeriod(Integer userId, LocalDate startDate, LocalDate endDate) {        // 1. 사용자 엔티티 조회
        User user = signUpRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자 ID를 찾을 수 없습니다."));

        // 2. 해당 기간의 모든 기록 조회
        List<DietLog> logs = dietLogRepository.findByUserAndRecordDateBetween(user, startDate, endDate);

        // 3. 일자별 요약 정보 계산 (그룹화)
        return logs.stream()
                // 날짜(recordDate)를 기준으로 그룹화
                .collect(java.util.stream.Collectors.groupingBy(DietLog::getRecordDate))
                .entrySet().stream()
                // Map<LocalDate, List<DietLog>> -> DietSummaryDto로 변환
                .map(entry -> {
                    LocalDate date = entry.getKey();
                    List<DietLog> dailyLogs = entry.getValue();

                    // 일일 총합 계산
                    int totalCalories = dailyLogs.stream().mapToInt(DietLog::getCalories).sum();
                    int totalCarb = dailyLogs.stream().mapToInt(DietLog::getCarb).sum();
                    int totalProtein = dailyLogs.stream().mapToInt(DietLog::getProtein).sum();
                    int totalFat = dailyLogs.stream().mapToInt(DietLog::getFat).sum();

                    return DietSummaryDto.builder()
                            .recordDate(date)
                            .totalCalories(totalCalories)
                            .totalCarb(totalCarb)
                            .totalProtein(totalProtein)
                            .totalFat(totalFat)
                            .hasLog(true)
                            .build();
                })
                // 날짜 순으로 정렬
                .sorted(java.util.Comparator.comparing(DietSummaryDto::getRecordDate))
                .collect(java.util.stream.Collectors.toList());
    }
}