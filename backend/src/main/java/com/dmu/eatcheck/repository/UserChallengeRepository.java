package com.dmu.eatcheck.repository;

import com.dmu.eatcheck.entity.User_challenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserChallengeRepository extends JpaRepository<User_challenge, Integer> {

    List<User_challenge> findByUserIdAndCompletedFalse(Integer userId);

    List<User_challenge> findByUserId(Integer userId);
}
