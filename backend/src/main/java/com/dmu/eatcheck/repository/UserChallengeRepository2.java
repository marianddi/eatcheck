package com.dmu.eatcheck.repository;

import com.dmu.eatcheck.entity.User_challenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserChallengeRepository2 extends JpaRepository<User_challenge, Integer> {

    /**
     * 유저의 현재 진행 중인 도전과제 목록 가져오기
     */
    @Query("SELECT uc FROM User_challenge uc WHERE uc.user.id = :userId")
    List<User_challenge> findByUserId(Integer userId);


    /**
     * 유저+챌린지 ID로 특정 도전과제 찾기 (complete, 중복 확인용)
     */
    @Query("SELECT uc FROM User_challenge uc WHERE uc.user.id = :userId AND uc.challengeMaster.id = :challengeId")
    User_challenge findByUserIdAndChallengeId(Integer userId, Integer challengeId);
}
