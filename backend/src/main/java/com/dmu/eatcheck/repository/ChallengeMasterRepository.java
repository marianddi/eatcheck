package com.dmu.eatcheck.repository;

import com.dmu.eatcheck.entity.ChallengeList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChallengeMasterRepository extends JpaRepository<ChallengeList, Long> {

    List<ChallengeList> findByType(String type);

    @Query("SELECT c FROM ChallengeList c WHERE c.type = 'DIET' AND (c.name LIKE '%단백질%' OR c.name LIKE '%칼로리%')")
    List<ChallengeList> findBulkChallenges();

    @Query("SELECT c FROM ChallengeList c WHERE c.type IN ('LIFESTYLE','DIET')")
    List<ChallengeList> findMaintainChallenges();
}
