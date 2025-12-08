package com.dmu.eatcheck.repository;

import com.dmu.eatcheck.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RankingRepository extends JpaRepository<User, Integer> {

    @Query(value = "SELECT user_id, nickname, total_score " +
            "FROM user " +
            "ORDER BY total_score DESC " +
            "LIMIT 10",
            nativeQuery = true)
    List<Object[]> findTop10Users();
}
