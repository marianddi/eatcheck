package com.dmu.eatcheck.service;

import com.dmu.eatcheck.dto.response.DietSummaryDto;
import com.dmu.eatcheck.dto.response.FoodScalarDto;
import com.dmu.eatcheck.dto.response.FoodSearchResponseDto;
import com.dmu.eatcheck.dto.response.ProfileResponseDto;
import com.dmu.eatcheck.entity.Food;
import com.dmu.eatcheck.entity.User;
import com.dmu.eatcheck.repository.FoodRepository;
import com.dmu.eatcheck.repository.SignUpRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class FoodRecommendServiceImpl implements FoodRecommendService {

    private final SignUpRepository signUpRepository;
    private final ProfileService profileService;
    private final DietLogService dietLogService;
    private final FoodRepository foodRepository;

    private static final double MAX_CALORIE_PORTION = 0.30;

    private static final double PROTEIN_WEIGHT = 2.0;
    private static final double CARB_FAT_WEIGHT = 1.0;

    private static final double MIN_PROTEIN_CUTOFF_G = 5.0;

    private static final List<String> EXCLUDE_FOOD_GROUPS = List.of(
            "해당없음", "가공식품", "음료", "빵 및 과자", "기타", "롤케이크", "카라멜","초콜릿케이크","앙버터빵","링도넛","맘모스빵","치즈"
    );

    @Override
    public List<FoodSearchResponseDto> getRecommendedFoods(Integer userId, String filter) {

        // 1. 사용자 및 프로필 정보 조회
        User user = signUpRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자 ID를 찾을 수 없습니다."));

        ProfileResponseDto userProfile = profileService.getProfileByUserId(userId);

        // 💡 전체 권장 칼로리 T_Kcal 가져오기
        int totalRecommendedCalorie = userProfile.getRecommendedCalorie();

        // 💡 30% 제한 기준 계산
        final double CALORIE_LIMIT = totalRecommendedCalorie * MAX_CALORIE_PORTION;

        // 2. 오늘 섭취한 영양소 합계 조회
        LocalDate today = LocalDate.now();
        DietSummaryDto todaySummary = dietLogService.getDailyNutrientSummary(userId, today); // 오늘 섭취량

        // 3. 남은 권장 영양소 계산 (Remaining Nutrients)
        int recommendedCarb = userProfile.getRecommendedCarb();
        int recommendedProtein = userProfile.getRecommendedProtein();
        int recommendedFat = userProfile.getRecommendedFat();

        int remainingCarb = Math.max(0, recommendedCarb - todaySummary.getTotalCarb());
        int remainingProtein = Math.max(0, recommendedProtein - todaySummary.getTotalProtein());
        int remainingFat = Math.max(0, recommendedFat - todaySummary.getTotalFat());

        // 4. 모든 음식 데이터 로드 (DB에 데이터가 충분히 있어야 함)
        List<Food> allFoods = foodRepository.findAll();
        if (allFoods.isEmpty()) {
            return List.of();
        }

        List<FoodScalarDto> scoredFoods = allFoods.stream()
                .filter(food -> !EXCLUDE_FOOD_GROUPS.contains(food.getFoodGroup()))

                // 💡 [필터]: 총 칼로리 제한 (T_Kcal의 30% 초과 여부)
                .filter(food -> parseNutrientValue(food.getEnerc()) <= CALORIE_LIMIT)

                // 💡 [필터]: 필수 영양소 컷오프 (단백질 목표가 남았는데 단백질이 너무 적은 음식 제외)
                .filter(food -> {
                    // 단백질 목표가 남아있으면 (remainingProtein > 0), 해당 음식의 단백질은 MIN_PROTEIN_CUTOFF_G 이상이어야 함
                    if (remainingProtein > 0) {
                        double foodProtein = parseNutrientValue(food.getProt());
                        return foodProtein >= MIN_PROTEIN_CUTOFF_G;
                    }
                    return true; // 단백질 목표가 없으면 필터 통과
                })
                .map(food -> {
                    double score = calculateScalarScore(
                            remainingCarb, remainingProtein, remainingFat,
                            food.getChocdf(), food.getProt(), food.getFatce()
                    );
                    return new FoodScalarDto(food, score);
                })
                .collect(Collectors.toList());
        // 6. 정렬 (스칼라 값 오름차순)
        Comparator<FoodScalarDto> comparator = Comparator.comparing(FoodScalarDto::getScalarScore);

        scoredFoods.sort(comparator);

        // 7. 결과 DTO로 매핑 및 반환
        return scoredFoods.stream()
                .limit(5)
                .map(FoodScalarDto::toResponseDto)
                .collect(Collectors.toList());
    }

    /**
     * 핵심 로직: 영양소 편차 제곱 합 (스칼라 값) 계산
     */
    private double calculateScalarScore(
            double rCarb, double rProtein, double rFat, // 남은 권장량 (Remaining)
            String fCarbStr, String fProteinStr, String fFatStr // 음식 영양소 (Food)
    ) {
        // 문자열을 숫자로 파싱 (Food 엔티티는 String 타입을 가짐)
        double fCarb = parseNutrientValue(fCarbStr);
        double fProtein = parseNutrientValue(fProteinStr);
        double fFat = parseNutrientValue(fFatStr);

        // 1. 남은 권장 영양소 정규화
        double[] normRemaining = normalize(rCarb, rProtein, rFat);

        // 2. 음식 영양소 정규화
        double[] normFood = normalize(fCarb, fProtein, fFat);

        // 3. 편차 계산 및 제곱 합 (Distance Score)
        double carbDifference = normRemaining[0] - normFood[0];
        double proteinDifference = normRemaining[1] - normFood[1];
        double fatDifference = normRemaining[2] - normFood[2];

        double score = (CARB_FAT_WEIGHT * carbDifference * carbDifference)
                + (PROTEIN_WEIGHT * proteinDifference * proteinDifference)
                + (CARB_FAT_WEIGHT * fatDifference * fatDifference);

        return score;
    }

    /**
     * [Helper] 문자열을 Double로 안전하게 파싱
     */
    private double parseNutrientValue(String value) {
        if (value == null || value.trim().isEmpty() || "null".equalsIgnoreCase(value.trim())) {
            return 0.0;
        }
        try {
            // Food 엔티티의 영양소는 String 타입이므로 파싱 필요
            return Double.parseDouble(value.trim());
        } catch (NumberFormatException e) {
            return 0.0;
        }
    }

    /**
     * [Helper] 가장 낮은 양수 값을 1로 기준 잡아 정규화합니다.
     * (0으로 나누는 것 방지 로직 포함)
     */
    private double[] normalize(double nCarb, double nProtein, double nFat) {
        double minVal = Double.MAX_VALUE;

        if (nCarb > 0) minVal = Math.min(minVal, nCarb);
        if (nProtein > 0) minVal = Math.min(minVal, nProtein);
        if (nFat > 0) minVal = Math.min(minVal, nFat);

        // 모든 값이 0일 경우, minVal을 1로 설정하여 0/0 상황을 방지하고 편차를 0으로 유지
        if (minVal == Double.MAX_VALUE || minVal == 0) {
            minVal = 1.0;
        }

        double normCarb = nCarb / minVal;
        double normProtein = nProtein / minVal;
        double normFat = nFat / minVal;

        return new double[]{normCarb, normProtein, normFat};
    }
}