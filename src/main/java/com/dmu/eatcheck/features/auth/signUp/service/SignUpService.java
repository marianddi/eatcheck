package com.dmu.eatcheck.features.auth.signUp.service;

import com.dmu.eatcheck.features.auth.signUp.domain.dto.SignUpRequestDto;
import com.dmu.eatcheck.features.auth.signUp.domain.dto.SignUpResponseDto;

public interface SignUpService {
    SignUpResponseDto registerUser(SignUpRequestDto requestDto);

    void validateDuplicateUser(String userId, String nickname, String email);
}