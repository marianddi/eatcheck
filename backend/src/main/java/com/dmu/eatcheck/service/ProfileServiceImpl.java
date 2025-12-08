package com.dmu.eatcheck.service;


import com.dmu.eatcheck.dto.request.ProfileRequestDto;
import com.dmu.eatcheck.dto.request.TargetUpdateRequestDto;
import com.dmu.eatcheck.dto.response.ProfileResponseDto;
import com.dmu.eatcheck.entity.ActivityLevel;
import com.dmu.eatcheck.entity.Gender;
import com.dmu.eatcheck.entity.User;
import com.dmu.eatcheck.entity.UserProfile;
import com.dmu.eatcheck.repository.ProfileRepository;
import com.dmu.eatcheck.repository.SignUpRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Slf4j
@RequiredArgsConstructor
@Service
public class ProfileServiceImpl implements ProfileService {

    private final SignUpRepository signUpRepository;
    private final ProfileRepository profileRepository;

    private static final int CALORIES_PER_KG_FAT = 7700;
    private static final double ACTIVITY_FACTOR_MIN = 1.2;

    private static final double ACTIVITY_FACTOR_MAX = 2.0;

    private static final double ACTIVITY_FACTOR_RANGE = ACTIVITY_FACTOR_MAX - ACTIVITY_FACTOR_MIN; // 0.8

    private double lerp(double a, double b, double t) {
        return a + t * (b - a);
    }

    // BMR 계산
    private Integer calculateBMR(Gender gender, BigDecimal weight, BigDecimal height, Integer age) {
        double w = weight.doubleValue();
        double h = height.doubleValue();
        double a = age.doubleValue();
        double bmr;

        if (gender == Gender.MALE) {
            bmr = (10 * w) + (6.25 * h) - (5 * a) + 5;
        } else {
            bmr = (10 * w) + (6.25 * h) - (5 * a) - 161;
        }
        return (int) Math.round(bmr);
    }

    private Integer calculateRecommendedCalorie(Integer tdee, double currentWeightKg, double targetWeightKg, Integer targetDurationDays) {

        // 1. 현상 유지 조건: 기간이 없거나 (null 또는 0), 목표 체중과 현재 체중이 같으면 TDEE 반환
        if (targetDurationDays == null || targetDurationDays <= 0 || currentWeightKg == targetWeightKg) {
            return tdee;
        }

        // 2. 증량/감량 목표 계산
        double weightDifference = currentWeightKg - targetWeightKg;

        // 권장 칼로리 계산식: TDEE + ((기존 몸무게 - 목표 몸무게) X 7700) / 목표기간
        double goalCalorieChange = (weightDifference * CALORIES_PER_KG_FAT) / targetDurationDays;

        return (int) Math.round(tdee + goalCalorieChange);
    }

    private ProfileResponseDto mapToResponseDto(UserProfile userProfile) {
        User user = userProfile.getUser();

        return ProfileResponseDto.builder()
                .message("프로필 조회 성공")
                .profileId(userProfile.getProfileId())
                .userId(user.getUserId())
                .targetWeight(userProfile.getTargetWeight())
                .targetDurationDays(userProfile.getTargetDurationDays())
                .bmr(userProfile.getBmr())
                .tdee(userProfile.getTdee())
                .recommendedCalorie(userProfile.getRecommendedCalorie())
                .recommendedCarb(userProfile.getRecommendedCarb())
                .recommendedProtein(userProfile.getRecommendedProtein())
                .recommendedFat(userProfile.getRecommendedFat())
                .build();
    }

