package com.dmu.eatcheck.service;

import com.dmu.eatcheck.dto.request.DietLogRequestDto;
import com.dmu.eatcheck.entity.DietLog;

import java.time.LocalDate;
import java.util.List;

public interface DietLogService {

    void logMeal(DietLogRequestDto requestDto);

    // 특정 날짜의 기록 조회 (캘린더 기능 활용)
   List<DietLog> getDailyDietLogs(Integer userId, LocalDate date);

}
