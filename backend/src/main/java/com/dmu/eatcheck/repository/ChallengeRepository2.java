package com.dmu.eatcheck.repository;

import com.dmu.eatcheck.entity.Challenge_master;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChallengeRepository2 extends JpaRepository<Challenge_master, Integer> {

    @Query(value = "SELECT * FROM challenge_master ORDER BY RAND() LIMIT :count", nativeQuery = true)
    List<Challenge_master> findRandomChallenges(int count);
}

