package com.dmu.eatcheck.features.auth.signUp.service;


import com.dmu.eatcheck.features.auth.signUp.domain.dto.ProfileRequestDto;
import com.dmu.eatcheck.features.auth.signUp.domain.dto.ProfileResponseDto;

public interface ProfileService {

    ProfileResponseDto createOrUpdateProfile(ProfileRequestDto requestDto);
}