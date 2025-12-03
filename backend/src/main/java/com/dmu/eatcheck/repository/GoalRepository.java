package com.dmu.eatcheck.repository;

import com.dmu.eatcheck.entity.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface GoalRepository extends JpaRepository<Goal, Long> {

    @Query("SELECT g FROM Goal g WHERE g.user.userId = :userId AND g.endDate >= CURRENT_DATE")
    Optional<Goal> findActiveGoal(Long userId);
}

