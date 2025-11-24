package com.dmu.eatcheck.features.auth.signUp.service;

import com.dmu.eatcheck.features.auth.signUp.domain.Entity.ActivityLevel;
import com.dmu.eatcheck.features.auth.signUp.domain.Entity.UserProfile;
import com.dmu.eatcheck.features.auth.signUp.domain.Entity.User;
import com.dmu.eatcheck.features.auth.signUp.domain.dto.ProfileRequestDto;
import com.dmu.eatcheck.features.auth.signUp.domain.dto.ProfileResponseDto;
import com.dmu.eatcheck.features.auth.signUp.repository.ProfileRepository;
import com.dmu.eatcheck.features.auth.signUp.repository.SignUpRepository;
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

    private double lerp(double a, double b, double t) {
        return a + t * (b - a);
    }

    // BMR 계산 (Mifflin-St Jeor)
    private Integer calculateBMR(Boolean isMale, BigDecimal weight, BigDecimal height, Integer age) {
        double w = weight.doubleValue();
        double h = height.doubleValue();
        double a = age.doubleValue();
        double bmr;

        if (isMale) {
            bmr = (10 * w) + (6.25 * h) - (5 * a) + 5;
        } else {
            bmr = (10 * w) + (6.25 * h) - (5 * a) - 161;
        }
        return (int) Math.round(bmr);
    }

    @Transactional
    @Override
    public ProfileResponseDto createOrUpdateProfile(ProfileRequestDto requestDto) {
        User user = signUpRepository.findById(requestDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("사용자 ID를 찾을 수 없습니다."));

        Integer bmr = calculateBMR(
                user.getGender(),
                requestDto.getWeight(),
                requestDto.getHeight(),
                requestDto.getAge()
        );

        ActivityLevel level = requestDto.getActivityLevel();
        double activityCoefficient = level.getCoefficient();

        Integer tdee = (int) Math.round(bmr * activityCoefficient);
        Integer recommendedCalorie = tdee;

        double t_pro = (activityCoefficient - 1.2) / 0.8;
        if (t_pro < 0) t_pro = 0;
        if (t_pro > 1) t_pro = 1;

        double proFactor = lerp(1.0, 2.0, t_pro);

        int recommendedProtein = (int) Math.round(requestDto.getWeight().doubleValue() * proFactor);
        int proteinKcal = recommendedProtein * 4;

        int fatKcal = (int) (recommendedCalorie * 0.25);
        int recommendedFat = fatKcal / 9;

        int carbKcal = recommendedCalorie - proteinKcal - fatKcal;
        int recommendedCarb = carbKcal / 4;

        UserProfile userProfile = profileRepository.findByUserId(user.getId())
                .orElse(UserProfile.builder().user(user).build());

        userProfile.setHeight(requestDto.getHeight());
        userProfile.setAge(requestDto.getAge());
        userProfile.setWeight(requestDto.getWeight());

        userProfile.setActivityLevel(level);

        userProfile.setBmr(bmr);
        userProfile.setTdee(tdee);
        userProfile.setRecommendedCalorie(recommendedCalorie);
        userProfile.setRecommendedProtein(recommendedProtein);
        userProfile.setRecommendedFat(recommendedFat);
        userProfile.setRecommendedCarb(recommendedCarb);
        userProfile.setRecordDate(LocalDateTime.now());

        UserProfile savedProfile = profileRepository.save(userProfile);

        log.info("User {} 프로필 설정 완료 (활동레벨 적용). TDEE/권장: {}", user.getUserId(), tdee);

        return ProfileResponseDto.builder()
                .message("프로필 설정 완료 (활동레벨 적용)")
                .profileId(savedProfile.getProfileId())
                .userId(user.getUserId())
                .bmr(savedProfile.getBmr())
                .tdee(savedProfile.getTdee())
                .recommendedCalorie(savedProfile.getRecommendedCalorie())
                .recommendedCarb(savedProfile.getRecommendedCarb())
                .recommendedProtein(savedProfile.getRecommendedProtein())
                .recommendedFat(savedProfile.getRecommendedFat())
                .build();
    }
}