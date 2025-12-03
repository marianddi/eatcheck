package com.dmu.eatcheck.service;

import com.dmu.eatcheck.dto.request.DietLogRequestDto;
import com.dmu.eatcheck.dto.response.DietSummaryDto;
import com.dmu.eatcheck.entity.DietLog;

import java.time.LocalDate;
import java.util.List;

public interface DietLogService {

    void logMeal(DietLogRequestDto requestDto);

    // 특정 날짜의 기록 조회 (캘린더 기능 활용)
   List<DietLog> getDailyDietLogs(Integer userId, LocalDate date);

    // 특정 기간의 기록 조회 (캘린더 월별/주간 조회 활용)
    List<DietSummaryDto> getDietLogsByPeriod(Integer userId, LocalDate startDate, LocalDate endDate);}
