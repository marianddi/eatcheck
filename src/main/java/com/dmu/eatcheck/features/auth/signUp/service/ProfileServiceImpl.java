package com.dmu.eatcheck.features.auth.signUp.service;

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

    private Integer calculateBMR(Boolean isMale, BigDecimal weight, BigDecimal height, Integer age) {
        double w = weight.doubleValue();
        double h = height.doubleValue();
        double a = age.doubleValue();
        double bmr;

        if (isMale) {
            bmr = 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a);
        } else {
            bmr = 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a);
        }

        return (int) Math.round(bmr);
    }

    @Transactional
    @Override
    public ProfileResponseDto createOrUpdateProfile(ProfileRequestDto requestDto) {
        User user = signUpRepository.findById(requestDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("사용자 ID를 찾을 수 없습니다. (회원가입 누락)"));

        Integer calculatedBmr = calculateBMR(
                user.getGender(),
                requestDto.getWeight(),
                requestDto.getHeight(),
                requestDto.getAge()
        );

        UserProfile newProfile = UserProfile.builder()
                .user(user)
                .height(requestDto.getHeight())
                .age(requestDto.getAge())
                .weight(requestDto.getWeight())
                .bmr(calculatedBmr)
                .recordDate(LocalDateTime.now())
                .build();

        UserProfile savedProfile = profileRepository.save(newProfile);

        log.info("User {} 프로필 기입 성공. BMR: {} kcal", user.getUserId(), calculatedBmr);

        return ProfileResponseDto.builder()
                .profileId(savedProfile.getProfileId())
                .userId(user.getUserId())
                .bmr(savedProfile.getBmr())
                .message("프로필 정보가 성공적으로 기입되었습니다. BMR이 계산되었습니다.")
                .build();
    }
}