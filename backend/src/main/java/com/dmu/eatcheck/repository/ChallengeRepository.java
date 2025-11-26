package com.dmu.eatcheck.repository;
//엔티티마다 하나의 레퍼지토리를 둠.
import com.dmu.eatcheck.entity.User_challenge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChallengeRepository extends JpaRepository<User_challenge, Integer> {
    List<User_challenge> findByUser_UserId(Integer userId);
}
