package com.dmu.eatcheck.repository;

import com.dmu.eatcheck.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RankingRepository extends JpaRepository<User, Integer> {

    @Query(value =
            "SELECT u.id AS user_id, u.nickname, u.total_score, up.profile_image " +
                    "FROM `user` u " +
                    "LEFT JOIN `user_profile` up ON u.id = up.user_id " +
                    "WHERE u.is_deleted = false " +
                    "ORDER BY u.total_score DESC",
            nativeQuery = true)
    List<Object[]> findAllUsersForRanking();
}
