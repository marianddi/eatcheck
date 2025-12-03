package com.dmu.eatcheck.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum RestrictionType {

    DISLIKE("못 먹는 음식"),
    ALLERGY("알레르기");

    private final String description;
}