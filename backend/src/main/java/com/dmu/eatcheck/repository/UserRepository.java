package com.dmu.eatcheck.repository;
//db접근
import com.dmu.eatcheck.dto.response.RankingListItem;
import com.dmu.eatcheck.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
   Optional<User> findByUserId(String userId); //User엔티티 안에 있는 userId 필드를 기준으로 검색하라는 의미 //select * from user_id = ?

   @Query("SELECT u.totalScore FROM User u WHERE u.id = :id")
   Optional<Integer> findUserScoreById(@Param("id") Integer userPk);

   @Query("SELECT u.nickname FROM User u WHERE u.id = :id")
   String findUserNicknameById(@Param("id") Integer userPk);

   // 전체 랭킹 점수 높은 순으로 조회
   List<User> findAllByIsDeletedFalseOrderByTotalScoreDesc();

   // 현재 사용자 순위 조회
   @Query(value = "SELECT COUNT(u.id) + 1 FROM user u WHERE u.total_score > :score AND u.is_deleted = false", nativeQuery = true)
   Integer findRankingByScore(@Param("score") Integer score);



}
