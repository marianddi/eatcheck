package com.dmu.eatcheck.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
public class GoalDataDto {
    private Double targetWeight;
    private Long totalDays;
    private Long remainingDays;
    private LocalDate startDate;
    private LocalDate endDate;
}
