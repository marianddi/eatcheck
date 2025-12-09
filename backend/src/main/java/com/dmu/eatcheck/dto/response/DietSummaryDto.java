package com.dmu.eatcheck.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class DietSummaryDto {
    private LocalDate recordDate;
    private Integer totalCalories;
    private Integer totalCarb;
    private Integer totalProtein;
    private Integer totalFat;

    // 캘린더에서 특정 날짜에 기록이 있는지 여부를 판단할 때 사용 가능
    private boolean hasLog;
}