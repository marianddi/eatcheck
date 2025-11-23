package com.dmu.eatcheck.repository;

import com.dmu.eatcheck.entity.User_challenge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChallengeRepository extends JpaRepository<User_challenge, Integer> {
    Optional<User_challenge> findByUserId(String userId);
}
