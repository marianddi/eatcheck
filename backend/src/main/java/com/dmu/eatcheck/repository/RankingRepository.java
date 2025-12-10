package com.dmu.eatcheck.repository;

import com.dmu.eatcheck.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RankingRepository extends JpaRepository<User, Integer> {

    // ✅ 기존 메서드 그대로 유지
    @Query(value = "SELECT user_id, nickname, total_score " +
            "FROM user " +
            "ORDER BY total_score DESC " +
            "LIMIT 10",
            nativeQuery = true)
    List<Object[]> findTop10Users();

    // ✅ 프로필 추가한 NEW 메서드 (기존 손상 없음)
    @Query(value = "SELECT u.user_id, u.nickname, u.total_score, " +
            "(SELECT up.profile_image FROM user_profile up WHERE up.user_id = u.id) AS profile_image " +
            "FROM user u " +
            "WHERE u.is_deleted = false " +
            "ORDER BY u.total_score DESC " +
            "LIMIT 10",
            nativeQuery = true)
    List<Object[]> findTop10UsersWithProfile();
}
