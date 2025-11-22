package com.dmu.eatcheck.features.auth.signUp.service;

import com.dmu.eatcheck.features.auth.signUp.domain.Entity.User;
import com.dmu.eatcheck.features.auth.signUp.domain.dto.SignUpRequestDto;
import com.dmu.eatcheck.features.auth.signUp.domain.dto.SignUpResponseDto;
import com.dmu.eatcheck.features.auth.signUp.repository.SignUpRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

@Slf4j
@RequiredArgsConstructor
@Service
public class SignUpServiceImpl implements SignUpService {

    private final SignUpRepository signUpRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void validateDuplicateUser(String userId, String nickname, String email) {
        if (signUpRepository.existsByUserId(userId)) {
            throw new IllegalArgumentException("이미 사용 중인 아이디입니다.");
        }
        if (signUpRepository.existsByNickname(nickname)) {
            throw new IllegalArgumentException("이미 사용 중인 닉네임입니다.");
        }
        if (signUpRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }
    }

    @Transactional
    @Override
    public SignUpResponseDto registerUser(SignUpRequestDto requestDto) {

        validateDuplicateUser(requestDto.getUserId(), requestDto.getNickname(), requestDto.getEmail());

        // User Entity 생성 및 저장
        User newUser = User.builder()
                .userId(requestDto.getUserId())
                .nickname(requestDto.getNickname())
                .email(requestDto.getEmail())
                .password(passwordEncoder.encode(requestDto.getPassword()))
                .gender(requestDto.getGender())
                .regDate(LocalDate.now())
                .totalScore(0)
                .isDeleted(false)
                .build();

        User savedUser = signUpRepository.save(newUser);

        return SignUpResponseDto.success(savedUser.getUserId(), savedUser.getId());
    }
}