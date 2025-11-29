package com.dmu.eatcheck.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProfileResponseDto {
    private final String message;
    private final Integer profileId;
    private final String userId;
    private final Integer bmr;
    private final Integer tdee;
    private final Integer recommendedCalorie;
    private final Integer recommendedCarb;
    private final Integer recommendedProtein;
    private final Integer recommendedFat;
}