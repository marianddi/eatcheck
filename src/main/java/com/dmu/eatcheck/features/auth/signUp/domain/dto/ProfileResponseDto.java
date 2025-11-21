package com.dmu.eatcheck.features.auth.signUp.domain.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProfileResponseDto {
    private final String message;
    private final Integer profileId;
    private final String userId;
    private final Integer bmr;
}