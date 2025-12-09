package com.dmu.eatcheck.repository;

import com.dmu.eatcheck.entity.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface GoalRepository extends JpaRepository<Goal, Integer> {

    @Query("SELECT g FROM Goal g WHERE g.user.userId = :userId AND g.endDate >= CURRENT_DATE")
    Optional<Goal> findActiveGoal(Integer userId);

    @Query("select g from Goal g where g.user.id = :userId")
    Optional<Goal> findByUserId(@Param("userId") Integer userId);

}

