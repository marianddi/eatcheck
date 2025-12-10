package com.dmu.eatcheck.repository;

import com.dmu.eatcheck.entity.Weight_log;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WeightLogRepository extends JpaRepository<Weight_log, Integer> {
    List<Weight_log> findByUserId(Integer userPk);
}
