package com.dmu.eatcheck.features.auth.signUp.domain.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SignUpResponseDto {
    private final String message;
    private final String userId;
    private final Integer id;

    public static SignUpResponseDto success(String userId, Integer id) {
        return SignUpResponseDto.builder()
                .message("회원가입이 성공적으로 완료되었습니다. 프로필 기입이 필요합니다.")
                .userId(userId)
                .id(id)
                .build();
    }
}