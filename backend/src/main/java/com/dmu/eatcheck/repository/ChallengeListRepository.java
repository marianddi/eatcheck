package com.dmu.eatcheck.repository;

import com.dmu.eatcheck.entity.ChallengeList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChallengeListRepository extends JpaRepository<ChallengeList, Long> {

    List<ChallengeList> findByType(String type);
}

