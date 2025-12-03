package com.dmu.eatcheck.repository;

import com.dmu.eatcheck.entity.DietLog;
import com.dmu.eatcheck.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface DietLogRepository extends JpaRepository<DietLog, Long> {

    List<DietLog> findByUserAndRecordDate(User user, LocalDate recordDate);

    List<DietLog> findByUserAndRecordDateBetween(User user, LocalDate startDate, LocalDate endDate);
}
