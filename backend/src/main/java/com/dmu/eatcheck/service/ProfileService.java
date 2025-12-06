package com.dmu.eatcheck.service;


import com.dmu.eatcheck.dto.request.ProfileRequestDto;
import com.dmu.eatcheck.dto.response.ProfileResponseDto;

public interface ProfileService {

    ProfileResponseDto createOrUpdateProfile(ProfileRequestDto requestDto);
    ProfileResponseDto getProfileByUserId(Integer userId);}