package com.dmu.eatcheck.repository;

//import com.dmu.eatcheck.entity.ChallengeList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

import com.dmu.eatcheck.entity.Challenge_master;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

@Repository
public interface ChallengeMasterRepository extends JpaRepository<Challenge_master, Integer> {

    @Query(value =
            "SELECT * FROM challenge_master cm " +
                    "WHERE cm.id NOT IN (SELECT challenge_id FROM user_challenge WHERE user_id = :userId) " +
                    "ORDER BY RAND() LIMIT :count",
            nativeQuery = true)
    List<Challenge_master> findRandomNewChallenges(@Param("userId") Integer userId, @Param("count") int count);

}



//public interface ChallengeMasterRepository extends JpaRepository<ChallengeList, Long> {
//
//    List<ChallengeList> findByType(String type);
//
//    @Query("SELECT c FROM ChallengeList c WHERE c.type = 'DIET' AND (c.name LIKE '%단백질%' OR c.name LIKE '%칼로리%')")
//    List<ChallengeList> findBulkChallenges();
//
//    @Query("SELECT c FROM ChallengeList c WHERE c.type IN ('LIFESTYLE','DIET')")
//    List<ChallengeList> findMaintainChallenges();
//}
