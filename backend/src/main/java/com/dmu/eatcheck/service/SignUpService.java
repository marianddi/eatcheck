package com.dmu.eatcheck.service;

import com.dmu.eatcheck.dto.request.SignUpRequestDto;
import com.dmu.eatcheck.dto.response.SignUpResponseDto;

public interface SignUpService {
    SignUpResponseDto registerUser(SignUpRequestDto requestDto);

    void validateDuplicateUser(String userId, String nickname, String email);
}