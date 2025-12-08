package com.dmu.eatcheck.service;


import com.dmu.eatcheck.dto.request.SignUpRequestDto;
import com.dmu.eatcheck.dto.response.SignUpResponseDto;
import com.dmu.eatcheck.entity.User;
import com.dmu.eatcheck.repository.SignUpRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Slf4j
@RequiredArgsConstructor
@Service
public class SignUpServiceImpl implements SignUpService {

    private final SignUpRepository signUpRepository;
//    private final PasswordEncoder passwordEncoder;

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
                .password((requestDto.getPassword()))
//                .password(passwordEncoder.encode(requestDto.getPassword()))
                .gender(requestDto.getGender())
                .regDate(LocalDate.now())
                .totalScore(0)
                .isDeleted(false)
                .build();

        User savedUser = signUpRepository.save(newUser);

        return SignUpResponseDto.success(savedUser.getUserId(), savedUser.getId());
    }
}