    @Transactional
    @Override
    public ProfileResponseDto createOrUpdateProfile(ProfileRequestDto requestDto) {
        User user = signUpRepository.findById(requestDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("사용자 ID를 찾을 수 없습니다."));

        // 1. BMR 및 TDEE 계산
        Integer bmr = calculateBMR(
                user.getGender(),
                requestDto.getWeight(),
                requestDto.getHeight(),
                requestDto.getAge()
        );

        ActivityLevel level = requestDto.getActivityLevel();
        double activityCoefficient = level.getCoefficient();

        Integer tdee = (int) Math.round(bmr * activityCoefficient);

        // 2. 권장 칼로리 계산 (목표 체중/기간 반영)
        Integer recommendedCalorie = calculateRecommendedCalorie(
                tdee,
                requestDto.getWeight().doubleValue(), // 현재 체중
                requestDto.getTargetWeight().doubleValue(), // 목표 체중
                requestDto.getTargetDurationDays() // 달성 기간
        );

        // 3. 권장 영양성분 계산
        double t_pro = (activityCoefficient - ACTIVITY_FACTOR_MIN) / ACTIVITY_FACTOR_RANGE;
        if (t_pro < 0) t_pro = 0;
        if (t_pro > 1) t_pro = 1;

        double proFactor = lerp(1.0, 2.0, t_pro);

        int recommendedProtein = (int) Math.round(requestDto.getWeight().doubleValue() * proFactor);
        int proteinKcal = recommendedProtein * 4;

        int fatKcal = (int) (recommendedCalorie * 0.25);
        int recommendedFat = fatKcal / 9;

        int carbKcal = recommendedCalorie - proteinKcal - fatKcal;
        if (carbKcal < 0) carbKcal = 0; // 음수 방지
        int recommendedCarb = carbKcal / 4;

        // 4. UserProfile 저장
        UserProfile userProfile = profileRepository.findByUserId(user.getId())
                .orElse(UserProfile.builder().user(user).build());

        userProfile.setHeight(requestDto.getHeight());
        userProfile.setAge(requestDto.getAge());
        userProfile.setWeight(requestDto.getWeight());
        userProfile.setTargetWeight(requestDto.getTargetWeight());
        userProfile.setTargetDurationDays(requestDto.getTargetDurationDays());
        userProfile.setActivityLevel(level);
        userProfile.setBmr(bmr);
        userProfile.setTdee(tdee);
        userProfile.setRecommendedCalorie(recommendedCalorie);
        userProfile.setRecommendedProtein(recommendedProtein);
        userProfile.setRecommendedFat(recommendedFat);
        userProfile.setRecommendedCarb(recommendedCarb);
        userProfile.setRecordDate(LocalDateTime.now());

        UserProfile savedProfile = profileRepository.save(userProfile);

        log.info("User {} 프로필 설정 완료. 권장 칼로리: {}", user.getUserId(), recommendedCalorie);

        return mapToResponseDto(savedProfile);
    }

    @Transactional
    @Override
    public ProfileResponseDto updateTarget(TargetUpdateRequestDto requestDto) {

        // 1. 사용자 및 프로필 조회
        User user = signUpRepository.findById(requestDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("사용자 ID를 찾을 수 없습니다."));

        UserProfile userProfile = profileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new IllegalArgumentException("사용자의 프로필 정보가 존재하지 않습니다."));

        // 2. TDEE 값 가져오기
        Integer tdee = userProfile.getTdee();
        if (tdee == null) {
            throw new IllegalStateException("TDEE 값이 존재하지 않습니다. 프로필을 먼저 설정해야 합니다.");
        }

        userProfile.setTargetWeight(requestDto.getTargetWeight());
        userProfile.setTargetDurationDays(requestDto.getTargetDurationDays());

        // 3. 권장 칼로리 재계산 (새로운 목표 체중/기간 반영)
        Integer recommendedCalorie = calculateRecommendedCalorie(
                tdee,
                userProfile.getWeight().doubleValue(),
                requestDto.getTargetWeight().doubleValue(),
                requestDto.getTargetDurationDays()
        );

        // 4. 권장 영양성분 재계산
        int recommendedProtein = userProfile.getRecommendedProtein();
        int proteinKcal = recommendedProtein * 4;

        int fatKcal = (int) (recommendedCalorie * 0.25);
        int recommendedFat = fatKcal / 9;

        int carbKcal = recommendedCalorie - proteinKcal - fatKcal;
        if (carbKcal < 0) carbKcal = 0;
        int recommendedCarb = carbKcal / 4;

        // 5. UserProfile 필드 업데이트 및 저장
        userProfile.setRecommendedCalorie(recommendedCalorie);
        userProfile.setRecommendedProtein(recommendedProtein);
        userProfile.setRecommendedFat(recommendedFat);
        userProfile.setRecommendedCarb(recommendedCarb);
        userProfile.setRecordDate(LocalDateTime.now());

        UserProfile savedProfile = profileRepository.save(userProfile);

        log.info("User {} 목표 체중/기간 변경 완료. 새 권장 칼로리: {}", user.getUserId(), recommendedCalorie);

        return mapToResponseDto(savedProfile);
    }

    @Override
    public ProfileResponseDto getProfile(Integer userId) {
        User user = signUpRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자 ID를 찾을 수 없습니다."));

        UserProfile userProfile = profileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new IllegalArgumentException("사용자의 프로필 정보가 존재하지 않습니다."));

        return mapToResponseDto(userProfile);
    }
}