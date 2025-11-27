package com.dmu.eatcheck.repository;
//엔티티마다 하나의 레퍼지토리를 둠.
import com.dmu.eatcheck.entity.User_challenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChallengeRepository extends JpaRepository<User_challenge, Integer> {
    List<User_challenge> findByUserId(Integer userPk);
}
