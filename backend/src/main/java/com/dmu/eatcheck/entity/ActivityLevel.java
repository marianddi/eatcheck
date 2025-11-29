package com.dmu.eatcheck.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ActivityLevel {
    LEVEL_1("숨쉬기 운동 (1시간 이하)", 1.2),
    LEVEL_2("가벼운 활동 (1~3시간)", 1.375),
    LEVEL_3("중등도 활동 (3~5시간)", 1.55),
    LEVEL_4("활발한 활동 (5~7시간)", 1.725),
    LEVEL_5("매우 활발 (7~9시간)", 1.9),
    LEVEL_6("격렬한 활동 (9시간 이상)", 2.0);

    private final String description;
    private final double coefficient;
}