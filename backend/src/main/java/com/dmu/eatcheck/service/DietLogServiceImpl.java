package com.dmu.eatcheck.service;

import com.dmu.eatcheck.dto.request.DietLogRequestDto;
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

    private final SignUpRepository signUpRepository; // User 엔티티 조회용
    private final DietLogRepository dietLogRepository;
    private final FoodService foodService; // 💡 FoodService 주입

    // Helper: 숫자로 변환 (실패 시 0.0 반환)
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

        // 3. 💡 칼로리 계산
        // Food 엔티티의 enerc (에너지(kcal)) 필드 (String 타입)를 double로 변환합니다.
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
        // ⚠️ DietLog 엔티티에 'calories' 필드가 Double 타입으로 추가되었다고 가정하고 코드를 작성합니다.
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
}